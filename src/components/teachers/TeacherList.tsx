import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Mail, Phone, Users } from 'lucide-react';
import { Teacher } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TeacherModal } from '../modals/TeacherModal';

export const TeacherList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      email: 'maria.gonzalez@colegio.com',
      firstName: 'María',
      lastName: 'González',
      role: 'teacher',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId: 'DOC-001',
      specialization: 'Matemáticas',
      subjects: [],
      hireDate: new Date('2020-02-15'),
      phone: '+58 412-1234567',
      department: 'Ciencias Exactas'
    },
    {
      id: '2',
      email: 'carlos.martinez@colegio.com',
      firstName: 'Carlos',
      lastName: 'Martínez',
      role: 'teacher',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId: 'DOC-002',
      specialization: 'Historia',
      subjects: [],
      hireDate: new Date('2019-08-20'),
      phone: '+58 424-9876543',
      department: 'Ciencias Sociales'
    },
    {
      id: '3',
      email: 'ana.rodriguez@colegio.com',
      firstName: 'Ana',
      lastName: 'Rodríguez',
      role: 'teacher',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId: 'DOC-003',
      specialization: 'Inglés',
      subjects: [],
      hireDate: new Date('2021-01-10'),
      phone: '+58 416-5555555',
      department: 'Idiomas'
    },
    {
      id: '4',
      email: 'luis.fernandez@colegio.com',
      firstName: 'Luis',
      lastName: 'Fernández',
      role: 'teacher',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId: 'DOC-004',
      specialization: 'Física',
      subjects: [],
      hireDate: new Date('2018-03-05'),
      phone: '+58 414-7777777',
      department: 'Ciencias Exactas'
    }
  ]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['all', 'Ciencias Exactas', 'Ciencias Sociales', 'Idiomas', 'Educación Física', 'Arte'];

  const getExperienceYears = (hireDate: Date) => {
    const years = new Date().getFullYear() - hireDate.getFullYear();
    return years;
  };

  const handleSaveTeacher = (teacherData: Partial<Teacher>) => {
    if (editingTeacher) {
      // Editar docente existente
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { ...teacher, ...teacherData, updatedAt: new Date() }
          : teacher
      ));
    } else {
      // Crear nuevo docente
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...teacherData
      } as Teacher;
      setTeachers(prev => [...prev, newTeacher]);
    }
    setEditingTeacher(null);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este docente?')) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    }
  };

  const openNewTeacherModal = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const handleContactTeacher = (teacher: Teacher, type: 'email' | 'phone') => {
    if (type === 'email') {
      window.open(`mailto:${teacher.email}`, '_blank');
    } else {
      window.open(`tel:${teacher.phone}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Docentes</h1>
          <p className="text-gray-600">Gestiona la información del personal docente</p>
        </div>
        <Button onClick={openNewTeacherModal}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Docente
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nombre, ID o especialización..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los departamentos</option>
                {departments.slice(1).map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
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

      {/* Lista de docentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} hover className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {teacher.firstName[0]}{teacher.lastName[0]}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{teacher.teacherId}</p>
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
                  <span className="text-sm text-gray-600">Especialización:</span>
                  <span className="text-sm font-medium">{teacher.specialization}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Departamento:</span>
                  <span className="text-sm font-medium">{teacher.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Experiencia:</span>
                  <span className="text-sm font-medium">{getExperienceYears(teacher.hireDate)} años</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Teléfono:</span>
                  <span className="text-sm font-medium">{teacher.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Contacto:</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContactTeacher(teacher, 'email')}
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleContactTeacher(teacher, 'phone')}
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Llamar
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditTeacher(teacher)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTeacher(teacher.id)}
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

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron docentes
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primer docente para comenzar'}
            </p>
            <Button onClick={openNewTeacherModal}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Docente
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTeacher(null);
        }}
        teacher={editingTeacher}
        onSave={handleSaveTeacher}
      />
    </div>
  );
};