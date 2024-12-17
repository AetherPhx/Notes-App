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

	// Cargar notas al inicio de la app desde el storage
	useEffect(() => {
		try {
			// Reset de errores
			setHasError(false);
			setErrorMessage(null);

			// TODO: Agregar carga de notas desde el storage
			const localNoteList: Note[] = [];
			if (localNoteList) {
				if (localNoteList.length > 0) setNoteList(localNoteList);
				else setIsEmpty(true);
			}
			// TODO: Agregar notas por defecto de respaldo en caso de que no existan notas locales
		} catch (error) {
			setHasError(true);
			if (error instanceof Error) setErrorMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// * Funciones CRUD
	const addNote = () => console.log("addNote");
	const getNote = () => console.log("getNote");
	const updateNote = () => console.log("updateNote");
	const deleteNote = () => console.log("deleteNote");

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
