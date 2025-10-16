import React, { useState, useEffect } from 'react';
import './App.css';
import { useKanban } from './hooks/useKanban.js';
import { LeftSidebar, RightSidebar, Header, KanbanBoard, ListView, ProjectsView, StatisticsView, SettingsView, TaskDetails } from './components';

function App() {
  const {
    projects, activeProject, activeProjectId, setActiveProjectId,
    users, tags, selectedTask, setSelectedTaskId,
    addProject, addTask, updateTask, deleteTask, toggleSubtask, moveTask, addColumn,
    addTag, updateTag, deleteTag, addComment, moveColumn,
    addSubtask, updateSubtask, deleteSubtask
  } = useKanban();

  const [view, setView] = useState('projects');
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
  }, [theme]);

  const currentUser = users[0];
  const isActivityPanelVisible = activeProject && (!!selectedTask || isRightSidebarOpen);
  const layoutClassName = isActivityPanelVisible ? "app-layout-sidebar-open" : "app-layout";

  const handleSelectProject = (projectId) => {
    setActiveProjectId(projectId);
    setSelectedTaskId(null);
    setView('kanban');
    setIsRightSidebarOpen(true);
  };

  const handleNavigate = (newView) => {
    if (newView === 'projects') {
      setActiveProjectId(null);
      setSelectedTaskId(null);
      setIsRightSidebarOpen(false);
    }
    setView(newView);
  };

  const handleProjectNavigation = (direction) => {
    const currentIndex = projects.findIndex(p => p.id === activeProjectId);
    if (currentIndex === -1) return;
    let nextIndex = (direction === 'next')
        ? (currentIndex + 1) % projects.length
        : (currentIndex - 1 + projects.length) % projects.length;
    handleSelectProject(projects[nextIndex].id);
  };

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderContent = () => {
    if (!activeProject && ['kanban', 'list', 'statistics'].includes(view)) {
      return <div className="project-required-message"><h2>Selecciona un proyecto para continuar.</h2></div>;
    }
    switch(view) {
        case 'projects':
            return <ProjectsView projects={filteredProjects} users={users} onSelectProject={handleSelectProject} onAddProject={addProject} />;
        case 'kanban':
            return <KanbanBoard project={activeProject} users={users} tags={tags} addTask={addTask} moveTask={moveTask} moveColumn={moveColumn} onSelectTask={setSelectedTaskId} addColumn={addColumn} />;
        case 'list': return <ListView project={activeProject} users={users} tags={tags} />;
        case 'statistics': return <StatisticsView project={activeProject} allProjects={projects} />;
        case 'settings': return <SettingsView user={currentUser} theme={theme} setTheme={setTheme} tags={tags} onAddTag={addTag} onUpdateTag={updateTag} onDeleteTag={deleteTag} />;
        default: return <ProjectsView projects={filteredProjects} users={users} onSelectProject={handleSelectProject} onAddProject={addProject} />;
    }
  };

  return (
    <div className={layoutClassName}>
      <LeftSidebar activeView={view} setActiveView={handleNavigate} activeProjectId={activeProjectId} activeProject={activeProject} />
      <Header user={currentUser} onSearch={setSearchQuery} isActivityPanelOpen={isActivityPanelVisible} setIsRightSidebarOpen={setIsRightSidebarOpen} hasActiveProject={!!activeProject} allProjects={projects} />
      <main className="app-main-content">{renderContent()}</main>
      {isActivityPanelVisible && (
        selectedTask ?
            <TaskDetails
                task={selectedTask}
                users={users}
                tags={tags}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onToggleSubtask={toggleSubtask}
                onAddComment={addComment}
                onAddSubtask={addSubtask}
                onUpdateSubtask={updateSubtask}
                onDeleteSubtask={deleteSubtask}
                onClose={() => setSelectedTaskId(null)}
            />
         :
            <RightSidebar project={activeProject} users={users} isOpen={isRightSidebarOpen} onClose={() => handleNavigate('projects')} onNavigateProject={handleProjectNavigation} totalProjects={projects.length} />
      )}
    </div>
  );
}

export default App;