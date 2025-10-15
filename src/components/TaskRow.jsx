import React from 'react';
import { Tag } from './Tag.jsx';
import './ListView.css';

// La corrección está en esta línea: "export const"
export const TaskRow = ({ task, allUsers, allTags }) => {
    const assignees = task.assignees.map(assigneeId => allUsers.find(u => u.id === assigneeId));

    const getDueDateInfo = (dueDate) => {
        if (!dueDate) return { text: 'N/A', className: '' };
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate + 'T00:00:00Z');
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { text: `Venció hace ${Math.abs(diffDays)}d`, className: 'urgent' };
        if (diffDays === 0) return { text: 'Hoy', className: 'urgent' };
        return { text: `${dueDate}`, className: '' };
    };

    const dueDateInfo = getDueDateInfo(task.dueDate);
    
    const priorityTag = allTags.find(t => t.text === task.priority);

    return (
        <tr>
            <td>{task.title}</td>
            <td>{task.status}</td>
            <td>
                <div className="assignee-avatars">
                    {assignees.map(user => user && <div key={user.id} className="avatar-sm" title={user.name}>{user.initials}</div>)}
                </div>
            </td>
            <td><Tag tag={priorityTag} /></td>
            <td className={dueDateInfo.className}>{dueDateInfo.text}</td>
            <td>
                <div className="progress-bar-container-sm">
                    <div className="progress-bar-sm" style={{ width: `${task.progress}%` }}></div>
                </div>
            </td>
        </tr>
    );
};