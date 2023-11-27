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
    <div>
      <div
        onClick={handleOnClick}
        className={`w-8 h-8 rounded border border-solid flex justify-center items-center text-center ${
          isSelected && "bg-secondary-500 "
        }}`}
      >
        <p
          className={`${isSelected ? "text-secondary-50" : "text-primary-900"}`}
        >
          {size}
        </p>
      </div>
    </div>
  );
}
