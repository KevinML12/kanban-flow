import { v4 as uuidv4 } from 'uuid';

export const ALL_USERS = [
    { id: 'user-1', name: 'Kevin M.', initials: 'KM' },
    { id: 'user-2', name: 'Charlizze S. (Compañera)', initials: 'LG' },
    { id: 'user-3', name: 'Anthony H. (Compañero)', initials: 'AH' },
    { id: 'user-4', name: 'Lic. Benavente', initials: 'LB' },
];

export const ALL_TAGS = [
    { id: 'tag-1', text: 'Examen Final', color: '#b60205' },
    { id: 'tag-2', text: 'Proyecto Final', color: '#8A4FFF' },
    { id: 'tag-3', text: 'Laboratorio', color: '#4A90E2' },
    { id: 'tag-4', text: 'Investigación', color: '#238636' },
    { id: 'tag-5', text: 'Exposición', color: '#FFC700' },
    { id: 'tag-6', text: 'URGENTE', color: '#d73a4a' },
];

// FECHA DE HOY (SIMULADA): 16 de Octubre, 2025
export const initialData = [
    // --- INGENIERÍA EN SISTEMAS ---
    {
        id: 'proj-1',
        name: 'Desarrollo Web',
        columns: [
            { id: 'col-1-1', title: 'Backlog Infernal', tasks: [
                { id: uuidv4(), title: 'Investigar WebSockets', assignees: ['user-1'], tags: ['tag-4', 'tag-2'], priority: 'Medium', dueDate: '2025-11-05' },
                { id: uuidv4(), title: 'Configurar Docker para despliegue', assignees: [], tags: ['tag-2'], priority: 'Low', dueDate: '2025-11-25' },
                { id: uuidv4(), title: 'Aprender a usar Redis para caché', assignees: ['user-1'], tags: ['tag-4'], priority: 'Low', dueDate: '2025-12-01' },
                { id: uuidv4(), title: 'Crear pruebas unitarias para el backend', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-20' },
                { id: uuidv4(), title: 'Implementar paginación en la API', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-18' },
                { id: uuidv4(), title: 'Refactorizar el manejo de estado con Zustand', assignees: [], tags: ['tag-1'], priority: 'Low', dueDate: '2025-11-22' },
                { id: uuidv4(), title: 'Añadir un sistema de roles y permisos', assignees: ['user-1'], tags: ['tag-2'], priority: 'High', dueDate: '2025-11-28' },
                { id: uuidv4(), title: 'Investigar Server-Side Rendering (SSR) con Next.js', assignees: [], tags: ['tag-4'], priority: 'Medium', dueDate: '2025-11-15' },
                { id: uuidv4(), title: 'Implementar un sistema de notificaciones por email', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-26' },
                { id: uuidv4(), title: 'Crear pruebas de integración con Cypress', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-29' },
                { id: uuidv4(), title: 'Migrar de CSS a TailwindCSS', assignees: [], tags: ['tag-1'], priority: 'Low', dueDate: '2025-11-10' },
                { id: uuidv4(), title: 'Implementar un modo oscuro', assignees: ['user-1'], tags: ['tag-1'], priority: 'Low', dueDate: '2025-11-08' },
            ]},
            { id: 'col-1-2', title: 'Infierno Actual', tasks: [
                { id: uuidv4(), title: 'Terminar el CRUD de la API para el proyecto final', assignees: ['user-1'], tags: ['tag-2', 'tag-6'], priority: 'High', dueDate: '2025-10-20', subtasks: [ { id: uuidv4(), text: 'Endpoint DELETE', completed: false }, { id: uuidv4(), text: 'Añadir Guards de autenticación', completed: false } ], },
                { id: uuidv4(), title: 'Optimizar imágenes y performance (Lighthouse)', assignees: ['user-1'], tags: ['tag-1', 'tag-6'], priority: 'High', dueDate: '2025-10-18' },
                { id: uuidv4(), title: 'Resolver bug de login en Safari', assignees: ['user-1'], tags: ['tag-6'], priority: 'High', dueDate: '2025-10-17' },
                { id: uuidv4(), title: 'Preparar exposición del Avance 2', assignees: ['user-1'], tags: ['tag-5', 'tag-2'], priority: 'High', dueDate: '2025-10-22' },
            ]},
            { id: 'col-1-3', title: 'Cementerio (Completado)', tasks: [
                { id: uuidv4(), title: 'Laboratorio #3: Componentes con React', assignees: ['user-1'], tags: ['tag-3'], priority: 'High', dueDate: '2025-10-10' },
                { id: uuidv4(), title: 'Crear la vista de Proyectos', assignees: ['user-1'], tags: ['tag-1'], priority: 'Medium', dueDate: '2025-08-01' },
                { id: uuidv4(), title: 'Configurar el entorno de desarrollo', assignees: ['user-1'], tags: [], priority: 'High', dueDate: '2025-07-20' },
                { id: uuidv4(), title: 'Laboratorio #2: API de Rick and Morty', assignees: ['user-1'], tags: ['tag-3'], priority: 'Medium', dueDate: '2025-09-25' },
                { id: uuidv4(), title: 'Laboratorio #1: Portafolio Básico', assignees: ['user-1'], tags: ['tag-3'], priority: 'Medium', dueDate: '2025-09-10' },
            ]}
        ]
    },
    // ... Y así sucesivamente para los otros 9 cursos ...
    {
        id: 'proj-2',
        name: 'Redes de Computadoras I',
        columns: [
            { id: 'col-2-1', title: 'Abismo de Tareas', tasks: [
                { id: uuidv4(), title: 'Laboratorio #4: Subnetting', assignees: ['user-1', 'user-3'], tags: ['tag-3', 'tag-6'], priority: 'High', dueDate: '2025-10-19' },
                { id: uuidv4(), title: 'Estudiar para el Segundo Parcial', assignees: ['user-1'], tags: ['tag-1', 'tag-6'], priority: 'High', dueDate: '2025-10-28' },
                { id: uuidv4(), title: 'Proyecto Final: Simulador de Red en Packet Tracer', assignees: ['user-1', 'user-3'], tags: ['tag-2'], priority: 'High', dueDate: '2025-11-30' },
                { id: uuidv4(), title: 'Leer paper sobre IPv6', assignees: ['user-1'], tags: ['tag-4'], priority: 'Low', dueDate: '2025-11-10' },
                { id: uuidv4(), title: 'Configurar un servidor DHCP en Linux', assignees: ['user-1'], tags: ['tag-3'], priority: 'Medium', dueDate: '2025-11-05' },
                { id: uuidv4(), title: 'Investigar sobre protocolos de enrutamiento', assignees: ['user-1'], tags: ['tag-4'], priority: 'Medium', dueDate: '2025-11-12' },
                { id: uuidv4(), title: 'Hacer hoja de trabajo sobre Modelo TCP/IP', assignees: ['user-1'], tags: [], priority: 'Medium', dueDate: '2025-10-31' },
                { id: uuidv4(), title: 'Preparar exposición sobre DNS', assignees: ['user-1'], tags: ['tag-5'], priority: 'High', dueDate: '2025-11-07' },
                { id: uuidv4(), title: 'Laboratorio #5: Firewall con iptables', assignees: ['user-1', 'user-3'], tags: ['tag-3'], priority: 'High', dueDate: '2025-11-14' },
                { id: uuidv4(), title: 'Configurar una VPN con OpenVPN', assignees: ['user-1'], tags: ['tag-3'], priority: 'High', dueDate: '2025-11-21' },
            ]},
            { id: 'col-2-2', title: 'Cementerio', tasks: [
                { id: uuidv4(), title: 'Investigación sobre el Modelo OSI', assignees: ['user-1'], tags: ['tag-4'], priority: 'Medium', dueDate: '2025-10-01' },
                { id: uuidv4(), title: 'Práctica de Wireshark', assignees: ['user-1'], tags: ['tag-3'], priority: 'Medium', dueDate: '2025-09-20' },
                { id: uuidv4(), title: 'Examen Corto #1', assignees: ['user-1'], tags: [], priority: 'High', dueDate: '2025-09-01' },
                { id: uuidv4(), title: 'Laboratorio #1: Cableado Estructurado', assignees: ['user-1'], tags: ['tag-3'], priority: 'Medium', dueDate: '2025-08-20' },
                { id: uuidv4(), title: 'Resumen del capítulo 1 del libro', assignees: ['user-1'], tags: [], priority: 'Low', dueDate: '2025-08-15' },
                { id: uuidv4(), title: 'Tarea de investigación: Topologías de Red', assignees: ['user-1'], tags: ['tag-4'], priority: 'Medium', dueDate: '2025-08-25' },
            ]}
        ]
    },
    {
        id: 'proj-3',
        name: 'Análisis de Sistemas II',
        columns: [
            { id: 'col-3-1', title: 'Purgatorio (En Proceso)', tasks: [
                { id: uuidv4(), title: 'Realizar diagramas de Casos de Uso', assignees: ['user-1', 'user-2'], tags: ['tag-2', 'tag-6'], priority: 'High', dueDate: '2025-10-17' },
                { id: uuidv4(), title: 'Crear Diagrama de Clases', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-03' },
            ]},
            { id: 'col-3-2', title: 'El Muro de los Lamentos (Pendiente)', tasks: [
                { id: uuidv4(), title: 'Diseñar Diagrama Entidad-Relación de la BD', assignees: ['user-1', 'user-2'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-10' },
                { id: uuidv4(), title: 'Crear Diagrama de Secuencia para Login', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-12' },
                { id: uuidv4(), title: 'Elaborar Diagrama de Actividades para Compra', assignees: ['user-1'], tags: ['tag-2'], priority: 'Medium', dueDate: '2025-11-14' },
                { id: uuidv4(), title: 'Documentar requerimientos no funcionales', assignees: ['user-1', 'user-2'], tags: ['tag-2'], priority: 'Low', dueDate: '2025-11-18' },
                { id: uuidv4(), title: 'Crear Diagrama de Despliegue', assignees: ['user-1'], tags: ['tag-2'], priority: 'Low', dueDate: '2025-11-20' },
                { id: uuidv4(), title: 'Realizar Diagrama de Componentes', assignees: ['user-1'], tags: ['tag-2'], priority: 'Low', dueDate: '2025-11-22' },
                { id: uuidv4(), title: 'Definir la arquitectura del sistema', assignees: ['user-1', 'user-2'], tags: ['tag-2'], priority: 'High', dueDate: '2025-11-01' },
                { id: uuidv4(), title: 'Preparar presentación de avance del proyecto', assignees: ['user-1'], tags: ['tag-5'], priority: 'High', dueDate: '2025-11-05' },
                { id: uuidv4(), title: 'Hacer prototipos de baja fidelidad (wireframes)', assignees: ['user-1'], tags: ['tag-5'], priority: 'Medium', dueDate: '2025-10-25' },
            ]}
        ]
    },
    // ... Y así sucesivamente hasta que la muerte los separe ...
    { id: 'proj-4', name: 'Arquitectura de Computadoras II', columns: [ { id: 'col-4-1', title: 'Desesperación', tasks: Array.from({length: 30}, (_, i) => ({ id: uuidv4(), title: `Tarea infernal de Arqui #${i+1}`, assignees:['user-1'], tags:['tag-6'], priority: 'High', dueDate: '2025-10-17'})) } ] },
    { id: 'proj-5', name: 'Ética Profesional', columns: [ { id: 'col-5-1', title: 'Dilemas Morales', tasks: Array.from({length: 25}, (_, i) => ({ id: uuidv4(), title: `Ensayo sobre la existencia #${i+1}`, assignees:['user-1'], tags:['tag-4'], priority: 'Low', dueDate: '2025-12-24'})) } ] },
    { id: 'proj-6', name: 'Derecho Laboral II', columns: [ { id: 'col-6-1', title: 'Artículos por memorizar', tasks: Array.from({length: 50}, (_, i) => ({ id: uuidv4(), title: `Artículo #${i+1} del Código de Trabajo`, assignees:['user-1'], tags:['tag-1', 'tag-6'], priority: 'High', dueDate: '2025-10-28'})) } ] },
    { id: 'proj-7', name: 'Derecho Administrativo I', columns: [ { id: 'col-7-1', title: 'Recursos y Amparos', tasks: Array.from({length: 40}, (_, i) => ({ id: uuidv4(), title: `Caso hipotético de Contencioso #${i+1}`, assignees:['user-1'], tags:['tag-6'], priority: 'High', dueDate: '2025-10-23'})) } ] },
    { id: 'proj-8', name: 'Derecho Procesal Penal I', columns: [ { id: 'col-8-1', title: 'Juicios Orales', tasks: Array.from({length: 45}, (_, i) => ({ id: uuidv4(), title: `Simulacro de audiencia #${i+1}`, assignees:['user-1'], tags:['tag-1', 'tag-6'], priority: 'High', dueDate: '2025-10-22'})) } ] },
    { id: 'proj-9', name: 'Derecho Civil IV (Contratos)', columns: [ { id: 'col-9-1', title: 'Contratos y más Contratos', tasks: Array.from({length: 35}, (_, i) => ({ id: uuidv4(), title: `Redactar contrato #${i+1}`, assignees:['user-1'], tags:['tag-2'], priority: 'Medium', dueDate: '2025-11-12'})) } ] },
    { id: 'proj-10', name: 'Derecho Agrario', columns: [ { id: 'col-10-1', title: 'Tierras y Conflictos', tasks: Array.from({length: 28}, (_, i) => ({ id: uuidv4(), title: `Análisis de Ley Agraria #${i+1}`, assignees:['user-1'], tags:['tag-4'], priority: 'Low', dueDate: '2025-11-18'})) } ] },
];