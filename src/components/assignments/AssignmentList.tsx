import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Calendar, Clock, FileText } from 'lucide-react';
import { Assignment } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useColor } from '../../contexts/ColorContext';

export const AssignmentList: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Datos simulados - en producción vendrían de la API
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Ecuaciones Cuadráticas',
      description: 'Resolver los ejercicios del capítulo 5 sobre ecuaciones cuadráticas. Incluir procedimiento completo.',
      subjectId: '1',
      subject: {
        id: '1',
        name: 'Matemáticas',
        code: 'MAT-10A',
        grade: '10mo A',
        credits: 4,
        teacherId: '1',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      dueDate: new Date('2024-01-20'),
      maxPoints: 100,
      isActive: true,
      createdAt: new Date('2024-01-10'),
      submissions: []
    },
    {
      id: '2',
      title: 'Ensayo: Segunda Guerra Mundial',
      description: 'Escribir un ensayo de 1000 palabras sobre las causas y consecuencias de la Segunda Guerra Mundial.',
      subjectId: '2',
      subject: {
        id: '2',
        name: 'Historia Universal',
        code: 'HIS-11B',
        grade: '11mo B',
        credits: 3,
        teacherId: '2',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      dueDate: new Date('2024-01-25'),
      maxPoints: 100,
      isActive: true,
      createdAt: new Date('2024-01-12'),
      submissions: []
    },
    {
      id: '3',
      title: 'Presentación Oral - My Future Career',
      description: 'Preparar una presentación de 5 minutos en inglés sobre tu carrera profesional futura.',
      subjectId: '3',
      subject: {
        id: '3',
        name: 'Inglés Avanzado',
        code: 'ING-9C',
        grade: '9no C',
        credits: 3,
        teacherId: '3',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      dueDate: new Date('2024-01-18'),
      maxPoints: 100,
      isActive: true,
      createdAt: new Date('2024-01-08'),
      submissions: []
    },
    {
      id: '4',
      title: 'Laboratorio: Movimiento Rectilíneo',
      description: 'Realizar el experimento de movimiento rectilíneo uniforme y entregar reporte con análisis de datos.',
      subjectId: '4',
      subject: {
        id: '4',
        name: 'Física',
        code: 'FIS-10A',
        grade: '10mo A',
        credits: 4,
        teacherId: '4',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      dueDate: new Date('2024-01-22'),
      maxPoints: 100,
      isActive: true,
      createdAt: new Date('2024-01-11'),
      submissions: []
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subjectId === selectedSubject;
    
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      const now = new Date();
      const isOverdue = assignment.dueDate < now;
      const isDueSoon = assignment.dueDate > now && assignment.dueDate <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      
      if (selectedStatus === 'overdue') matchesStatus = isOverdue;
      else if (selectedStatus === 'due-soon') matchesStatus = isDueSoon;
      else if (selectedStatus === 'active') matchesStatus = !isOverdue;
    }
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = ['all', ...Array.from(new Set(assignments.map(a => a.subject.name)))];

  const getStatusColor = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-red-600 bg-red-50';
    if (diffDays <= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusText = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `Vencida (${Math.abs(diffDays)} días)`;
    if (diffDays === 0) return 'Vence hoy';
    if (diffDays === 1) return 'Vence mañana';
    return `${diffDays} días restantes`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
          <p className="text-gray-600">Gestiona las tareas y asignaciones académicas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por título o materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas las materias</option>
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activas</option>
                <option value="due-soon">Vencen pronto</option>
                <option value="overdue">Vencidas</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de tareas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} hover className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {assignment.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {assignment.subject.name}
                    </span>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {assignment.subject.grade}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {assignment.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Fecha límite:
                  </span>
                  <span className="text-sm font-medium">
                    {assignment.dueDate.toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Puntos máximos:</span>
                  <span className="text-sm font-medium">{assignment.maxPoints}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Entregas:</span>
                  <span className="text-sm font-medium">{assignment.submissions.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.dueDate)}`}>
                  <Clock className="h-3 w-3 mr-1" />
                  {getStatusText(assignment.dueDate)}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <FileText className="h-3 w-3 mr-1" />
                    Ver Entregas
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <ClipboardList className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron tareas
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primera tarea para comenzar'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Tarea
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};