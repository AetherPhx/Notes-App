import { useNotesContext } from "@context/NotesContext";
import { NotePreview } from "@molecules/NotePreview";

export const NoteList = () => {
	const { isLoading, hasError, errorMessage, noteList, isEmpty } =
		useNotesContext();

	// Renderizar componente de carga, error o lista de notas
	if (isLoading) return <div className="NoteList--loading">Cargando...</div>;
	if (hasError)
		return <div className="NoteList--error">Error: {errorMessage}</div>;
	if (isEmpty)
		return <div className="NoteList--empty">La Lista de Notas está vacía</div>;

	return (
		<section className="NoteList">
			{noteList.map((note) => (
				<NotePreview key={note.id} note={note} />
			))}
		</section>
	);
};
