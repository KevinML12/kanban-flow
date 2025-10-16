// src/components/LeftSidebar.jsx
import React from 'react';
import { FiGrid, FiList, FiHome, FiBarChart2, FiSettings } from 'react-icons/fi';
import './Sidebars.css';
import texts from '../i18n/es.json';

const getProjectInitials = (name) => {
  if (!name) return 'P';
  const words = name.split(' ');
  if (words.length > 1) {
    return words[0].charAt(0) + words[1].charAt(0);
  }
  return name.substring(0, 2);
};

export const LeftSidebar = ({ activeView, setActiveView, activeProjectId, activeProject }) => {
  // La única verdad para deshabilitar los menús es si hay un proyecto activo o no.
  // ¡Más claro ni el agua!
  const isProjectViewDisabled = !activeProjectId;

  const handleNavigation = (view) => {
    // Si los links están deshabilitados, este clic no debe hacer ni madres.
    if (isProjectViewDisabled && ['kanban', 'list', 'statistics'].includes(view)) {
      return;
    }
    setActiveView(view);
  };

  return (
    <aside className="sidebar left-sidebar">
      <div className="sidebar-header">
        {activeProject ? (
          <>
            <div className="logo">{getProjectInitials(activeProject.name)}</div>
            <span>{activeProject.name}</span>
          </>
        ) : (
          <>
            <div className="logo">KM</div>
            <span>GESTOR DE TAREAS</span>
          </>
        )}
      </div>

      <nav className="sidebar-nav">
        <a href="#" onClick={() => handleNavigation('projects')} className={activeView === 'projects' ? 'active' : ''}>
          <FiHome />
          <span>{texts.projects}</span>
        </a>
        <a href="#" onClick={() => handleNavigation('kanban')} className={`${activeView === 'kanban' ? 'active' : ''} ${isProjectViewDisabled ? 'disabled' : ''}`}>
          <FiGrid />
          <span>{texts.kanban}</span>
        </a>
        <a href="#" onClick={() => handleNavigation('list')} className={`${activeView === 'list' ? 'active' : ''} ${isProjectViewDisabled ? 'disabled' : ''}`}>
          <FiList />
          <span>{texts.listView}</span>
        </a>
        <a href="#" onClick={() => handleNavigation('statistics')} className={`${activeView === 'statistics' ? 'active' : ''} ${isProjectViewDisabled ? 'disabled' : ''}`}>
          <FiBarChart2 />
          <span>{texts.statistics}</span>
        </a>
        <a href="#" onClick={() => handleNavigation('settings')} className={activeView === 'settings' ? 'active' : ''}>
          <FiSettings />
          <span>{texts.settings}</span>
        </a>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 Quantum Leap</p>
      </div>
    </aside>
  );
};