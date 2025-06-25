import React, { useState } from 'react';
import { CheckSquare, History, Trash2 } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { FilterBar } from './components/FilterBar';
import { HistoryModal } from './components/HistoryModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

function App() {
  const {
    tasks,
    allTasks,
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
  } = useTasks();

  const [showHistory, setShowHistory] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleDeleteTask = (id: string) => {
    setTaskToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete);
      setTaskToDelete(null);
    }
  };

  const handleClearCompleted = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCompleted = () => {
    clearCompleted();
  };

  const getTaskToDeleteTitle = () => {
    if (!taskToDelete) return '';
    const task = allTasks.find(t => t.id === taskToDelete);
    return task?.title || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <CheckSquare className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organiza tu día, alcanza tus metas. Una aplicación moderna y elegante 
            para gestionar todas tus tareas de manera eficiente.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckSquare className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{taskCounts.all}</p>
                <p className="text-sm text-gray-600">Total de tareas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Trash2 className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{taskCounts.pending}</p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckSquare className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{taskCounts.completed}</p>
                <p className="text-sm text-gray-600">Completadas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <TaskForm onAddTask={addTask} />
            
            <div className="mt-6">
              <button
                onClick={() => setShowHistory(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <History size={20} />
                Ver Historial Completo
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2 space-y-6">
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              taskCounts={taskCounts}
              onExport={exportHistory}
              onClearCompleted={handleClearCompleted}
            />

            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={updateTask}
              filter={filter}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        tasks={allTasks}
        onExport={exportHistory}
      />

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDeleteTask}
        title="Eliminar Tarea"
        message={`¿Estás seguro de que quieres eliminar la tarea "${getTaskToDeleteTitle()}"? Esta acción no se puede deshacer.`}
      />

      <DeleteConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearCompleted}
        title="Limpiar Tareas Completadas"
        message={`¿Estás seguro de que quieres eliminar todas las tareas completadas (${taskCounts.completed})? Esta acción no se puede deshacer.`}
      />
    </div>
  );
}

export default App;