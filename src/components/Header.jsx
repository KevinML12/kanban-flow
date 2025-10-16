import React, { useState, useMemo } from 'react';
import { FiSearch, FiBell, FiSidebar } from 'react-icons/fi';
import './Header.css';

const Notifications = ({ allProjects }) => {
    const urgentTasks = useMemo(() => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const upcoming = [];
        allProjects.forEach(proj => {
            (proj.columns || []).forEach(col => {
                (col.tasks || []).forEach(task => {
                    if (task.dueDate) {
                        const dueDate = new Date(task.dueDate + 'T00:00:00Z');
                        const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                        if(diffDays <= 2) upcoming.push({ ...task, projectName: proj.name });
                    }
                });
            });
        });
        return upcoming.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    }, [allProjects]);

    return (
        <div className="notifications-dropdown">
            <h4>Notificaciones Urgentes</h4>
            {urgentTasks.length > 0 ? (
                urgentTasks.map(task => <div key={task.id} className="notification-item"><strong>{task.title}</strong> en {task.projectName} vence pronto ({task.dueDate}).</div>)
            ) : <p>No hay notificaciones urgentes.</p>}
        </div>
    );
};

export const Header = ({ user, onSearch, isActivityPanelOpen, setIsRightSidebarOpen, hasActiveProject, allProjects }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const urgentTaskCount = useMemo(() => {
      let count = 0;
      const today = new Date(); today.setHours(0,0,0,0);
      allProjects.forEach(p => (p.columns || []).forEach(c => (c.tasks || []).forEach(t => {
          if (t.dueDate) {
              const dueDate = new Date(t.dueDate + 'T00:00:00Z');
              if (Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)) <= 2) count++;
          }
      })));
      return count;
  }, [allProjects]);

  return (
    <header className="app-main-header">
      <div className="search-bar"><FiSearch /><input type="text" placeholder="Buscar..." onChange={(e) => onSearch(e.target.value)} /></div>
      <div className="header-actions">
        <div className="notification-bell" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
            <button className="action-btn"><FiBell /></button>
            {urgentTaskCount > 0 && <span className="notification-badge">{urgentTaskCount}</span>}
            {showNotifications && <Notifications allProjects={allProjects} />}
        </div>
        {hasActiveProject && <button className={`action-btn ${isActivityPanelOpen ? 'active' : ''}`} onClick={() => setIsRightSidebarOpen(prev => !prev)}><FiSidebar /></button>}
        <div className="user-profile"><div className="avatar">{user.initials}</div><span>{user.name}</span></div>
      </div>
    </header>
  );
};