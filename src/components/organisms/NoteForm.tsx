import { Icon, Input, TextArea, Button } from "@components/atoms";
import { ColorPicker } from "@molecules/ColorPicker";

// Tipado y definiendo las propiedades del componente
const colorsOptions = ["yellow", "green", "red", "blue", "purple"]; // Opciones de Colores para las notas

interface IFormFields {
	title: string;
	content: string;
	color: string;
}
const initialFormValues: IFormFields = {
	title: "",
	content: "",
	color: colorsOptions[0],
};

export const NoteForm = () => {
	const [defaultValues, setDefaultFormValues] =
		useState<IFormFields>(initialFormValues);
};
