interface CheckboxWithLabelProps {
  onCategorySelect: (e: any) => void;
  name: string;
  id: string;
  value: string;
  label: string;
}

export default function CheckboxWithLabel({
  onCategorySelect,
  name,
  id,
  value,
  label,
}: CheckboxWithLabelProps) {
  return (
    <div>
      <input
        className="mr-3 w-4 h-4 accent-primary-600"
        type="checkbox"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onCategorySelect(e)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
