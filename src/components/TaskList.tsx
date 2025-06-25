import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  filter: string;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTask, filter }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="max-w-md mx-auto">
          {filter === 'completed' ? (
            <>
              <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay tareas completadas
              </h3>
              <p className="text-gray-500">
                Cuando completes algunas tareas, aparecerán aquí.
              </p>
            </>
          ) : filter === 'pending' ? (
            <>
              <Clock className="mx-auto mb-4 text-blue-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ¡Excelente trabajo!
              </h3>
              <p className="text-gray-500">
                No tienes tareas pendientes en este momento.
              </p>
            </>
          ) : (
            <>
              <AlertTriangle className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay tareas
              </h3>
              <p className="text-gray-500">
                Comienza agregando tu primera tarea arriba.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </div>
  );
}