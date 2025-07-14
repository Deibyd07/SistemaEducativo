import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, Users, Clock } from 'lucide-react';
import { Subject } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const SubjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Datos simulados - en producción vendrían de la API
  const subjects: Subject[] = [
    {
      id: '1',
      name: 'Matemáticas',
      code: 'MAT-10A',
      grade: '10mo A',
      credits: 4,
      teacherId: '1',
      teacher: {
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
      students: [],
      isActive: true,
      schedule: [
        { id: '1', day: 'Lunes', startTime: '08:00', endTime: '09:30', classroom: 'Aula 101' },
        { id: '2', day: 'Miércoles', startTime: '10:00', endTime: '11:30', classroom: 'Aula 101' },
        { id: '3', day: 'Viernes', startTime: '08:00', endTime: '09:30', classroom: 'Aula 101' }
      ]
    },
    {
      id: '2',
      name: 'Historia Universal',
      code: 'HIS-11B',
      grade: '11mo B',
      credits: 3,
      teacherId: '2',
      teacher: {
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
      students: [],
      isActive: true,
      schedule: [
        { id: '4', day: 'Martes', startTime: '09:30', endTime: '11:00', classroom: 'Aula 205' },
        { id: '5', day: 'Jueves', startTime: '14:00', endTime: '15:30', classroom: 'Aula 205' }
      ]
    },
    {
      id: '3',
      name: 'Inglés Avanzado',
      code: 'ING-9C',
      grade: '9no C',
      credits: 3,
      teacherId: '3',
      teacher: {
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
      students: [],
      isActive: true,
      schedule: [
        { id: '6', day: 'Lunes', startTime: '11:30', endTime: '13:00', classroom: 'Lab. Idiomas' },
        { id: '7', day: 'Miércoles', startTime: '14:00', endTime: '15:30', classroom: 'Lab. Idiomas' },
        { id: '8', day: 'Viernes', startTime: '11:30', endTime: '13:00', classroom: 'Lab. Idiomas' }
      ]
    },
    {
      id: '4',
      name: 'Física',
      code: 'FIS-10A',
      grade: '10mo A',
      credits: 4,
      teacherId: '4',
      teacher: {
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
      },
      students: [],
      isActive: true,
      schedule: [
        { id: '9', day: 'Martes', startTime: '08:00', endTime: '09:30', classroom: 'Lab. Física' },
        { id: '10', day: 'Jueves', startTime: '10:00', endTime: '11:30', classroom: 'Lab. Física' }
      ]
    }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${subject.teacher.firstName} ${subject.teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || subject.grade.includes(selectedGrade);
    return matchesSearch && matchesGrade;
  });

  const grades = ['all', '9no', '10mo', '11mo'];

  const getScheduleText = (schedule: any[]) => {
    return schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materias</h1>
          <p className="text-gray-600">Gestiona las materias y horarios académicos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Materia
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por materia, código o profesor..."
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

      {/* Lista de materias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} hover className="h-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600">{subject.code}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-2">
                    {subject.grade}
                  </span>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profesor:</span>
                  <span className="text-sm font-medium">
                    {subject.teacher.firstName} {subject.teacher.lastName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Créditos:</span>
                  <span className="text-sm font-medium">{subject.credits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estudiantes:</span>
                  <span className="text-sm font-medium flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {subject.students.length}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Horario:</span>
                </div>
                <div className="space-y-1">
                  {subject.schedule.map((schedule) => (
                    <div key={schedule.id} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <span className="font-medium">{schedule.day}</span> {schedule.startTime}-{schedule.endTime}
                      <br />
                      <span className="text-gray-500">{schedule.classroom}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron materias
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primera materia para comenzar'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Materia
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};