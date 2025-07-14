import React, { useState } from 'react';
import { BookOpen, Users, ClipboardList, BarChart3, Calendar, Clock, TrendingUp, FileText, MessageSquare, Bell, Award, Target, Filter, Search, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useColor } from '../../contexts/ColorContext';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Datos simulados del estudiante
  const studentData = {
    currentGrade: '10mo A',
    totalSubjects: 6,
    averageGrade: 4.2,
    attendanceRate: 95.5,
    pendingAssignments: 3,
    completedAssignments: 12,
    upcomingClasses: 4,
    totalClasses: 15
  };

  const recentActivity = [
    { type: 'grade', title: 'Nueva calificación', subject: 'Matemáticas', grade: 4.5, time: '2h ago', id: '1' },
    { type: 'assignment', title: 'Tarea entregada', subject: 'Historia', time: '4h ago', id: '2' },
    { type: 'material', title: 'Material disponible', subject: 'Inglés', time: '1d ago', id: '3' },
    { type: 'forum', title: 'Respuesta en foro', subject: 'Física', time: '2d ago', id: '4' }
  ];

  const upcomingClasses = [
    { subject: 'Matemáticas', time: '08:00', classroom: 'Aula 201', teacher: 'Prof. Ana', id: '1' },
    { subject: 'Historia', time: '10:30', classroom: 'Aula 105', teacher: 'Prof. Carlos', id: '2' },
    { subject: 'Inglés', time: '14:00', classroom: 'Lab de Idiomas', teacher: 'Prof. María', id: '3' }
  ];

  const pendingAssignments = [
    { id: '1', title: 'Ecuaciones Cuadráticas', subject: 'Matemáticas', dueDate: new Date('2024-01-25'), priority: 'high' },
    { id: '2', title: 'Ensayo: Revolución Industrial', subject: 'Historia', dueDate: new Date('2024-01-27'), priority: 'medium' },
    { id: '3', title: 'Presentación Oral', subject: 'Inglés', dueDate: new Date('2024-01-30'), priority: 'low' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade': return BarChart3;
      case 'assignment': return ClipboardList;
      case 'material': return BookOpen;
      case 'forum': return MessageSquare;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'grade': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'assignment': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      case 'material': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400';
      case 'forum': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Funciones de navegación con feedback
  const handleNavigate = (path: string) => {
    addToast({
      type: 'info',
      title: 'Navegando...',
      message: `Redirigiendo a ${path}`,
      duration: 2000
    });
    navigate(path);
  };

  const handleViewAssignment = (assignmentId: string) => {
    addToast({
      type: 'success',
      title: 'Tarea encontrada',
      message: 'Redirigiendo a los detalles de la tarea',
      duration: 3000
    });
    navigate(`/assignments/${assignmentId}`);
  };

  const handleViewClass = (classId: string) => {
    addToast({
      type: 'info',
      title: 'Horario',
      message: 'Mostrando detalles de la clase',
      duration: 2000
    });
    navigate(`/schedule?class=${classId}`);
  };

  const handleViewActivity = (activityId: string) => {
    // Navegar según el tipo de actividad
    const activity = recentActivity.find(a => a.id === activityId);
    if (activity) {
      addToast({
        type: 'info',
        title: 'Actividad encontrada',
        message: `Navegando a ${activity.subject}`,
        duration: 2000
      });
      
      switch (activity.type) {
        case 'grade':
          navigate('/grades');
          break;
        case 'assignment':
          navigate('/assignments');
          break;
        case 'material':
          navigate('/materials');
          break;
        case 'forum':
          navigate('/forums');
          break;
      }
    }
  };

  const handleQuickAction = (action: string) => {
    addToast({
      type: 'success',
      title: 'Acción completada',
      message: `Acción "${action}" ejecutada exitosamente`,
      duration: 3000
    });
  };

  const handleErrorAction = () => {
    addToast({
      type: 'error',
      title: 'Error',
      message: 'No se pudo completar la acción. Inténtalo de nuevo.',
      duration: 5000,
      action: {
        label: 'Reintentar',
        onClick: () => {
          addToast({
            type: 'success',
            title: 'Reintentado',
            message: 'Acción completada en el segundo intento',
            duration: 3000
          });
        }
      }
    });
  };

  // Filtros
  const filteredActivity = recentActivity.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredAssignments = pendingAssignments.filter(assignment => {
    return assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredClasses = upcomingClasses.filter(classItem => {
    return classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Saludo personalizado */}
      <div className={`bg-gradient-to-r ${secondaryClasses.bg} to-${secondaryClasses.bg.replace('bg-', '')} rounded-xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {user?.firstName}! 🎓
        </h2>
        <p className="text-white/80 mb-4">
          Aquí tienes un resumen de tu actividad académica
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{studentData.totalSubjects}</p>
            <p className="text-sm text-blue-100">Materias</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{studentData.averageGrade}/5.0</p>
            <p className="text-sm text-blue-100">Promedio</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{studentData.pendingAssignments}</p>
            <p className="text-sm text-blue-100">Tareas Pendientes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{studentData.attendanceRate}%</p>
            <p className="text-sm text-blue-100">Asistencia</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Promedio General</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studentData.averageGrade}/5.0</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasa de Asistencia</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{studentData.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tareas Completadas</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{studentData.completedAssignments}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Clases Hoy</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{studentData.upcomingClasses}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Clases */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Próximas Clases
              </h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleNavigate('/schedule')}
              >
                Ver Todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => handleViewClass(classItem.id)}>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{classItem.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {classItem.time} • {classItem.classroom}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {classItem.teacher}
                    </p>
                  </div>
                  <div className="text-right">
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tareas Pendientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <ClipboardList className="h-5 w-5 mr-2" />
                Tareas Pendientes
              </h3>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleNavigate('/assignments')}
              >
                Ver Todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => handleViewAssignment(assignment.id)}>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.subject}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Vence: {assignment.dueDate.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority === 'high' ? 'Alta' : assignment.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                    <Button size="sm" className="mt-1">
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Actividad Reciente
              </h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Buscar actividad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-48"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todas</option>
                  <option value="grade">Calificaciones</option>
                  <option value="assignment">Tareas</option>
                  <option value="material">Material</option>
                  <option value="forum">Foros</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => handleViewActivity(activity.id)}>
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{activity.subject}</p>
                      {activity.grade && (
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium">Calificación: {activity.grade}/5.0</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Acciones Rápidas */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Acciones Rápidas
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/schedule')}
              >
                <Calendar className="h-5 w-5 mb-1" />
                <span className="text-xs">Mi Horario</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/materials')}
              >
                <BookOpen className="h-5 w-5 mb-1" />
                <span className="text-xs">Material de Estudio</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/forums')}
              >
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">Foros de Discusión</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/notifications')}
              >
                <Bell className="h-5 w-5 mb-1" />
                <span className="text-xs">Notificaciones</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/assignments')}
              >
                <ClipboardList className="h-5 w-5 mb-1" />
                <span className="text-xs">Mis Tareas</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/grades')}
              >
                <BarChart3 className="h-5 w-5 mb-1" />
                <span className="text-xs">Mis Calificaciones</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/reports')}
              >
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-xs">Reportes</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex-col p-2"
                onClick={() => handleNavigate('/calendar')}
              >
                <Award className="h-5 w-5 mb-1" />
                <span className="text-xs">Calendario</span>
              </Button>
              <Button onClick={() => navigate('/messages')}>
                <Mail className="h-5 w-5 mr-2" />
                Mensajería
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas con feedback */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Acciones Rápidas</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => handleQuickAction('Ver horario')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Ver Horario</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleQuickAction('Ver tareas')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Ver Tareas</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleQuickAction('Ver calificaciones')}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Ver Calificaciones</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleErrorAction}
              className="h-20 flex flex-col items-center justify-center space-y-2"
            >
              <Award className="h-6 w-6" />
              <span className="text-sm">Simular Error</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};