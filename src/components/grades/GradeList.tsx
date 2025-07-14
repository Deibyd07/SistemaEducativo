import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { Grade, GradeType } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useColor } from '../../contexts/ColorContext';

export const GradeList: React.FC = () => {
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Datos simulados - en producción vendrían de la API
  const grades: Grade[] = [
    {
      id: '1',
      studentId: '1',
      student: {
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
      subjectId: '1',
      subject: {
        id: '1',
        name: 'Matemáticas',
        code: 'MAT-10A',
        grade: '10mo A',
        credits: 4,
        teacherId: '1',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      assignmentId: '1',
      assignment: {
        id: '1',
        title: 'Ecuaciones Cuadráticas',
        description: '',
        subjectId: '1',
        subject: {} as any,
        dueDate: new Date(),
        maxPoints: 100,
        isActive: true,
        createdAt: new Date(),
        submissions: []
      },
      score: 85,
      maxScore: 100,
      type: 'assignment',
      period: {
        id: '1',
        name: 'Primer Período',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        isActive: true,
        year: 2024,
        semester: 1
      },
      date: new Date('2024-01-20'),
      comments: 'Excelente trabajo, demostró comprensión del tema'
    },
    {
      id: '2',
      studentId: '2',
      student: {
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
      subjectId: '2',
      subject: {
        id: '2',
        name: 'Historia Universal',
        code: 'HIS-11B',
        grade: '11mo B',
        credits: 3,
        teacherId: '2',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      score: 92,
      maxScore: 100,
      type: 'exam',
      period: {
        id: '1',
        name: 'Primer Período',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        isActive: true,
        year: 2024,
        semester: 1
      },
      date: new Date('2024-01-18'),
      comments: 'Análisis profundo y bien estructurado'
    },
    {
      id: '3',
      studentId: '3',
      student: {
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
      },
      subjectId: '3',
      subject: {
        id: '3',
        name: 'Inglés Avanzado',
        code: 'ING-9C',
        grade: '9no C',
        credits: 3,
        teacherId: '3',
        teacher: {} as any,
        students: [],
        isActive: true,
        schedule: []
      },
      score: 78,
      maxScore: 100,
      type: 'quiz',
      period: {
        id: '1',
        name: 'Primer Período',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-15'),
        isActive: true,
        year: 2024,
        semester: 1
      },
      date: new Date('2024-01-16'),
      comments: 'Buena pronunciación, mejorar gramática'
    }
  ];

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = `${grade.student.firstName} ${grade.student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || grade.subject.name === selectedSubject;
    const matchesType = selectedType === 'all' || grade.type === selectedType;
    const matchesPeriod = selectedPeriod === 'all' || grade.period.name === selectedPeriod;
    
    return matchesSearch && matchesSubject && matchesType && matchesPeriod;
  });

  const subjects = ['all', ...Array.from(new Set(grades.map(g => g.subject.name)))];
  const types: (GradeType | 'all')[] = ['all', 'quiz', 'exam', 'assignment', 'participation', 'project'];
  const periods = ['all', ...Array.from(new Set(grades.map(g => g.period.name)))];

  const getGradeColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return <Award className="h-4 w-4" />;
    if (percentage >= 80) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const getTypeLabel = (type: GradeType) => {
    const labels = {
      quiz: 'Quiz',
      exam: 'Examen',
      assignment: 'Tarea',
      participation: 'Participación',
      project: 'Proyecto'
    };
    return labels[type];
  };

  // Estadísticas generales
  const totalGrades = filteredGrades.length;
  const averageScore = totalGrades > 0 ? filteredGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / totalGrades : 0;
  const highestScore = totalGrades > 0 ? Math.max(...filteredGrades.map(grade => (grade.score / grade.maxScore) * 100)) : 0;
  const lowestScore = totalGrades > 0 ? Math.min(...filteredGrades.map(grade => (grade.score / grade.maxScore) * 100)) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calificaciones</h1>
          <p className="text-gray-600">Gestiona las calificaciones y evaluaciones</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Calificación
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{totalGrades}</p>
              <p className="text-sm text-gray-600">Total Calificaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{averageScore.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Promedio General</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{highestScore.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Nota Más Alta</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{lowestScore.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Nota Más Baja</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                placeholder="Buscar por estudiante, materia o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todas las materias</option>
              {subjects.slice(1).map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los tipos</option>
              {types.slice(1).map(type => (
                <option key={type} value={type}>{getTypeLabel(type as GradeType)}</option>
              ))}
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los períodos</option>
              {periods.slice(1).map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de calificaciones */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Registro de Calificaciones</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Materia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {grade.student.firstName[0]}{grade.student.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {grade.student.firstName} {grade.student.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{grade.student.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{grade.subject.name}</p>
                        <p className="text-sm text-gray-500">{grade.subject.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {getTypeLabel(grade.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.score, grade.maxScore)}`}>
                          {getGradeIcon(grade.score, grade.maxScore)}
                          <span className="ml-1">{grade.score}/{grade.maxScore}</span>
                          <span className="ml-1">({((grade.score / grade.maxScore) * 100).toFixed(1)}%)</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {grade.date.toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredGrades.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <BarChart3 className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron calificaciones
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primera calificación para comenzar'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Calificación
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};