export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

export type TaskFilter = 'all' | 'pending' | 'completed';
export type TaskSort = 'createdAt' | 'priority' | 'title' | 'status';