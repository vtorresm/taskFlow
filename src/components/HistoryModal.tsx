import React from 'react';
import { X, Calendar, CheckCircle2, Clock, Download } from 'lucide-react';
import { Task } from '../types/Task';
import { formatDate } from '../utils/taskUtils';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onExport: () => void;
}

export function HistoryModal({ isOpen, onClose, tasks, onExport }: HistoryModalProps) {
  if (!isOpen) return null;

  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Historial de Tareas</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download size={16} />
              Exportar
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500">No hay tareas en el historial</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`border rounded-lg p-4 ${
                    task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        task.completed ? 'text-green-800' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 ${
                          task.completed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={12} />
                          <span>Creada: {formatDate(task.createdAt)}</span>
                        </div>
                        {task.completed && task.completedAt && (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 size={12} />
                            <span>Completada: {formatDate(task.completedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : 
                         task.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.completed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {task.completed ? 'Completada' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}