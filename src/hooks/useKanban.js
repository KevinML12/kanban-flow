import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialData, ALL_USERS, ALL_TAGS } from '../data/initialData';

export const useKanban = () => {
    const [projects, setProjects] = useState(initialData);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [users] = useState(ALL_USERS);
    const [tags, setTags] = useState(ALL_TAGS);

    const activeProject = projects.find(p => p.id === activeProjectId);
    const selectedTask = activeProject?.columns.flatMap(col => col.tasks).find(task => task.id === selectedTaskId);

    const addLog = (project, taskId, text) => {
        const newLog = { id: uuidv4(), text, timestamp: new Date().toISOString() };
        const newColumns = project.columns.map(col => ({
            ...col,
            tasks: col.tasks.map(task =>
                task.id === taskId ? { ...task, activity: [newLog, ...(task.activity || [])] } : task
            )
        }));
        return { ...project, columns: newColumns };
    };

    const updateTaskField = (taskId, field, value) => {
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            return {
                ...proj,
                columns: proj.columns.map(col => ({
                    ...col,
                    tasks: col.tasks.map(task =>
                        task.id === taskId ? { ...task, [field]: value } : task
                    )
                }))
            };
        }));
    };

    const addSubtask = (taskId, text) => {
        const newSubtask = { id: uuidv4(), text, completed: false };
        const task = activeProject?.columns.flatMap(c => c.tasks).find(t => t.id === taskId);
        if (task) {
            updateTaskField(taskId, 'subtasks', [...(task.subtasks || []), newSubtask]);
        }
    };

    const updateSubtask = (taskId, subtaskId, newText) => {
        const task = activeProject?.columns.flatMap(c => c.tasks).find(t => t.id === taskId);
        if (task) {
            const newSubtasks = (task.subtasks || []).map(sub =>
                sub.id === subtaskId ? { ...sub, text: newText } : sub
            );
            updateTaskField(taskId, 'subtasks', newSubtasks);
        }
    };

    const deleteSubtask = (taskId, subtaskId) => {
        const task = activeProject?.columns.flatMap(c => c.tasks).find(t => t.id === taskId);
        if (task) {
            const newSubtasks = (task.subtasks || []).filter(sub => sub.id !== subtaskId);
            updateTaskField(taskId, 'subtasks', newSubtasks);
        }
    };
    
    const toggleSubtask = (taskId, subtaskId) => {
        const task = activeProject?.columns.flatMap(c => c.tasks).find(t => t.id === taskId);
        if (task) {
            const newSubtasks = task.subtasks.map(sub =>
                sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
            );
            updateTaskField(taskId, 'subtasks', newSubtasks);
        }
    };

    const updateTask = (taskId, updates) => {
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            return { ...proj, columns: proj.columns.map(col => ({ ...col, tasks: col.tasks.map(task => task.id === taskId ? { ...task, ...updates } : task) })) };
        }));
    };

    const deleteTask = (taskId) => {
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            const newColumns = proj.columns.map(col => ({
                ...col,
                tasks: col.tasks.filter(task => task.id !== taskId)
            }));
            return { ...proj, columns: newColumns };
        }));
        setSelectedTaskId(null);
    };

    const addComment = (taskId, commentText) => {
        const newComment = { id: uuidv4(), userId: users[0].id, text: commentText, timestamp: new Date().toISOString() };
        const logText = `${users[0].name} añadió un comentario.`;
        
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            const updatedColumns = proj.columns.map(col => ({
                ...col,
                tasks: col.tasks.map(task => 
                    task.id === taskId ? { ...task, comments: [newComment, ...(task.comments || [])] } : task
                )
            }));
            const projectWithNewComment = { ...proj, columns: updatedColumns };
            return addLog(projectWithNewComment, taskId, logText);
        }));
    };

    const moveTask = (active, over) => {
        setProjects(prevProjects => {
            const projectsCopy = JSON.parse(JSON.stringify(prevProjects));
            const project = projectsCopy.find(p => p.id === activeProjectId);
            if (!project) return prevProjects;

            let sourceColumn, taskToMove, sourceTaskIndex;
            for(const col of project.columns) {
                const idx = col.tasks.findIndex(t => t.id === active.id);
                if (idx > -1) {
                    sourceColumn = col;
                    sourceTaskIndex = idx;
                    taskToMove = col.tasks[sourceTaskIndex];
                    break;
                }
            }

            if (!sourceColumn) return prevProjects;

            let destColumn = null, destTaskIndex = -1;
            for (const col of project.columns) {
                if (col.id === over.id) { destColumn = col; destTaskIndex = col.tasks.length; break; }
                const idx = col.tasks.findIndex(t => t.id === over.id);
                if (idx > -1) { destColumn = col; destTaskIndex = idx; break; }
            }

            if (!destColumn) return prevProjects;

            sourceColumn.tasks.splice(sourceTaskIndex, 1);
            destColumn.tasks.splice(destTaskIndex, 0, taskToMove);

            const logText = `${users[0].name} movió la tarea "${taskToMove.title}" de "${sourceColumn.title}" a "${destColumn.title}".`;
            return projectsCopy.map(p => p.id === activeProjectId ? addLog(p, active.id, logText) : p);
        });
    };

    const moveColumn = (activeId, overId) => {
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            const oldIndex = proj.columns.findIndex(c => c.id === activeId);
            const newIndex = proj.columns.findIndex(c => c.id === overId);
            const newColumns = Array.from(proj.columns);
            const [moved] = newColumns.splice(oldIndex, 1);
            newColumns.splice(newIndex, 0, moved);
            return { ...proj, columns: newColumns };
        }));
    };
    
    const addTag = (tagData) => {
        const newTag = { id: `tag-${uuidv4()}`, ...tagData };
        setTags(prev => [...prev, newTag]);
    };

    const updateTag = (tagId, updates) => {
        setTags(prev => prev.map(tag => tag.id === tagId ? { ...tag, ...updates } : tag));
    };

    const deleteTag = (tagId) => {
        const newProjects = projects.map(proj => ({
            ...proj,
            columns: proj.columns.map(col => ({
                ...col,
                tasks: col.tasks.map(task => ({ ...task, tags: (task.tags || []).filter(id => id !== tagId) }))
            }))
        }));
        setProjects(newProjects);
        setTags(prev => prev.filter(tag => tag.id !== tagId));
    };
    
    const addProject = (projectName) => {
        const newProject = { id: `proj-${uuidv4()}`, name: projectName, columns: [
            { id: uuidv4(), title: 'Pendiente', tasks: [] },
            { id: uuidv4(), title: 'En Proceso', tasks: [] },
            { id: uuidv4(), title: 'Completado', tasks: [] }
        ]};
        setProjects(prev => [...prev, newProject]);
    };

    const addTask = (columnId, taskData) => {
        const newTask = {
            id: uuidv4(),
            ...taskData,
            subtasks: [], 
            comments: [], 
            activity: []
        };
        setProjects(prev => prev.map(proj => {
            if (proj.id !== activeProjectId) return proj;
            return { ...proj, columns: proj.columns.map(col => col.id === columnId ? { ...col, tasks: [newTask, ...col.tasks] } : col) };
        }));
    };
    
    const addColumn = (columnName) => {
        const newColumn = { id: uuidv4(), title: columnName, tasks: [] };
        setProjects(prev => prev.map(proj => 
            proj.id === activeProjectId ? { ...proj, columns: [...proj.columns, newColumn] } : proj
        ));
    };

    return {
        projects, activeProject, activeProjectId, setActiveProjectId,
        users, tags, selectedTask, setSelectedTaskId,
        addProject, addTask, updateTask, deleteTask, toggleSubtask, moveTask, addColumn,
        addTag, updateTag, deleteTag, addComment, moveColumn,
        addSubtask, updateSubtask, deleteSubtask
    };
};