import React from 'react';
import { FiClipboard, FiUsers, FiClock, FiX } from 'react-icons/fi';
import './Sidebars.css';

// Función para calcular el progreso promedio de un proyecto
const getProjectProgress = (project) => {
    const allTasks = project.columns.flatMap(col => col.tasks);
    if (allTasks.length === 0) return 0;
    const totalProgress = allTasks.reduce((sum, task) => sum + (task.progress || 0), 0);
    return Math.round(totalProgress / allTasks.length);
};

// Función para obtener los miembros únicos del equipo
const getProjectTeam = (project, allUsers) => {
    const allAssignees = project.columns.flatMap(col => col.tasks.flatMap(task => task.assignees));
    const uniqueAssigneeIds = [...new Set(allAssignees)];
    return uniqueAssigneeIds.map(id => allUsers.find(user => user.id === id)).filter(Boolean);
};

// Función para encontrar tareas que vencen pronto o están atrasadas
const getUpcomingTasks = (project) => {
    const allTasks = project.columns.flatMap(col => col.tasks);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allTasks
        .filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate + 'T00:00:00Z');
            const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            return diffDays <= 7; // Tareas que vencen en 7 días o menos (incluyendo atrasadas)
        })
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Ordenar por fecha
};

export const RightSidebar = ({ project, users = [], isOpen, onClose }) => {
  const progress = project ? getProjectProgress(project) : 0;
  const team = project ? getProjectTeam(project, users) : [];
  const upcomingTasks = project ? getUpcomingTasks(project) : [];

  return (
    <aside className={`sidebar right-sidebar ${isOpen && project ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h4>Resumen del Proyecto</h4>
        {project && <button className="icon-btn" onClick={onClose}><FiX /></button>}
      </div>

      <section className="sidebar-section">
        <h4><FiClipboard /> Estadísticas Rápidas</h4>
        {project && (
          <div className="quick-stats">
            <div className="stat-item">
              <span>Progreso General</span>
              <strong>{progress}%</strong>
            </div>
            <div className="stat-item">
              <span>Tareas Totales</span>
              <strong>{project.columns.flatMap(c => c.tasks).length}</strong>
            </div>
          </div>
        )}
      </section>

      <section className="sidebar-section">
        <h4><FiUsers /> Equipo del Proyecto</h4>
        {project && (
          <div className="team-list">
            {team.map(user => (
              <div key={user.id} className="team-member" title={user.name}>
                <div className="avatar-sm">{user.initials}</div>
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="sidebar-section">
        <h4><FiClock /> Próximos Vencimientos</h4>
        {project && (
          <ul className="due-tasks-list">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <li key={task.id} className="due-task-item">
                  <span className="task-title">{task.title}</span>
                  <span className="task-due-date">{task.dueDate}</span>
                </li>
              ))
            ) : (
              <p className="no-tasks-message">¡Ningún vencimiento cercano!</p>
            )}
          </ul>
        )}
      </section>
    </aside>
  );
};