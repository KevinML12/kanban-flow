import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tag } from './Tag';
import { FiMessageSquare, FiCheckSquare, FiMoreVertical } from 'react-icons/fi';
import './Kanban.css';

export const TaskCard = ({ task, allUsers, allTags, onSelectTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
      id: task.id,
      data: { type: 'task' }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return '';
    const today = new Date(); today.setHours(0,0,0,0);
    const dueDate = new Date(task.dueDate + 'T00:00:00Z');
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'due-soon';
    return '';
  };
  
  const cardClassName = `task-card ${isDragging ? 'dragging' : ''} ${getDueDateStatus()}`;
  const assignees = (task.assignees || []).map(id => allUsers.find(u => u.id === id)).filter(Boolean);
  const tags = (task.tags || []).map(id => allTags.find(t => t.id === id)).filter(Boolean);
  const totalSubtasks = (task.subtasks || []).length;
  const completedSubtasks = (task.subtasks || []).filter(s => s.completed).length;

  return (
    <div ref={setNodeRef} style={style} className={cardClassName} {...attributes}>
      <div className="task-card-header">
        <div className="task-tags-container">
          {tags.map(tag => tag && <Tag key={tag.id} tag={tag} />)}
        </div>
        <button className="drag-handle-task" {...listeners}><FiMoreVertical /></button>
      </div>
      
      <div className="task-card-content" onClick={() => onSelectTask(task.id)}>
        <h4>{task.title}</h4>
      </div>
      
      <div className="task-card-footer" onClick={() => onSelectTask(task.id)}>
        <div className="task-stats">
            {(task.comments || []).length > 0 && (
                <span className="task-stat-item" title={`${task.comments.length} comentarios`}>
                    <FiMessageSquare />
                    {task.comments.length}
                </span>
            )}
            {totalSubtasks > 0 && (
                <span className="task-stat-item" title={`${completedSubtasks} de ${totalSubtasks} subtareas completadas`}>
                    <FiCheckSquare />
                    {completedSubtasks}/{totalSubtasks}
                </span>
            )}
        </div>

        <div className="task-assignees">
          {assignees.slice(0, 3).map(user => user && (
            <div key={user.id} className="avatar-sm" title={user.name}>
              {user.initials}
            </div>
          ))}
          {assignees.length > 3 && <div className="avatar-sm more">+{assignees.length - 3}</div>}
        </div>
      </div>
    </div>
  );
};