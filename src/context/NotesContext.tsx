import { createContext, useContext, useState, useEffect } from "react";
import { Note } from "@models/Note";
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
	getNote: (id: string) => Note | void; // Método para obtener una nota
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
	const defaultNoteList: Note[] = [
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
	];

	// Cargar notas al inicio de la app desde el storage
	useEffect(() => {
		try {
			// Reset de errores
			setHasError(false);
			setErrorMessage(null);

			// TODO: Agregar carga de notas desde el storage
			// const localNoteList: Note[] = [];
			// if (localNoteList) {
			// 	if (localNoteList.length > 0) setNoteList(localNoteList);
			// 	else setIsEmpty(true);
			// }
			setNoteList(defaultNoteList);
		} catch (error) {
			setHasError(true);
			if (error instanceof Error) setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// * Funciones CRUD
	const addNote = (title: string, content: string, color: string) =>
		console.log("addNote:", { title, content, color });
	const getNote = (id: string) => console.log("getNote:", id);
	const updateNote = (
		id: string,
		title: string,
		content: string,
		color: string
	) => console.log("Note updated:", { id, title, content, color });
	const deleteNote = (id: string) => console.log("deleteNote:", id);

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
