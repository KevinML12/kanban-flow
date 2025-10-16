import React, { useState } from 'react';
import './Forms.css';
import { FiCheck } from 'react-icons/fi';

export const TaskForm = ({ onSave, onCancel, task = {}, allUsers = [], allTags = [] }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [assignees, setAssignees] = useState(task.assignees || []);
    const [tags, setTags] = useState(task.tags || []);
    const [priority, setPriority] = useState(task.priority || 'Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ ...task, title, description, assignees, tags, priority });
    };

    const toggleAssignee = (userId) => {
        setAssignees(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId) 
                : [...prev, userId]
        );
    };

    const toggleTag = (tagId) => {
        setTags(prev => 
            prev.includes(tagId) 
                ? prev.filter(id => id !== tagId) 
                : [...prev, tagId]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form">
            <h2>{task.id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <div className="form-group">
                <label>Título de la tarea</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Dominar el mundo..." autoFocus required />
            </div>
            
            <div className="form-group">
                <label>Descripción (Opcional)</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder="Añade más detalles..."/>
            </div>
            
            <div className="form-grid">
                <div className="form-group">
                    <label>Asignar a</label>
                    <div className="assignee-selector">
                        {allUsers.map(user => {
                            const isSelected = assignees.includes(user.id);
                            return (
                                <button type="button" key={user.id} onClick={() => toggleAssignee(user.id)} className={`assignee-option ${isSelected ? 'selected' : ''}`}>
                                    <div className="avatar-sm">{user.initials}</div>
                                    <span>{user.name}</span>
                                    {isSelected && <FiCheck className="check-icon"/>}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="form-group">
                    <label>Prioridad</label>
                    <div className="select-wrapper">
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Baja</option>
                            <option value="Medium">Media</option>
                            <option value="High">Alta</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Etiquetas</label>
                        <div className="tags-selector">
                            {allTags.map(tag => (
                                <button type="button" key={tag.id} onClick={() => toggleTag(tag.id)} className={`tag-btn ${tags.includes(tag.id) ? 'assigned' : ''}`} style={{'--tag-color': tag.color}}>
                                    {tag.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="btn-primary">{task.id ? 'Guardar Cambios' : 'Crear Tarea'}</button>
            </div>
        </form>
    );
};