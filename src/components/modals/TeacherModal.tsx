import React, { useState } from 'react';
import { X, User, Mail, Phone, GraduationCap, Calendar, Building } from 'lucide-react';
import { Teacher } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher?: Teacher | null;
  onSave: (teacher: Partial<Teacher>) => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onSave
}) => {
  const [formData, setFormData] = useState({
    firstName: teacher?.firstName || '',
    lastName: teacher?.lastName || '',
    email: teacher?.email || '',
    teacherId: teacher?.teacherId || '',
    specialization: teacher?.specialization || '',
    department: teacher?.department || 'Ciencias Exactas',
    phone: teacher?.phone || '',
    hireDate: teacher?.hireDate ? teacher.hireDate.toISOString().split('T')[0] : ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.teacherId.trim()) newErrors.teacherId = 'El ID del docente es requerido';
    if (!formData.specialization.trim()) newErrors.specialization = 'La especialización es requerida';
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        hireDate: formData.hireDate ? new Date(formData.hireDate) : new Date(),
        isActive: true,
        role: 'teacher' as const,
        subjects: []
      });
      onClose();
    }
  };

  const updateField = (field: string, value: string) => {
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
            {teacher ? 'Editar Docente' : 'Nuevo Docente'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información Personal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                error={errors.firstName}
                required
              />
              <Input
                label="Apellido"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                error={errors.lastName}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                icon={<Mail className="h-4 w-4" />}
                required
              />
              <Input
                label="Teléfono"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                error={errors.phone}
                icon={<Phone className="h-4 w-4" />}
                required
              />
            </div>
          </div>

          {/* Información Académica */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Información Académica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ID del Docente"
                value={formData.teacherId}
                onChange={(e) => updateField('teacherId', e.target.value)}
                error={errors.teacherId}
                required
              />
              <Input
                label="Especialización"
                value={formData.specialization}
                onChange={(e) => updateField('specialization', e.target.value)}
                error={errors.specialization}
                placeholder="Ej: Matemáticas, Historia, Inglés"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => updateField('department', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Ciencias Exactas">Ciencias Exactas</option>
                  <option value="Ciencias Sociales">Ciencias Sociales</option>
                  <option value="Idiomas">Idiomas</option>
                  <option value="Educación Física">Educación Física</option>
                  <option value="Arte">Arte</option>
                  <option value="Tecnología">Tecnología</option>
                </select>
              </div>
              <Input
                label="Fecha de Contratación"
                type="date"
                value={formData.hireDate}
                onChange={(e) => updateField('hireDate', e.target.value)}
                icon={<Calendar className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {teacher ? 'Actualizar' : 'Crear'} Docente
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};