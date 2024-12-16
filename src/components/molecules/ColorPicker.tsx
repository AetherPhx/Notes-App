import { Input } from "@atoms/Input";
import {
	FieldValues, // Type for the values of the form
	Path, // Type for the path of the field
	UseFormRegister, // Type for the register function
} from "react-hook-form";

type ColorPickerProps<T extends FieldValues> = {
	defaultColor: string;
	register: UseFormRegister<T>;
	name: Path<T>;
	watch: (name: Path<T>) => T[Path<T>];
};

export const ColorPicker = <T extends FieldValues>({
	defaultColor,
	register,
	name,
	watch,
}: ColorPickerProps<T>) => {
	const colorsOptions = [defaultColor, "green", "red", "blue", "purple"]; // Opciones de Colores para las notas

	return (
		<section className="ColorPicker">
			{colorsOptions.map((color, index) => (
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
