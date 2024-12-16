import { Note } from "@models/Note";
import { useNotesContext } from "@context/NotesContext";
import { Icon, Input, TextArea, Button } from "@components/atoms";
import { ColorPicker } from "@molecules/ColorPicker";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface INoteForm {
	noteToEdit: Note | null;
	setNoteToEdit: React.Dispatch<React.SetStateAction<Note | null>>;
}
interface IFormFields {
	title: string;
	content: string;
	color: string;
}
const initialFormValues: IFormFields = {
	title: "",
	content: "",
	color: "yellow",
};

export const NoteForm = ({ noteToEdit, setNoteToEdit }: INoteForm) => {
	// * Estados del Formulario
	const [originFormValues, setOriginFormValues] =
		useState<IFormFields>(initialFormValues);
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IFormFields>({
		defaultValues: initialFormValues,
	});
	const currentFormValues = watch();
	const {
		title: currentTitle,
		content: currentContent,
		color: currentColor,
	} = currentFormValues;
	const isChanged =
		currentTitle !== originFormValues.title ||
		currentContent !== originFormValues.content ||
		currentColor !== originFormValues.color;

	// * Texto Dinámico del Formulario (Edición o Creación)
	const formTitle = noteToEdit ? "¡Edita esta Nota!" : "¡Agrega una Nota!";
	const formSubmitIcon = noteToEdit ? "edit" : "add";
	const formSubmitClass = noteToEdit ? "NoteForm__edit" : "NoteForm__add";
	const formSubmitText = noteToEdit ? "Confirmar Edición" : "Agregar Nota";

	// * Funciones CRUD (Agregar y Actualizar)
	const { addNote, updateNote } = useNotesContext();

	// * Sincronización de valores del Formulario
	useEffect(() => {
		if (noteToEdit) {
			const newOriginFormValues = {
				title: noteToEdit.title,
				content: noteToEdit.content.join("\n"),
				color: noteToEdit.colorNote,
			};
			setOriginFormValues(newOriginFormValues);
			reset(newOriginFormValues);
		} else {
			setOriginFormValues(initialFormValues);
			reset(initialFormValues);
		}
	}, [noteToEdit, reset]);

	// * Funciones de Gestión del Formulario
	const resetForm = () => {
		setNoteToEdit(null);
		reset();
	};
	const onSubmit = handleSubmit((data) => {
		const { title, content, color } = data;
		if (noteToEdit) updateNote(noteToEdit.id, title, content, color);
		else addNote(title, content, color);
		resetForm();
	});
	const handleCancel = () => resetForm();

	return "Este es el formulario";
};
