import { CheckCircle } from "@phosphor-icons/react";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  note?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  label,
  placeholder,
  note,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {note && (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{note}</span>
        </div>
      )}
      <Field
        placeholder={placeholder}
        id={name}
        type={type}
        name={name}
        className="border rounded-md p-2 focus:outline-none
        focus:ring-2 text-gray-800 shadow-sm"
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
