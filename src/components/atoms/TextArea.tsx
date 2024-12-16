import {
	FieldValues, // Type for the values of the form
	Path, // Type for the path of the field
	UseFormRegister, // Type for the register function
	RegisterOptions, // Type for the validation rules
	FieldError, // Type for the error of the field
} from "react-hook-form";

type TextAreaProps<T extends FieldValues> = {
	className: string;
	placeholder?: string;

	register: UseFormRegister<T>;
	name: Path<T>;
	validationRules?: RegisterOptions<T, Path<T>>;
	error?: FieldError;
};

export const TextArea = <T extends FieldValues>({
	className,
	placeholder = "",
	register,
	name,
	validationRules,
	error,
}: TextAreaProps<T>) => {
	const maxLength = validationRules?.maxLength
		? typeof validationRules.maxLength === "object"
			? validationRules.maxLength.value
			: validationRules.maxLength
		: null;

	return (
		<>
			<div className="TextAreaWrapper">
				<textarea
					className={className}
					placeholder={placeholder}
					{...register(name, validationRules)}
				/>
				{maxLength && (
					<span className="TextArea__maxLength">
						Límite de Caracteres: {maxLength}
					</span>
				)}
			</div>
			{error && <span>{error.message}</span>}
		</>
	);
};
