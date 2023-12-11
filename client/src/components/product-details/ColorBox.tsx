interface ColorBoxProps {
  color: string;
  isSelected: boolean;
  onColorChange: (color: string) => void;
}

export default function ColorBox({
  color,
  isSelected,
  onColorChange,
}: ColorBoxProps) {
  // Handle click event
  const handleOnClick = () => {
    // Only call onSizeChange when the size is not selected
    if (!isSelected) {
      onColorChange(color);
    }
  };
  return (
    <div
      onClick={() => onColorChange(color)}
      className={`w-6 h-6 rounded-full bg-${color} ${
        isSelected && "border-2 border-solid border-primary-500"
      }`}
    ></div>
  );
}
