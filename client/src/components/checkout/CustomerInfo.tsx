import { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import { IDistrict, IProvince } from "@/interfaces/cityInterface";
import CityService from "@/services/CityService";
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
  },
  {
    type: "text",
    placeholder: "Điện thoại (*)",
    required: true,
    name: "phone",
  },
  {
    type: "text",
    placeholder: "Email",
    required: false,
    name: "email",
  },
  {
    type: "text",
    placeholder: "Địa chỉ (*)",
    required: true,
    name: "address",
  },
  {
    type: "text",
    placeholder: "Ghi chú",
    required: false,
    name: "note",
  },
];

export default function CustomerInfo({ onSubmit }: CustomerInfoProps) {
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
          selectedProvince.code
        );
        setDistricts(districts);
      }
    };
    fetchCityData();
  }, [selectedProvince]);

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(
      (province) => province.name === e.target.value
    );
    setSelectedProvince(selectedProvince);
  };

  // Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(
      (district) => district.name === e.target.value
    );
    setSelectedDistrict(selectedDistrict);
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
          onChange={() => {}}
          placeholder={input.placeholder}
          type={input.type}
          value="" // form.name, form.phone, form.email, form.address, form.note
        />
      ))}
      <FormSelect
        id="province"
        name="province"
        value={selectedProvince?.name || "Tỉnh/Thành phố"}
        onChange={handleProvinceChange}
        options={provinces.map((province: IProvince) => ({
          value: province.name,
          label: province.name,
        }))}
        placeholder="Tỉnh/Thành phố"
        errorMessages=""
      />
      <FormSelect
        id="district"
        name="district"
        onChange={handleDistrictChange}
        options={districts.map((district: IDistrict) => ({
          value: district.name,
          label: district.name,
        }))}
        placeholder="Quận/Huyện"
        errorMessages=""
        value={selectedDistrict?.name || "Quận/Huyện"}
      />
    </div>
  );
}
