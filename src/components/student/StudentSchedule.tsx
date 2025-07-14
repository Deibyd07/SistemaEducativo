import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ClassSchedule } from '../../types';

export const StudentSchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Datos simulados del horario
  const schedule: ClassSchedule[] = [
    {
      id: '1',
      subjectId: '1',
      dayOfWeek: 1, // Lunes
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Aula 201'
    },
    {
      id: '2',
      subjectId: '2',
      dayOfWeek: 1,
      startTime: '09:45',
      endTime: '11:15',
      classroom: 'Aula 105'
    },
    {
      id: '3',
      subjectId: '3',
      dayOfWeek: 2, // Martes
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Lab de Idiomas'
    },
    {
      id: '4',
      subjectId: '4',
      dayOfWeek: 3, // Miércoles
      startTime: '10:00',
      endTime: '11:30',
      classroom: 'Lab de Ciencias'
    }
  ];

  // Datos simulados de materias y profesores
  const subjects = {
    '1': { name: 'Matemáticas', teacher: 'María González' },
    '2': { name: 'Historia', teacher: 'Carlos Rodríguez' },
    '3': { name: 'Inglés', teacher: 'Ana Martínez' },
    '4': { name: 'Física', teacher: 'Luis Hernández' }
  };

  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const timeSlots = [
    '08:00', '08:45', '09:30', '10:15', '11:00', '11:45',
    '12:30', '13:15', '14:00', '14:45', '15:30', '16:15'
  ];

  const getClassesForDay = (dayOfWeek: number) => {
    return schedule.filter(cls => cls.dayOfWeek === dayOfWeek);
  };

  const getCurrentDayClass = (dayOfWeek: number, timeSlot: string) => {
    return schedule.find(cls => 
      cls.dayOfWeek === dayOfWeek && 
      cls.startTime <= timeSlot && 
      cls.endTime > timeSlot
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (subjectName: string) => {
    const colors = {
      'Matemáticas': 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700',
      'Historia': 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700',
      'Inglés': 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700',
      'Física': 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700',
      'Química': 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700',
      'Literatura': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700'
    };
    return colors[subjectName as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Horario de Clases</h2>
          <p className="text-gray-600 dark:text-gray-300">Semana del {currentWeek.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horario semanal */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Horario Semanal
          </h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="p-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Hora</th>
                  {daysOfWeek.slice(1, 6).map((day, index) => (
                    <th key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[150px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((timeSlot) => (
                  <tr key={timeSlot} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      {formatTime(timeSlot)}
                    </td>
                    {daysOfWeek.slice(1, 6).map((day, dayIndex) => {
                      const classItem = getCurrentDayClass(dayIndex + 1, timeSlot);
                      const subjectInfo = classItem ? subjects[classItem.subjectId as keyof typeof subjects] : null;
                      
                      return (
                        <td key={day} className="p-2">
                          {classItem && subjectInfo ? (
                            <div className={`p-3 rounded-lg border ${getStatusColor(subjectInfo.name)}`}>
                              <div className="font-medium text-sm mb-1">
                                {subjectInfo.name}
                              </div>
                              <div className="text-xs opacity-75 mb-2">
                                {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                              </div>
                              <div className="flex items-center text-xs opacity-75">
                                <User className="h-3 w-3 mr-1" />
                                {subjectInfo.teacher}
                              </div>
                              <div className="flex items-center text-xs opacity-75 mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {classItem.classroom}
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-600"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Próximas clases de hoy */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Próximas Clases de Hoy
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getClassesForDay(new Date().getDay()).map((classItem) => {
              const subjectInfo = subjects[classItem.subjectId as keyof typeof subjects];
              return subjectInfo ? (
                <div key={classItem.id} className={`p-4 rounded-lg border ${getStatusColor(subjectInfo.name)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{subjectInfo.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {subjectInfo.teacher} • {classItem.classroom}
                      </p>
                    </div>
                    <div className="text-right">
                      <Button size="sm" variant="outline">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 