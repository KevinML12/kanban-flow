import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import './Kanban.css';

export const Column = ({ column, users, tags, addTask, toggleSubtask, isOver, onSelect, updateTask }) => {
  const className = `column ${isOver ? 'is-over' : ''}`;

  return (
    <div className={className}>
      <h3 className="column-title">{column.title} ({column.tasks.length})</h3>
      <div className="column-tasks">
        <SortableContext 
          id={column.id}
          items={column.tasks.map(t => t.id)} 
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map(task => (
      <TaskCard 
                key={task.id} 
                task={task} 
                allUsers={users}
                allTags={tags}
                toggleSubtask={toggleSubtask}
        onSelect={onSelect}
        updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

