import React, { useState } from 'react';
import { ClipboardList, Search, Plus, Eye, Upload, Check, Clock, AlertCircle, Calendar, User, BookOpen, Target, FileText, Download, Filter } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AssignmentSubmissionModal } from '../modals/AssignmentSubmissionModal';
import { AssignmentViewModal } from '../modals/AssignmentViewModal';
import { useColor } from '../../contexts/ColorContext';
import './secondary-hover.css';

export const StudentAssignments: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  // Datos simulados de tareas
  const assignments = [
    {
      id: '1',
      title: 'Ecuaciones Cuadráticas',
      description: 'Resolver los ejercicios 1-20 del capítulo 5. Incluir todos los pasos de resolución.',
      subject: 'Matemáticas',
      teacher: 'Prof. Ana Martínez',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-01-25T23:59:00'),
      assignedDate: new Date('2024-01-20T10:00:00'),
      points: 100,
      type: 'homework',
      attachments: ['ejercicios.pdf', 'formulas.pdf'],
      submittedFiles: [],
      grade: null,
      comments: null,
      isLate: false
    },
    {
      id: '2',
      title: 'Ensayo: Revolución Industrial',
      description: 'Escribir un ensayo de 5 páginas sobre el impacto de la Revolución Industrial en la sociedad moderna.',
      subject: 'Historia',
      teacher: 'Prof. Carlos Rodríguez',
      status: 'submitted',
      priority: 'medium',
      dueDate: new Date('2024-01-27T23:59:00'),
      assignedDate: new Date('2024-01-18T14:30:00'),
      points: 150,
      type: 'essay',
      attachments: ['guia-ensayo.pdf', 'bibliografia.pdf'],
      submittedFiles: [
        {
          id: '1',
          name: 'ensayo-revolucion-industrial.docx',
          size: '2.3 MB',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          uploadDate: new Date('2024-01-25T15:30:00'),
          url: '/submissions/ensayo-revolucion-industrial.docx'
        }
      ],
      grade: 4.5,
      comments: 'Excelente análisis, muy bien documentado.',
      isLate: false
    },
    {
      id: '3',
      title: 'Presentación Oral: Inglés',
      description: 'Preparar una presentación de 10 minutos sobre un tema de tu elección en inglés.',
      subject: 'Inglés',
      teacher: 'Prof. María González',
      status: 'pending',
      priority: 'high',
      dueDate: new Date('2024-01-30T14:00:00'),
      assignedDate: new Date('2024-01-22T09:15:00'),
      points: 80,
      type: 'presentation',
      attachments: ['rubrica-presentacion.pdf'],
      submittedFiles: [],
      grade: null,
      comments: null,
      isLate: false
    },
    {
      id: '4',
      title: 'Laboratorio: Ley de Hooke',
      description: 'Realizar el experimento de la Ley de Hooke y entregar el reporte con datos y análisis.',
      subject: 'Física',
      teacher: 'Prof. Luis Hernández',
      status: 'completed',
      priority: 'medium',
      dueDate: new Date('2024-01-15T23:59:00'),
      assignedDate: new Date('2024-01-10T11:00:00'),
      points: 120,
      type: 'lab',
      attachments: ['protocolo-laboratorio.pdf', 'hoja-datos.pdf'],
      submittedFiles: [
        {
          id: '4',
          name: 'reporte-ley-hooke.pdf',
          size: '1.2 MB',
          type: 'application/pdf',
          uploadDate: new Date('2024-01-15T22:30:00'),
          url: '/submissions/reporte-ley-hooke.pdf'
        },
        {
          id: '5',
          name: 'datos-experimento.xlsx',
          size: '856 KB',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          uploadDate: new Date('2024-01-15T22:31:00'),
          url: '/submissions/datos-experimento.xlsx'
        }
      ],
      grade: 4.2,
      comments: 'Buen trabajo experimental, análisis correcto.',
      isLate: false
    },
    {
      id: '5',
      title: 'Análisis de "El Quijote"',
      description: 'Leer los capítulos 1-5 de Don Quijote y escribir un análisis de los temas principales.',
      subject: 'Literatura',
      teacher: 'Prof. Carmen López',
      status: 'late',
      priority: 'low',
      dueDate: new Date('2024-01-12T23:59:00'),
      assignedDate: new Date('2024-01-05T16:45:00'),
      points: 90,
      type: 'analysis',
      attachments: ['texto-quijote.pdf', 'guia-analisis.pdf'],
      submittedFiles: [
        {
          id: '6',
          name: 'analisis-quijote.docx',
          size: '1.5 MB',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          uploadDate: new Date('2024-01-13T10:45:00'),
          url: '/submissions/analisis-quijote.docx'
        }
      ],
      grade: 3.8,
      comments: 'Análisis interesante, pero entregado tarde.',
      isLate: true
    },
    {
      id: '6',
      title: 'Problemas de Funciones',
      description: 'Resolver los problemas 1-15 de la página 45 del libro de texto.',
      subject: 'Matemáticas',
      teacher: 'Prof. Ana Martínez',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date('2024-02-02T23:59:00'),
      assignedDate: new Date('2024-01-25T08:30:00'),
      points: 60,
      type: 'homework',
      attachments: ['problemas-funciones.pdf'],
      submittedFiles: [],
      grade: null,
      comments: null,
      isLate: false
    },
    {
      id: '7',
      title: 'Proyecto Final: Análisis Estadístico',
      description: 'Realizar un análisis estadístico completo de un conjunto de datos y presentar los resultados.',
      subject: 'Matemáticas',
      teacher: 'Prof. Ana Martínez',
      status: 'completed',
      priority: 'high',
      dueDate: new Date('2024-01-25T23:59:00'),
      assignedDate: new Date('2024-01-15T14:00:00'),
      points: 200,
      type: 'project',
      attachments: ['datos-proyecto.xlsx', 'guia-analisis.pdf'],
      submittedFiles: [
        {
          id: '9',
          name: 'proyecto-matematicas.pdf',
          size: '1.8 MB',
          type: 'application/pdf',
          uploadDate: new Date('2024-01-25T15:30:00'),
          url: '/submissions/proyecto-matematicas.pdf'
        },
        {
          id: '10',
          name: 'presentacion-proyecto.pptx',
          size: '4.2 MB',
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          uploadDate: new Date('2024-01-25T15:31:00'),
          url: '/submissions/presentacion-proyecto.pptx'
        }
      ],
      grade: 4.8,
      comments: 'Muy buen trabajo en equipo, presentación clara y bien estructurada.',
      isLate: false
    }
  ];

  // Obtener materias únicas
  const uniqueSubjects = Array.from(new Set(assignments.map(a => a.subject)));
  const subjects = ['Todas las materias', ...uniqueSubjects];

  // Filtrar tareas por materia seleccionada y término de búsqueda
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSubject = selectedSubject === 'Todas las materias' || assignment.subject === selectedSubject;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'submitted': return Upload;
      case 'completed': return Check;
      case 'late': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'submitted': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'completed': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'late': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework': return FileText;
      case 'essay': return FileText;
      case 'presentation': return FileText;
      case 'lab': return FileText;
      case 'analysis': return FileText;
      case 'project': return FileText;
      default: return FileText;
    }
  };

  const handleSubmitAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setSubmissionModalOpen(true);
  };

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setViewModalOpen(true);
  };

  const handleSubmissionSubmit = (files: File[], comments: string) => {
    // Simular envío de tarea
    console.log('Enviando tarea:', { files, comments });
    setSubmissionModalOpen(false);
  };

  const handleDownloadAttachment = (fileName: string) => {
    // Simular descarga
    console.log('Descargando:', fileName);
  };

  const handleCreateAssignment = () => {
    // Esta funcionalidad no está disponible para estudiantes
    console.log('Crear tarea no disponible para estudiantes');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeRemaining = (dueDate: Date) => {
    const now = new Date();
    const diffInMs = dueDate.getTime() - now.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffInMs < 0) {
      return 'Vencida';
    } else if (diffInDays > 0) {
      return `${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      return 'Menos de 1 hora';
    }
  };

  // Estadísticas generales
  const totalAssignments = assignments.length;
  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const lateCount = assignments.filter(a => a.status === 'late').length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;

  // Estadísticas por materia (cuando se selecciona una materia)
  const subjectAssignments = selectedSubject !== 'Todas las materias' 
    ? assignments.filter(a => a.subject === selectedSubject) 
    : [];
  const subjectPendingCount = subjectAssignments.filter(a => a.status === 'pending').length;
  const subjectLateCount = subjectAssignments.filter(a => a.status === 'late').length;
  const subjectCompletedCount = subjectAssignments.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Tareas</h2>
          <p className="text-gray-600 dark:text-gray-300">Selecciona una materia para ver tus tareas</p>
        </div>
        {selectedSubject && (
          <div className="flex items-center space-x-2">
            <Button onClick={() => setSelectedSubject(null)} className="bg-blue-600 hover:bg-blue-700 text-white">
              ← Ir atrás
            </Button>
          </div>
        )}
      </div>

      {/* Panel de materias */}
      {!selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uniqueSubjects.map(subject => (
            <div key={subject} onClick={() => setSelectedSubject(subject)} className="cursor-pointer">
              <Card className="hover:shadow-lg transition-shadow border-2 border-transparent secondary-hover-border">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-900 dark:text-gray-200 mb-2 secondary-hover-icon" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{subject}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{assignments.filter(a => a.subject === subject).length} tareas</span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Si no hay materia seleccionada, mostrar mensaje */}
      {!selectedSubject && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Selecciona una materia para ver tus tareas.</div>
      )}

      {/* Si hay materia seleccionada, mostrar estadísticas y lista */}
      {selectedSubject && (
        <>
          {/* Eliminar el botón de Ir atrás aquí, ya que ahora está en el header */}
          {/* Estadísticas de la materia */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{subjectPendingCount}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Pendientes</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">{subjectCompletedCount}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Completadas</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-lg font-bold text-red-700 dark:text-red-300">{subjectLateCount}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Tardías</div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder={`Buscar tareas en ${selectedSubject}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de tareas */}
          <div className="space-y-4 mt-4">
            {filteredAssignments.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No se encontraron tareas en {selectedSubject}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => {
                const StatusIcon = getStatusIcon(assignment.status);
                const TypeIcon = getTypeIcon(assignment.type);
                const timeRemaining = formatTimeRemaining(assignment.dueDate);
                
                return (
                  <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {/* Header de la tarea */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getStatusColor(assignment.status)}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {assignment.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(assignment.priority)}`}>
                                {assignment.priority === 'high' ? 'Alta' : assignment.priority === 'medium' ? 'Media' : 'Baja'}
                              </span>
                              {assignment.isLate && (
                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded-full">
                                  Tardía
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              {assignment.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Información de la tarea */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {assignment.subject}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {assignment.teacher}
                          </div>
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            {assignment.points} puntos
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Vence: {formatDate(assignment.dueDate)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.status === 'pending' ? 'Pendiente' : 
                             assignment.status === 'submitted' ? 'Entregada' : 
                             assignment.status === 'completed' ? 'Completada' : 'Tardía'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {timeRemaining}
                          </div>
                        </div>
                      </div>

                      {/* Archivos adjuntos */}
                      {assignment.attachments.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos adjuntos:</h4>
                          <div className="flex flex-wrap gap-2">
                            {assignment.attachments.map((file, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadAttachment(file)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                {file}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Archivos entregados */}
                      {assignment.submittedFiles.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos entregados:</h4>
                          <div className="space-y-2">
                            {assignment.submittedFiles.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({file.size})</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {file.uploadDate.toLocaleDateString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Calificación */}
                      {assignment.grade && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">Calificación:</span>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">{assignment.grade}/5.0</span>
                          </div>
                          {assignment.comments && (
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{assignment.comments}</p>
                          )}
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        {assignment.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleSubmitAssignment(assignment)}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Entregar
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Modales */}
      {selectedAssignment && (
        <>
          <AssignmentSubmissionModal
            isOpen={submissionModalOpen}
            onClose={() => setSubmissionModalOpen(false)}
            assignment={selectedAssignment}
            onSubmit={handleSubmissionSubmit}
          />
          <AssignmentViewModal
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            assignment={selectedAssignment}
          />
        </>
      )}
    </div>
  );
};