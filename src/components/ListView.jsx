import React from 'react';
import { TaskRow } from './TaskRow.jsx';
import './ListView.css';

export const ListView = ({ project, users, tags, toggleSubtask }) => {
    if (!project) return <div>Selecciona un proyecto para ver sus tareas.</div>;

    const allTasks = project.columns.flatMap(col => col.tasks.map(task => ({ ...task, status: col.title })));

    return (
        <div className="list-view-container">
            <h2>{project.name}: Lista de Tareas</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Tarea</th>
                        <th>Estado</th>
                        <th>Asignados</th>
                        <th>Prioridad</th>
                        <th>Fecha Límite</th>
                        <th>Progreso</th>
                    </tr>
                </thead>
                <tbody>
                    {allTasks.map(task => (
                        <TaskRow key={task.id} task={task} allUsers={users} allTags={tags} toggleSubtask={toggleSubtask} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};