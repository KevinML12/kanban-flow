import React from 'react';
import { FiSearch, FiBell, FiSidebar } from 'react-icons/fi';
import './Header.css';

export const Header = ({ user, onSearch, isRightSidebarOpen, setIsRightSidebarOpen, hasActiveProject }) => {
  return (
    <header className="app-main-header">
      <div className="search-bar">
        <FiSearch />
        <input type="text" placeholder="Buscar tareas, proyectos..." onChange={(e) => onSearch(e.target.value)} />
      </div>
      <div className="header-actions">
        <button className="action-btn"><FiBell /></button>
        
        {/* --- NUEVO BOTÓN PARA MOSTRAR/OCULTAR LA BARRA --- */}
        {hasActiveProject && (
            <button className={`action-btn ${isRightSidebarOpen ? 'active' : ''}`} onClick={() => setIsRightSidebarOpen(prev => !prev)}>
                <FiSidebar />
            </button>
        )}
        
        <div className="user-profile">
            <div className="avatar">{user.initials}</div>
            <span>{user.name}</span>
        </div>
      </div>
    </header>
  );
};