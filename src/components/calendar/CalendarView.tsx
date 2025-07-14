import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, Users, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useColor } from '../../contexts/ColorContext';

export const CalendarView: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'event',
    location: '',
    participants: ''
  });

  // Datos simulados de eventos
  const events = [
    {
      id: '1',
      title: 'Examen Final - Matemáticas',
      description: 'Examen final del primer período',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
      startTime: '08:00',
      endTime: '10:00',
      type: 'exam',
      location: 'Aula 101',
      participants: ['10mo A'],
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Reunión de Padres',
      description: 'Reunión informativa del primer período',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      startTime: '14:00',
      endTime: '16:00',
      type: 'meeting',
      location: 'Auditorio',
      participants: ['Todos los grados'],
      color: 'bg-blue-500'
    },
    {
      id: '4',
      title: 'Consejo Académico',
      description: 'Reunión mensual del consejo académico',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      startTime: '10:00',
      endTime: '12:00',
      type: 'meeting',
      location: 'Sala de Juntas',
      participants: ['Directivos y Coordinadores'],
      color: 'bg-purple-500'
    },
    {
      id: '5',
      title: 'Entrega de Proyectos - Historia',
      description: 'Fecha límite para entrega de proyectos',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      startTime: '23:59',
      endTime: '23:59',
      type: 'assignment',
      location: 'Virtual',
      participants: ['11mo B'],
      color: 'bg-yellow-500'
    },
    {
      id: '6',
      title: 'Examen de Inglés',
      description: 'Examen parcial de gramática',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      startTime: '09:00',
      endTime: '11:00',
      type: 'exam',
      location: 'Aula 203',
      participants: ['10mo B'],
      color: 'bg-red-500'
    },
    {
      id: '7',
      title: 'Tarea de Física',
      description: 'Entrega de laboratorio virtual',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
      startTime: '23:59',
      endTime: '23:59',
      type: 'assignment',
      location: 'Virtual',
      participants: ['11mo A'],
      color: 'bg-yellow-500'
    },
    {
      id: '8',
      title: 'Clase de Matemáticas',
      description: 'Repaso de ecuaciones cuadráticas',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:30',
      type: 'event',
      location: 'Aula 105',
      participants: ['10mo A'],
      color: 'bg-purple-500'
    },
    {
      id: '9',
      title: 'Entrega de Ensayo',
      description: 'Ensayo sobre literatura clásica',
      date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 días desde hoy
      startTime: '23:59',
      endTime: '23:59',
      type: 'assignment',
      location: 'Virtual',
      participants: ['11mo B'],
      color: 'bg-yellow-500'
    },
    {
      id: '10',
      title: 'Reunión de Coordinación',
      description: 'Reunión de coordinadores académicos',
      date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 días desde hoy
      startTime: '14:00',
      endTime: '16:00',
      type: 'meeting',
      location: 'Sala de Juntas',
      participants: ['Coordinadores'],
      color: 'bg-blue-500'
    }
  ];

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Días del mes siguiente para completar la grilla
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString() &&
      (selectedEventType === 'all' || event.type === selectedEventType)
    );
  };

  const getEventTypeLabel = (type: string) => {
    const labels = {
      exam: 'Examen',
      meeting: 'Reunión',
      holiday: 'Feriado',
      assignment: 'Tarea',
      event: 'Evento'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleCreateEvent = () => {
    if (newEvent.title && newEvent.date) {
      // Aquí se agregaría el evento a la base de datos
      console.log('Nuevo evento:', newEvent);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'event',
        location: '',
        participants: ''
      });
      setShowCreateModal(false);
    }
  };

  const getEventColor = (type: string) => {
    const colors = {
      exam: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300',
      meeting: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
      assignment: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
      event: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
      holiday: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'event',
      location: '',
      participants: ''
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendario</h2>
          <p className="text-gray-600 dark:text-gray-300">Gestiona eventos y actividades escolares</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear Evento
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Filtrar por:</span>
        </div>
        <select
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
          className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Todos los eventos</option>
          <option value="exam">Exámenes</option>
          <option value="meeting">Reuniones</option>
          <option value="assignment">Tareas</option>
          <option value="event">Eventos</option>
        </select>
      </div>

      {/* Calendario */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth().map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isCurrentMonth = day.isCurrentMonth;
              const isCurrentDay = isToday(day.date);
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-200 dark:border-gray-600 ${
                    isCurrentMonth 
                      ? 'bg-white dark:bg-gray-800' 
                      : 'bg-gray-50 dark:bg-gray-900'
                  } ${
                    isCurrentDay 
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                      : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentMonth 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-400 dark:text-gray-500'
                  } ${
                    isCurrentDay 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : ''
                  }`}>
                    {day.date.getDate()}
                  </div>
                  
                  {/* Eventos del día */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${getEventColor(event.type)}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayEvents.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de eventos próximos */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Próximos Eventos</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-1 ${event.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date.toLocaleDateString('es-ES')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.participants.join(', ')}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getEventColor(event.type)}`}>
                    {getEventTypeLabel(event.type)}
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal para crear evento */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crear Nuevo Evento</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Título del evento"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Ej: Reunión de padres"
              />
              
              <Input
                label="Descripción"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Descripción del evento"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de evento
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="event">Evento</option>
                    <option value="exam">Examen</option>
                    <option value="meeting">Reunión</option>
                    <option value="assignment">Tarea</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Hora de inicio"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                />
                
                <Input
                  label="Hora de fin"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                />
              </div>
              
              <Input
                label="Ubicación"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="Ej: Aula 101"
              />
              
              <Input
                label="Participantes"
                value={newEvent.participants}
                onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})}
                placeholder="Ej: 10mo A, 11mo B"
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button onClick={handleCreateEvent}>
                Crear Evento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};