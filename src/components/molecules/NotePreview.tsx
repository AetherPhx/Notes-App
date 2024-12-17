import { Note } from "@models/Note";
import { useNotesContext } from "@context/NotesContext";
import { Icon } from "@components/atoms";
import { useEffect, useState } from "react";

interface INotePreview {
	note: Note;
	setNoteToEdit: React.Dispatch<React.SetStateAction<Note | null>>;
	isEditing: boolean;
}

export const NotePreview = ({
	note,
	setNoteToEdit,
	isEditing,
}: INotePreview) => {
	const { id, title, content, colorNote, createdAt, updatedAt } = note;
	const [isActive, setIsActive] = useState(false);

	// * Texto Dinámico del Preview
	const dateShowed = updatedAt ? updatedAt : createdAt;
	const dateText = dateShowed === updatedAt ? "Editado el:" : "Creado el:";
	const notePreviewClass = `NotePreview--${colorNote} ${
		isActive ? "NotePreview--active" : ""
	}`;

	useEffect(() => {
		if (!isEditing) setIsActive(false);
	}, [isEditing]); // Deshabilita el efecto de activo

	const { getNote, deleteNote } = useNotesContext();

	const selectNoteToEdit = (id: string) => {
		setIsActive(true);
		setNoteToEdit(getNote(id));
	};

	const handleClick = (target?: string) => {
		if (isEditing) return;
		else if (target === "edit") selectNoteToEdit(id);
		else if (target === "delete") deleteNote(id);
	};

	return (
		<article className={notePreviewClass}>
			<header className="NotePreview__header">
				<h3 className="NotePreview__title">{title}</h3>
				<section className="NotePreview__actions">
					<Icon
						icon="edit"
						className="NotePreview__edit"
						action={(e) => {
							e.stopPropagation();
							handleClick("edit");
						}}
					/>
					<Icon
						icon="delete"
						className="NotePreview__delete"
						action={(e) => {
							e.stopPropagation();
							handleClick("delete");
						}}
					/>
				</section>
			</header>

			<main className="NotePreview__main">
				{content.map((parragraph, index) => (
					<p key={index} className="NotePreview__paragraph">
						{parragraph}
					</p>
				))}
			</main>

			<footer className="NotePreview__footer">
				{dateShowed && (
					<span className="NotePreview__date">
						{dateText} {dateShowed}
					</span>
				)}
			</footer>
		</article>
	);
};
