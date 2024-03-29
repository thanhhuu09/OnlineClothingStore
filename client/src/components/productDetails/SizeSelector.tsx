import { useEffect } from "react";
interface SizeBoxProps {
  availableSizes: string[];
  selectedSize: string;
  selectedColor: string;
  variants: {
    size: string;
    color: string;
    sku: string;
    availableQuantity: number;
  }[];
  onSizeChange: (size: string) => void;
}

function SizeSelector({
  availableSizes,
  selectedSize,
  selectedColor,
  variants,
  onSizeChange,
}: SizeBoxProps) {
  return (
    <div className="flex gap-4">
      {availableSizes.map((size) => {
        return (
          <button
            key={size.toString()}
            className={`w-8 h-8 rounded border-2 text-base p-2 flex items-center justify-center
            focus:bg-secondary-500 focus:text-secondary-50
            ${selectedSize === size && `bg-secondary-500 text-secondary-50`}
            ${
              !isColorAvailable(size, variants, selectedColor) &&
              `bg-gray-200 text-gray-500`
            }
            text-primary-900 focus:bg-secondary-500 focus:text-secondary-50`}
            onClick={() => onSizeChange(size)}
            disabled={!isColorAvailable(size, variants, selectedColor)}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

export default SizeSelector;

function isColorAvailable(
  selectedSize: string,
  variants: any[],
  selectedColor: string
) {
  const getColorAvailability = variants
    .filter((variant) => variant.size === selectedSize)
    .map((variant) => variant.color)
    .includes(selectedColor);
  return getColorAvailability;
}
