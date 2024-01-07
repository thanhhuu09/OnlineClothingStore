interface FormSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  label?: string;
  errorMessages: string;
  hideLabel?: boolean;
}

export default function FormSelect(props: FormSelectProps) {
  return (
    <div>
      {props.hideLabel ? null : (
        <label
          className={`block mb-2 text-sm font-medium text-gray-900 ${
            props.errorMessages ? "text-red-600" : ""
          }`}
          htmlFor={props.id}
        >
          {props.label}
        </label>
      )}
      <select
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`border-gray-300 border focus:outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${
          props.errorMessages
            ? "border-red-600 bg-red-50 focus:ring-red-500 focus:ring-1 focus:border-red-500 placeholder-red-600"
            : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        }`}
      >
        <option disabled>{props.placeholder}</option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.errorMessages && (
        <p className="mt-2 text-sm text-red-600">{props.errorMessages}</p>
      )}
    </div>
  );
}
