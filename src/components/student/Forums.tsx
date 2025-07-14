import React, { useState } from 'react';
import { MessageSquare, Search, Plus, ThumbsUp, MessageCircle, User, Calendar, Eye, Bookmark, Share } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Forums: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Datos simulados de foros
  const forums = [
    {
      id: '1',
      title: '¿Cómo resolver ecuaciones cuadráticas?',
      content: 'Tengo problemas con las ecuaciones cuadráticas, especialmente con la fórmula general. ¿Alguien puede explicarme paso a paso?',
      subject: 'Matemáticas',
      author: {
        name: 'Carlos López',
        isTeacher: false
      },
      createdAt: new Date('2024-01-22T10:30:00'),
      replies: 8,
      views: 45,
      likes: 12,
      isBookmarked: false,
      isResolved: false
    },
    {
      id: '2',
      title: 'Recursos para estudiar la Revolución Industrial',
      content: '¿Qué libros o videos recomiendan para entender mejor la Revolución Industrial? Busco material complementario.',
      subject: 'Historia',
      author: {
        name: 'Prof. Ana Martínez',
        isTeacher: true
      },
      createdAt: new Date('2024-01-21T14:15:00'),
      replies: 15,
      views: 89,
      likes: 23,
      isBookmarked: true,
      isResolved: true
    },
    {
      id: '3',
      title: 'Duda sobre Present Perfect vs Past Simple',
      content: 'No entiendo cuándo usar Present Perfect y cuándo Past Simple. ¿Pueden darme ejemplos claros?',
      subject: 'Inglés',
      author: {
        name: 'María González',
        isTeacher: false
      },
      createdAt: new Date('2024-01-20T16:45:00'),
      replies: 6,
      views: 32,
      likes: 8,
      isBookmarked: false,
      isResolved: false
    },
    {
      id: '4',
      title: 'Experimento de Física: Ley de Hooke',
      content: 'Comparto mi experimento sobre la Ley de Hooke. Incluye fotos y datos del laboratorio.',
      subject: 'Física',
      author: {
        name: 'Luis Hernández',
        isTeacher: false
      },
      createdAt: new Date('2024-01-19T09:20:00'),
      replies: 12,
      views: 67,
      likes: 18,
      isBookmarked: false,
      isResolved: false
    },
    {
      id: '5',
      title: 'Análisis de "El Quijote"',
      content: 'Discusión sobre los temas principales de Don Quijote. ¿Qué opinan sobre la locura del protagonista?',
      subject: 'Literatura',
      author: {
        name: 'Prof. Carmen López',
        isTeacher: true
      },
      createdAt: new Date('2024-01-18T11:30:00'),
      replies: 20,
      views: 120,
      likes: 35,
      isBookmarked: true,
      isResolved: false
    },
    {
      id: '6',
      title: 'Tips para estudiar mejor',
      content: 'Comparto mis técnicas de estudio que me han ayudado mucho. ¿Qué métodos usan ustedes?',
      subject: 'General',
      author: {
        name: 'Sofia Rodríguez',
        isTeacher: false
      },
      createdAt: new Date('2024-01-17T13:45:00'),
      replies: 25,
      views: 156,
      likes: 42,
      isBookmarked: false,
      isResolved: false
    }
  ];

  const handleLike = (forumId: string) => {
    console.log(`Like en foro: ${forumId}`);
  };

  const handleBookmark = (forumId: string) => {
    console.log(`Bookmark en foro: ${forumId}`);
  };

  const handleShare = (forumId: string) => {
    console.log(`Compartir foro: ${forumId}`);
  };

  const handleViewForum = (forumId: string) => {
    console.log(`Ver foro: ${forumId}`);
  };

  const handleCreateForum = () => {
    console.log('Crear nuevo foro');
  };

  // Filtrado simple por búsqueda
  const filteredForums = forums.filter(forum => {
    return forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           forum.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
           forum.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Foros de Discusión</h2>
          <p className="text-gray-600">Participa en debates académicos y resuelve dudas</p>
        </div>
        <Button onClick={handleCreateForum}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Foro
        </Button>
      </div>

      {/* Búsqueda simple */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar foros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Lista de foros */}
      <div className="space-y-4">
        {filteredForums.map((forum) => (
          <Card key={forum.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Header del foro */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {forum.title}
                    </h3>
                    {forum.isResolved && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Resuelto
                      </span>
                    )}
                    {forum.author.isTeacher && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Profesor
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {forum.content}
                  </p>
                </div>
              </div>

              {/* Información del foro */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {forum.author.name}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {forum.subject}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(forum.createdAt)}
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {formatNumber(forum.replies)} respuestas
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {formatNumber(forum.views)} vistas
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {formatNumber(forum.likes)} me gusta
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Button
                  size="sm"
                  onClick={() => handleViewForum(forum.id)}
                  className="flex-1 mr-2"
                >
                  Ver Foro
                </Button>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLike(forum.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBookmark(forum.id)}
                  >
                    <Bookmark className={`h-4 w-4 ${forum.isBookmarked ? 'fill-current text-blue-600' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(forum.id)}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredForums.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron foros
          </h3>
          <p className="text-gray-500">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}; 