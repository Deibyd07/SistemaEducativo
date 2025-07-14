import React from 'react';
import { Users, GraduationCap, BookOpen, ClipboardList } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useColor } from '../../contexts/ColorContext';
import { StatCard } from './StatCard';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();

  // Datos simulados - en producción vendrían de la API
  const stats = {
    totalStudents: 1247,
    totalTeachers: 89,
    totalSubjects: 45,
    activeAssignments: 23,
    averageGpa: 3.8,
    attendanceRate: 94.5
  };

  const recentActivity = [
    { id: '1', type: 'grade', title: 'Nueva calificación agregada', description: 'Matemáticas - Juan Pérez', time: '2 min ago' },
    { id: '2', type: 'assignment', title: 'Tarea entregada', description: 'Historia - Ana García', time: '5 min ago' },
    { id: '3', type: 'enrollment', title: 'Nuevo estudiante inscrito', description: 'Carlos Rodríguez - 10mo A', time: '1 hora ago' },
    { id: '4', type: 'grade', title: 'Reporte generado', description: 'Boletín del 2do período', time: '2 horas ago' }
  ];

  const upcomingEvents = [
    { id: '1', title: 'Reunión de padres', date: '2024-01-15', time: '14:00' },
    { id: '2', title: 'Examen final - Matemáticas', date: '2024-01-18', time: '08:00' },
    { id: '3', title: 'Consejo académico', date: '2024-01-20', time: '10:00' },
    { id: '4', title: 'Graduación 11vo', date: '2024-01-25', time: '16:00' }
  ];

  const getRoleSpecificGreeting = () => {
    switch (user?.role) {
      case 'student':
        return `¡Bienvenido, ${user.firstName}! Aquí tienes un resumen de tu progreso académico.`;
      case 'teacher':
        return `¡Hola, Profesor(a) ${user.lastName}! Gestiona tus clases y estudiantes desde aquí.`;
      case 'coordinator':
        return `¡Bienvenido, ${user.firstName}! Panel de coordinación académica.`;
      case 'rector':
        return `¡Bienvenido, ${user.firstName}! Vista general del estado institucional.`;
      default:
        return `¡Bienvenido, ${user?.firstName}!`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Saludo personalizado */}
      <div className={`bg-gradient-to-r ${secondaryClasses.bg} to-${secondaryClasses.bg.replace('bg-', '')} rounded-xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2">
          {getRoleSpecificGreeting()}
        </h2>
        <p className="text-white/80">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Estudiantes"
          value={stats.totalStudents}
          change={5.2}
          changeType="increase"
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Total Docentes"
          value={stats.totalTeachers}
          change={2.1}
          changeType="increase"
          icon={<GraduationCap className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Materias Activas"
          value={stats.totalSubjects}
          icon={<BookOpen className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Tareas Pendientes"
          value={stats.activeAssignments}
          change={3.8}
          changeType="decrease"
          icon={<ClipboardList className="h-6 w-6" />}
          color="red"
        />
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Métricas Académicas</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Promedio General</span>
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.averageGpa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tasa de Asistencia</span>
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.attendanceRate}%</span>
              </div>
              <div className="pt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.attendanceRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Próximos Eventos</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.date} - {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Actividad Reciente</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className={`w-2 h-2 ${secondaryClasses.bg} rounded-full mt-2`}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demostración del color secundario */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Demostración del Color Secundario</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              El color secundario actual se aplica a los botones primarios y otros elementos de la interfaz.
            </p>
            <div className="flex space-x-3">
              <Button variant="primary">
                Botón Primario
              </Button>
              <Button variant="outline">
                Botón Outline
              </Button>
              <Button variant="secondary">
                Botón Secundario
              </Button>
            </div>
            <div className={`p-4 ${secondaryClasses.bg} rounded-lg text-white`}>
              <p className="font-medium">Este es un ejemplo del color secundario aplicado a un contenedor.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};