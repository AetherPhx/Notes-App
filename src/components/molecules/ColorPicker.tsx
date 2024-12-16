import { Input } from "@atoms/Input";
import {
	FieldValues, // Type for the values of the form
	Path, // Type for the path of the field
	UseFormRegister, // Type for the register function
} from "react-hook-form";

type ColorPickerProps<T extends FieldValues> = {
	colorOptions: string[];

	register: UseFormRegister<T>;
	name: Path<T>;
	watch: (name: Path<T>) => T[Path<T>];
};

export const ColorPicker = <T extends FieldValues>({
	colorOptions,
	register,
	name,
	watch,
}: ColorPickerProps<T>) => {
	return (
		<section className="ColorPicker">
			{colorOptions.map((color, index) => (
				<label key={index}>
					<Input type="radio" value={color} register={register} name={name} />
					<span
						className={`ColorPicker__${color} ${
							watch(name) === color ? "ColorPicker__selected" : ""
						}`}
					></span>
				</label>
			))}
		</section>
	);
};
