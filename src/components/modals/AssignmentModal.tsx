import React, { useState } from 'react';
import { X, FileText, Calendar, BookOpen, Hash } from 'lucide-react';
import { Assignment, Subject } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment?: Assignment | null;
  onSave: (assignment: Partial<Assignment>) => void;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: assignment?.title || '',
    description: assignment?.description || '',
    subjectId: assignment?.subjectId || '',
    dueDate: assignment?.dueDate ? assignment.dueDate.toISOString().split('T')[0] : '',
    dueTime: assignment?.dueDate ? assignment.dueDate.toTimeString().slice(0, 5) : '23:59',
    maxPoints: assignment?.maxPoints || 100
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos simulados de materias
  const subjects: Subject[] = [
    {
      id: '1',
      name: 'Matemáticas',
      code: 'MAT-10A',
      grade: '10mo A'
    } as Subject,
    {
      id: '2',
      name: 'Historia Universal',
      code: 'HIS-11B',
      grade: '11mo B'
    } as Subject,
    {
      id: '3',
      name: 'Inglés Avanzado',
      code: 'ING-9C',
      grade: '9no C'
    } as Subject,
    {
      id: '4',
      name: 'Física',
      code: 'FIS-10A',
      grade: '10mo A'
    } as Subject
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.subjectId) newErrors.subjectId = 'Debe seleccionar una materia';
    if (!formData.dueDate) newErrors.dueDate = 'La fecha límite es requerida';
    if (formData.maxPoints < 1) newErrors.maxPoints = 'Los puntos deben ser mayor a 0';

    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(`${formData.dueDate}T${formData.dueTime}`);
    if (selectedDate < new Date()) {
      newErrors.dueDate = 'La fecha límite no puede ser en el pasado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedSubject = subjects.find(s => s.id === formData.subjectId);
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`);
      
      onSave({
        ...formData,
        subject: selectedSubject!,
        dueDate: dueDateTime,
        isActive: true,
        createdAt: new Date(),
        submissions: []
      });
      onClose();
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {assignment ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Información de la Tarea
            </h3>
            <div className="space-y-4">
              <Input
                label="Título de la Tarea"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                error={errors.title}
                placeholder="Ej: Ecuaciones Cuadráticas - Ejercicios"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe detalladamente la tarea, instrucciones y criterios de evaluación..."
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Materia y Configuración */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Configuración
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Materia
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => updateField('subjectId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.subjectId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Seleccione una materia</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} - {subject.grade}
                    </option>
                  ))}
                </select>
                {errors.subjectId && (
                  <p className="mt-1 text-sm text-red-600">{errors.subjectId}</p>
                )}
              </div>

              <Input
                label="Puntos Máximos"
                type="number"
                value={formData.maxPoints}
                onChange={(e) => updateField('maxPoints', parseInt(e.target.value))}
                error={errors.maxPoints}
                icon={<Hash className="h-4 w-4" />}
                min="1"
                max="1000"
                required
              />
            </div>
          </div>

          {/* Fecha y Hora Límite */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Fecha Límite
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fecha Límite"
                type="date"
                value={formData.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                error={errors.dueDate}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <Input
                label="Hora Límite"
                type="time"
                value={formData.dueTime}
                onChange={(e) => updateField('dueTime', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Vista Previa */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Vista Previa</h4>
            <div className="text-sm text-gray-600">
              <p><strong>Título:</strong> {formData.title || 'Sin título'}</p>
              <p><strong>Materia:</strong> {subjects.find(s => s.id === formData.subjectId)?.name || 'No seleccionada'}</p>
              <p><strong>Fecha límite:</strong> {formData.dueDate && formData.dueTime ? 
                new Date(`${formData.dueDate}T${formData.dueTime}`).toLocaleString('es-ES') : 
                'No definida'
              }</p>
              <p><strong>Puntos:</strong> {formData.maxPoints}</p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {assignment ? 'Actualizar' : 'Crear'} Tarea
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};