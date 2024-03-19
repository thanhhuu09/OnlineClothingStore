// services/CityService.ts
import { IDistrict, IProvince } from "@/interfaces/cityInterface";

const CityService = {
  async fetchProvinces() {
    const res = await fetch("https://vapi.vnappmob.com/api/province/");
    const data = await res.json();
    const provinces = data.results.map((province: IProvince) => ({
      province_name: province.province_name,
      province_id: province.province_id,
    }));
    return provinces;
  },

  async fetchDistricts(provinceCode: number) {
    const res = await fetch(
      "https://vapi.vnappmob.com/api/province/district/" + provinceCode
    );
    const districts = await res.json();
    return districts.results;
  },
};

export default CityService;
