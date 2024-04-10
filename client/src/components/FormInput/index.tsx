interface FormInputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  label?: string;
  errorMessages: string;
  hideLabel?: boolean;
}

export default function FormInput(props: FormInputProps) {
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
      <input
        className={`border-gray-300 border focus:outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ${
          props.errorMessages
            ? "border-red-600 bg-red-50 focus:ring-red-500 focus:ring-1 focus:border-red-500 placeholder-red-600"
            : "focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        }`}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        disabled={false}
        required
      />
      <span className="text-xs italic text-red-500">{props.errorMessages}</span>
    </div>
  );
}
