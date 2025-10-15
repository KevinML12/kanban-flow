import React, { useState } from 'react';
import { Modal } from './Modal';
import { HiPlus } from 'react-icons/hi';

export const ProjectsView = ({ projects, users, onSelectProject, onAddProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');

    const getProjectProgress = (project) => {
        const allTasks = project.columns.flatMap(col => col.tasks);
        if (allTasks.length === 0) return 0;
        
        const totalProgress = allTasks.reduce((sum, task) => sum + (task.progress || 0), 0);
        const averageProgress = totalProgress / allTasks.length;
        
        return Math.round(averageProgress);
    };

    const getProjectTeam = (project) => {
        const allAssignees = project.columns.flatMap(col => col.tasks.flatMap(task => task.assignees));
        const uniqueAssigneeIds = [...new Set(allAssignees)];
        return uniqueAssigneeIds.map(id => users.find(user => user.id === id)).filter(Boolean);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectName.trim()) {
            onAddProject(projectName);
            setProjectName('');
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="projects-view-container">
                <h2>Proyectos</h2>
                <div className="project-grid">
                    {projects.map(proj => {
                        const progress = getProjectProgress(proj);
                        const team = getProjectTeam(proj);
                        return (
                            <div key={proj.id} className="project-card" onClick={() => onSelectProject(proj.id)}>
                                <h3>{proj.name}</h3>
                                <p className="task-count">{proj.columns.flatMap(c => c.tasks).length} Tareas</p>
                                
                                <div className="project-card-footer">
                                    <div className="project-team-avatars">
                                        {team.slice(0, 3).map(user => (
                                            <div key={user.id} className="avatar-sm" title={user.name}>{user.initials}</div>
                                        ))}
                                        {team.length > 3 && <div className="avatar-sm more">+{team.length - 3}</div>}
                                    </div>
                                    <span className="progress-percentage">{progress}%</span>
                                </div>

                                <div className="progress-bar-container-sm">
                                    <div className="progress-bar-sm" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        )
                    })}
                     <div className="project-card add-new" onClick={() => setIsModalOpen(true)}>
                        <HiPlus size={40} />
                        <span>Crear Nuevo Proyecto</span>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Crear Nuevo Proyecto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Proyecto</label>
                        <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} autoFocus/>
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </Modal>
        </>
    );
};

