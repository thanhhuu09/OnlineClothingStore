import { useState } from "react";
import Slider from "@mui/material/Slider";
interface PriceRangeProps {
  priceRange: (value: number[]) => void;
}
function valuetext(value: number) {
  return `${value}`;
}
const minDistance = 10;

export default function PriceRange({ priceRange }: PriceRangeProps) {
  const [value, setValue] = useState<number[]>([20, 37]);
  priceRange(value);
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (value[1] - value[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };
  return (
    <Slider
      color="error"
      getAriaLabel={() => "Price range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
    />
  );
}
