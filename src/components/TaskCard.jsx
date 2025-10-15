import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tag } from './Tag';
import './Kanban.css';

export const TaskCard = ({ task, allUsers, allTags, toggleSubtask, onSelect = () => {}, updateTask = () => {} }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardClassName = `task-card ${isDragging ? 'dragging' : ''}`;
  
  const assignees = task.assignees.map(assigneeId => allUsers.find(u => u.id === assigneeId));
  const tags = task.tags.map(tagId => allTags.find(t => t.id === tagId));

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    const newTitle = window.prompt('Editar título', task.title);
    if (newTitle === null) return;
    const newDescription = window.prompt('Editar descripción', task.description || '');
    if (newDescription === null) return;
    updateTask(task.id, { title: newTitle, description: newDescription });
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={cardClassName} onClick={() => onSelect(task)} onDoubleClick={handleDoubleClick}>
      <h4>{task.title}</h4>
      
      {task.description && <p className="task-description">{task.description}</p>}
      
      {task.tags && (
        <div className="task-tags">
            {tags.map(tag => tag && <Tag key={tag.id} tag={tag} />)}
        </div>
      )}

      {task.subtasks && task.subtasks.length > 0 && (
          <ul className="subtask-list">
              {task.subtasks.map(sub => (
                  <li key={sub.id} className="subtask-item">
                      <input type="checkbox" checked={sub.completed} onChange={() => toggleSubtask(task.id, sub.id)} />
                      <span className={sub.completed ? 'completed' : ''}>{sub.text}</span>
                  </li>
              ))}
          </ul>
      )}
      
      <div className="task-card-footer">
        {task.assignees && (
            <div className="task-assignees">
                {assignees.map(user => user && (
                    <div key={user.id} className="avatar-sm" title={user.name}>
                        {user.initials}
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

