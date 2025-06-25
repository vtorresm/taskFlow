import React from 'react';
import { Search, Filter, SortAsc, Download, Trash2 } from 'lucide-react';
import { TaskFilter, TaskSort } from '../types/Task';

interface FilterBarProps {
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  sortBy: TaskSort;
  setSortBy: (sort: TaskSort) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  taskCounts: { all: number; pending: number; completed: number };
  onExport: () => void;
  onClearCompleted: () => void;
}

export function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  taskCounts,
  onExport,
  onClearCompleted,
}: FilterBarProps) {
  const filterOptions = [
    { value: 'all' as TaskFilter, label: 'Todas', count: taskCounts.all },
    { value: 'pending' as TaskFilter, label: 'Pendientes', count: taskCounts.pending },
    { value: 'completed' as TaskFilter, label: 'Completadas', count: taskCounts.completed },
  ];

  const sortOptions = [
    { value: 'createdAt' as TaskSort, label: 'Fecha de creación' },
    { value: 'priority' as TaskSort, label: 'Prioridad' },
    { value: 'title' as TaskSort, label: 'Título' },
    { value: 'status' as TaskSort, label: 'Estado' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === option.value
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <Filter size={16} />
              {option.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === option.value
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as TaskSort)}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            title="Exportar historial"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Exportar</span>
          </button>

          {taskCounts.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              title="Limpiar completadas"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}