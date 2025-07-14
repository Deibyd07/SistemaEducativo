import React, { useState, useRef } from 'react';
import { X, Upload, File, Trash2, Download, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AssignmentSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: {
    id: string;
    title: string;
    subject: string;
    dueDate: Date;
    points: number;
  };
  onSubmit: (files: File[], comments: string) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  size: string;
  type: string;
  uploadDate: Date;
}

export const AssignmentSubmissionModal: React.FC<AssignmentSubmissionModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSubmit
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const maxFiles = 5;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📄';
    return '📎';
  };

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!allowedFileTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Tipo de archivo no permitido. Solo se permiten PDF, Word, Excel, PowerPoint, imágenes y archivos de texto.'
      };
    }

    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `El archivo es demasiado grande. El tamaño máximo es ${formatFileSize(maxFileSize)}.`
      };
    }

    if (uploadedFiles.length >= maxFiles) {
      return {
        valid: false,
        error: `Ya has subido el máximo de ${maxFiles} archivos.`
      };
    }

    return { valid: true };
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    setIsUploading(true);

    // Simular proceso de subida
    setTimeout(() => {
      const newFiles: UploadedFile[] = [];
      
      Array.from(files).forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          const uploadedFile: UploadedFile = {
            id: Math.random().toString(36).substr(2, 9),
            file,
            size: formatFileSize(file.size),
            type: file.type,
            uploadDate: new Date()
          };
          newFiles.push(uploadedFile);
        } else {
          alert(validation.error);
        }
      });

      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 1000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      alert('Debes subir al menos un archivo para entregar la tarea.');
      return;
    }

    onSubmit(uploadedFiles.map(f => f.file), comments);
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Entregar Tarea
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
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Tarea:</span>
                  <p className="text-gray-900">{assignment.title}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Materia:</span>
                  <p className="text-gray-900">{assignment.subject}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Puntos:</span>
                  <p className="text-gray-900">{assignment.points}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fecha límite:</span>
                  <p className="text-gray-900">{formatDate(assignment.dueDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Área de subida de archivos */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Subir Archivos
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              
              {isUploading ? (
                <div className="space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-600">Subiendo archivos...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-sm text-gray-500">
                    Formatos permitidos: PDF, Word, Excel, PowerPoint, imágenes, texto
                  </p>
                  <p className="text-sm text-gray-500">
                    Tamaño máximo: 10MB por archivo • Máximo {maxFiles} archivos
                  </p>
                  
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Seleccionar Archivos
                  </Button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </div>
          </div>

          {/* Lista de archivos subidos */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Archivos Subidos ({uploadedFiles.length}/{maxFiles})
              </h3>
              
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getFileIcon(file.type)}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">
                          {file.file.name}
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
                        onClick={() => {
                          const url = URL.createObjectURL(file.file);
                          window.open(url, '_blank');
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const url = URL.createObjectURL(file.file);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = file.file.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comentarios */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Comentarios (Opcional)
            </h3>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Agrega comentarios sobre tu entrega..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Información importante:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Una vez entregada, no podrás modificar los archivos</li>
                  <li>• Asegúrate de que todos los archivos estén completos</li>
                  <li>• Verifica que los archivos se abran correctamente</li>
                  <li>• La entrega se registrará con fecha y hora</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={uploadedFiles.length === 0 || isUploading}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Entregar Tarea
          </Button>
        </div>
      </div>
    </div>
  );
}; 