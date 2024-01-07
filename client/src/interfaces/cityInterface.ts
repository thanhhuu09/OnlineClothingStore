interface IProvince {
  name: string;
  code: number;
}
interface IDistrict {
  name: string;
  province_code: number;
}

export type { IProvince, IDistrict };
