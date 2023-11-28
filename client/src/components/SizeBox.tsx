interface SizeBoxProps {
  size: string;
  isSelected: boolean;
  onSizeChange: (size: string) => void;
}

export default function SizeBox({
  size,
  isSelected,
  onSizeChange,
}: SizeBoxProps) {
  // Handle click event
  const handleOnClick = () => {
    // Only call onSizeChange when the size is not selected
    if (!isSelected) {
      onSizeChange(size);
    }
  };
  return (
    // Box for size
    <div>
      <div
        onClick={handleOnClick}
        className={`
            w-8 h-8 rounded border cursor-pointer border-solid flex justify-center items-center text-center 
            text-base p-2 transition-colors duration-200 ease-in-out
            ${
              isSelected
                ? "bg-secondary-500 text-secondary-50"
                : "text-primary-900 hover:bg-primary-100 focus:bg-primary-100"
            }
          `}
      >
        {size}
      </div>
    </div>
  );
}
