import React, { useState, useMemo } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Column } from './Column.jsx';
import { Modal, TaskForm } from './';
import { FiFilter, FiPlus } from 'react-icons/fi';
import './Kanban.css';

const AddColumn = ({ onAddColumn }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddColumn(title.trim());
            setTitle('');
            setIsEditing(false);
        }
    };

    if (!isEditing) {
        return (
            <button className="add-column-btn" onClick={() => setIsEditing(true)}>
                <FiPlus /> Añadir otra lista
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="add-column-form" onBlur={() => setIsEditing(false)}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre de la lista..."
                autoFocus
            />
            <button type="submit">Crear</button>
        </form>
    );
};

const BoardFilters = ({ users, tags, filters, setFilters }) => {
    return (
        <div className="board-filters">
            <FiFilter/>
            <select value={filters.userId || ''} onChange={e => setFilters({...filters, userId: e.target.value})}>
                <option value="">Todos los usuarios</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <select value={filters.tagId || ''} onChange={e => setFilters({...filters, tagId: e.target.value})}>
                <option value="">Todas las etiquetas</option>
                {tags.map(t => <option key={t.id} value={t.id}>{t.text}</option>)}
            </select>
            {(filters.userId || filters.tagId) && <button onClick={() => setFilters({userId: null, tagId: null})}>Limpiar</button>}
        </div>
    );
};

export const KanbanBoard = ({ project, users, tags, addTask, moveTask, moveColumn, onSelectTask, addColumn }) => {
    const sensors = useSensors(useSensor(PointerSensor));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);
    const [filters, setFilters] = useState({ userId: null, tagId: null });

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        
        if (active.data.current?.type === 'column') {
            moveColumn(active.id, over.id);
        } else {
            moveTask(active, over);
        }
    };

    const filteredProject = useMemo(() => {
        if (!filters.userId && !filters.tagId) return project;
        return {
            ...project,
            columns: project.columns.map(col => ({
                ...col,
                tasks: col.tasks.filter(task => {
                    const userMatch = filters.userId ? (task.assignees || []).includes(filters.userId) : true;
                    const tagMatch = filters.tagId ? (task.tags || []).includes(filters.tagId) : true;
                    return userMatch && tagMatch;
                })
            }))
        };
    }, [project, filters]);

    const handleOpenModal = (columnId) => {
        setActiveColumnId(columnId);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setActiveColumnId(null);
    };
    const handleSaveTask = (taskData) => {
        addTask(activeColumnId, taskData);
        handleCloseModal();
    };

    return (
        <>
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className="kanban-board-container">
                    <div className="kanban-header">
                        <h2>{project.name}</h2>
                        <BoardFilters users={users} tags={tags} filters={filters} setFilters={setFilters} />
                    </div>
                    <div className="kanban-board">
                        <SortableContext items={project.columns.map(c => c.id)} strategy={horizontalListSortingStrategy}>
                            {filteredProject.columns.map(column => (
                                <Column key={column.id} column={column} users={users} tags={tags} onSelectTask={onSelectTask} onAddTask={() => handleOpenModal(column.id)} />
                            ))}
                        </SortableContext>
                        <AddColumn onAddColumn={addColumn} />
                    </div>
                </div>
            </DndContext>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <TaskForm onSave={handleSaveTask} onCancel={handleCloseModal} allUsers={users} allTags={tags} />
            </Modal>
        </>
    );
};