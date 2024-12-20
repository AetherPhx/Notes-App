import { Note } from "@models/Note";
import { loadNotes, saveNotes } from "@storage/notesStorage";
import { createContext, useContext, useState, useEffect } from "react";
// TODO: Importar las fns de storage

interface INotesContext {
	// * Carga de datos
	isLoading: boolean; // Estado de carga
	hasError: boolean; // Estado de error
	errorMessage: string | null; // Mensaje de error

	// * Lista de Notas
	noteList: Note[]; // Lista de notas
	isEmpty: boolean; // Estado de lista vacía

	// * Funciones CRUD
	addNote: (title: string, content: string, color: string) => void; // Método para agregar una nota
	getNote: (id: string) => Note | null; // Método para obtener una nota
	updateNote: (
		id: string,
		title: string,
		content: string,
		color: string
	) => void; // Método para actualizar una nota
	deleteNote: (id: string) => void; // Método para eliminar una nota
}

const NotesContext = createContext<INotesContext | null>(null);

export const useNotesContext = () => {
	const context = useContext(NotesContext);
	if (!context) {
		throw new Error("useNotesContext must be used within a NotesProvider");
	}
	return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [noteList, setNoteList] = useState<Note[]>([]);
	const [isEmpty, setIsEmpty] = useState(false);

	// Cargar notas al inicio de la app desde el storage
	useEffect(() => {
		try {
			// Reset de errores
			setHasError(false);
			setErrorMessage(null);

			const localNoteList: Note[] | null = loadNotes();
			if (localNoteList) {
				if (localNoteList.length > 0) setNoteList(localNoteList);
				else setIsEmpty(true);
			} else
				setNoteList([
					new Note(
						"Bienvenido! 👋🏽",
						[
							"📝 Esta app te permite crear y gestionar notas de manera rápida y sencilla.",
							"Agrega notas rápidas, usalo para expresarte, escribe recordatorios, o simplemente toma notas. ¡Puedes hacer todo eso y más con esta app! 😊",
						],
						"yellow"
					),
					new Note(
						"Llamar a mamá 📱",
						[
							"Mamá regresa de su viaje el viernes, no podré visitarla por lo que quiero llamarla para charlar un poco 😊",
						],
						"blue"
					),
					new Note(
						"❓ Tutorial",
						[
							"Esta nota tiene mucho contenido por lo que en la sticky note solo se verá la primera parte. Sin embargo, una vez que abras la nota podrás acceder al contenido completo de la nota.",
							"¡Dale click para poder visualizarlo por completo!",
							"🎓 ¡Guia / Tutorial de la App! 🎓",
							"Usa el formulario de la parte superior para agregar notas. Solo debes escribir el título y el contenido de la nota. Si lo deseas puedes cambiar el color de la nota.",
							"Puedes eliminar fácilmente una nota solo dandole click al botón de eliminar desde las sticky notes.",
							"Edita las notas dando click al botón de editar desde las sticky notes. Esto cambiará el formulario al modo de edición donde puedes realizar los cambios que gustes.",
						],
						"red"
					),
				]);
		} catch (error) {
			setHasError(true);
			if (error instanceof Error) setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (noteList.length > 0) setIsEmpty(false);
		else setIsEmpty(true);
	}, [noteList]); // Si la lista de notas cambia, comprueba si está vacía

	// * Funciones CRUD
	const addNote = (title: string, content: string, color: string) => {
		const noteToAdd = new Note(title, content.split("\n"), color);
		const newNoteList = [...noteList, noteToAdd];
		setNoteList(newNoteList);
		saveNotes(newNoteList);
	};
	const getNote = (id: string) =>
		noteList.find((note) => note.id === id) || null;
	const updateNote = (
		id: string,
		title: string,
		content: string,
		color: string
	) => {
		const newNoteList = noteList.map((note) =>
			note.id === id
				? new Note(title, content.split("\n"), color, note.createdAt)
				: note
		);
		setNoteList(newNoteList);
		saveNotes(newNoteList);
	};
	const deleteNote = (id: string) => {
		const newNoteList = noteList.filter((note) => note.id !== id);
		setNoteList(newNoteList);
		saveNotes(newNoteList);
	};

	return (
		<NotesContext.Provider
			value={{
				isLoading,
				hasError,
				errorMessage,

				noteList,
				isEmpty,

				addNote,
				getNote,
				updateNote,
				deleteNote,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
};
