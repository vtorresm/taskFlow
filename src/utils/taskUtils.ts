import { Task, TaskSort } from '../types/Task';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createTask(
  title: string, 
  description?: string, 
  priority: Task['priority'] = 'medium'
): Task {
  return {
    id: generateId(),
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority,
  };
}

export function sortTasks(tasks: Task[], sortBy: TaskSort): Task[] {
  const sortedTasks = [...tasks];
  
  switch (sortBy) {
    case 'createdAt':
      return sortedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'title':
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    case 'status':
      return sortedTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    default:
      return sortedTasks;
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
  if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  return 'hace un momento';
}