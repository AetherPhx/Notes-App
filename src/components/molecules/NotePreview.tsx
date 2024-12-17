import { Note } from "@models/Note";
import { Icon } from "@components/atoms";
import { useNotesContext } from "@context/NotesContext";

interface INotePreview {
	note: Note;
}

export const NotePreview = ({ note }: INotePreview) => {
	const { id, title, content, colorNote, createdAt, updatedAt } = note;

	// * Texto Dinámico del Preview
	const dateShowed = updatedAt ? updatedAt : createdAt;
	const dateText = dateShowed === updatedAt ? "Editado el:" : "Creado el:";
	const notePreviewClass = `NotePreview--${colorNote}`;

	// * Funciones CRUD
	const { getNote, deleteNote } = useNotesContext();

	const handleClick = (target?: string) => {
		if (target === "edit") getNote(id);
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
