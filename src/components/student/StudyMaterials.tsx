import React, { useState } from 'react';
import { BookOpen, Search, Download, Eye, ExternalLink, FileText, Video, Presentation, Link, Star, Calendar, User, X } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './secondary-hover.css';

export const StudyMaterials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Datos simulados de materiales de estudio
  const materials = [
    {
      id: '1',
      title: 'Guía de Ecuaciones Cuadráticas',
      description: 'Documento completo con ejemplos y ejercicios prácticos.',
      type: 'document',
      subject: 'Matemáticas',
      fileUrl: '/materials/ecuaciones-cuadraticas.pdf',
      fileSize: '2.5 MB',
      uploadedBy: 'Prof. Ana Martínez',
      uploadedAt: new Date('2024-01-20'),
      rating: 4.5
    },
    {
      id: '2',
      title: 'Video: Revolución Industrial',
      description: 'Video explicativo sobre la Revolución Industrial.',
      type: 'video',
      subject: 'Historia',
      externalUrl: 'https://www.youtube.com/watch?v=revolucion-industrial',
      duration: '15:30',
      uploadedBy: 'Prof. Carlos Rodríguez',
      uploadedAt: new Date('2024-01-18'),
      rating: 4.8
    },
    {
      id: '3',
      title: 'Presentación: Gramática Inglesa',
      description: 'Presentación sobre tiempos verbales en inglés.',
      type: 'presentation',
      subject: 'Inglés',
      fileUrl: '/materials/gramatica-inglesa.pptx',
      fileSize: '1.8 MB',
      uploadedBy: 'Prof. María González',
      uploadedAt: new Date('2024-01-15'),
      rating: 4.2
    },
    {
      id: '4',
      title: 'Enlaces de Física Cuántica',
      description: 'Recopilación de enlaces útiles sobre física cuántica.',
      type: 'link',
      subject: 'Física',
      externalUrl: 'https://physics.org/quantum',
      uploadedBy: 'Prof. Luis Hernández',
      uploadedAt: new Date('2024-01-12'),
      rating: 4.0
    },
    {
      id: '5',
      title: 'Cuestionario de Literatura',
      description: 'Cuestionario interactivo sobre literatura clásica.',
      type: 'quiz',
      subject: 'Literatura',
      fileUrl: '/materials/cuestionario-literatura.html',
      fileSize: '500 KB',
      uploadedBy: 'Prof. Carmen López',
      uploadedAt: new Date('2024-01-10'),
      rating: 4.6
    },
    {
      id: '6',
      title: 'Documento: Análisis de Datos',
      description: 'Guía completa para análisis de datos estadísticos.',
      type: 'document',
      subject: 'Matemáticas',
      fileUrl: '/materials/analisis-datos.pdf',
      fileSize: '3.2 MB',
      uploadedBy: 'Prof. Ana Martínez',
      uploadedAt: new Date('2024-01-08'),
      rating: 4.3
    }
  ];

  // Materias únicas
  const uniqueSubjects = Array.from(new Set(materials.map(m => m.subject)));

  // Filtrado por materia y búsqueda
  const filteredMaterials = materials.filter(material => {
    if (!selectedSubject) return false;
    const matchesSubject = material.subject === selectedSubject;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'presentation': return Presentation;
      case 'link': return Link;
      case 'quiz': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20';
      case 'video': return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20';
      case 'presentation': return 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/20';
      case 'link': return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20';
      case 'quiz': return 'text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700';
    }
  };

  const handleDownload = (material: any) => {
    if (material.fileUrl) {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleView = (material: any) => {
    setSelectedMaterial(material);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedMaterial(null);
  };

  const handleViewInNewTab = (material: any) => {
    if (material.externalUrl) {
      window.open(material.externalUrl, '_blank');
    } else if (material.fileUrl) {
      window.open(material.fileUrl, '_blank');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Material de Estudio</h2>
          <p className="text-gray-600 dark:text-gray-300">Selecciona una materia para ver los materiales disponibles</p>
        </div>
        {selectedSubject && (
          <div className="flex items-center space-x-2">
            <Button onClick={() => setSelectedSubject(null)} className="bg-blue-600 hover:bg-blue-700 text-white">
              ← Ir atrás
            </Button>
          </div>
        )}
      </div>

      {/* Panel de materias */}
      {!selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uniqueSubjects.map(subject => (
            <div key={subject} onClick={() => setSelectedSubject(subject)} className="cursor-pointer">
              <Card className="hover:shadow-lg transition-shadow border-2 border-transparent secondary-hover-border">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-900 dark:text-gray-200 mb-2 secondary-hover-icon" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{subject}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{materials.filter(m => m.subject === subject).length} materiales</span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Si no hay materia seleccionada, mostrar mensaje */}
      {!selectedSubject && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Selecciona una materia para ver los materiales de estudio.</div>
      )}

      {/* Si hay materia seleccionada, mostrar búsqueda y lista */}
      {selectedSubject && (
        <>
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder={`Buscar materiales en ${selectedSubject}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Lista de materiales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No se encontraron materiales en {selectedSubject}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">Intenta con otros términos de búsqueda</p>
              </div>
            ) : (
              filteredMaterials.map((material) => {
                const TypeIcon = getTypeIcon(material.type);
                return (
                  <Card key={material.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {/* Header del material */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-lg ${getTypeColor(material.type)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{material.rating}</span>
                        </div>
                      </div>

                      {/* Información principal */}
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {material.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {material.description}
                        </p>
                        {/* Detalles */}
                        <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2" />
                            {material.subject}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {material.uploadedBy}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(material.uploadedAt)}
                          </div>
                        </div>
                      </div>

                      {/* Acciones */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Button size="sm" onClick={() => handleView(material)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        {material.fileUrl && (
                          <Button size="sm" variant="outline" onClick={() => handleDownload(material)}>
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        )}
                        {material.externalUrl && (
                          <Button size="sm" variant="outline" onClick={() => handleViewInNewTab(material)}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Enlace
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </>
      )}

      {/* Modal de detalles del material */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMaterial.title}</h3>
              <button onClick={handleCloseDetailsModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">Tipo:</span> {selectedMaterial.type}
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                <span className="font-medium">Subido por:</span> {selectedMaterial.uploadedBy}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                <span className="font-medium">Subido el:</span> {formatDate(selectedMaterial.uploadedAt)}
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                <span className="font-medium">Tamaño:</span> {selectedMaterial.fileSize}
              </div>
              <div className="flex items-center">
                <Link className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
                <span className="font-medium">Enlace:</span> {selectedMaterial.externalUrl ? 'Sí' : 'No'}
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium">Calificación:</span> {selectedMaterial.rating}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              {selectedMaterial.fileUrl && (
                <Button size="sm" variant="outline" onClick={() => handleDownload(selectedMaterial)}>
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
              )}
              {selectedMaterial.externalUrl && (
                <Button size="sm" variant="outline" onClick={() => handleViewInNewTab(selectedMaterial)}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Enlace
                </Button>
              )}
              <Button size="sm" onClick={handleCloseDetailsModal}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 