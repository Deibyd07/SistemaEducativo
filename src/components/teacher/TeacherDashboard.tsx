import React from 'react';
import { BookOpen, Users, ClipboardList, BarChart3, Calendar, Clock, TrendingUp, FileText, MessageSquare, Bell, Award, Target, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useColor } from '../../contexts/ColorContext';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const navigate = useNavigate();

  // Datos simulados del docente
  const teacherData = {
    totalStudents: 45,
    totalSubjects: 3,
    activeAssignments: 8,
    averageGrade: 4.1,
    attendanceRate: 92.5,
    pendingGrading: 12,
    upcomingClasses: 4,
    totalClasses: 15
  };

  const recentActivity = [
    { type: 'assignment', title: 'Nueva tarea: Ensayo de Historia', subject: 'Historia', time: '2h ago' },
    { type: 'grade', title: 'Calificaciones publicadas', subject: 'Matemáticas', time: '4h ago' },
    { type: 'material', title: 'Material subido', subject: 'Inglés', time: '1d ago' },
    { type: 'forum', title: 'Respuesta en foro', subject: 'Física', time: '2d ago' }
  ];

  const upcomingClasses = [
    { subject: 'Matemáticas', time: '08:00', classroom: 'Aula 201', students: 15 },
    { subject: 'Historia', time: '10:30', classroom: 'Aula 105', students: 18 },
    { subject: 'Inglés', time: '14:00', classroom: 'Lab de Idiomas', students: 12 }
  ];

  const pendingAssignments = [
    { id: '1', title: 'Ecuaciones Cuadráticas', subject: 'Matemáticas', dueDate: new Date('2024-01-25'), submissions: 8, total: 15 },
    { id: '2', title: 'Ensayo: Revolución Industrial', subject: 'Historia', dueDate: new Date('2024-01-27'), submissions: 12, total: 18 },
    { id: '3', title: 'Presentación Oral', subject: 'Inglés', dueDate: new Date('2024-01-30'), submissions: 5, total: 12 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return ClipboardList;
      case 'grade': return BarChart3;
      case 'material': return BookOpen;
      case 'forum': return MessageSquare;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'text-blue-600 bg-blue-50';
      case 'grade': return 'text-green-600 bg-green-50';
      case 'material': return 'text-purple-600 bg-purple-50';
      case 'forum': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Saludo personalizado */}
      <div className={`bg-gradient-to-r ${secondaryClasses.bg} to-${secondaryClasses.bg.replace('bg-', '')} rounded-xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {user?.firstName}! 👨‍🏫
        </h2>
        <p className="text-white/80 mb-4">
          Aquí tienes un resumen de tu actividad docente
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{teacherData.totalStudents}</p>
            <p className="text-sm text-green-100">Estudiantes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{teacherData.totalSubjects}</p>
            <p className="text-sm text-green-100">Materias</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{teacherData.activeAssignments}</p>
            <p className="text-sm text-green-100">Tareas Activas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{teacherData.pendingGrading}</p>
            <p className="text-sm text-green-100">Por Calificar</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio de Calificaciones</p>
                <p className="text-2xl font-bold text-green-600">{teacherData.averageGrade}/5.0</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de Asistencia</p>
                <p className="text-2xl font-bold text-blue-600">{teacherData.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clases Hoy</p>
                <p className="text-2xl font-bold text-purple-600">{teacherData.upcomingClasses}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Clases</p>
                <p className="text-2xl font-bold text-orange-600">{teacherData.totalClasses}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Clases */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Próximas Clases
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{classItem.subject}</h4>
                    <p className="text-sm text-gray-600">
                      {classItem.time} • {classItem.classroom}
                    </p>
                    <p className="text-xs text-gray-500">
                      {classItem.students} estudiantes
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

        {/* Tareas Pendientes de Revisión */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Tareas por Revisar
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                    <p className="text-xs text-gray-500">
                      Vence: {assignment.dueDate.toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      {assignment.submissions}/{assignment.total}
                    </p>
                    <p className="text-xs text-gray-500">Entregadas</p>
                    <Button size="sm" className="mt-1">
                      Revisar
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
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Actividad Reciente
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.subject}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Acciones Rápidas
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <ClipboardList className="h-6 w-6 mb-2" />
                Crear Tarea
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                Calificar
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                Subir Material
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                Foros
              </Button>
              <Button onClick={() => navigate('/messages')}>
                <Mail className="h-5 w-5 mr-2" />
                Mensajería
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos Específicos del Docente */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Módulos Docentes</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Mis Estudiantes
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              Mis Materias
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ClipboardList className="h-6 w-6 mb-2" />
              Gestión de Tareas
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Calificaciones
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Horario
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Reportes
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Foros Académicos
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              Notificaciones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};