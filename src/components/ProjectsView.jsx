// src/components/ProjectsView.jsx
import React, { useState } from 'react';
import { Modal } from './Modal.jsx';
import { HiPlus } from 'react-icons/hi';
import './ProjectsView.css'; // Asegúrate que este import esté aquí

export const ProjectsView = ({ projects, users, onSelectProject, onAddProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState('');

    const getProjectProgress = (project) => {
        // ... (lógica de progreso)
    };

    const getProjectTeam = (project) => {
        // ... (lógica de equipo)
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
                    {/* --- ESTA ES LA PARTE IMPORTANTE --- */}
                    {/* Si `projects` tiene algo, este map debe funcionar */}
                    {projects.map(proj => {
                        // const progress = getProjectProgress(proj);
                        // const team = getProjectTeam(proj);
                        return (
                            <div key={proj.id} className="project-card" onClick={() => onSelectProject(proj.id)}>
                                <h3>{proj.name}</h3>
                                <p className="task-count">
                                    {proj.columns.flatMap(c => c.tasks).length} Tareas
                                </p>
                                {/* ... (El resto del footer de la tarjeta) ... */}
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
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Crear Nuevo Proyecto</h2>
                    <div className="form-group">
                        <label>Nombre del Proyecto</label>
                        <input 
                            type="text" 
                            value={projectName} 
                            onChange={(e) => setProjectName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="btn-primary">Crear</button>
                </form>
            </Modal>
        </>
    );
};