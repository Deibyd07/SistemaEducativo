import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Search, Filter, ChevronLeft, ChevronRight, Plus, Edit, Trash2, BookOpen, Users, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  // Datos simulados del horario
  const schedule = [
    {
      id: '1',
      subject: 'Matemáticas',
      subjectId: '1',
      teacher: 'Prof. Ana Martínez',
      teacherId: '1',
      day: 'monday',
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Aula 201',
      building: 'Edificio A',
      type: 'lecture',
      description: 'Ecuaciones cuadráticas y funciones',
      color: 'bg-blue-500',
      isActive: true
    },
    {
      id: '2',
      subject: 'Historia',
      subjectId: '2',
      teacher: 'Prof. Carlos Rodríguez',
      teacherId: '2',
      day: 'monday',
      startTime: '10:00',
      endTime: '11:30',
      classroom: 'Aula 105',
      building: 'Edificio B',
      type: 'lecture',
      description: 'Revolución Industrial',
      color: 'bg-green-500',
      isActive: true
    },
    {
      id: '3',
      subject: 'Inglés',
      subjectId: '3',
      teacher: 'Prof. María González',
      teacherId: '3',
      day: 'monday',
      startTime: '14:00',
      endTime: '15:30',
      classroom: 'Lab de Idiomas',
      building: 'Edificio C',
      type: 'practice',
      description: 'Present Perfect vs Past Simple',
      color: 'bg-purple-500',
      isActive: true
    },
    {
      id: '4',
      subject: 'Física',
      subjectId: '4',
      teacher: 'Prof. Luis Hernández',
      teacherId: '4',
      day: 'tuesday',
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Laboratorio Física',
      building: 'Edificio A',
      type: 'lab',
      description: 'Ley de Hooke - Práctica',
      color: 'bg-red-500',
      isActive: true
    },
    {
      id: '5',
      subject: 'Literatura',
      subjectId: '5',
      teacher: 'Prof. Carmen López',
      teacherId: '5',
      day: 'tuesday',
      startTime: '10:00',
      endTime: '11:30',
      classroom: 'Aula 203',
      building: 'Edificio B',
      type: 'lecture',
      description: 'Análisis de "El Quijote"',
      color: 'bg-yellow-500',
      isActive: true
    },
    {
      id: '6',
      subject: 'Matemáticas',
      subjectId: '1',
      teacher: 'Prof. Ana Martínez',
      teacherId: '1',
      day: 'wednesday',
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Aula 201',
      building: 'Edificio A',
      type: 'lecture',
      description: 'Continuación: Funciones',
      color: 'bg-blue-500',
      isActive: true
    },
    {
      id: '7',
      subject: 'Historia',
      subjectId: '2',
      teacher: 'Prof. Carlos Rodríguez',
      teacherId: '2',
      day: 'wednesday',
      startTime: '14:00',
      endTime: '15:30',
      classroom: 'Aula 105',
      building: 'Edificio B',
      type: 'discussion',
      description: 'Debate sobre consecuencias',
      color: 'bg-green-500',
      isActive: true
    },
    {
      id: '8',
      subject: 'Inglés',
      subjectId: '3',
      teacher: 'Prof. María González',
      teacherId: '3',
      day: 'thursday',
      startTime: '10:00',
      endTime: '11:30',
      classroom: 'Lab de Idiomas',
      building: 'Edificio C',
      type: 'practice',
      description: 'Conversación y pronunciación',
      color: 'bg-purple-500',
      isActive: true
    },
    {
      id: '9',
      subject: 'Física',
      subjectId: '4',
      teacher: 'Prof. Luis Hernández',
      teacherId: '4',
      day: 'friday',
      startTime: '08:00',
      endTime: '09:30',
      classroom: 'Laboratorio Física',
      building: 'Edificio A',
      type: 'lab',
      description: 'Análisis de datos experimentales',
      color: 'bg-red-500',
      isActive: true
    },
    {
      id: '10',
      subject: 'Literatura',
      subjectId: '5',
      teacher: 'Prof. Carmen López',
      teacherId: '5',
      day: 'friday',
      startTime: '14:00',
      endTime: '15:30',
      classroom: 'Aula 203',
      building: 'Edificio B',
      type: 'lecture',
      description: 'Poesía del Siglo de Oro',
      color: 'bg-yellow-500',
      isActive: true
    }
  ];

  const subjects = [
    { id: 'all', name: 'Todas las materias' },
    { id: '1', name: 'Matemáticas' },
    { id: '2', name: 'Historia' },
    { id: '3', name: 'Inglés' },
    { id: '4', name: 'Física' },
    { id: '5', name: 'Literatura' }
  ];

  const teachers = [
    { id: 'all', name: 'Todos los profesores' },
    { id: '1', name: 'Prof. Ana Martínez' },
    { id: '2', name: 'Prof. Carlos Rodríguez' },
    { id: '3', name: 'Prof. María González' },
    { id: '4', name: 'Prof. Luis Hernández' },
    { id: '5', name: 'Prof. Carmen López' }
  ];

  const days = [
    { id: 'monday', name: 'Lunes', short: 'Lun' },
    { id: 'tuesday', name: 'Martes', short: 'Mar' },
    { id: 'wednesday', name: 'Miércoles', short: 'Mié' },
    { id: 'thursday', name: 'Jueves', short: 'Jue' },
    { id: 'friday', name: 'Viernes', short: 'Vie' },
    { id: 'saturday', name: 'Sábado', short: 'Sáb' },
    { id: 'sunday', name: 'Domingo', short: 'Dom' }
  ];

  const timeSlots = [
    '08:00', '09:30', '10:00', '11:30', '12:00', '13:30', '14:00', '15:30', '16:00', '17:30'
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return BookOpen;
      case 'practice': return Users;
      case 'lab': return BarChart3;
      case 'discussion': return Users;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture': return 'text-blue-600 bg-blue-50';
      case 'practice': return 'text-green-600 bg-green-50';
      case 'lab': return 'text-red-600 bg-red-50';
      case 'discussion': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDay(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDay);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDay(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today);
  };

  const handleClassClick = (classItem: any) => {
    // Navegar a detalles de la clase
    console.log(`Ver detalles de clase: ${classItem.subject}`);
    // En producción, navegaría a /schedule/class/{classItem.id}
  };

  const handleAddClass = () => {
    // Navegar a agregar clase
    console.log('Agregar nueva clase');
    // En producción, navegaría a /schedule/add
  };

  const handleEditClass = (classItem: any) => {
    // Editar clase
    console.log(`Editar clase: ${classItem.subject}`);
    // En producción, navegaría a /schedule/edit/{classItem.id}
  };

  const handleDeleteClass = (classItem: any) => {
    // Eliminar clase
    console.log(`Eliminar clase: ${classItem.subject}`);
    // En producción, mostraría confirmación
  };

  // Filtros
  const filteredSchedule = schedule.filter(classItem => {
    const matchesSubject = selectedSubject === 'all' || classItem.subjectId === selectedSubject;
    const matchesTeacher = selectedTeacher === 'all' || classItem.teacherId === selectedTeacher;
    return matchesSubject && matchesTeacher;
  });

  // Obtener clases para un día específico
  const getClassesForDay = (dayId: string) => {
    return filteredSchedule.filter(classItem => classItem.day === dayId);
  };

  // Obtener clases para el día seleccionado
  const getClassesForSelectedDay = () => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayId = dayNames[selectedDay.getDay()];
    return filteredSchedule.filter(classItem => classItem.day === dayId);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWeekDates = () => {
    const week = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(date.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mi Horario</h2>
          <p className="text-gray-600">Gestiona tus clases y actividades académicas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleToday}>
            Hoy
          </Button>
          <Button onClick={handleAddClass}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Clase
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Filtro por materia */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            {/* Filtro por profesor */}
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>

            {/* Modo de vista */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  viewMode === 'week' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('week')}
              >
                Semana
              </button>
              <button
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === 'day' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setViewMode('day')}
              >
                Día
              </button>
            </div>

            {/* Navegación */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={viewMode === 'week' ? handlePreviousWeek : handlePreviousDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {viewMode === 'week' 
                  ? `${weekDates[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${weekDates[6].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}`
                  : formatDate(selectedDay)
                }
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={viewMode === 'week' ? handleNextWeek : handleNextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vista de Horario */}
      {viewMode === 'week' ? (
        /* Vista Semanal */
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-8 gap-4">
              {/* Header con horas */}
              <div className="text-sm font-medium text-gray-500">Hora</div>
              {days.map((day) => (
                <div key={day.id} className="text-sm font-medium text-gray-500 text-center">
                  {day.short}
                </div>
              ))}

              {/* Filas de tiempo */}
              {timeSlots.map((time, timeIndex) => (
                <React.Fragment key={time}>
                  <div className="text-xs text-gray-500 py-2">
                    {formatTime(time)}
                  </div>
                  {days.map((day) => {
                    const classesForDay = getClassesForDay(day.id);
                    const classAtTime = classesForDay.find(c => c.startTime === time);
                    
                    return (
                      <div key={`${day.id}-${time}`} className="min-h-[60px] border border-gray-200 rounded-lg p-2">
                        {classAtTime && (
                          <div
                            className={`${classAtTime.color} text-white p-2 rounded text-xs cursor-pointer hover:opacity-90 transition-opacity`}
                            onClick={() => handleClassClick(classAtTime)}
                          >
                            <div className="font-medium">{classAtTime.subject}</div>
                            <div className="text-xs opacity-90">{classAtTime.teacher}</div>
                            <div className="text-xs opacity-90">{classAtTime.classroom}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Vista Diaria */
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {getClassesForSelectedDay().length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay clases programadas
                  </h3>
                  <p className="text-gray-500">
                    No tienes clases programadas para el {formatDate(selectedDay)}
                  </p>
                </div>
              ) : (
                getClassesForSelectedDay()
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((classItem) => {
                    const TypeIcon = getTypeIcon(classItem.type);
                    return (
                      <div
                        key={classItem.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleClassClick(classItem)}
                      >
                        {/* Hora */}
                        <div className="text-center min-w-[80px]">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatTime(classItem.startTime)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatTime(classItem.endTime)}
                          </div>
                        </div>

                        {/* Información de la clase */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-2 rounded-lg ${classItem.color} text-white`}>
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {classItem.subject}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {classItem.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {classItem.teacher}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {classItem.classroom} - {classItem.building}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                              {classItem.type === 'lecture' ? 'Clase' : 
                               classItem.type === 'practice' ? 'Práctica' :
                               classItem.type === 'lab' ? 'Laboratorio' : 'Discusión'}
                            </span>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClass(classItem);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClass(classItem);
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 