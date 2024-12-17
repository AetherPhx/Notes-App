import {
	FieldValues, // Type for the values of the form
	Path, // Type for the path of the field
	UseFormRegister, // Type for the register function
	FieldError, // Type for the error of the field
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
	className?: string;
	type: string;
	value?: string;
	placeholder?: string;

	register: UseFormRegister<T>;
	name: Path<T>;
	validationRules?: object;
	error?: FieldError;
};

export const Input = <T extends FieldValues>({
	className,
	type,
	value,
	placeholder = "",
	register,
	name,
	validationRules,
	error,
}: InputProps<T>) => {
	return (
		<>
			<input
				className={className}
				type={type}
				value={value}
				placeholder={placeholder}
				{...register(name, validationRules)}
				aria-invalid={error ? "true" : "false"}
			/>
			<span className={`${className}-error`}>{error ? error.message : ""}</span>
		</>
	);
};
