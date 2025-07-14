import React, { useState } from 'react';
import { MessageSquare, Plus, Search, Filter, ThumbsUp, Reply, Pin, Lock, Eye, Clock, User, Download, X, Heart, Share2, Bookmark, Copy, Check, Star, Tag, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SimplePost {
  id: string;
  title: string;
  content: string;
  subjectId: string;
  subject: string;
  author: {
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: Date;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  likes: number;
  replies: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags?: string[];
}

interface SimpleReply {
  id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
}

export const StudentForums: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<SimplePost | null>(null);
  const [selectedPostForDetails, setSelectedPostForDetails] = useState<SimplePost | null>(null);
  const [newReply, setNewReply] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    content: '',
    subjectId: '',
    tags: [] as string[],
    isPinned: false,
    isLocked: false
  });
  const [newTag, setNewTag] = useState('');

  // Datos simulados de foros
  const [posts, setPosts] = useState<SimplePost[]>([
    {
      id: '1',
      subjectId: '1',
      subject: 'Matemáticas',
      title: 'Duda sobre ecuaciones cuadráticas',
      content: 'Hola compañeros, tengo una duda sobre cómo resolver ecuaciones cuadráticas cuando el coeficiente de x² es diferente de 1. ¿Alguien puede explicarme el método? He intentado usar la fórmula cuadrática pero me confundo con los pasos. ¿Hay algún truco o método más sencillo que pueda usar?',
      author: { firstName: 'Juan', lastName: 'Pérez', role: 'student' },
      createdAt: new Date('2024-01-20T10:30:00'),
      isPinned: false,
      isLocked: false,
      views: 45,
      likes: 12,
      replies: 2,
      isLiked: false,
      isSaved: false,
      tags: ['ecuaciones', 'cuadráticas', 'álgebra']
    },
    {
      id: '2',
      subjectId: '2',
      subject: 'Historia',
      title: '📚 Recursos para el ensayo sobre Revolución Industrial',
      content: 'Hola estudiantes, aquí les comparto algunos recursos adicionales para el ensayo sobre la Revolución Industrial. Incluye enlaces a documentales y artículos académicos que pueden ser muy útiles para complementar sus investigaciones.',
      author: { firstName: 'Carlos', lastName: 'Rodríguez', role: 'teacher' },
      createdAt: new Date('2024-01-19T14:00:00'),
      isPinned: true,
      isLocked: false,
      views: 78,
      likes: 15,
      replies: 0,
      isLiked: true,
      isSaved: true,
      tags: ['revolución industrial', 'ensayo', 'recursos']
    },
    {
      id: '3',
      subjectId: '3',
      subject: 'Inglés',
      title: 'Práctica de conversación en inglés',
      content: '¿Alguien quiere practicar conversación en inglés? Podemos hacer una sesión virtual para mejorar nuestra pronunciación. Estoy disponible los martes y jueves por la tarde.',
      author: { firstName: 'Pedro', lastName: 'García', role: 'student' },
      createdAt: new Date('2024-01-18T16:30:00'),
      isPinned: false,
      isLocked: false,
      views: 32,
      likes: 8,
      replies: 1,
      isLiked: false,
      isSaved: false,
      tags: ['conversación', 'práctica', 'inglés']
    },
    {
      id: '4',
      subjectId: '1',
      subject: 'Matemáticas',
      title: 'Fórmulas importantes para el examen',
      content: 'Aquí están las fórmulas más importantes que necesitan memorizar para el examen de matemáticas. Incluye todas las fórmulas de geometría, álgebra y trigonometría.',
      author: { firstName: 'Ana', lastName: 'Martínez', role: 'teacher' },
      createdAt: new Date('2024-01-17T09:00:00'),
      isPinned: false,
      isLocked: false,
      views: 156,
      likes: 23,
      replies: 5,
      isLiked: true,
      isSaved: true,
      tags: ['fórmulas', 'examen', 'matemáticas']
    },
    {
      id: '5',
      subjectId: '4',
      subject: 'Física',
      title: 'Experimentos de laboratorio - Guía completa',
      content: 'Guía completa para los experimentos de laboratorio de física. Incluye procedimientos, materiales necesarios y consejos de seguridad.',
      author: { firstName: 'Luis', lastName: 'Hernández', role: 'teacher' },
      createdAt: new Date('2024-01-16T11:30:00'),
      isPinned: false,
      isLocked: false,
      views: 89,
      likes: 18,
      replies: 3,
      isLiked: false,
      isSaved: true,
      tags: ['experimentos', 'laboratorio', 'física']
    }
  ]);

  // Datos simulados de respuestas
  const [replies, setReplies] = useState<SimpleReply[]>([
    {
      id: '1',
      content: 'Te recomiendo usar el método de completar el cuadrado. Es muy útil cuando el coeficiente de x² no es 1. Primero divides toda la ecuación por el coeficiente de x², luego completas el cuadrado.',
      author: { firstName: 'María', lastName: 'González', role: 'teacher' },
      createdAt: new Date('2024-01-20T11:00:00'),
      likes: 8,
      isLiked: false
    },
    {
      id: '2',
      content: 'También puedes usar la fórmula cuadrática directamente. Es más rápido en algunos casos. Solo asegúrate de identificar correctamente los valores de a, b y c.',
      author: { firstName: 'Ana', lastName: 'López', role: 'student' },
      createdAt: new Date('2024-01-20T11:15:00'),
      likes: 5,
      isLiked: true
    },
    {
      id: '3',
      content: '¡Me apunto! ¿Qué día te parece bien? Podemos hacer una sesión de 30 minutos para empezar.',
      author: { firstName: 'Laura', lastName: 'Fernández', role: 'student' },
      createdAt: new Date('2024-01-18T17:00:00'),
      likes: 3,
      isLiked: false
    }
  ]);

  const subjects = [
    { id: 'all', name: 'Todas las materias' },
    { id: '1', name: 'Matemáticas' },
    { id: '2', name: 'Historia' },
    { id: '3', name: 'Inglés' },
    { id: '4', name: 'Física' }
  ];

  // Filtrar posts según la vista actual
  const getFilteredPosts = () => {
    let filtered = posts;
    
    // Si estamos en la vista de guardados, filtrar solo los guardados
    if (showSavedPosts) {
      filtered = posts.filter(post => post.isSaved);
    }
    
    // Aplicar filtros de búsqueda y materia
    return filtered.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesSubject = selectedSubject === 'all' || post.subjectId === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });
  };

  const filteredPosts = getFilteredPosts();
  const savedPostsCount = posts.filter(post => post.isSaved).length;

  const handleReply = () => {
    if (newReply.trim() && selectedPost) {
      // Simulación de agregar respuesta
      console.log('Agregando respuesta:', newReply);
      setNewReply('');
      setSelectedPost(null);
    }
  };

  const handleViewDetails = (post: SimplePost) => {
    setSelectedPostForDetails(post);
  };

  const handleCloseDetails = () => {
    setSelectedPostForDetails(null);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));

    // Actualizar también el post seleccionado si es el mismo
    if (selectedPostForDetails?.id === postId) {
      setSelectedPostForDetails(prev => prev ? {
        ...prev,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        isLiked: !prev.isLiked
      } : null);
    }
  };

  const handleLikeReply = (replyId: string) => {
    setReplies(prev => prev.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
          isLiked: !reply.isLiked
        };
      }
      return reply;
    }));
  };

  const handleSavePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));

    // Actualizar también el post seleccionado si es el mismo
    if (selectedPostForDetails?.id === postId) {
      setSelectedPostForDetails(prev => prev ? {
        ...prev,
        isSaved: !prev.isSaved
      } : null);
    }
  };

  const handleSharePost = async (post: SimplePost) => {
    const shareData = {
      title: post.title,
      text: post.content.substring(0, 100) + '...',
      url: `${window.location.origin}/forums/post/${post.id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copiar al portapapeles
        const shareText = `${post.title}\n\n${post.content.substring(0, 200)}...\n\nVer más: ${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      }
    } catch (error) {
      console.log('Error al compartir:', error);
    }
  };

  const handleCreatePost = () => {
    if (newPostData.title.trim() && newPostData.content.trim() && newPostData.subjectId) {
      const newPost: SimplePost = {
        id: Date.now().toString(),
        title: newPostData.title,
        content: newPostData.content,
        subjectId: newPostData.subjectId,
        subject: subjects.find(s => s.id === newPostData.subjectId)?.name || '',
        author: { firstName: 'Usuario', lastName: 'Actual', role: 'student' },
        createdAt: new Date(),
        isPinned: newPostData.isPinned,
        isLocked: newPostData.isLocked,
        views: 0,
        likes: 0,
        replies: 0,
        isLiked: false,
        isSaved: false,
        tags: newPostData.tags
      };

      setPosts(prev => [newPost, ...prev]);
      
      // Resetear formulario
      setNewPostData({
        title: '',
        content: '',
        subjectId: '',
        tags: [],
        isPinned: false,
        isLocked: false
      });
      
      setCreatePostModalOpen(false);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase();
    
    if (trimmedTag && !newPostData.tags.includes(trimmedTag)) {
      // Validar límite máximo de etiquetas
      if (newPostData.tags.length >= 10) {
        alert('Has alcanzado el límite máximo de 10 etiquetas por publicación');
        return;
      }
      
      // Validar longitud mínima y máxima
      if (trimmedTag.length < 2) {
        alert('Las etiquetas deben tener al menos 2 caracteres');
        return;
      }
      
      if (trimmedTag.length > 20) {
        alert('Las etiquetas no pueden tener más de 20 caracteres');
        return;
      }
      
      // Validar que no contenga caracteres especiales excepto guiones y guiones bajos
      if (!/^[a-z0-9áéíóúñü_-]+$/.test(trimmedTag)) {
        alert('Las etiquetas solo pueden contener letras, números, guiones y guiones bajos');
        return;
      }
      
      setNewPostData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setNewTag('');
    } else if (newPostData.tags.includes(trimmedTag)) {
      alert('Esta etiqueta ya ha sido agregada');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPostData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleGenerateReport = (format: string) => {
    console.log(`Generando reporte de actividad de foros en formato ${format}`);
    
    // Simular generación de reporte
    setTimeout(() => {
      alert(`Reporte de actividad de foros generado exitosamente en formato ${format}`);
      setReportModalOpen(false);
    }, 1500);
  };

  const handleCloseReportModal = () => {
    setReportModalOpen(false);
  };

  const handleToggleSavedView = () => {
    setShowSavedPosts(!showSavedPosts);
    setSearchTerm('');
    setSelectedSubject('all');
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {showSavedPosts ? 'Posts Guardados' : 'Foros de Discusión'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {showSavedPosts 
              ? `${savedPostsCount} posts guardados` 
              : 'Comparte ideas y resuelve dudas con tus compañeros'
            }
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={showSavedPosts ? "primary" : "outline"}
            onClick={handleToggleSavedView}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {showSavedPosts ? 'Ver Todos' : 'Guardados'}
          </Button>
          <Button variant="outline" onClick={() => setReportModalOpen(true)}>
            <Download className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
          <Button onClick={() => setCreatePostModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Publicación
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder={showSavedPosts ? "Buscar en guardados..." : "Buscar en foros..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de publicaciones */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {post.author.firstName[0]}{post.author.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {post.author.firstName} {post.author.lastName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(post.createdAt)} • {post.subject}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.isSaved && (
                      <Bookmark className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                    )}
                    {post.isPinned && (
                      <Pin className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                    )}
                    {post.isLocked && (
                      <Lock className="h-4 w-4 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.content}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.replies}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedPost(post)}
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Responder
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(post)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {showSavedPosts 
                    ? 'No tienes posts guardados' 
                    : 'No se encontraron publicaciones'
                  }
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {showSavedPosts 
                    ? 'Los posts que guardes aparecerán aquí para acceso rápido.'
                    : 'Intenta ajustar los filtros o crear una nueva publicación.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Estadísticas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total de publicaciones</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Posts guardados</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{savedPostsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Mis publicaciones</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Mis respuestas</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Likes recibidos</span>
                  <span className="font-semibold text-gray-900 dark:text-white">28</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts guardados recientes */}
          {!showSavedPosts && savedPostsCount > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Guardados Recientes</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts.filter(post => post.isSaved).slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleViewDetails(post)}>
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">
                          {post.author.firstName[0]}{post.author.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.subject} • {formatTimeAgo(post.createdAt)}
                        </p>
                      </div>
                      <Bookmark className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                    </div>
                  ))}
                  {savedPostsCount > 3 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={handleToggleSavedView}
                    >
                      Ver todos los guardados ({savedPostsCount})
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Materias más activas */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Materias más activas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjects.slice(1).map((subject) => {
                  const postCount = posts.filter(p => p.subjectId === subject.id).length;
                  return (
                    <div key={subject.id} className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">{subject.name}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{postCount}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de crear nueva publicación */}
      {createPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crear Nueva Publicación</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCreatePostModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título *
                </label>
                <Input
                  placeholder="Escribe un título descriptivo..."
                  value={newPostData.title}
                  onChange={(e) => setNewPostData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full"
                />
              </div>

              {/* Materia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Materia *
                </label>
                <select
                  value={newPostData.subjectId}
                  onChange={(e) => setNewPostData(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Selecciona una materia</option>
                  {subjects.slice(1).map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contenido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contenido *
                </label>
                <textarea
                  placeholder="Escribe el contenido de tu publicación..."
                  value={newPostData.content}
                  onChange={(e) => setNewPostData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={6}
                />
              </div>

              {/* Etiquetas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Etiquetas
                </label>
                <div className="flex space-x-2 mb-3">
                  <div className="relative flex-1">
                    <Input
                      placeholder={newPostData.tags.length >= 10 ? "Límite de etiquetas alcanzado" : "Escribe una etiqueta y presiona Enter..."}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTag.trim() && newPostData.tags.length < 10) {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className={`pr-10 ${newPostData.tags.length >= 10 ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : ''}`}
                      disabled={newPostData.tags.length >= 10}
                    />
                    {newTag.trim() && newPostData.tags.length < 10 && (
                      <button
                        onClick={handleAddTag}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Etiquetas sugeridas */}
                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Etiquetas populares:</p>
                  <div className="flex flex-wrap gap-2">
                    {['ayuda', 'duda', 'examen', 'tarea', 'proyecto', 'estudio', 'práctica', 'recursos'].map((suggestedTag) => (
                      <button
                        key={suggestedTag}
                        onClick={() => {
                          if (!newPostData.tags.includes(suggestedTag) && newPostData.tags.length < 10) {
                            setNewPostData(prev => ({
                              ...prev,
                              tags: [...prev.tags, suggestedTag]
                            }));
                          } else if (newPostData.tags.length >= 10) {
                            alert('Has alcanzado el límite máximo de 10 etiquetas por publicación');
                          }
                        }}
                        disabled={newPostData.tags.includes(suggestedTag) || newPostData.tags.length >= 10}
                        className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                          newPostData.tags.includes(suggestedTag)
                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            : newPostData.tags.length >= 10
                            ? 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        #{suggestedTag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Etiquetas agregadas */}
                {newPostData.tags.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Etiquetas agregadas ({newPostData.tags.length}/10):
                      </p>
                      {newPostData.tags.length >= 10 && (
                        <span className="text-xs text-orange-600 dark:text-orange-400">
                          Máximo de etiquetas alcanzado
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newPostData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full flex items-center space-x-1 group hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          <Tag className="h-3 w-3" />
                          <span>#{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-blue-900 dark:hover:text-blue-100 transition-colors opacity-0 group-hover:opacity-100"
                            title="Eliminar etiqueta"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mensaje de límite */}
                {newPostData.tags.length >= 10 && (
                  <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-xs text-orange-700 dark:text-orange-300">
                        Has alcanzado el límite máximo de 10 etiquetas por publicación
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Opciones */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={newPostData.isPinned}
                    onChange={(e) => setNewPostData(prev => ({ ...prev, isPinned: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <label htmlFor="isPinned" className="text-sm text-gray-700 dark:text-gray-300">
                    Fijar publicación
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isLocked"
                    checked={newPostData.isLocked}
                    onChange={(e) => setNewPostData(prev => ({ ...prev, isLocked: e.target.checked }))}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <label htmlFor="isLocked" className="text-sm text-gray-700 dark:text-gray-300">
                    Bloquear comentarios
                  </label>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setCreatePostModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPostData.title.trim() || !newPostData.content.trim() || !newPostData.subjectId}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Publicación
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de respuesta */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Responder a: {selectedPost.title}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPost(null)}
              >
                Cerrar
              </Button>
            </div>
            
            <div className="mb-4">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedPost(null)}
              >
                Cancelar
              </Button>
              <Button onClick={handleReply}>
                Publicar Respuesta
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del post */}
      {selectedPostForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                    {selectedPostForDetails.author.firstName[0]}{selectedPostForDetails.author.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPostForDetails.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Por {selectedPostForDetails.author.firstName} {selectedPostForDetails.author.lastName} • {formatTimeAgo(selectedPostForDetails.createdAt)} • {selectedPostForDetails.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={selectedPostForDetails.isLiked ? "primary" : "outline"} 
                  size="sm"
                  onClick={() => handleLikePost(selectedPostForDetails.id)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${selectedPostForDetails.isLiked ? 'fill-current' : ''}`} />
                  {selectedPostForDetails.likes}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSharePost(selectedPostForDetails)}
                >
                  {showCopiedMessage ? <Check className="h-4 w-4 mr-1" /> : <Share2 className="h-4 w-4 mr-1" />}
                  {showCopiedMessage ? 'Copiado' : 'Compartir'}
                </Button>
                <Button 
                  variant={selectedPostForDetails.isSaved ? "primary" : "outline"} 
                  size="sm"
                  onClick={() => handleSavePost(selectedPostForDetails.id)}
                >
                  <Bookmark className={`h-4 w-4 mr-1 ${selectedPostForDetails.isSaved ? 'fill-current' : ''}`} />
                  {selectedPostForDetails.isSaved ? 'Guardado' : 'Guardar'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCloseDetails}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Contenido del post */}
            <div className="mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPostForDetails.content}
                </p>
                {selectedPostForDetails.tags && selectedPostForDetails.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedPostForDetails.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas del post */}
            <div className="flex items-center space-x-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{selectedPostForDetails.views} visualizaciones</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{selectedPostForDetails.replies} respuestas</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{selectedPostForDetails.likes} likes</span>
              </div>
            </div>

            {/* Respuestas */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Respuestas ({selectedPostForDetails.replies})
              </h4>
              
              {replies.filter(reply => reply.id.startsWith(selectedPostForDetails.id)).map((reply) => (
                <div key={reply.id} className="border-l-4 border-blue-200 dark:border-blue-700 pl-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold text-xs">
                        {reply.author.firstName[0]}{reply.author.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {reply.author.firstName} {reply.author.lastName}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(reply.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {reply.content}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button 
                          className={`flex items-center space-x-1 text-sm hover:text-blue-600 dark:hover:text-blue-400 ${
                            reply.isLiked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                          }`}
                          onClick={() => handleLikeReply(reply.id)}
                        >
                          <ThumbsUp className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedPostForDetails.replies === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                  <p>No hay respuestas aún. ¡Sé el primero en responder!</p>
                </div>
              )}
            </div>

            {/* Botón para responder */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={() => {
                setSelectedPost(selectedPostForDetails);
                handleCloseDetails();
              }} className="w-full">
                <Reply className="h-4 w-4 mr-2" />
                Responder a esta publicación
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de reporte */}
      {reportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generar Reporte de Actividad</h3>
              <button onClick={handleCloseReportModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">¿Qué formato de reporte prefieres?</p>
              <Button onClick={() => handleGenerateReport('PDF')} className="w-full">
                Generar Reporte PDF
              </Button>
              <Button onClick={() => handleGenerateReport('Excel')} className="w-full">
                Generar Reporte Excel
              </Button>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={handleCloseReportModal}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 