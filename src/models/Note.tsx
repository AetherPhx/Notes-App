import { nanoid } from "nanoid";
import { format } from "date-fns";

export class Note {
	id: string;
	title: string;
	content: string[];
	colorNote: string;
	createdAt: string;
	updatedAt: string;

	constructor(
		title: string,
		content: string[],
		colorNote: string,
		id?: string,
		createdAt?: string
	) {
		this.id = id ? id : nanoid();
		this.title = title;
		this.content = content;
		this.colorNote = colorNote;
		this.createdAt = createdAt
			? createdAt
			: format(new Date(), "dd-MM-yyyy, HH:mm");
		this.updatedAt = createdAt ? format(new Date(), "dd-MM-yyyy, HH:mm") : "";
	}
}
