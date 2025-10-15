import React, { useState } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Column } from './Column.jsx';
import './Kanban.css';

export const KanbanBoard = ({ project, users, tags, addTask, toggleSubtask, moveTask, onSelect, updateTask }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [overColumnId, setOverColumnId] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setOverColumnId(null);
    if (over && active.id !== over.id) {
      moveTask(active, over);
    }
  };
  
  const handleDragOver = (event) => {
    const { over } = event;
    const overId = over?.id;
    
    const overColumn = project.columns.find(col => col.id === overId || col.tasks.some(task => task.id === overId));
    setOverColumnId(overColumn ? overColumn.id : null);
  };

  // --- CÁLCULOS DE ESTADÍSTICAS CORREGIDOS ---
  // Ahora, si una columna no se encuentra, usamos un array vacío `[]` para evitar el error.
  const completedCount = (project.columns.find(c => c.title === 'Completado')?.tasks || []).length;
  const inProgressCount = (project.columns.find(c => c.title === 'En Desarrollo')?.tasks || []).length;
  
  // Hacemos el backlog más flexible para que coincida con varios nombres posibles
  const backlogColumn = project.columns.find(c => 
    c.title.toLowerCase().includes('backlog') || 
    c.title.toLowerCase().includes('ideas') ||
    c.title.toLowerCase().includes('diseño y planificación')
  );
  const backlogCount = (backlogColumn?.tasks || []).length;

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="kanban-board-container">
        <div className="kanban-header">
            <h2>{project.name}</h2>
        </div>
        <div className="kanban-stats">
            <div className="stat-card"><h4>Backlog</h4><div className="count">{backlogCount}</div></div>
            <div className="stat-card"><h4>En Desarrollo</h4><div className="count">{inProgressCount}</div></div>
            <div className="stat-card"><h4>Completado</h4><div className="count">{completedCount}</div></div>
        </div>
        <div className="kanban-board">
          {project.columns.map(column => (
            <Column 
              key={column.id} 
              column={column} 
              users={users}
              tags={tags}
              addTask={addTask}
              toggleSubtask={toggleSubtask}
              isOver={column.id === overColumnId}
              onSelect={onSelect}
              updateTask={updateTask}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};