import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Users } from 'lucide-react';
import { Student } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { StudentModal } from '../modals/StudentModal';
import { useColor } from '../../contexts/ColorContext';

export const StudentList: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      email: 'juan.perez@estudiante.com',
      firstName: 'Juan',
      lastName: 'Pérez',
      role: 'student',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: 'EST-001',
      grade: '10mo A',
      section: 'A',
      enrollmentDate: new Date('2024-01-15'),
      guardianName: 'María Pérez',
      guardianPhone: '+58 412-1234567',
      guardianEmail: 'maria.perez@email.com',
      address: 'Av. Principal #123, Caracas',
      birthDate: new Date('2008-05-15'),
      gpa: 4.2,
      subjects: []
    },
    {
      id: '2',
      email: 'ana.garcia@estudiante.com',
      firstName: 'Ana',
      lastName: 'García',
      role: 'student',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: 'EST-002',
      grade: '11mo B',
      section: 'B',
      enrollmentDate: new Date('2024-01-15'),
      guardianName: 'Carlos García',
      guardianPhone: '+58 424-9876543',
      guardianEmail: 'carlos.garcia@email.com',
      address: 'Calle 15 #456, Valencia',
      birthDate: new Date('2007-08-22'),
      gpa: 3.8,
      subjects: []
    },
    {
      id: '3',
      email: 'carlos.rodriguez@estudiante.com',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      role: 'student',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: 'EST-003',
      grade: '9no C',
      section: 'C',
      enrollmentDate: new Date('2024-01-15'),
      guardianName: 'Laura Rodríguez',
      guardianPhone: '+58 416-5555555',
      guardianEmail: 'laura.rodriguez@email.com',
      address: 'Urbanización Los Robles, Maracay',
      birthDate: new Date('2009-12-10'),
      gpa: 3.9,
      subjects: []
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  const grades = ['all', '9no', '10mo', '11mo'];

  const handleSaveStudent = (studentData: Partial<Student>) => {
    if (editingStudent) {
      // Editar estudiante existente
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...studentData, updatedAt: new Date() }
          : student
      ));
    } else {
      // Crear nuevo estudiante
      const newStudent: Student = {
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...studentData
      } as Student;
      setStudents(prev => [...prev, newStudent]);
    }
    setEditingStudent(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const openNewStudentModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estudiantes</h1>
          <p className="text-gray-600">Gestiona la información de los estudiantes</p>
        </div>
        <Button onClick={openNewStudentModal}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los grados</option>
                {grades.slice(1).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de estudiantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} hover className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-100')} rounded-full flex items-center justify-center`}>
                    <span className={`${secondaryClasses.text} font-semibold`}>
                      {student.firstName[0]}{student.lastName[0]}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">
                      {student.firstName} {student.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{student.studentId}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Grado:</span>
                  <span className="text-sm font-medium">{student.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Promedio:</span>
                  <span className={`text-sm font-medium ${student.gpa >= 4.0 ? 'text-green-600' : student.gpa >= 3.5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {student.gpa.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Representante:</span>
                  <span className="text-sm font-medium">{student.guardianName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Teléfono:</span>
                  <span className="text-sm font-medium">{student.guardianPhone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditStudent(student)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron estudiantes
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primer estudiante para comenzar'}
            </p>
            <Button onClick={openNewStudentModal}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Estudiante
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStudent(null);
        }}
        student={editingStudent}
        onSave={handleSaveStudent}
      />
    </div>
  );
};