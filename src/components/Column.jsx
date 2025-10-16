import React from 'react';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import './Kanban.css';

export const Column = ({ column, users, tags, onSelectTask, onAddTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: column.id,
    data: { type: 'column' }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="column">
      <div className="column-header">
        <h3 className="column-title">{column.title} ({column.tasks.length})</h3>
        <div className="column-actions">
          <button className="add-task-btn" onClick={onAddTask} title="Añadir nueva tarea"><FiPlus /></button>
          <button className="drag-handle" {...attributes} {...listeners}><FiMoreVertical /></button>
        </div>
      </div>
      <div className="column-tasks">
        <SortableContext id={column.id} items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {column.tasks.map(task => (
            <TaskCard key={task.id} task={task} allUsers={users} allTags={tags} onSelectTask={onSelectTask} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};