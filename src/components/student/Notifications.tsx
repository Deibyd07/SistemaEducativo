import React, { useState } from 'react';
import { Bell, Search, Check, X, Clock, AlertCircle, Info, CheckCircle, Calendar, User, BookOpen, MessageSquare, ClipboardList, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Notifications: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos simulados de notificaciones
  const notifications = [
    {
      id: '1',
      title: 'Nueva calificación disponible',
      message: 'Tu calificación para el examen de Matemáticas ya está disponible.',
      type: 'grade',
      status: 'unread',
      priority: 'high',
      createdAt: new Date('2024-01-22T10:30:00'),
      subject: 'Matemáticas',
      actionUrl: '/grades',
      icon: BarChart3
    },
    {
      id: '2',
      title: 'Nueva tarea asignada',
      message: 'Se ha asignado una nueva tarea: "Ecuaciones Cuadráticas" en Matemáticas.',
      type: 'assignment',
      status: 'unread',
      priority: 'medium',
      createdAt: new Date('2024-01-22T09:15:00'),
      subject: 'Matemáticas',
      actionUrl: '/assignments',
      icon: ClipboardList
    },
    {
      id: '3',
      title: 'Material de estudio actualizado',
      message: 'Se ha agregado nuevo material de estudio para la unidad de Historia.',
      type: 'material',
      status: 'read',
      priority: 'low',
      createdAt: new Date('2024-01-21T16:45:00'),
      subject: 'Historia',
      actionUrl: '/materials',
      icon: BookOpen
    },
    {
      id: '4',
      title: 'Respuesta en foro',
      message: 'El profesor ha respondido a tu pregunta en el foro de Inglés.',
      type: 'forum',
      status: 'unread',
      priority: 'medium',
      createdAt: new Date('2024-01-21T14:20:00'),
      subject: 'Inglés',
      actionUrl: '/forums',
      icon: MessageSquare
    },
    {
      id: '5',
      title: 'Recordatorio: Examen mañana',
      message: 'Recuerda que mañana tienes examen de Física a las 8:00 AM.',
      type: 'reminder',
      status: 'read',
      priority: 'high',
      createdAt: new Date('2024-01-21T12:00:00'),
      subject: 'Física',
      actionUrl: '/schedule',
      icon: Clock
    },
    {
      id: '6',
      title: 'Clase cancelada',
      message: 'La clase de Literatura de hoy ha sido cancelada por el profesor.',
      type: 'announcement',
      status: 'read',
      priority: 'medium',
      createdAt: new Date('2024-01-20T15:30:00'),
      subject: 'Literatura',
      actionUrl: '/schedule',
      icon: Info
    },
    {
      id: '7',
      title: 'Tarea entregada exitosamente',
      message: 'Tu tarea de Inglés ha sido entregada y está siendo revisada.',
      type: 'confirmation',
      status: 'read',
      priority: 'low',
      createdAt: new Date('2024-01-20T11:45:00'),
      subject: 'Inglés',
      actionUrl: '/assignments',
      icon: CheckCircle
    },
    {
      id: '8',
      title: 'Nuevo mensaje del profesor',
      message: 'El profesor de Matemáticas te ha enviado un mensaje privado.',
      type: 'message',
      status: 'unread',
      priority: 'high',
      createdAt: new Date('2024-01-20T10:15:00'),
      subject: 'Matemáticas',
      actionUrl: '/messages',
      icon: MessageSquare
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grade': return BarChart3;
      case 'assignment': return ClipboardList;
      case 'material': return BookOpen;
      case 'forum': return MessageSquare;
      case 'reminder': return Clock;
      case 'announcement': return Info;
      case 'confirmation': return CheckCircle;
      case 'message': return MessageSquare;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grade': return 'text-blue-600 bg-blue-50';
      case 'assignment': return 'text-orange-600 bg-orange-50';
      case 'material': return 'text-green-600 bg-green-50';
      case 'forum': return 'text-purple-600 bg-purple-50';
      case 'reminder': return 'text-red-600 bg-red-50';
      case 'announcement': return 'text-yellow-600 bg-yellow-50';
      case 'confirmation': return 'text-green-600 bg-green-50';
      case 'message': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    console.log(`Marcar como leída: ${notificationId}`);
  };

  const handleMarkAsUnread = (notificationId: string) => {
    console.log(`Marcar como no leída: ${notificationId}`);
  };

  const handleDelete = (notificationId: string) => {
    console.log(`Eliminar notificación: ${notificationId}`);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marcar todas como leídas');
  };

  const handleNavigateToAction = (notification: any) => {
    console.log(`Navegar a: ${notification.actionUrl}`);
  };

  // Filtrado simple por búsqueda
  const filteredNotifications = notifications.filter(notification => {
    return notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
           notification.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} horas`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} días`;
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notificaciones</h2>
          <p className="text-gray-600">Mantente al día con las últimas actualizaciones</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      {/* Búsqueda simple */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar notificaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const TypeIcon = getTypeIcon(notification.type);
          return (
            <Card key={notification.id} className={`hover:shadow-lg transition-shadow ${notification.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardContent className="p-6">
                {/* Header de la notificación */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {notification.status === 'unread' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Nueva
                          </span>
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {notification.subject}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Button
                    size="sm"
                    onClick={() => handleNavigateToAction(notification)}
                    className="flex-1 mr-2"
                  >
                    Ver Detalles
                  </Button>
                  <div className="flex items-center space-x-2">
                    {notification.status === 'unread' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsUnread(notification.id)}
                      >
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron notificaciones
          </h3>
          <p className="text-gray-500">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}; 