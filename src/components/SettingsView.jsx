import React, { useState } from 'react';
import { FiTag, FiPlus, FiTrash2, FiEdit2, FiSun, FiMoon } from 'react-icons/fi';
import './Settings.css';

const TagForm = ({ onSave, tag = {}, onCancel }) => {
    const [text, setText] = useState(tag.text || '');
    const [color, setColor] = useState(tag.color || '#8A4FFF');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSave({ ...tag, text, color });
            if (!tag.id) {
                setText('');
                setColor('#8A4FFF');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="tag-form">
            <input 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)}
                placeholder="Nombre de la etiqueta"
                required
            />
            <input 
                type="color" 
                value={color}
                onChange={e => setColor(e.target.value)}
            />
            <button type="submit" className="btn-primary">Guardar</button>
            {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
        </form>
    );
};

export const SettingsView = ({ user, theme, setTheme, tags, onAddTag, onUpdateTag, onDeleteTag }) => {
    const [editingTagId, setEditingTagId] = useState(null);

    return (
        <div className="settings-view-container">
             <h2>Configuración</h2>
             
             <div className="settings-section">
                <h3><FiTag/> Gestión de Etiquetas</h3>
                <div className="tag-management-section">
                    <h4>Crear Nueva Etiqueta</h4>
                    <TagForm onSave={onAddTag} />
                    <hr className="divider" />
                    <h4>Etiquetas Existentes</h4>
                    <div className="tags-list-settings">
                        {tags.map(tag => (
                            <div key={tag.id} className="tag-item-setting">
                                {editingTagId === tag.id ? (
                                    <TagForm 
                                        tag={tag}
                                        onSave={(updates) => {
                                            onUpdateTag(tag.id, updates);
                                            setEditingTagId(null);
                                        }}
                                        onCancel={() => setEditingTagId(null)}
                                    />
                                ) : (
                                    <>
                                        <span className="tag-preview" style={{ backgroundColor: tag.color }}>{tag.text}</span>
                                        <div className="tag-actions">
                                            <button onClick={() => setEditingTagId(tag.id)} title="Editar"><FiEdit2/></button>
                                            <button onClick={() => onDeleteTag(tag.id)} className="delete" title="Eliminar"><FiTrash2/></button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
             </div>

             <div className="settings-section">
                <h3>Apariencia</h3>
                 <div className="form-row">
                    <div className="form-label">
                        <p>Tema</p>
                        <span>Cambia entre modo claro y oscuro.</span>
                    </div>
                    <div className="theme-switch-wrapper">
                        <FiSun />
                        <label className="theme-switch">
                            <input type="checkbox" checked={theme === 'dark'} onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
                            <span className="slider"></span>
                        </label>
                        <FiMoon />
                    </div>
                </div>
             </div>
        </div>
    );
};