import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  label,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        placeholder={placeholder}
        id={name}
        type={type}
        name={name}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <ErrorMessage
        name={name}
        component="span"
        className="text-red-500 text-xs italic"
      />
    </div>
  );
};

export default FormInput;
