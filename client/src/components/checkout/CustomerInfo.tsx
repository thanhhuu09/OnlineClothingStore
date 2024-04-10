import { useEffect, useState } from "react";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import cityService from "@/helpers/cityService";

interface customerInfoProps {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
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

export default function CustomerInfo({
  userInfo,
  setUserInfo,
}: customerInfoProps) {
  const [cities, setCities] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>("");
  const [selectedDistrict, setSelectedDistrict] = useState<any>("");
  // Fetch data
  useEffect(() => {
    const fetchCityData = async () => {
      const cities = await cityService.getAllCities();
      setCities(cities);
    };
    const fetchDistrictData = async () => {
      const districts = await cityService.getCitiesByProvince(
        selectedCity.province_id
      );
      setDistricts(districts);
    };
    fetchCityData();
    fetchDistrictData();
    console.log(districts);
  }, [selectedCity]);

  // Handle province change
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = cities.find(
      (city: any) => city.province_name === e.target.value
    );
    setSelectedCity(selectedCity);
  };
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find(
      (district: any) => district.district_name === e.target.value
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
          placeholder={input.placeholder}
          type={input.type}
        />
      ))}
      <FormSelect
        id="province"
        name="province"
        value={selectedCity.province_name || "Tỉnh/Thành phố"}
        onChange={handleProvinceChange}
        options={cities.map((city: any) => ({
          value: city.province_name,
          label: city.province_name,
        }))}
        placeholder="Tỉnh/Thành phố"
        errorMessages=""
      />
      <FormSelect
        id="district"
        name="district"
        value={selectedDistrict?.district_name || "Quận/Huyện"}
        onChange={handleDistrictChange}
        options={districts.map((district: any) => ({
          value: district.district_name,
          label: district.district_name,
        }))}
        placeholder="Quận/Huyện"
        errorMessages=""
      />
    </div>
  );
}
