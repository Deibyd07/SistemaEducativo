import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Student } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: Student | null;
  onSave: (student: Partial<Student>) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave
}) => {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    email: student?.email || '',
    studentId: student?.studentId || '',
    grade: student?.grade || '9no A',
    section: student?.section || 'A',
    guardianName: student?.guardianName || '',
    guardianPhone: student?.guardianPhone || '',
    guardianEmail: student?.guardianEmail || '',
    address: student?.address || '',
    birthDate: student?.birthDate ? student.birthDate.toISOString().split('T')[0] : ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.studentId.trim()) newErrors.studentId = 'El ID del estudiante es requerido';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'El nombre del representante es requerido';
    if (!formData.guardianPhone.trim()) newErrors.guardianPhone = 'El teléfono del representante es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : undefined,
        enrollmentDate: new Date(),
        gpa: student?.gpa || 0,
        isActive: true,
        role: 'student' as const,
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
            {student ? 'Editar Estudiante' : 'Nuevo Estudiante'}
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
                label="ID del Estudiante"
                value={formData.studentId}
                onChange={(e) => updateField('studentId', e.target.value)}
                error={errors.studentId}
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
                label="Fecha de Nacimiento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateField('birthDate', e.target.value)}
                icon={<Calendar className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Información del Representante */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Información del Representante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Representante"
                value={formData.guardianName}
                onChange={(e) => updateField('guardianName', e.target.value)}
                error={errors.guardianName}
                required
              />
              <Input
                label="Teléfono del Representante"
                value={formData.guardianPhone}
                onChange={(e) => updateField('guardianPhone', e.target.value)}
                error={errors.guardianPhone}
                icon={<Phone className="h-4 w-4" />}
                required
              />
              <Input
                label="Email del Representante"
                type="email"
                value={formData.guardianEmail}
                onChange={(e) => updateField('guardianEmail', e.target.value)}
                icon={<Mail className="h-4 w-4" />}
              />
            </div>
          </div>

          {/* Dirección */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Dirección
            </h3>
            <Input
              label="Dirección Completa"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Av. Principal #123, Ciudad, Estado"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {student ? 'Actualizar' : 'Crear'} Estudiante
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};