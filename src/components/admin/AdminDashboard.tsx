import React from 'react';
import { Users, BookOpen, ClipboardList, BarChart3, Calendar, Clock, TrendingUp, FileText, MessageSquare, Bell, Settings, Award, Target, Shield, Building, DollarSign, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Datos simulados de administración
  const adminData = {
    totalStudents: 1200,
    totalTeachers: 85,
    totalSubjects: 45,
    totalDepartments: 8,
    averageGpa: 4.1,
    attendanceRate: 95.2,
    budgetUtilization: 78.5,
    pendingApprovals: 15,
    upcomingEvents: 5,
    activeProjects: 12
  };

  const recentActivity = [
    { type: 'financial', title: 'Aprobación de presupuesto', details: 'Departamento de Ciencias - $15,000', time: '1h ago' },
    { type: 'personnel', title: 'Nuevo docente contratado', details: 'Prof. María González - Matemáticas', time: '2h ago' },
    { type: 'academic', title: 'Evaluación de programa', details: 'Programa de Inglés - Resultados positivos', time: '4h ago' },
    { type: 'infrastructure', title: 'Mantenimiento programado', details: 'Laboratorio de Física - 25 Ene', time: '1d ago' }
  ];

  const pendingApprovals = [
    { id: '1', type: 'financial', title: 'Solicitud de presupuesto', department: 'Departamento de Arte', amount: '$8,500', status: 'pending' },
    { id: '2', type: 'personnel', title: 'Contratación docente', department: 'Departamento de Ciencias', position: 'Profesor de Física', status: 'pending' },
    { id: '3', type: 'infrastructure', title: 'Renovación de equipos', department: 'Laboratorio de Informática', amount: '$12,000', status: 'pending' },
    { id: '4', type: 'academic', title: 'Nuevo programa académico', department: 'Coordinación Académica', program: 'Programa de Robótica', status: 'pending' }
  ];

  const upcomingEvents = [
    { title: 'Junta Directiva', date: '2024-01-25', time: '16:00', type: 'meeting' },
    { title: 'Auditoría Financiera', date: '2024-01-28', time: '09:00', type: 'audit' },
    { title: 'Evaluación Institucional', date: '2024-02-01', time: '14:00', type: 'evaluation' },
    { title: 'Reunión con Padres', date: '2024-02-05', time: '18:00', type: 'meeting' }
  ];

  const departmentStats = [
    { name: 'Ciencias Exactas', students: 180, teachers: 12, budget: '$45,000', performance: 92 },
    { name: 'Ciencias Sociales', students: 220, teachers: 15, budget: '$38,000', performance: 88 },
    { name: 'Idiomas', students: 200, teachers: 10, budget: '$32,000', performance: 95 },
    { name: 'Arte y Cultura', students: 150, teachers: 8, budget: '$28,000', performance: 85 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'financial': return DollarSign;
      case 'personnel': return UserCheck;
      case 'academic': return BookOpen;
      case 'infrastructure': return Building;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'financial': return 'text-green-600 bg-green-50';
      case 'personnel': return 'text-blue-600 bg-blue-50';
      case 'academic': return 'text-purple-600 bg-purple-50';
      case 'infrastructure': return 'text-orange-600 bg-orange-50';
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
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {user?.firstName}! 🏛️
        </h2>
        <p className="text-indigo-100 mb-4">
          Panel de administración institucional
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{adminData.totalStudents}</p>
            <p className="text-sm text-indigo-100">Estudiantes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{adminData.totalTeachers}</p>
            <p className="text-sm text-indigo-100">Docentes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{adminData.totalDepartments}</p>
            <p className="text-sm text-indigo-100">Departamentos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{adminData.pendingApprovals}</p>
            <p className="text-sm text-indigo-100">Pendientes</p>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio Institucional</p>
                <p className="text-2xl font-bold text-indigo-600">{adminData.averageGpa}/5.0</p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Asistencia General</p>
                <p className="text-2xl font-bold text-green-600">{adminData.attendanceRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilización Presupuesto</p>
                <p className="text-2xl font-bold text-blue-600">{adminData.budgetUtilization}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Proyectos Activos</p>
                <p className="text-2xl font-bold text-orange-600">{adminData.activeProjects}</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aprobaciones Pendientes */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Aprobaciones Pendientes
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{approval.title}</h4>
                    <p className="text-sm text-gray-600">{approval.department}</p>
                    <p className="text-xs text-gray-500">
                      {approval.amount || approval.position || approval.program}
                    </p>
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

        {/* Estadísticas por Departamento */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Rendimiento por Departamento
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentStats.map((dept, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{dept.name}</h4>
                    <span className="text-sm font-bold text-green-600">{dept.performance}%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                    <div>
                      <p className="font-medium">{dept.students}</p>
                      <p className="text-xs">Estudiantes</p>
                    </div>
                    <div>
                      <p className="font-medium">{dept.teachers}</p>
                      <p className="text-xs">Docentes</p>
                    </div>
                    <div>
                      <p className="font-medium">{dept.budget}</p>
                      <p className="text-xs">Presupuesto</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${dept.performance}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Módulos Específicos de Administración */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Módulos de Administración</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Gestión Estudiantil
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <UserCheck className="h-6 w-6 mb-2" />
              Gestión Docente
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Building className="h-6 w-6 mb-2" />
              Gestión Institucional
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              Finanzas
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Reportes Ejecutivos
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Eventos Institucionales
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