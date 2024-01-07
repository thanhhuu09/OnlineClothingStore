// services/CityService.ts
import { IDistrict, IProvince } from "@/interfaces/cityInterface";

const CityService = {
  async fetchProvinces() {
    const res = await fetch("https://provinces.open-api.vn/api/");
    const data = await res.json();
    const provinces = data.map((province: IProvince) => ({
      name: province.name,
      code: province.code,
    }));
    return provinces;
  },

  async fetchDistricts(provinceCode: number) {
    const res = await fetch("https://provinces.open-api.vn/api/d/");
    const data = await res.json();
    const districts = data.filter((district: IDistrict) => {
      return district.province_code === provinceCode;
    });
    return districts;
  },
};

export default CityService;
