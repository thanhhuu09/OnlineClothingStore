import { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { IDistrict, IProvince } from "@/interfaces/cityInterface";
import CityService from "@/services/cityService";
interface IFormCustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  [key: string]: string; // Allow any other properties
}
interface IErrors extends IFormCustomerInfo {
  [key: string]: string; // Allow any other properties
}
interface CustomerInfoProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const inputs = [
  {
    type: "text",
    placeholder: "Họ và tên (*)",
    required: true,
    name: "name",
    value: "",
  },
  {
    type: "text",
    placeholder: "Điện thoại (*)",
    required: true,
    name: "phone",
    value: "",
  },
  {
    type: "text",
    placeholder: "Email",
    required: false,
    name: "email",
    value: "",
  },
  {
    type: "text",
    placeholder: "Địa chỉ (*)",
    required: true,
    name: "address",
    value: "",
  },
  {
    type: "text",
    placeholder: "Ghi chú",
    required: false,
    name: "note",
    value: "",
  },
];

export default function CustomerInfo() {
  const [form, setForm] = useState<IFormCustomerInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });

  // Define state variables for provinces, districts, and selected province and district
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<
    IProvince | undefined
  >(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<
    IDistrict | undefined
  >(undefined);
  // Fetch provinces and districts
  useEffect(() => {
    const fetchCityData = async () => {
      const provinces = await CityService.fetchProvinces();
      setProvinces(provinces);

      if (selectedProvince) {
        const districts = await CityService.fetchDistricts(
          selectedProvince.province_id
        );
        setDistricts(districts);
      }
    };
    fetchCityData();
  }, [selectedProvince]);

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(
      (province) => province.province_name === e.target.value
    );
    setSelectedProvince(selectedProvince);
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(
      (district) => district.district_name === e.target.value
    );
    setSelectedDistrict(selectedDistrict);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="w-full">
      <h2 className="uppercase text-lg mb-4">Thông tin khách hàng</h2>
      {inputs.map((input, index) => (
        <FormInput
          key={index}
          errorMessages=""
          id={input.name}
          name={input.name}
          onChange={handleInputChange}
          placeholder={input.placeholder}
          type={input.type}
          value={form[input.name]}
        />
      ))}
      <FormSelect
        id="province"
        name="province"
        value={selectedProvince?.province_name || "Tỉnh/Thành phố"}
        onChange={handleProvinceChange}
        options={provinces.map((province: IProvince) => ({
          value: province.province_name,
          label: province.province_name,
        }))}
        placeholder="Tỉnh/Thành phố"
        errorMessages=""
      />
      <FormSelect
        id="district"
        name="district"
        onChange={handleDistrictChange}
        options={districts.map((district: IDistrict) => ({
          value: district.district_name,
          label: district.district_name,
        }))}
        placeholder="Quận/Huyện"
        errorMessages=""
        value={selectedDistrict?.district_name || "Quận/Huyện"}
      />
    </div>
  );
}
