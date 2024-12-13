# Notes App

Bienvenidos! 👋🏽 Esta es una aplicación web que permite a los usuarios crear y gestionar notas. 📝  
Este proyecto se ha creado utilizando React + TypeScript + SCSS.

## Features

### 👋🏽 Carga Inicial

- La app mostrará un mensaje de espera en lo que verifica si existe una lista de notas.
- La app mostrará notas predefinidas a forma de guia si es la primera vez que se entra.
- La app mostrará las notas guardadas en caso de que exista una lista de notas.
- La app muestra un mensaje de lista vacía en caso que la lista existente de notas esté vacía.

### 📝 Gestión de notas

- El usuario puede visualizar el preview (sticky note) de todas las notas.
- El usuario puede visualizar el contenido completo de las notas al hacer clic en ellas.
- El usuario puede crear nuevas notas brindándoles un título y contenido. También puede escoger el color para la nota.
- El usuario puede revisar la fecha de creación y fecha de modificación de las notas.
- El usuario puede editar el título, contenido y color de las notas.
- El usuario puede eliminar las notas.

### 🔎 Orden, Filtro y Búsqueda **(Próximamente...)**

- El usuario puede escoger el orden de la lista de notas (alfabético, por fecha de creación/modificación más reciente/antigua, personalizado).
- El usuario puede reorganizar las notas mediante drag and drop (Arrastrar y Soltar).
- El usuario puede filtrar las notas por fecha de creación/modificación y por color.
- El usuario puede buscar notas por título.

### 📦 Almacenamiento

- La app usará el LocalStorage para almacenar y recuperar la lista de notas en formato JSON.
- La app modificará el LocalStorage cada vez que se realice una modificación en la lista de notas.

## Instalación

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto.
3. Instalar las dependencias.
4. Ya está! 🎉 Ahora puedes ejecutar el proyecto en modo desarrollo usando el siguiente comando:

```bash
yarn dev
```
