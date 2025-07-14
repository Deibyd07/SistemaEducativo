import React, { useState } from 'react';
import { Search, Plus, Filter, Download, FileText, BarChart3, TrendingUp, Calendar, Users, Award } from 'lucide-react';
import { Student, AcademicPeriod } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const ReportList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [reportType, setReportType] = useState('all');

  // Datos simulados
  const periods: AcademicPeriod[] = [
    {
      id: '1',
      name: 'Primer Período',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-03-15'),
      isActive: true,
      year: 2024,
      semester: 1
    },
    {
      id: '2',
      name: 'Segundo Período',
      startDate: new Date('2024-03-16'),
      endDate: new Date('2024-05-15'),
      isActive: false,
      year: 2024,
      semester: 1
    }
  ];

  const reports = [
    {
      id: '1',
      title: 'Boletín Individual - Juan Pérez',
      type: 'individual',
      student: 'Juan Pérez',
      grade: '10mo A',
      period: 'Primer Período',
      gpa: 4.2,
      generatedAt: new Date('2024-01-20'),
      status: 'completed'
    },
    {
      id: '2',
      title: 'Reporte de Curso - 10mo A',
      type: 'course',
      grade: '10mo A',
      period: 'Primer Período',
      studentsCount: 25,
      averageGpa: 3.8,
      generatedAt: new Date('2024-01-18'),
      status: 'completed'
    },
    {
      id: '3',
      title: 'Estadísticas Generales',
      type: 'general',
      period: 'Primer Período',
      totalStudents: 150,
      averageGpa: 3.7,
      generatedAt: new Date('2024-01-15'),
      status: 'completed'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.student && report.student.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPeriod = selectedPeriod === 'all' || report.period === selectedPeriod;
    const matchesGrade = selectedGrade === 'all' || report.grade === selectedGrade;
    const matchesType = reportType === 'all' || report.type === reportType;
    
    return matchesSearch && matchesPeriod && matchesGrade && matchesType;
  });

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'individual': return <FileText className="h-5 w-5" />;
      case 'course': return <Users className="h-5 w-5" />;
      case 'general': return <BarChart3 className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Boletín Individual';
      case 'course': return 'Reporte de Curso';
      case 'general': return 'Estadísticas Generales';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600">Genera y gestiona boletines y reportes académicos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Estadísticas
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Boletines Generados</p>
                <p className="text-2xl font-bold text-blue-600">150</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-green-600">3.7</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estudiantes Destacados</p>
                <p className="text-2xl font-bold text-yellow-600">23</p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reportes Pendientes</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
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
                placeholder="Buscar reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los períodos</option>
              {periods.map(period => (
                <option key={period.id} value={period.name}>{period.name}</option>
              ))}
            </select>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los grados</option>
              <option value="9no A">9no A</option>
              <option value="10mo A">10mo A</option>
              <option value="11mo B">11mo B</option>
            </select>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos los tipos</option>
              <option value="individual">Boletín Individual</option>
              <option value="course">Reporte de Curso</option>
              <option value="general">Estadísticas Generales</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reportes */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Reportes Generados</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{report.title}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getReportTypeLabel(report.type)}
                        </span>
                        <span className="text-sm text-gray-600">{report.period}</span>
                        {report.grade && (
                          <span className="text-sm text-gray-600">{report.grade}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      {report.gpa && (
                        <p className="text-sm font-medium text-gray-900">
                          Promedio: {report.gpa.toFixed(1)}
                        </p>
                      )}
                      {report.averageGpa && (
                        <p className="text-sm font-medium text-gray-900">
                          Promedio: {report.averageGpa.toFixed(1)}
                        </p>
                      )}
                      {report.studentsCount && (
                        <p className="text-sm text-gray-600">
                          {report.studentsCount} estudiantes
                        </p>
                      )}
                      {report.totalStudents && (
                        <p className="text-sm text-gray-600">
                          {report.totalStudents} estudiantes
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {report.generatedAt.toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Descargar
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generación rápida */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Boletín Individual</h3>
            <p className="text-gray-600 mb-4">Genera el boletín de un estudiante específico</p>
            <Button className="w-full">Generar Boletín</Button>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reporte de Curso</h3>
            <p className="text-gray-600 mb-4">Estadísticas completas de un curso</p>
            <Button className="w-full">Generar Reporte</Button>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estadísticas Generales</h3>
            <p className="text-gray-600 mb-4">Análisis completo de la institución</p>
            <Button className="w-full">Generar Estadísticas</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};