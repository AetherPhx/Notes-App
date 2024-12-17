import { NotesProvider } from "@context/NotesContext";
import { NotesLayout } from "@templates/NotesLayout";

export const NotesPage = () => {
	return (
		<NotesProvider>
			<NotesLayout />
		</NotesProvider>
	);
};
