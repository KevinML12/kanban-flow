import React, { useState, useEffect } from 'react';
import './App.css';
import { useKanban } from './hooks/useKanban.js';

// Vistas y Componentes
import { LeftSidebar } from './components/LeftSidebar.jsx';
import { RightSidebar } from './components/RightSidebar.jsx';
import { Header } from './components/Header.jsx';
import { KanbanBoard } from './components/KanbanBoard.jsx';
import { ListView } from './components/ListView.jsx';
import { ProjectsView } from './components/ProjectsView.jsx';
import { StatisticsView } from './components/StatisticsView.jsx';
import { SettingsView } from './components/SettingsView.jsx';

function App() {
  const { 
    projects, 
    activeProjectId, 
    setActiveProjectId,
    users,
    tags,
    addProject,
    addTask,
    toggleSubtask,
    updateTask,
    moveTask
  } = useKanban();
  
  const [view, setView] = useState('projects');
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme + '-mode');
  }, [theme]);

  const activeProject = projects.find(p => p.id === activeProjectId);
  const currentUser = users[0];

  const handleSelectProject = (projectId) => {
    setActiveProjectId(projectId);
    setView('kanban'); 
    setIsRightSidebarOpen(true);
  };
  
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    const projectRequiredMessage = (
        <div>
            <h2>Por favor, selecciona un proyecto para continuar.</h2>
            <button onClick={() => setView('projects')}>Ir a Proyectos</button>
        </div>
    );

    switch(view) {
        case 'projects':
            return <ProjectsView projects={filteredProjects} users={users} onSelectProject={handleSelectProject} onAddProject={addProject} />;
        case 'kanban':
            return activeProject ? <KanbanBoard project={activeProject} users={users} tags={tags} addTask={addTask} toggleSubtask={toggleSubtask} moveTask={moveTask} updateTask={updateTask} /> : projectRequiredMessage;
        case 'list':
            // Esta línea está correcta, pasa 'tags' a ListView
            return activeProject ? <ListView project={activeProject} users={users} tags={tags} toggleSubtask={toggleSubtask} /> : projectRequiredMessage;
        case 'statistics':
            return <StatisticsView project={activeProject} allProjects={projects} />;
        case 'settings':
            return <SettingsView user={currentUser} theme={theme} setTheme={setTheme} />;
        default:
            return <ProjectsView projects={filteredProjects} users={users} onSelectProject={handleSelectProject} onAddProject={addProject} />;
    }
  }

  const layoutClassName = activeProject && isRightSidebarOpen ? "app-layout" : "app-layout-full";

  return (
    <div className={layoutClassName}>
      <LeftSidebar activeView={view} setActiveView={setView} activeProjectId={activeProjectId} activeProject={activeProject} />
      <Header 
        user={currentUser} 
        onSearch={setSearchQuery}
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
        hasActiveProject={!!activeProject}
      />
      <main className="app-main-content">
        {renderContent()}
      </main>

      <RightSidebar 
        project={activeProject}
        users={users}
        isOpen={isRightSidebarOpen}
        onClose={() => { setIsRightSidebarOpen(false); setActiveProjectId(null); }}
      />
    </div>
  );
}

export default App;