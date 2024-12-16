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
		console.log("La data enviada es:", data);
		// const { title, content, color } = data;
		// if (noteToEdit) updateNote(noteToEdit.id, title, content, color);
		// else addNote(title, content, color);
		resetForm();
	});
	const handleCancel = () => resetForm();

	return (
		<section className="NoteForm">
			<header className="NoteForm__header">
				<h2 className="NoteForm__title">{formTitle}</h2>
			</header>

			<form className="NoteForm__form" onSubmit={onSubmit}>
				<div className="NoteForm__fields">
					<Input
						className="NoteForm__Note-title"
						type="text"
						placeholder={noteToEdit ? noteToEdit.title : "Note Title"}
						register={register}
						name="title"
						validationRules={{
							required: {
								value: true,
								message: "Debes escribir un título",
							},
							minLength: {
								value: 3,
								message: "El título debe tener al menos 3 caracteres",
							},
							maxLength: {
								value: 120,
								message: "El título debe tener menos de 120 caracteres",
							},
						}}
						error={errors.title}
					/>

					<TextArea
						className="NoteForm__Note-content"
						placeholder={
							noteToEdit ? noteToEdit.content.join("\n") : "Note Content"
						}
						register={register}
						name="content"
						validationRules={{
							required: {
								value: true,
								message: "Debes escribir contenido",
							},
						}}
						error={errors.content}
					/>
				</div>

				<footer className="NoteForm__actions">
					<ColorPicker
						defaultColor={initialFormValues.color}
						register={register}
						name="color"
						watch={watch}
					/>

					<section className="NoteForm__actions">
						{noteToEdit && (
							<Button
								className="NoteForm__cancel"
								type="button"
								action={handleCancel}
							>
								<Icon icon="close" className="NoteForm__cancel__icon"></Icon>
								Cancelar
							</Button>
						)}

						<Button
							className={`${formSubmitClass} ${
								noteToEdit ? (isChanged ? "" : "NoteForm--invalid") : ""
							}`}
							type="submit"
							disabled={noteToEdit ? !isChanged : false}
						>
							<Icon
								icon={formSubmitIcon}
								className={`${formSubmitClass}__icon`}
							/>
							{formSubmitText}
						</Button>
					</section>
				</footer>
			</form>
		</section>
	);
};
