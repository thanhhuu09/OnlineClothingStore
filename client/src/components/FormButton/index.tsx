import LoadingSpinner from "../loadingSpinner";

interface FormButtonProps {
  label: string;
  isDisabled: boolean;
  isFetching: boolean;
}

export default function FormButton(props: FormButtonProps) {
  return (
    <button
      className={`w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-lg 
                 hover:bg-primary-700 focus:outline-none focus:shadow-outline ${
                   props.isDisabled ? "opacity-50 cursor-not-allowed" : ""
                 }`}
      type="submit"
      disabled={props.isDisabled}
    >
      {props.isFetching ? <LoadingSpinner text={props.label} /> : props.label}
    </button>
  );
}
