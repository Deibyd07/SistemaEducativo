import React, { useState } from 'react';
import { Bell, Check, X, AlertCircle, Info, CheckCircle, Clock, BookOpen, Calendar, MessageSquare, Eye, User, Tag, FileText } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface SimpleNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  details?: {
    sender?: string;
    category?: string;
    priority?: 'low' | 'medium' | 'high';
    attachments?: Array<{
      name: string;
      size: string;
      type: string;
    }>;
    relatedItems?: Array<{
      id: string;
      name: string;
      type: string;
      url: string;
    }>;
    additionalInfo?: string;

  };
}

export const StudentNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<SimpleNotification[]>([
    {
      id: '1',
      title: 'Nueva tarea asignada',
      message: 'Se ha asignado una nueva tarea en Matemáticas: "Ecuaciones Cuadráticas"',
      type: 'info',
      isRead: false,
      createdAt: new Date('2024-01-20T10:30:00'),
      actionUrl: '/assignments',
      details: {
        sender: 'Prof. Ana Martínez',
        category: 'Tarea',
        priority: 'medium',
        attachments: [
          { name: 'Ecuaciones_Cuadraticas.pdf', size: '2.3 MB', type: 'PDF' },
          { name: 'Ejercicios_Practica.docx', size: '1.1 MB', type: 'Word' }
        ],
        relatedItems: [
          { id: '1', name: 'Material de estudio: Ecuaciones', type: 'Material', url: '/materials/1' },
          { id: '2', name: 'Foro de dudas: Matemáticas', type: 'Foro', url: '/forums/math' }
        ],
        additionalInfo: 'Esta tarea es parte del módulo de álgebra y debe entregarse antes del 25 de enero. Incluye ejercicios prácticos y problemas de aplicación.'
      }
    },
    {
      id: '2',
      title: 'Calificación publicada',
      message: 'Tu calificación del examen de Historia ha sido publicada. Obtuviste 18/20 puntos.',
      type: 'success',
      isRead: false,
      createdAt: new Date('2024-01-19T14:15:00'),
      actionUrl: '/grades',
      details: {
        sender: 'Sistema de Calificaciones',
        category: 'Calificación',
        priority: 'high',
        relatedItems: [
          { id: '3', name: 'Examen de Historia - Revolución Industrial', type: 'Examen', url: '/grades/exam/1' },
          { id: '4', name: 'Historial de calificaciones', type: 'Reporte', url: '/grades/history' }
        ],
        additionalInfo: 'Excelente trabajo en el examen. Tu comprensión de los eventos históricos y análisis crítico fueron sobresalientes. Continúa con este nivel de dedicación.'
      }
    },
    {
      id: '3',
      title: 'Recordatorio de clase',
      message: 'Recuerda que mañana tienes clase de Física a las 10:00 AM en el Laboratorio de Ciencias.',
      type: 'warning',
      isRead: true,
      createdAt: new Date('2024-01-18T16:45:00'),
      actionUrl: '/schedule',
      details: {
        sender: 'Prof. Luis Hernández',
        category: 'Recordatorio',
        priority: 'medium',
        relatedItems: [
          { id: '5', name: 'Horario de clases', type: 'Horario', url: '/schedule' },
          { id: '6', name: 'Material de laboratorio', type: 'Material', url: '/materials/physics-lab' }
        ],
        additionalInfo: 'La clase se realizará en el Laboratorio de Ciencias, piso 2. Necesitarás traer tu bata de laboratorio y calculadora científica. El tema será "Movimiento Rectilíneo Uniforme".'
      }
    },
    {
      id: '4',
      title: 'Nuevo material disponible',
      message: 'Se ha subido nuevo material de estudio para Inglés: "Presentación de Verbos"',
      type: 'info',
      isRead: true,
      createdAt: new Date('2024-01-17T09:20:00'),
      actionUrl: '/materials',
      details: {
        sender: 'Prof. María González',
        category: 'Material',
        priority: 'low',
        attachments: [
          { name: 'Presentacion_Verbos_Ingles.pdf', size: '5.7 MB', type: 'PDF' },
          { name: 'Ejercicios_Verbos.xlsx', size: '890 KB', type: 'Excel' },
          { name: 'Audio_Pronunciacion.mp3', size: '3.2 MB', type: 'Audio' }
        ],
        relatedItems: [
          { id: '7', name: 'Biblioteca de materiales', type: 'Biblioteca', url: '/materials' },
          { id: '8', name: 'Foro de Inglés', type: 'Foro', url: '/forums/english' }
        ],
        additionalInfo: 'Este material incluye una presentación completa sobre los verbos en inglés, ejercicios prácticos y archivos de audio para mejorar la pronunciación. Recomendado para todos los niveles.'
      }
    },
    {
      id: '5',
      title: 'Respuesta en foro',
      message: 'El profesor Carlos ha respondido a tu pregunta en el foro de Historia.',
      type: 'info',
      isRead: true,
      createdAt: new Date('2024-01-16T11:30:00'),
      actionUrl: '/forums',
      details: {
        sender: 'Prof. Carlos Rodríguez',
        category: 'Foro',
        priority: 'low',
        relatedItems: [
          { id: '9', name: 'Foro de Historia', type: 'Foro', url: '/forums/history' },
          { id: '10', name: 'Tu pregunta original', type: 'Post', url: '/forums/post/123' }
        ],
        additionalInfo: 'El profesor ha proporcionado una respuesta detallada a tu pregunta sobre la Revolución Industrial. Incluye referencias bibliográficas y enlaces a recursos adicionales.'
      }
    },
    {
      id: '6',
      title: 'Tarea vence pronto',
      message: 'La tarea de Matemáticas vence en 2 días. No olvides entregarla a tiempo.',
      type: 'warning',
      isRead: false,
      createdAt: new Date('2024-01-15T08:00:00'),
      actionUrl: '/assignments',
      details: {
        sender: 'Sistema de Tareas',
        category: 'Recordatorio',
        priority: 'high',
        relatedItems: [
          { id: '11', name: 'Tarea: Ecuaciones Cuadráticas', type: 'Tarea', url: '/assignments/1' },
          { id: '12', name: 'Criterios de evaluación', type: 'Documento', url: '/assignments/criteria' }
        ],
        additionalInfo: 'La tarea debe entregarse antes del 17 de enero a las 23:59. Asegúrate de revisar los criterios de evaluación y subir todos los archivos requeridos.'
      }
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedNotification, setSelectedNotification] = useState<SimpleNotification | null>(null);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertCircle;
      case 'error': return X;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700';
      case 'error': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700';
      case 'success': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getActionIcon = (actionUrl: string) => {
    if (actionUrl.includes('assignments')) return BookOpen;
    if (actionUrl.includes('grades')) return CheckCircle;
    if (actionUrl.includes('schedule')) return Calendar;
    if (actionUrl.includes('materials')) return BookOpen;
    if (actionUrl.includes('forums')) return MessageSquare;
    return Bell;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const handleViewDetails = (notification: SimpleNotification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleCloseDetails = () => {
    setSelectedNotification(null);
  };





  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d`;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Notificaciones</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {unreadCount} {unreadCount === 1 ? 'notificación sin leer' : 'notificaciones sin leer'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Sin leer ({unreadCount})
            </Button>
            <Button
              variant={filter === 'read' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Leídas ({notifications.length - unreadCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de notificaciones */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const ActionIcon = getActionIcon(notification.actionUrl || '');
          
          return (
            <div 
              key={notification.id} 
              className="cursor-pointer"
              onClick={() => handleViewDetails(notification)}
            >
              <Card 
                className={`transition-all duration-200 hover:shadow-md ${
                  notification.isRead 
                    ? 'bg-gray-50 dark:bg-gray-800 opacity-75' 
                    : 'bg-white dark:bg-gray-800 shadow-md'
                }`}
              >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Icono de notificación */}
                  <div className={`p-3 rounded-lg ${getNotificationColor(notification.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold text-gray-900 dark:text-white ${
                          !notification.isRead ? 'font-bold' : ''
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          {notification.details?.priority && (
                            <span className={`text-sm flex items-center ${getPriorityColor(notification.details.priority)}`}>
                              <Tag className="h-3 w-3 mr-1" />
                              {getPriorityText(notification.details.priority)}
                            </span>
                          )}
                          <span className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            Ver detalles
                          </span>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center space-x-2">
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {filter === 'all' 
                  ? 'No tienes notificaciones' 
                  : filter === 'unread' 
                    ? 'No tienes notificaciones sin leer'
                    : 'No tienes notificaciones leídas'
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {filter === 'all' 
                  ? 'Las notificaciones aparecerán aquí cuando tengas nuevas actividades.'
                  : 'Cuando recibas nuevas notificaciones, aparecerán aquí.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de detalles de notificación */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                         <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-3">
                 <div className={`p-3 rounded-lg ${getNotificationColor(selectedNotification!.type)}`}>
                   {React.createElement(getNotificationIcon(selectedNotification!.type), { className: "h-6 w-6" })}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                     {selectedNotification!.title}
                   </h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400">
                     {formatDate(selectedNotification!.createdAt)}
                   </p>
                 </div>
               </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseDetails}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

                         {/* Información principal */}
             <div className="mb-6">
               <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                 {selectedNotification!.message}
               </p>
             </div>

                         {/* Información detallada */}
             {selectedNotification!.details && (
              <div className="space-y-6">
                {/* Metadatos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     {selectedNotification!.details.sender && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remitente</span>
                      </div>
                      <p className="text-gray-900 dark:text-white">{selectedNotification.details.sender}</p>
                    </div>
                  )}
                  
                                     {selectedNotification!.details.category && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Tag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</span>
                      </div>
                      <p className="text-gray-900 dark:text-white">{selectedNotification.details.category}</p>
                    </div>
                  )}
                  
                                     {selectedNotification!.details.priority && (
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prioridad</span>
                      </div>
                      <p className={`font-medium ${getPriorityColor(selectedNotification.details.priority)}`}>
                        {getPriorityText(selectedNotification.details.priority)}
                      </p>
                    </div>
                  )}
                </div>

                                 {/* Información adicional */}
                 {selectedNotification!.details.additionalInfo && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Información adicional</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                      {selectedNotification.details.additionalInfo}
                    </p>
                  </div>
                )}

                                                  {/* Archivos adjuntos */}
                 {selectedNotification!.details.attachments && selectedNotification!.details.attachments.length > 0 && (
                   <div>
                     <h4 className="font-medium text-gray-900 dark:text-white mb-3">Archivos adjuntos</h4>
                     <div className="space-y-2">
                       {selectedNotification!.details.attachments.map((attachment, index) => (
                         <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                           <div className="flex items-center space-x-3">
                             <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                             <div>
                               <p className="font-medium text-gray-900 dark:text-white">{attachment.name}</p>
                               <p className="text-sm text-gray-500 dark:text-gray-400">{attachment.size} • {attachment.type}</p>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                                                  {/* Elementos relacionados */}
                 {selectedNotification!.details.relatedItems && selectedNotification!.details.relatedItems.length > 0 && (
                   <div>
                     <h4 className="font-medium text-gray-900 dark:text-white mb-3">Elementos relacionados</h4>
                     <div className="space-y-2">
                       {selectedNotification!.details.relatedItems.map((item, index) => (
                         <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                           <div className="flex items-center space-x-3">
                             <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                             <div>
                               <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                               <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                                 
              </div>
            )}

                         {/* Botones de acción generales */}
             <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
               <Button onClick={handleCloseDetails}>
                 Cerrar
               </Button>
             </div>
          </div>
        </div>
      )}

      {/* Estadísticas */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resumen de Notificaciones</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{notifications.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{unreadCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sin leer</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Éxito</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                {notifications.filter(n => n.type === 'warning').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advertencias</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 