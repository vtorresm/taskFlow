import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Task } from '../types/Task';
import { formatRelativeTime } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const priorityConfig = {
    low: { icon: ArrowDown, color: 'text-blue-500', bg: 'bg-blue-50' },
    medium: { icon: Minus, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    high: { icon: ArrowUp, color: 'text-red-500', bg: 'bg-red-50' },
  };

  const PriorityIcon = priorityConfig[task.priority].icon;

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={100}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            maxLength={500}
          />
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setEditPriority(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  editPriority === p
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p === 'low' ? 'Baja' : p === 'medium' ? 'Media' : 'Alta'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-4 shadow-sm transition-all hover:shadow-md ${
      task.completed ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {task.completed && <Check size={16} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priorityConfig[task.priority].bg}`}>
                <PriorityIcon size={12} className={priorityConfig[task.priority].color} />
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="Editar tarea"
              >
                <Edit3 size={16} />
              </button>
              
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar tarea"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>Creada {formatRelativeTime(task.createdAt)}</span>
            </div>
            {task.completed && task.completedAt && (
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} />
                <span>Completada {formatRelativeTime(task.completedAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}