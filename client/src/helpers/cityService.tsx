// services/CityService.ts
class CityService {
  baseURL: string;
  constructor() {
    this.baseURL = "https://vapi.vnappmob.com/api/province";
  }
  async getAllCities() {
    try {
      const response = await fetch(this.baseURL);
      if (!response.ok) {
        throw new Error(`API Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching cities: ", error);
      throw error;
    }
  }
  async getCitiesByProvince(provinceId: string) {
    try {
      const response = await fetch(`${this.baseURL}/district/${provinceId}`);
      if (!response.ok) {
        throw new Error(`API Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching cities by province:", error);
      throw error;
    }
  }
}

const cityService = new CityService();
export default cityService;
