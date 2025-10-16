import React, { useState, useEffect, useRef } from 'react';
import { FiSave, FiTag, FiUsers, FiCalendar, FiTrendingUp, FiCheckSquare, FiTrash2, FiPlus, FiMessageCircle, FiActivity } from 'react-icons/fi';
import './TaskDetails.css';

const SubtaskItem = ({ subtask, onToggle, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(subtask.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);
    
    const handleUpdate = () => {
        if (text.trim()) {
            onUpdate(subtask.id, text.trim());
        } else {
            setText(subtask.text); 
        }
        setIsEditing(false);
    };

    return (
        <div className="subtask-item-details">
            <input
                type="checkbox"
                id={`sub-${subtask.id}`}
                checked={subtask.completed}
                onChange={() => onToggle(subtask.id)}
            />
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                    className="subtask-edit-input"
                />
            ) : (
                <label htmlFor={`sub-${subtask.id}`} onDoubleClick={() => setIsEditing(true)} className={subtask.completed ? 'completed' : ''}>
                    {subtask.text}
                </label>
            )}
            <button onClick={() => onDelete(subtask.id)} className="subtask-delete-btn"><FiTrash2 /></button>
        </div>
    );
};


const CommentForm = ({ onAddComment }) => {
    const [text, setText] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim()) {
            onAddComment(text);
            setText('');
        }
    };
    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Escribe un comentario..."/>
            <button type="submit">Enviar</button>
        </form>
    );
};

export const TaskDetails = ({ task, users, tags, onUpdateTask, onDeleteTask, onToggleSubtask, onAddSubtask, onUpdateSubtask, onDeleteSubtask, onAddComment, onClose }) => {
    if (!task) return null;

    const [editableTitle, setEditableTitle] = useState(task.title);
    const titleRef = useRef(null);
    const [newSubtaskText, setNewSubtaskText] = useState('');
    const [activeTab, setActiveTab] = useState('comments');
    
    const priorities = ['Low', 'Medium', 'High'];
    const priorityColors = { 'Low': 'var(--color-priority-low)', 'Medium': 'var(--color-priority-medium)', 'High': 'var(--color-priority-high)'};
    const taskAssignees = (task.assignees || []).map(id => users.find(u => u.id === id)).filter(Boolean);

    useEffect(() => {
        setEditableTitle(task.title);
    }, [task]);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
        }
    }, [editableTitle]);

    const handleUpdate = (field, value) => onUpdateTask(task.id, { [field]: value });
    const toggleTag = (tagId) => {
        const newTags = (task.tags || []).includes(tagId) ? (task.tags || []).filter(id => id !== tagId) : [...(task.tags || []), tagId];
        handleUpdate('tags', newTags);
    };

    const handleSaveAndClose = () => {
        if (window.confirm('¿Guardar los cambios y cerrar?')) {
            onClose();
        }
    };
    
    const handleAddSubtask = (e) => {
        e.preventDefault();
        if (newSubtaskText.trim()) {
            onAddSubtask(task.id, newSubtaskText.trim());
            setNewSubtaskText('');
        }
    };

    return (
        <aside className="details-panel">
            <div className="details-panel-header">
                <button onClick={() => onDeleteTask(task.id)} className="delete-task-btn" title="Eliminar tarea"><FiTrash2 /></button>
                <h3>Detalles de la Tarea</h3>
                <button onClick={handleSaveAndClose} className="save-task-btn" title="Guardar y cerrar"><FiSave /> Guardar</button>
            </div>
            <div className="details-panel-content">
                <section className="details-section">
                    <textarea ref={titleRef} className="task-title-editable" value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} onBlur={() => handleUpdate('title', editableTitle)} rows="1" />
                </section>
                <section className="details-section">
                    <h4 className="details-section-title">Descripción</h4>
                    <textarea className="description-textarea" defaultValue={task.description} onBlur={(e) => handleUpdate('description', e.target.value)} placeholder="Añade una descripción..." />
                </section>
                <section className="details-section">
                    <h4 className="details-section-title"><FiUsers /> Asignados</h4>
                    <div className="assignees-list">
                        {taskAssignees.map(user => <div key={user.id} className="assignee-item" title={user.name}><div className="avatar-sm">{user.initials}</div><span>{user.name}</span></div>)}
                        {taskAssignees.length === 0 && <p className="no-items-message">Sin asignar.</p>}
                    </div>
                </section>
                <section className="details-section-grid">
                    <div className="grid-item">
                        <h4 className="details-section-title"><FiTrendingUp/> Prioridad</h4>
                        <div className="select-wrapper">
                            <select className="details-select" value={task.priority || 'Medium'} onChange={(e) => handleUpdate('priority', e.target.value)} style={{borderColor: priorityColors[task.priority || 'Medium']}}>
                                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid-item">
                         <h4 className="details-section-title"><FiCalendar/> Fecha Límite</h4>
                         <input type="date" className="details-date-input" value={task.dueDate || ''} onChange={(e) => handleUpdate('dueDate', e.target.value)} />
                    </div>
                </section>
                 <section className="details-section">
                     <h4 className="details-section-title"><FiTag/> Etiquetas</h4>
                     <div className="tags-list-details">
                        {tags.map(tag => {
                            const isAssigned = (task.tags || []).includes(tag.id);
                            return <button key={tag.id} className={`tag-btn ${isAssigned ? 'assigned' : ''}`} style={{'--tag-color': tag.color}} onClick={() => toggleTag(tag.id)}>{tag.text}</button>;
                        })}
                     </div>
                </section>
                <section className="details-section">
                     <h4 className="details-section-title"><FiCheckSquare /> Subtareas</h4>
                     <div className="subtasks-list-details">
                         {(task.subtasks || []).map(sub => (
                             <SubtaskItem
                                 key={sub.id}
                                 subtask={sub}
                                 onToggle={() => onToggleSubtask(task.id, sub.id)}
                                 onUpdate={(subId, newText) => onUpdateSubtask(task.id, subId, newText)}
                                 onDelete={() => onDeleteSubtask(task.id, sub.id)}
                             />
                         ))}
                     </div>
                     <form onSubmit={handleAddSubtask} className="add-subtask-form">
                         <input type="text" value={newSubtaskText} onChange={(e) => setNewSubtaskText(e.target.value)} placeholder="Añadir nueva subtarea..." />
                         <button type="submit"><FiPlus /></button>
                     </form>
                </section>
                <div className="details-tabs">
                    <button onClick={() => setActiveTab('comments')} className={activeTab === 'comments' ? 'active' : ''}><FiMessageCircle/> Comentarios ({(task.comments || []).length})</button>
                    <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'active' : ''}><FiActivity/> Actividad</button>
                </div>
                {activeTab === 'comments' ? (
                    <section className="details-section">
                        <CommentForm onAddComment={(text) => onAddComment(task.id, text)} />
                        <div className="comments-list">
                            {(task.comments || []).map(comment => {
                                const user = users.find(u => u.id === comment.userId);
                                return <div key={comment.id} className="comment-item"><strong>{user?.name || 'Usuario'}:</strong> {comment.text}</div>
                            })}
                        </div>
                    </section>
                ) : (
                    <section className="details-section">
                         <div className="activity-list">
                            {(task.activity || []).map(log => <div key={log.id} className="activity-item">{log.text} - <span className="timestamp">{new Date(log.timestamp).toLocaleString()}</span></div>)}
                         </div>
                    </section>
                )}
            </div>
        </aside>
    );
};