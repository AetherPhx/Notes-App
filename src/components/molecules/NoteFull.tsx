import { Note } from "@models/Note";
import { Icon } from "@components/atoms";

interface INoteFullProps {
	note: Note;
	setNoteSelected: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const NoteFull = ({ note, setNoteSelected }: INoteFullProps) => {
	const { title, content, colorNote, createdAt, updatedAt } = note;
	const NoteFullClassName = `NoteFull--${colorNote}`;

	const handleClose = (e?: React.MouseEvent<HTMLDivElement>) => {
		console.log("closeNote:", e);
		if (e) {
			// Si el evento es pasado...
			if (e.target === e.currentTarget) {
				// Se evalúa si se busca cerrar la nota
				setNoteSelected(null);
				return;
			} else return;
		}

		setNoteSelected(null);
	};

	return (
		<div className="NoteFull__backdrop" onClick={(e) => handleClose(e)}>
			<section className={NoteFullClassName}>
				<header className="NoteFull__header">
					<h2 className="NoteFull__title">{title}</h2>
					<Icon
						icon="close"
						className="NoteFull__close"
						action={() => handleClose()}
					></Icon>
				</header>

				<main className="NoteFull__main">
					{content.map((parragraph, index) => (
						<p className="NoteFull__paragraph" key={index}>
							{parragraph}
						</p>
					))}
				</main>

				<footer className="NoteFull__footer">
					<span className="NoteFull__createdAt">Creado: {createdAt}</span>
					{updatedAt && (
						<span className="NoteFull__updatedAt">Editado: {updatedAt}</span>
					)}
				</footer>
			</section>
		</div>
	);
};
