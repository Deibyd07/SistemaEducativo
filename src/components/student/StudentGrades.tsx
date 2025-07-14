import React, { useState } from 'react';
import { BarChart3, Search, TrendingUp, TrendingDown, Minus, BookOpen, Calendar, User, Star, Award, Target, Eye, Download, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useColor } from '../../contexts/ColorContext';
import './secondary-hover.css';

export const StudentGrades: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Datos simulados de calificaciones
  const grades = [
    {
      id: '1',
      subject: 'Matemáticas',
      teacher: 'Prof. Ana Martínez',
      type: 'exam',
      title: 'Examen: Ecuaciones Cuadráticas',
      grade: 4.5,
      maxGrade: 5.0,
      percentage: 90,
      date: new Date('2024-01-20'),
      period: 'Q1',
      weight: 30,
      comments: 'Excelente trabajo en la resolución de ecuaciones. Muy buen dominio de la fórmula general.',
      isLatest: true
    },
    {
      id: '2',
      subject: 'Historia',
      teacher: 'Prof. Carlos Rodríguez',
      type: 'project',
      title: 'Proyecto: Revolución Industrial',
      grade: 4.8,
      maxGrade: 5.0,
      percentage: 96,
      date: new Date('2024-01-18'),
      period: 'Q1',
      weight: 25,
      comments: 'Análisis muy completo y bien documentado. Excelente presentación.',
      isLatest: true
    },
    {
      id: '3',
      subject: 'Inglés',
      teacher: 'Prof. María González',
      type: 'quiz',
      title: 'Quiz: Present Perfect',
      grade: 3.8,
      maxGrade: 5.0,
      percentage: 76,
      date: new Date('2024-01-15'),
      period: 'Q1',
      weight: 15,
      comments: 'Buen trabajo, pero necesitas practicar más los tiempos verbales.',
      isLatest: true
    },
    {
      id: '4',
      subject: 'Física',
      teacher: 'Prof. Luis Hernández',
      type: 'lab',
      title: 'Laboratorio: Ley de Hooke',
      grade: 4.2,
      maxGrade: 5.0,
      percentage: 84,
      date: new Date('2024-01-12'),
      period: 'Q1',
      weight: 20,
      comments: 'Buen manejo del laboratorio. Datos precisos y análisis correcto.',
      isLatest: true
    },
    {
      id: '5',
      subject: 'Literatura',
      teacher: 'Prof. Carmen López',
      type: 'essay',
      title: 'Ensayo: Análisis de "El Quijote"',
      grade: 4.0,
      maxGrade: 5.0,
      percentage: 80,
      date: new Date('2024-01-10'),
      period: 'Q1',
      weight: 25,
      comments: 'Análisis interesante, pero podrías profundizar más en los temas.',
      isLatest: true
    },
    {
      id: '6',
      subject: 'Matemáticas',
      teacher: 'Prof. Ana Martínez',
      type: 'homework',
      title: 'Tarea: Funciones Lineales',
      grade: 4.7,
      maxGrade: 5.0,
      percentage: 94,
      date: new Date('2024-01-08'),
      period: 'Q1',
      weight: 10,
      comments: 'Muy bien resuelto. Excelente comprensión del tema.',
      isLatest: false
    },
    {
      id: '7',
      subject: 'Historia',
      teacher: 'Prof. Carlos Rodríguez',
      type: 'presentation',
      title: 'Presentación: Edad Media',
      grade: 4.3,
      maxGrade: 5.0,
      percentage: 86,
      date: new Date('2024-01-05'),
      period: 'Q1',
      weight: 20,
      comments: 'Buena presentación, bien estructurada y clara.',
      isLatest: false
    },
    {
      id: '8',
      subject: 'Inglés',
      teacher: 'Prof. María González',
      type: 'oral',
      title: 'Examen Oral: Conversación',
      grade: 4.1,
      maxGrade: 5.0,
      percentage: 82,
      date: new Date('2024-01-03'),
      period: 'Q1',
      weight: 20,
      comments: 'Buena pronunciación, pero necesitas mejorar la fluidez.',
      isLatest: false
    }
  ];

  // Materias únicas
  const uniqueSubjects = Array.from(new Set(grades.map(g => g.subject)));

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'exam': return BarChart3;
      case 'quiz': return BookOpen;
      case 'project': return Award;
      case 'homework': return BookOpen;
      case 'lab': return BarChart3;
      case 'essay': return BookOpen;
      case 'presentation': return Award;
      case 'oral': return User;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20';
      case 'quiz': return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20';
      case 'project': return 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20';
      case 'homework': return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20';
      case 'lab': return 'text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20';
      case 'essay': return 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20';
      case 'presentation': return 'text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/20';
      case 'oral': return 'text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700';
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20';
    if (percentage >= 80) return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20';
    if (percentage >= 70) return 'text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20';
  };

  const getGradeTrend = (grade: number, previousGrade?: number) => {
    if (!previousGrade) return Minus;
    if (grade > previousGrade) return TrendingUp;
    if (grade < previousGrade) return TrendingDown;
    return Minus;
  };

  const handleViewDetails = (gradeId: string) => {
    const grade = grades.find(g => g.id === gradeId);
    if (grade) {
      setSelectedGrade(grade);
      setDetailsModalOpen(true);
    }
  };

  const handleDownloadReport = () => {
    setReportModalOpen(true);
  };

  const handleGenerateReport = (format: string) => {
    console.log(`Generando reporte en formato ${format} para ${selectedSubject}`);
    
    // Simular generación de reporte
    setTimeout(() => {
      alert(`Reporte de calificaciones de ${selectedSubject} generado exitosamente en formato ${format}`);
      setReportModalOpen(false);
    }, 2000);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedGrade(null);
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
  };

  // Filtrar calificaciones por materia seleccionada y término de búsqueda
  const filteredGrades = grades.filter(grade => {
    const matchesSubject = selectedSubject === null || grade.subject === selectedSubject;
    const matchesSearch = grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Calcular estadísticas
  const totalGrades = filteredGrades.length;
  const averageGrade = totalGrades > 0 
    ? (filteredGrades.reduce((sum, g) => sum + g.grade, 0) / totalGrades).toFixed(1)
    : 0;
  const highestGrade = totalGrades > 0 ? Math.max(...filteredGrades.map(g => g.grade)) : 0;
  const lowestGrade = totalGrades > 0 ? Math.min(...filteredGrades.map(g => g.grade)) : 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatGrade = (grade: number) => {
    return grade.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Calificaciones</h2>
          <p className="text-gray-600 dark:text-gray-300">Revisa tu progreso académico por materia</p>
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
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {grades.filter(g => g.subject === subject).length} calificaciones
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Si no hay materia seleccionada, mostrar mensaje */}
      {!selectedSubject && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Selecciona una materia para ver tus calificaciones.
        </div>
      )}

      {/* Si hay materia seleccionada, mostrar estadísticas y lista */}
      {selectedSubject && (
        <>
          {/* Estadísticas de la materia */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{averageGrade}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Promedio</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{totalGrades}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Total</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{formatGrade(highestGrade)}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Más Alta</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-700 dark:text-red-300">{formatGrade(lowestGrade)}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Más Baja</div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder={`Buscar calificaciones en ${selectedSubject}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de calificaciones */}
          <div className="space-y-4">
            {filteredGrades.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No se encontraron calificaciones en {selectedSubject}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              filteredGrades.map((grade) => {
                const TypeIcon = getTypeIcon(grade.type);
                const TrendIcon = getGradeTrend(grade.grade);
                
                return (
                  <Card key={grade.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(grade.type)}`}>
                            <TypeIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {grade.title}
                              </h3>
                              {grade.isLatest && (
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                                  Reciente
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 mr-1" />
                                {grade.subject}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {grade.teacher}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(grade.date)}
                              </div>
                              <div className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                Peso: {grade.weight}%
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(grade.percentage)} px-3 py-1 rounded-lg`}>
                            {formatGrade(grade.grade)}/{grade.maxGrade}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {grade.percentage}%
                          </div>
                          <div className="flex items-center justify-end mt-1">
                            <TrendIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          </div>
                        </div>
                      </div>

                      {/* Comentarios */}
                      {grade.comments && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{grade.comments}</p>
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails(grade.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalles
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleDownloadReport}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Generar Reporte
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Modal de detalles */}
      {selectedGrade && detailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detalles de Calificación</h3>
              <button
                onClick={handleCloseDetailsModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Título:</span>
                <p className="text-gray-900 dark:text-white">{selectedGrade.title}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Materia:</span>
                <p className="text-gray-900 dark:text-white">{selectedGrade.subject}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Docente:</span>
                <p className="text-gray-900 dark:text-white">{selectedGrade.teacher}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calificación:</span>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatGrade(selectedGrade.grade)}/{selectedGrade.maxGrade}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Porcentaje:</span>
                <p className="text-gray-900 dark:text-white">{selectedGrade.percentage}%</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Fecha:</span>
                <p className="text-gray-900 dark:text-white">{formatDate(selectedGrade.date)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Peso:</span>
                <p className="text-gray-900 dark:text-white">{selectedGrade.weight}%</p>
              </div>
              {selectedGrade.comments && (
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Comentarios:</span>
                  <p className="text-gray-900 dark:text-white mt-1">{selectedGrade.comments}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de reporte */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generar Reporte</h3>
              <button
                onClick={handleCloseReportModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                Selecciona el formato para generar el reporte de calificaciones de {selectedSubject}:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleGenerateReport('PDF')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button
                  onClick={() => handleGenerateReport('Excel')}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};