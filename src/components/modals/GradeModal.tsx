import React, { useState } from 'react';
import { X, BarChart3, User, BookOpen, FileText, Hash } from 'lucide-react';
import { Grade, Student, Subject, Assignment, GradeType } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface GradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade?: Grade | null;
  onSave: (grade: Partial<Grade>) => void;
}

export const GradeModal: React.FC<GradeModalProps> = ({
  isOpen,
  onClose,
  grade,
  onSave
}) => {
  const [formData, setFormData] = useState({
    studentId: grade?.studentId || '',
    subjectId: grade?.subjectId || '',
    assignmentId: grade?.assignmentId || '',
    score: grade?.score || 0,
    maxScore: grade?.maxScore || 100,
    type: grade?.type || 'quiz' as GradeType,
    comments: grade?.comments || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos simulados
  const students: Student[] = [
    {
      id: '1',
      firstName: 'Juan',
      lastName: 'Pérez',
      studentId: 'EST-001',
      grade: '10mo A'
    } as Student,
    {
      id: '2',
      firstName: 'Ana',
      lastName: 'García',
      studentId: 'EST-002',
      grade: '11mo B'
    } as Student,
    {
      id: '3',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      studentId: 'EST-003',
      grade: '9no C'
    } as Student
  ];

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
    } as Subject
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Ecuaciones Cuadráticas',
      subjectId: '1',
      maxPoints: 100
    } as Assignment,
    {
      id: '2',
      title: 'Ensayo: Segunda Guerra Mundial',
      subjectId: '2',
      maxPoints: 100
    } as Assignment,
    {
      id: '3',
      title: 'Presentación Oral',
      subjectId: '3',
      maxPoints: 100
    } as Assignment
  ];

  const gradeTypes: { value: GradeType; label: string }[] = [
    { value: 'quiz', label: 'Quiz' },
    { value: 'exam', label: 'Examen' },
    { value: 'assignment', label: 'Tarea' },
    { value: 'participation', label: 'Participación' },
    { value: 'project', label: 'Proyecto' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) newErrors.studentId = 'Debe seleccionar un estudiante';
    if (!formData.subjectId) newErrors.subjectId = 'Debe seleccionar una materia';
    if (formData.score < 0) newErrors.score = 'La calificación no puede ser negativa';
    if (formData.score > formData.maxScore) newErrors.score = 'La calificación no puede ser mayor al puntaje máximo';
    if (formData.maxScore < 1) newErrors.maxScore = 'El puntaje máximo debe ser mayor a 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedStudent = students.find(s => s.id === formData.studentId);
      const selectedSubject = subjects.find(s => s.id === formData.subjectId);
      const selectedAssignment = formData.assignmentId ? 
        assignments.find(a => a.id === formData.assignmentId) : undefined;

      onSave({
        ...formData,
        student: selectedStudent!,
        subject: selectedSubject!,
        assignment: selectedAssignment,
        date: new Date(),
        period: {
          id: '1',
          name: 'Primer Período',
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-03-15'),
          isActive: true,
          year: 2024,
          semester: 1
        }
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

  const getPercentage = () => {
    if (formData.maxScore === 0) return 0;
    return ((formData.score / formData.maxScore) * 100).toFixed(1);
  };

  const getGradeColor = () => {
    const percentage = parseFloat(getPercentage());
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Filtrar asignaciones por materia seleccionada
  const filteredAssignments = assignments.filter(a => a.subjectId === formData.subjectId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {grade ? 'Editar Calificación' : 'Nueva Calificación'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Selección de Estudiante y Materia */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Estudiante y Materia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estudiante
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) => updateField('studentId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.studentId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Seleccione un estudiante</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.firstName} {student.lastName} - {student.studentId}
                    </option>
                  ))}
                </select>
                {errors.studentId && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Materia
                </label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => {
                    updateField('subjectId', e.target.value);
                    updateField('assignmentId', ''); // Reset assignment when subject changes
                  }}
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
            </div>
          </div>

          {/* Tipo de Evaluación */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Tipo de Evaluación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value as GradeType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {gradeTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarea/Asignación (Opcional)
                </label>
                <select
                  value={formData.assignmentId}
                  onChange={(e) => updateField('assignmentId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!formData.subjectId}
                >
                  <option value="">Sin asignación específica</option>
                  {filteredAssignments.map(assignment => (
                    <option key={assignment.id} value={assignment.id}>
                      {assignment.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Calificación */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Calificación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Puntos Obtenidos"
                type="number"
                value={formData.score}
                onChange={(e) => updateField('score', parseFloat(e.target.value) || 0)}
                error={errors.score}
                min="0"
                step="0.1"
                required
              />
              <Input
                label="Puntos Máximos"
                type="number"
                value={formData.maxScore}
                onChange={(e) => updateField('maxScore', parseFloat(e.target.value) || 0)}
                error={errors.maxScore}
                min="1"
                step="0.1"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Porcentaje
                </label>
                <div className={`px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-lg font-semibold ${getGradeColor()}`}>
                  {getPercentage()}%
                </div>
              </div>
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Comentarios
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones (Opcional)
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => updateField('comments', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Comentarios sobre el desempeño del estudiante..."
              />
            </div>
          </div>

          {/* Vista Previa */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Vista Previa</h4>
            <div className="text-sm text-gray-600">
              <p><strong>Estudiante:</strong> {students.find(s => s.id === formData.studentId)?.firstName} {students.find(s => s.id === formData.studentId)?.lastName || 'No seleccionado'}</p>
              <p><strong>Materia:</strong> {subjects.find(s => s.id === formData.subjectId)?.name || 'No seleccionada'}</p>
              <p><strong>Tipo:</strong> {gradeTypes.find(t => t.value === formData.type)?.label}</p>
              <p><strong>Calificación:</strong> {formData.score}/{formData.maxScore} ({getPercentage()}%)</p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {grade ? 'Actualizar' : 'Crear'} Calificación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};