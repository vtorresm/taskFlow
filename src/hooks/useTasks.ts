import { useState, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Task, TaskFilter, TaskSort } from '../types/Task';
import { generateId, createTask, sortTasks } from '../utils/taskUtils';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'completed' && task.completed) ||
        (filter === 'pending' && !task.completed);
      
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      return matchesFilter && matchesSearch;
    });

    return sortTasks(filtered, sortBy);
  }, [tasks, filter, sortBy, searchQuery]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  const addTask = (title: string, description?: string, priority: Task['priority'] = 'medium') => {
    if (!title.trim()) return false;
    
    const newTask = createTask(title.trim(), description?.trim(), priority);
    setTasks(prev => [newTask, ...prev]);
    return true;
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined
          }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const exportHistory = () => {
    const history = tasks.map(task => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt?.toISOString(),
    }));
    
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `task-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    tasks: filteredAndSortedTasks,
    allTasks: tasks,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    taskCounts,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    exportHistory,
  };
}