# Gestor de Tareas Frontend

Esta es una aplicación web de frontend puro, diseñada para gestionar proyectos y tareas utilizando un tablero Kanban interactivo. Este proyecto fue desarrollado como una solución completa para la planificación y seguimiento de flujos de trabajo, similar a herramientas como Trello o Jira.


## Objetivo del Proyecto

El objetivo principal fue construir una interfaz de usuario robusta y completa aplicando conceptos avanzados de React. Esto incluye una arquitectura de componentes bien planificada, manejo de estado complejo y centralizado a través de un **Custom Hook** (`useKanban`), y la implementación de funcionalidades interactivas de arrastrar y soltar (Drag and Drop).

---

## Funcionalidades Principales

- **Gestión de Proyectos:**
  - **Vista de Proyectos:** Pantalla principal donde se listan todos los proyectos.
  - **Creación de Proyectos:** Modal intuitivo para crear nuevos proyectos dinámicamente.

- **Tablero Kanban Interactivo:**
  - **Columnas Dinámicas:** Crea, renombra y **reordena columnas** mediante Drag and Drop para adaptar el flujo de trabajo.
  - **Creación de Tareas:** Formulario completo dentro de un modal para añadir nuevas tareas a cualquier columna, permitiendo asignar usuarios, etiquetas y prioridad.
  - **Tarjetas Arrastrables:** Mueve tareas fluidamente entre columnas para cambiar su estado.

- **Detalles y Gestión de Tareas:**
  - **Panel de Detalles:** Al hacer clic en una tarea, se abre un panel lateral con toda su información.
  - **Edición Completa (CRUD):** Modifica el título, descripción, asignados, etiquetas y prioridad directamente desde el panel de detalles.
  - **CRUD de Subtareas:** Añade, edita, marca como completadas y elimina subtareas dentro de una tarea principal.
  - **Eliminación de Tareas:** Botón para eliminar tareas con un diálogo de confirmación.

- **Funcionalidades Avanzadas:**
  - **Filtros del Tablero:** Filtra las tareas visibles por usuario asignado o por etiqueta.
  - **Notificaciones:** Un ícono en el encabezado te avisa visualmente sobre tareas que están por vencer o ya vencieron.
  - **Comentarios y Actividad:** Cada tarea tiene un historial de actividad y una sección de comentarios para fomentar la colaboración.
  - **Tema Claro/Oscuro:** Cambia la apariencia de la aplicación desde el panel de configuración.
  - **CRUD de Etiquetas:** Administra globalmente las etiquetas (crear, editar, borrar) desde la configuración.

---

## Tecnologías Utilizadas

- **React:** Biblioteca principal para la construcción de la interfaz de usuario.
- **React Hooks:** Para el manejo de estado y ciclo de vida (`useState`, `useEffect`, `useMemo`, `useRef`).
- **Custom Hooks:** Se centralizó toda la lógica de la aplicación en un único hook (`useKanban.js`) para un manejo de estado limpio y eficiente.
- **Dnd Kit:** Librería especializada para implementar la funcionalidad de arrastrar y soltar (Drag and Drop) tanto para tareas (vertical) como para columnas (horizontal).
- **React Icons:** Para la iconografía de la aplicación.
- **CSS Moderno:** Se utilizaron variables CSS, Flexbox y Grid para un diseño limpio, responsivo y personalizable (tema claro/oscuro).

---

## Cómo Ejecutar el Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone https://[URL-DE-TU-REPOSITORIO].git
    ```

2.  **Navegar a la carpeta del proyecto:**
    ```bash
    cd kanban-flow
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

4.  **Iniciar la aplicación en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.
