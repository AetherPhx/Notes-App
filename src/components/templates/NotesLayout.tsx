export const NotesLayout = () => {
	return (
		<div className="NotesLayout">
			{/* Nota seleccionada */}

			<div className="NotesLayout__content">
				<header className="NotesLayout__header">
					<h1 className="NotesLayout__title">Notes App</h1>
				</header>

				<main className="NotesLayout__main">
					{/* Formulario de Notas */}
					{/* Lista de Notas */}
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
