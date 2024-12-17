import { Note } from "@models/Note";
import { NoteForm, NoteList } from "@components/organisms";
import { useEffect, useState } from "react";
import { NoteFull } from "@components/molecules/NoteFull";

export const NotesLayout = () => {
	const [noteSelected, setNoteSelected] = useState<Note | null>(null);
	const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (noteToEdit) setIsEditing(true);
		else setIsEditing(false);
	}, [noteToEdit]);

	return (
		<div className="NotesLayout">
			{noteSelected && (
				<NoteFull note={noteSelected} setNoteSelected={setNoteSelected} />
			)}

			<div className="NotesLayout__content">
				<header className="NotesLayout__header">
					<h1 className="NotesLayout__title">Notes App</h1>
				</header>

				<main className="NotesLayout__main">
					<NoteForm noteToEdit={noteToEdit} setNoteToEdit={setNoteToEdit} />
					<NoteList
						selectNote={setNoteSelected}
						setNoteToEdit={setNoteToEdit}
						isEditing={isEditing}
					/>
				</main>

				<footer className="NotesLayout__footer">
					<span className="NotesLayout__author">
						Made with 💜 by{" "}
						<a
							className="NotesLayout__authorLink"
							target="_blank"
							href="https://github.com/AetherPhx"
						>
							Aether Phoenix
						</a>
					</span>
				</footer>
			</div>
		</div>
	);
};
