// src/components/RightSidebar.jsx
import React from 'react';
import { FiClipboard, FiUsers, FiClock, FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Sidebars.css';

// ... (las funciones de cálculo de arriba no cambian, las dejamos igual)
const getProjectProgress = (project) => {
    const allTasks = project.columns.flatMap(col => col.tasks);
    if (allTasks.length === 0) return 0;
    const completedTasks = project.columns.find(c => c.title.toLowerCase() === 'completado')?.tasks.length || 0;
    return Math.round((completedTasks / allTasks.length) * 100);
};

const getProjectTeam = (project, allUsers) => {
    const allAssignees = project.columns.flatMap(col => col.tasks.flatMap(task => task.assignees));
    const uniqueAssigneeIds = [...new Set(allAssignees)];
    return uniqueAssigneeIds.map(id => allUsers.find(user => user.id === id)).filter(Boolean);
};

const getUpcomingTasks = (project) => {
    const allTasks = project.columns.flatMap(col => col.tasks);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return allTasks
        .filter(task => !task.dueDate || task.progress === 100 ? false : new Date(task.dueDate + 'T00:00:00Z') < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000))
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map(task => {
            const dueDate = new Date(task.dueDate + 'T00:00:00Z');
            return { ...task, isOverdue: dueDate < today };
        });
};


export const RightSidebar = ({ project, users = [], isOpen, onClose, onNavigateProject, totalProjects }) => {
  if (!project) return null;

  const progress = getProjectProgress(project);
  const team = getProjectTeam(project, users);
  const upcomingTasks = getUpcomingTasks(project);
  const totalTasks = project.columns.flatMap(c => c.tasks).length;

  return (
    <aside className={`sidebar right-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header right-sidebar-header">
        <button className="back-to-projects-btn" onClick={onClose} title="Volver a Proyectos">
          <FiArrowLeft />
        </button>
        
        <h4 className="project-title-header" title={project.name}>{project.name}</h4>

        {totalProjects > 1 ? (
          <div className="project-nav-buttons">
            <button onClick={() => onNavigateProject('prev')} title="Proyecto Anterior"><FiChevronLeft /></button>
            <button onClick={() => onNavigateProject('next')} title="Siguiente Proyecto"><FiChevronRight /></button>
          </div>
        ) : (
          <div className="project-nav-buttons-placeholder"></div> // Para mantener el layout estable
        )}
      </div>

      <div className="sidebar-content">
        {/* El resto del contenido no cambia, sigue siendo el mismo */}
        <section className="sidebar-section">
          <h5 className="section-title"><FiClipboard /> Estadísticas Rápidas</h5>
          <div className="quick-stats">
            <div className="stat-item"><span>Progreso General</span><strong>{progress}%</strong></div>
            <div className="stat-item"><span>Tareas Totales</span><strong>{totalTasks}</strong></div>
          </div>
        </section>
        <section className="sidebar-section">
          <h5 className="section-title"><FiUsers /> Equipo del Proyecto</h5>
          <div className="team-list">
            {team.map(user => (
              <div key={user.id} className="team-member" title={user.name}>
                <div className="avatar-sm">{user.initials}</div>
                <span>{user.name}</span>
              </div>
            ))}
            {team.length === 0 && <p className="no-items-message">Sin equipo asignado.</p>}
          </div>
        </section>
        <section className="sidebar-section">
          <h5 className="section-title"><FiClock /> Próximos Vencimientos</h5>
          <div className="due-tasks-list">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <div key={task.id} className="due-task-card">
                  <span className="task-title">{task.title}</span>
                  <span className={`task-due-date ${task.isOverdue ? 'overdue' : ''}`}>{task.dueDate}</span>
                </div>
              ))
            ) : (
              <p className="no-items-message">¡Ningún vencimiento cercano!</p>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};