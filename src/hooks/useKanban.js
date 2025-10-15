import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';

// --- DATOS SIMULADOS ---
const ALL_USERS = [
    { id: 'user-1', name: 'María González', initials: 'MG' },
    { id: 'user-2', name: 'Carlos Pérez', initials: 'CP' },
    { id: 'user-3', name: 'Luis Rodríguez', initials: 'LR' },
    { id: 'user-4', name: 'Sofía Martínez', initials: 'SM' },
];

const ALL_TAGS = [
    { id: 'tag-1', text: 'Bug', color: '#da3633' },
    { id: 'tag-2', text: 'Feature', color: '#238636' },
    { id: 'tag-3', text: 'UI/UX', color: '#8A4FFF' },
    { id: 'tag-4', text: 'Backend', color: '#FFC700' },
    { id: 'tag-5', text: 'High', color: '#da3633' },
    { id: 'tag-6', text: 'Medium', color: '#d29922' },
    { id: 'tag-7', text: 'Low', color: '#238636' },
];

const initialData = [
        {
            id: 'proj-1',
            name: 'E-commerce "TiendaGuate"',
            columns: [
                {
                    id: 'col-1',
                    title: 'Product Backlog',
                    tasks: [
                        {
                            id: 'task-1', title: 'Implementar pasarela de pagos con Stripe', description: 'Integrar el SDK de Stripe y manejar los webhooks para confirmaciones.',
                            assignees: ['user-2', 'user-3'], tags: ['tag-2', 'tag-5'], priority: 'High', dueDate: '2025-11-20', progress: 18,
                            subtasks: [
                                { id: uuidv4(), text: 'Crear cuenta de desarrollador en Stripe', completed: true },
                                { id: uuidv4(), text: 'Implementar SDK en el backend', completed: false },
                                { id: uuidv4(), text: 'Crear componente de checkout en React', completed: false },
                            ]
                        },
                        {
                            id: 'task-2', title: 'Sistema de reviews y calificaciones de productos', description: 'Permitir a los usuarios dejar comentarios y una calificación de 1-5 estrellas.',
                            assignees: ['user-1'], tags: ['tag-2', 'tag-6'], priority: 'Medium', dueDate: '2025-11-25', progress: 5,
                            subtasks: []
                        },
                    ]
                },
                {
                    id: 'col-2',
                    title: 'En Desarrollo',
                    tasks: [
                        {
                            id: 'task-3', title: 'Maquetar la página de detalles del producto', description: 'Asegurar que el diseño sea responsivo y muestre toda la información relevante.',
                            assignees: ['user-1'], tags: ['tag-3', 'tag-5'], priority: 'High', dueDate: '2025-10-30', progress: 82,
                            subtasks: [
                                { id: uuidv4(), text: 'Componente de galería de imágenes', completed: true },
                                { id: uuidv4(), text: 'Componente de selección de tallas/colores', completed: true },
                                { id: uuidv4(), text: 'Sección de descripción y especificaciones', completed: false },
                            ]
                        },
                        {
                            id: 'task-4', title: 'Crear endpoint GET /api/products/:id', description: 'El endpoint debe devolver el producto junto con sus reviews asociadas.',
                            assignees: ['user-2'], tags: ['tag-4', 'tag-6'], priority: 'Medium', dueDate: '2025-10-28', progress: 95,
                            subtasks: []
                        },
                    ]
                },
                {
                    id: 'col-3',
                    title: 'Pruebas (Q&A)',
                    tasks: [
                        {
                            id: 'task-5', title: 'Bug: El carrito de compras no actualiza el total', description: 'El total no se recalcula al cambiar la cantidad de un producto. Ocurre en Firefox.',
                            assignees: ['user-4'], tags: ['tag-1', 'tag-5'], priority: 'High', dueDate: '2025-10-24', progress: 50,
                            subtasks: []
                        },
                    ]
                },
                {
                    id: 'col-4',
                    title: 'Completado',
                    tasks: [
                        {
                            id: 'task-6', title: 'Diseñar esquema de la base de datos (PostgreSQL)', description: 'Definir tablas para usuarios, productos, órdenes y reviews.',
                            assignees: ['user-2'], tags: ['tag-4', 'tag-7'], priority: 'Low', dueDate: '2025-10-05', progress: 100,
                            subtasks: []
                        },
                    ]
                }
            ]
        },
  {
    id: 'proj-2',
    name: 'Portafolio Web Personal',
    columns: [
        {
            id: 'col-5',
            title: 'Diseño y Planificación',
            tasks: [
                { id: 'task-7', title: 'Crear prototipo de alta fidelidad en Figma', description: 'Incluir versiones para móvil, tablet y escritorio.', assignees: ['user-3'], tags: ['tag-3', 'tag-5'], priority: 'High', dueDate: '2025-11-05', progress: 98, subtasks: [] },
            ]
        },
                {
                    id: 'col-6',
                    title: 'En Desarrollo',
                    tasks: [
                        { id: 'task-8', title: 'Desarrollar componente de Proyectos con filtro', description: 'Filtrar por tecnología (React, NestJS, etc).', assignees: ['user-3'], tags: ['tag-2', 'tag-6'], priority: 'Medium', dueDate: '2025-11-15', progress: 45, subtasks: [] },
                        { id: 'task-9', title: 'Añadir animaciones de scroll con Framer Motion', description: 'Animar la aparición de elementos al hacer scroll.', assignees: [], tags: ['tag-3', 'tag-7'], priority: 'Low', dueDate: '2025-12-02', progress: 12, subtasks: [] },
                    ]
                },
        {
            id: 'col-7',
            title: 'Listo para Desplegar',
            tasks: [
                 { id: 'task-10', title: 'Optimizar imágenes y Lighthouse score', description: 'Asegurar un puntaje mayor a 95 en Performance.', assignees: ['user-3'], tags: ['tag-2'], priority: 'High', dueDate: '2025-11-22', progress: 88, subtasks: [] },
            ]
        }
    ]
  },
   {
    id: 'proj-3',
    name: 'API REST con NestJS ("CuentasClaras")',
    columns: [
        {
            id: 'col-8',
            title: 'Backlog de API',
            tasks: [
                 { id: 'task-11', title: 'Definir DTOs para transacciones', description: 'Usar class-validator para asegurar la integridad de los datos de entrada.', assignees: ['user-4'], tags: ['tag-4'], priority: 'Medium', dueDate: '2025-11-10', progress: 0, subtasks: [] },
                 { id: 'task-16', title: 'Investigar integración con servicio de email', description: 'Evaluar SendGrid vs. Mailgun para notificaciones.', assignees: [], tags: ['tag-2', 'tag-7'], priority: 'Low', dueDate: '2025-12-15', progress: 0, subtasks: [] },
            ]
        },
        {
            id: 'col-9',
            title: 'En Desarrollo',
            tasks: [
                 { id: 'task-12', title: 'Implementar autenticación con JWT y Guards', description: 'Proteger endpoints que requieran un usuario logueado.', assignees: ['user-4', 'user-2'], tags: ['tag-4', 'tag-5'], priority: 'High', dueDate: '2025-11-12', progress: 66, subtasks: [] },
                 { id: 'task-13', title: 'Crear CRUD para la entidad Cuentas', description: 'Endpoints para crear, leer, actualizar y eliminar cuentas de usuario.', assignees: ['user-4'], tags: ['tag-4', 'tag-6'], priority: 'Medium', dueDate: '2025-11-30', progress: 90, subtasks: [] },
            ]
        },
        {
            id: 'col-10',
            title: 'Pruebas (Testing)',
            tasks: [
                 { id: 'task-14', title: 'Escribir pruebas unitarias para el servicio de Auth', description: 'Usar Jest para probar la lógica de generación y validación de tokens.', assignees: ['user-2'], tags: ['tag-4', 'tag-6'], priority: 'Medium', dueDate: '2025-11-20', progress: 25, subtasks: [] },
            ]
        },
        {
            id: 'col-11',
            title: 'Documentación',
            tasks: [
                 { id: 'task-15', title: 'Generar documentación de la API con Swagger', description: 'Asegurar que todos los endpoints y DTOs estén documentados.', assignees: ['user-4'], tags: ['tag-4', 'tag-7'], priority: 'Low', dueDate: '2025-11-28', progress: 100, subtasks: [] },
            ]
        },
    ]
  }
];

export const useKanban = () => {
    const [projects, setProjects] = useState(initialData);
    const [activeProjectId, setActiveProjectId] = useState('proj-1');
    const [users] = useState(ALL_USERS);
    const [tags] = useState(ALL_TAGS);

    const addProject = (projectName) => {
        const newProject = {
            id: uuidv4(),
            name: projectName,
            columns: [
                { id: uuidv4(), title: 'Backlog', tasks: [] },
                { id: uuidv4(), title: 'En Desarrollo', tasks: [] },
                { id: uuidv4(), title: 'Completado', tasks: [] }
            ]
        };
        setProjects(prevProjects => [...prevProjects, newProject]);
    };

    const addTask = (columnId, taskData) => {
        const newTask = {
            id: uuidv4(),
            title: taskData.title,
            description: taskData.description || '',
            assignees: [],
            tags: [],
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            progress: parseInt(taskData.progress, 10),
            subtasks: [],
        };

        const newProjects = projects.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            const newColumns = proj.columns.map(col => {
                if (col.id === columnId) {
                    return { ...col, tasks: [...col.tasks, newTask] };
                }
                return col;
            });
            return { ...proj, columns: newColumns };
        });

        setProjects(newProjects);
    };

    const toggleSubtask = (taskId, subtaskId) => {
        const newProjects = projects.map(proj => {
            if (proj.id !== activeProjectId) return proj;

            const newColumns = proj.columns.map(col => {
                const newTasks = col.tasks.map(task => {
                    if (task.id === taskId) {
                        const newSubtasks = task.subtasks.map(sub => {
                            if (sub.id === subtaskId) {
                                return { ...sub, completed: !sub.completed };
                            }
                            return sub;
                        });
                        return { ...task, subtasks: newSubtasks };
                    }
                    return task;
                });
                return { ...col, tasks: newTasks };
            });
            return { ...proj, columns: newColumns };
        });
        setProjects(newProjects);
    };

    const updateTask = (taskId, updates = {}) => {
        const newProjects = projects.map(proj => {
            if (proj.id !== activeProjectId) return proj;

            const newColumns = proj.columns.map(col => {
                const newTasks = col.tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, ...updates };
                    }
                    return task;
                });
                return { ...col, tasks: newTasks };
            });
            return { ...proj, columns: newColumns };
        });
        setProjects(newProjects);
    };

    const moveTask = (active, over) => {
        setProjects(prevProjects => {
            const activeId = active.id;
            const overId = over.id;
            let activeTask, activeColumnId;
            const activeProjectData = prevProjects.find(p => p.id === activeProjectId);
            
            if (!activeProjectData) return prevProjects;

            activeProjectData.columns.forEach(col => {
                const foundTask = col.tasks.find(task => task.id === activeId);
                if (foundTask) {
                    activeTask = foundTask;
                    activeColumnId = col.id;
                }
            });

            if (!overId || !activeTask) return prevProjects;
            
            let overColumnId;
            activeProjectData.columns.forEach(col => {
                if (col.id === overId || col.tasks.some(task => task.id === overId)) {
                    overColumnId = col.id;
                }
            });

            if (!overColumnId) return prevProjects;

            const newProjects = prevProjects.map(proj => {
                if (proj.id === activeProjectId) {
                    let newColumns = [...proj.columns];
                    const sourceColIndex = newColumns.findIndex(c => c.id === activeColumnId);
                    const destColIndex = newColumns.findIndex(c => c.id === overColumnId);
                    
                    if (sourceColIndex === -1 || destColIndex === -1) return proj;
                    const sourceTasks = [...newColumns[sourceColIndex].tasks];
                    const taskIndex = sourceTasks.findIndex(t => t.id === activeId);
                    if (taskIndex === -1) return proj;

                    const [movedTask] = sourceTasks.splice(taskIndex, 1);

                    if (activeColumnId === overColumnId) {
                        const newIndex = sourceTasks.findIndex(t => t.id === overId);
                        sourceTasks.splice(newIndex >= 0 ? newIndex : sourceTasks.length, 0, movedTask);
                        newColumns[sourceColIndex] = { ...newColumns[sourceColIndex], tasks: sourceTasks };
                    } else {
                        const destTasks = [...newColumns[destColIndex].tasks];
                        const newIndex = destTasks.findIndex(t => t.id === overId);
                        destTasks.splice(newIndex >= 0 ? newIndex : destTasks.length, 0, movedTask);
                        newColumns[sourceColIndex] = { ...newColumns[sourceColIndex], tasks: sourceTasks };
                        newColumns[destColIndex] = { ...newColumns[destColIndex], tasks: destTasks };
                    }
                    return { ...proj, columns: newColumns };
                }
                return proj;
            });
            return newProjects;
        });
    };

    return {
        projects,
        activeProjectId,
        setActiveProjectId,
        users,
        tags,
        addProject,
        addTask,
        toggleSubtask,
        updateTask,
        moveTask,
    };
};

