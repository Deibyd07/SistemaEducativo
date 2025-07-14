import React, { useState } from 'react';
import { X, BookOpen, User, Clock, MapPin } from 'lucide-react';
import { Subject, Teacher } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject | null;
  onSave: (subject: Partial<Subject>) => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
  isOpen,
  onClose,
  subject,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: subject?.name || '',
    code: subject?.code || '',
    grade: subject?.grade || '9no A',
    credits: subject?.credits || 3,
    teacherId: subject?.teacherId || '',
    schedule: subject?.schedule || [
      { id: '1', day: 'Lunes', startTime: '08:00', endTime: '09:30', classroom: '' }
    ]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos simulados de profesores
  const teachers: Teacher[] = [
    {
      id: '1',
      firstName: 'María',
      lastName: 'González',
      specialization: 'Matemáticas',
      teacherId: 'DOC-001'
    } as Teacher,
    {
      id: '2',
      firstName: 'Carlos',
      lastName: 'Martínez',
      specialization: 'Historia',
      teacherId: 'DOC-002'
    } as Teacher,
    {
      id: '3',
      firstName: 'Ana',
      lastName: 'Rodríguez',
      specialization: 'Inglés',
      teacherId: 'DOC-003'
    } as Teacher
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre de la materia es requerido';
    if (!formData.code.trim()) newErrors.code = 'El código es requerido';
    if (!formData.teacherId) newErrors.teacherId = 'Debe seleccionar un profesor';
    if (formData.credits < 1) newErrors.credits = 'Los créditos deben ser mayor a 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedTeacher = teachers.find(t => t.id === formData.teacherId);
      onSave({
        ...formData,
        teacher: selectedTeacher!,
        students: [],
        isActive: true
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

  const addScheduleSlot = () => {
    const newSlot = {
      id: Date.now().toString(),
      day: 'Lunes',
      startTime: '08:00',
      endTime: '09:30',
      classroom: ''
    };
    updateField('schedule', [...formData.schedule, newSlot]);
  };

  const updateScheduleSlot = (index: number, field: string, value: string) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    updateField('schedule', newSchedule);
  };

  const removeScheduleSlot = (index: number) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    updateField('schedule', newSchedule);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {subject ? 'Editar Materia' : 'Nueva Materia'}
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
              <BookOpen className="h-5 w-5 mr-2" />
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre de la Materia"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
                placeholder="Ej: Matemáticas Avanzadas"
                required
              />
              <Input
                label="Código"
                value={formData.code}
                onChange={(e) => updateField('code', e.target.value)}
                error={errors.code}
                placeholder="Ej: MAT-10A"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grado
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => updateField('grade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="9no A">9no A</option>
                  <option value="9no B">9no B</option>
                  <option value="10mo A">10mo A</option>
                  <option value="10mo B">10mo B</option>
                  <option value="11mo A">11mo A</option>
                  <option value="11mo B">11mo B</option>
                </select>
              </div>
              <Input
                label="Créditos"
                type="number"
                value={formData.credits}
                onChange={(e) => updateField('credits', parseInt(e.target.value))}
                error={errors.credits}
                min="1"
                max="6"
                required
              />
            </div>
          </div>

          {/* Profesor Asignado */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profesor Asignado
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seleccionar Profesor
              </label>
              <select
                value={formData.teacherId}
                onChange={(e) => updateField('teacherId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.teacherId ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Seleccione un profesor</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName} - {teacher.specialization}
                  </option>
                ))}
              </select>
              {errors.teacherId && (
                <p className="mt-1 text-sm text-red-600">{errors.teacherId}</p>
              )}
            </div>
          </div>

          {/* Horario */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Horario de Clases
            </h3>
            <div className="space-y-3">
              {formData.schedule.map((slot, index) => (
                <div key={slot.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Día</label>
                    <select
                      value={slot.day}
                      onChange={(e) => updateScheduleSlot(index, 'day', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Lunes">Lunes</option>
                      <option value="Martes">Martes</option>
                      <option value="Miércoles">Miércoles</option>
                      <option value="Jueves">Jueves</option>
                      <option value="Viernes">Viernes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Inicio</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateScheduleSlot(index, 'startTime', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Fin</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateScheduleSlot(index, 'endTime', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Aula</label>
                    <input
                      type="text"
                      value={slot.classroom}
                      onChange={(e) => updateScheduleSlot(index, 'classroom', e.target.value)}
                      placeholder="Ej: Aula 101"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScheduleSlot(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addScheduleSlot}
              >
                <Clock className="h-4 w-4 mr-2" />
                Agregar Horario
              </Button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {subject ? 'Actualizar' : 'Crear'} Materia
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};