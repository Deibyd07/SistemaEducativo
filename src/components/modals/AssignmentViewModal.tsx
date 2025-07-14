import React, { useState } from 'react';
import { X, Download, Eye, File, Calendar, User, CheckCircle, Clock, AlertCircle, Star, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface SubmittedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
  url?: string;
}

interface AssignmentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    title: string;
    subject: string;
    teacher: string;
    dueDate: Date;
    points: number;
    status: string;
    submittedDate?: Date;
    grade?: number;
    comments?: string;
    submittedFiles: SubmittedFile[];
    isLate: boolean;
  };
}

export const AssignmentViewModal: React.FC<AssignmentViewModalProps> = ({
  isOpen,
  onClose,
  assignment
}) => {
  const [selectedFile, setSelectedFile] = useState<SubmittedFile | null>(null);

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📄';
    return '📎';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return Clock;
      case 'completed': return CheckCircle;
      case 'late': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'late': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 4.5) return 'text-green-600 bg-green-50';
    if (grade >= 4.0) return 'text-blue-600 bg-blue-50';
    if (grade >= 3.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleDownloadFile = (file: SubmittedFile) => {
    // Simulación de descarga
    console.log(`Descargando: ${file.name}`);
    // En producción, aquí se manejaría la descarga real del archivo
    if (file.url) {
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleViewFile = (file: SubmittedFile) => {
    // Simulación de vista previa
    console.log(`Vista previa de: ${file.name}`);
    // En producción, aquí se abriría un modal con la vista previa del archivo
    setSelectedFile(file);
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

  const formatGrade = (grade: number) => {
    return grade.toFixed(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Detalles de la Entrega
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {assignment.title} - {assignment.subject}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información de la tarea */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Tarea:</span>
                  <p className="text-gray-900">{assignment.title}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Materia:</span>
                  <p className="text-gray-900">{assignment.subject}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Profesor:</span>
                  <p className="text-gray-900">{assignment.teacher}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Puntos:</span>
                  <p className="text-gray-900">{assignment.points}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estado de la entrega */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(assignment.status)}`}>
                    {React.createElement(getStatusIcon(assignment.status), { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Estado de la Entrega
                    </h3>
                    <p className="text-sm text-gray-600">
                      {assignment.status === 'submitted' ? 'Entregada' : 
                       assignment.status === 'completed' ? 'Completada' : 
                       assignment.status === 'late' ? 'Entregada Tarde' : 'Pendiente'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {assignment.submittedDate && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Entregada:</span>
                      <p>{formatDate(assignment.submittedDate)}</p>
                    </div>
                  )}
                  {assignment.isLate && (
                    <div className="text-sm text-red-600 mt-1">
                      ⚠️ Entregada después de la fecha límite
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calificación */}
          {assignment.grade !== undefined && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getGradeColor(assignment.grade)}`}>
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Calificación
                      </h3>
                      <p className="text-sm text-gray-600">
                        Calificada por {assignment.teacher}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatGrade(assignment.grade)}/5.0
                    </div>
                    <div className="text-sm text-gray-600">
                      {((assignment.grade / 5) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {assignment.comments && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Comentarios del profesor:
                        </p>
                        <p className="text-sm text-gray-600">
                          {assignment.comments}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Archivos entregados */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Archivos Entregados ({assignment.submittedFiles.length})
              </h3>
            </CardHeader>
            <CardContent>
              {assignment.submittedFiles.length === 0 ? (
                <div className="text-center py-8">
                  <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay archivos entregados</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignment.submittedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {getFileIcon(file.type)}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {file.size} • {file.type}
                          </p>
                          <p className="text-xs text-gray-400">
                            Subido: {formatDate(file.uploadDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewFile(file)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadFile(file)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información adicional */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Información de la entrega:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Fecha límite: {formatDate(assignment.dueDate)}</li>
                  <li>• Total de archivos: {assignment.submittedFiles.length}</li>
                  <li>• Estado: {assignment.status === 'submitted' ? 'Entregada' : 
                                   assignment.status === 'completed' ? 'Completada' : 
                                   assignment.status === 'late' ? 'Entregada Tarde' : 'Pendiente'}</li>
                  {assignment.grade !== undefined && (
                    <li>• Calificación: {formatGrade(assignment.grade)}/5.0</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {assignment.submittedFiles.length > 0 && (
            <Button
              onClick={() => {
                // Descargar todos los archivos como ZIP
                console.log('Descargar todos los archivos');
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar Todos
            </Button>
          )}
        </div>
      </div>

      {/* Modal de vista previa de archivo */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Vista Previa: {selectedFile.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedFile.size} • {selectedFile.type}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {getFileIcon(selectedFile.type)}
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedFile.size} • {selectedFile.type}
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Button
                    onClick={() => handleDownloadFile(selectedFile)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // En producción, aquí se abriría el archivo en una nueva pestaña
                      console.log('Abrir archivo en nueva pestaña');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Abrir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 