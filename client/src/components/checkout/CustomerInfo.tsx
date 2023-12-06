import { useEffect, useState } from "react";
interface IProvince {
  name: string;
  code: number;
}
interface IDistrict {
  name: string;
  province_code: number;
}

export default function CustomerInfo() {
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<
    IProvince | undefined
  >(undefined);
  useEffect(() => {
    const fetchCity = async () => {
      const res = await fetch("https://provinces.open-api.vn/api/");
      const data = await res.json();
      const provinces = data.map((province: IProvince) => ({
        name: province.name,
        code: province.code,
      }));
      setProvinces(provinces);
    };
    const fetchDistrict = async () => {
      const res = await fetch("https://provinces.open-api.vn/api/d/");
      const data = await res.json();
      const districts = data.filter((district: IDistrict) => {
        return district.province_code === selectedProvince?.code;
      });
      setDistricts(districts);
    };
    fetchCity();
    fetchDistrict();
  }, [selectedProvince]);

  const handleProvinceChange = (e: any) => {
    const selectedProvince = provinces.find(
      (province) => province.name === e.target.value
    );
    setSelectedProvince(selectedProvince);
  };

  return (
    <div className="w-fit">
      <h2 className="uppercase text-lg mb-4">Thông tin khách hàng</h2>
      <input
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder="Họ và tên (*)"
        required
      />
      <input
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder="Điện thoại (*)"
        required
      />
      <input
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder="Email"
      />
      <input
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder="Địa chỉ (*)"
        required
      />
      <input
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder="Ghi chú"
      />
      <select
        className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        onChange={handleProvinceChange}
      >
        <option selected>Tỉnh/Thành phố</option>
        {provinces.map((province: IProvince, index) => (
          <option key={index} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>
      <select className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none">
        <option selected>Quận/Huyện</option>
        {districts.map((district: IDistrict, index) => (
          <option key={index}>{district.name}</option>
        ))}
      </select>
    </div>
  );
}
