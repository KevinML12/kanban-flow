import React from 'react';
import './Statistics.css';

const ProjectStats = ({ project }) => {
    const allTasks = project.columns.flatMap(col => col.tasks);
    const totalTasks = allTasks.length;
    const completedTasks = project.columns.find(c => c.title === 'Completado')?.tasks.length || 0;
    const highPriorityTasks = allTasks.filter(t => t.priority === 'High').length;
    
    const totalProgress = allTasks.reduce((sum, task) => sum + (task.progress || 0), 0);
    const progress = totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;

    return (
        <>
            <h2>Estadísticas: {project.name}</h2>
            <div className="stats-grid">
                <div className="stat-card-lg"><h4>Total de Tareas</h4><div className="count">{totalTasks}</div></div>
                <div className="stat-card-lg"><h4>Tareas Completadas</h4><div className="count">{completedTasks}</div></div>
                <div className="stat-card-lg"><h4>Prioridad Alta</h4><div className="count">{highPriorityTasks}</div></div>
                
                <div className="stat-card-lg full-width">
                    <h4>Progreso</h4>
                    <div className="progress-display">
                        <div className="progress-bar-container-lg">
                            <div className="progress-bar-fill-lg" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="progress-percentage">{progress}%</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const GlobalStats = ({ projects }) => {
    const totalProjects = projects.length;
    const totalTasks = projects.reduce((sum, proj) => sum + proj.columns.flatMap(c => c.tasks).length, 0);
    
    return (
        <>
            <h2>Estadísticas Generales</h2>
            <div className="stats-grid">
                <div className="stat-card-lg"><h4>Total de Proyectos</h4><div className="count">{totalProjects}</div></div>
                <div className="stat-card-lg"><h4>Total de Tareas</h4><div className="count">{totalTasks}</div></div>
            </div>
        </>
    );
};


export const StatisticsView = ({ project, allProjects }) => {
    return (
        <div className="stats-view-container">
            {project ? <ProjectStats project={project} /> : <GlobalStats projects={allProjects} />}
            
            <div className="chart-container">
                <h3>Tareas Completadas (Últimos 7 días)</h3>
                <div className="bar-chart">
                    <div className="bar" style={{height: '60%'}}><span className="bar-label">Lun</span></div>
                    <div className="bar" style={{height: '80%'}}><span className="bar-label">Mar</span></div>
                    <div className="bar" style={{height: '40%'}}><span className="bar-label">Mié</span></div>
                    <div className="bar" style={{height: '90%'}}><span className="bar-label">Jue</span></div>
                    <div className="bar" style={{height: '20%'}}><span className="bar-label">Vie</span></div>
                    <div className="bar" style={{height: '50%'}}><span className="bar-label">Sáb</span></div>
                    <div className="bar" style={{height: '10%'}}><span className="bar-label">Dom</span></div>
                </div>
            </div>
             <div className="chart-container">
                <h3>Distribución por Prioridad</h3>
                <div className="donut-chart-wrapper">
                    <div className="donut-chart"><div className="donut-chart-center"></div></div>
                    <ul className="chart-legend">
                        <li><div className="legend-color" style={{backgroundColor: 'var(--color-priority-high)'}}></div> Alta (25%)</li>
                        <li><div className="legend-color" style={{backgroundColor: 'var(--color-priority-medium)'}}></div> Media (35%)</li>
                        <li><div className="legend-color" style={{backgroundColor: 'var(--color-priority-low)'}}></div> Baja (40%)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

