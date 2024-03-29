import { useEffect } from "react";
interface ColorSelectorProps {
  availableColors: string[];
  selectedColor: string;
  selectedSize: string;
  variants: {
    size: string;
    color: string;
    sku: string;
    availableQuantity: number;
  }[];
  onColorChange: (color: string) => void;
}

function ColorSelector({
  availableColors,
  selectedSize,
  variants,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="flex gap-4">
      {availableColors.map((color) => {
        return (
          <button
            key={color}
            className={`w-fit h-8 rounded border-2 text-base p-2 flex items-center justify-center 
            text-primary-900 focus:bg-secondary-500 focus:text-secondary-50
            ${
              !isSizeAvailable(selectedColor, selectedSize, variants) &&
              `bg-gray-200 text-gray-500`
            }
            ${selectedColor === color && "bg-secondary-500 text-secondary-50"}
            `}
            onClick={() => onColorChange(color)}
          >
            {color}
          </button>
        );
      })}
    </div>
  );
}

export default ColorSelector;
function isSizeAvailable(
  selectedColor: string,
  selectedSize: string,
  variants: any[]
) {
  const getSizeAvailability = variants
    .filter((variant) => variant.color === selectedColor)
    .map((variant) => variant.color)
    .includes(selectedColor);
  return getSizeAvailability;
}
