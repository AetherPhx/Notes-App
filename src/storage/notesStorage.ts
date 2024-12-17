import { Note } from "@models/Note";
const NOTELIST__KEY = "notesApp_notes";

// Carga la lista de notas del usuario
export const loadNotes = (): Note[] | null => {
	const notesJSON = localStorage.getItem(NOTELIST__KEY);
	if (!notesJSON) return null; // Si la clave no existe, devuelve null

	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (error) {
		console.error("Error al cargar la lista de Notas", error);
		return null; // Devuelve null si hay un error
	}
};

// Guarda la lista de notas del usuario
export const saveNotes = (notes: Note[]) =>
	localStorage.setItem(NOTELIST__KEY, JSON.stringify(notes));
