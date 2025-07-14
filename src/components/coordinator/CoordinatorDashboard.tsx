import React from 'react';
import { Users, BookOpen, ClipboardList, BarChart3, Calendar, Clock, TrendingUp, FileText, MessageSquare, Bell, Settings, Award, Target, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useColor } from '../../contexts/ColorContext';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const CoordinatorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();

  // Datos simulados del coordinador
  const coordinatorData = {
    totalStudents: 450,
    totalTeachers: 25,
    totalSubjects: 15,
    activeAssignments: 45,
    averageGpa: 4.2,
    attendanceRate: 94.5,
    pendingApprovals: 8,
    upcomingEvents: 3
  };

  const recentActivity = [
    { type: 'student', title: 'Nuevo estudiante registrado', details: 'María López - 10mo A', time: '1h ago' },
    { type: 'teacher', title: 'Docente asignado a materia', details: 'Prof. Ana Martínez - Matemáticas', time: '2h ago' },
    { type: 'grade', title: 'Reporte de calificaciones', details: '10mo A - Promedio 4.1', time: '4h ago' },
    { type: 'event', title: 'Evento académico programado', details: 'Feria de Ciencias - 25 Ene', time: '1d ago' }
  ];

  const pendingApprovals = [
    { id: '1', type: 'student', title: 'Solicitud de cambio de materia', student: 'Juan Pérez', status: 'pending' },
    { id: '2', type: 'teacher', title: 'Aprobación de material didáctico', teacher: 'Prof. Carlos', status: 'pending' },
    { id: '3', type: 'event', title: 'Autorización de salida educativa', teacher: 'Prof. Ana', status: 'pending' },
    { id: '4', type: 'grade', title: 'Revisión de calificaciones', teacher: 'Prof. Luis', status: 'pending' }
  ];

  const upcomingEvents = [
    { title: 'Reunión de Padres', date: '2024-01-25', time: '18:00', type: 'meeting' },
    { title: 'Feria de Ciencias', date: '2024-01-28', time: '09:00', type: 'event' },
    { title: 'Evaluación Docente', date: '2024-02-01', time: '14:00', type: 'evaluation' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return Users;
      case 'teacher': return BookOpen;
      case 'grade': return BarChart3;
      case 'event': return Calendar;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'student': return 'text-blue-600 bg-blue-50';
      case 'teacher': return 'text-green-600 bg-green-50';
      case 'grade': return 'text-purple-600 bg-purple-50';
      case 'event': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Saludo personalizado */}
      <div className={`bg-gradient-to-r ${secondaryClasses.bg} to-${secondaryClasses.bg.replace('bg-', '')} rounded-xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {user?.firstName}! 🎓
        </h2>
        <p className="text-white/80 mb-4">
          Panel de coordinación académica
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{coordinatorData.totalStudents}</p>
            <p className="text-sm text-purple-100">Estudiantes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{coordinatorData.totalTeachers}</p>
            <p className="text-sm text-purple-100">Docentes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{coordinatorData.totalSubjects}</p>
            <p className="text-sm text-purple-100">Materias</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{coordinatorData.pendingApprovals}</p>
            <p className="text-sm text-purple-100">Pendientes</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-purple-600">{coordinatorData.averageGpa}/5.0</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasa de Asistencia</p>
                <p className="text-2xl font-bold text-green-600">{coordinatorData.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tareas Activas</p>
                <p className="text-2xl font-bold text-blue-600">{coordinatorData.activeAssignments}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Próximos Eventos</p>
                <p className="text-2xl font-bold text-orange-600">{coordinatorData.upcomingEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Solicitudes Pendientes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Solicitudes Pendientes
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{approval.title}</h4>
                    <p className="text-sm text-gray-600">{approval.student || approval.teacher}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(approval.status)}`}>
                      {approval.status === 'pending' ? 'Pendiente' : approval.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      Revisar
                    </Button>
                    <Button size="sm">
                      Aprobar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Próximos Eventos */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Próximos Eventos
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('es-ES')} • {event.time}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{event.type}</p>
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
                      <p className="text-sm text-gray-600">{activity.details}</p>
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
                <Users className="h-6 w-6 mb-2" />
                Gestionar Estudiantes
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                Gestionar Docentes
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                Reportes
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                Eventos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos Específicos del Coordinador */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Módulos de Coordinación</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Gestión Estudiantil
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              Gestión Docente
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ClipboardList className="h-6 w-6 mb-2" />
              Gestión Académica
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Reportes
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Eventos
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Documentación
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              Aprobaciones
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};