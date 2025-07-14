import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ColorProvider } from './contexts/ColorContext';
import { ToastContainer } from './components/ui/Toast';
import { LoginForm } from './components/auth/LoginForm';
import { Header } from './components/layout/Header';
import { Sidebar, SidebarContext } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { CoordinatorDashboard } from './components/coordinator/CoordinatorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentList } from './components/students/StudentList';
import { TeacherList } from './components/teachers/TeacherList';
import { SubjectList } from './components/subjects/SubjectList';
import { AssignmentList } from './components/assignments/AssignmentList';
import { GradeList } from './components/grades/GradeList';
import { ReportList } from './components/reports/ReportList';
import { CalendarView } from './components/calendar/CalendarView';
import { SettingsView } from './components/settings/SettingsView';
import { StudentSchedule } from './components/student/StudentSchedule';
import { StudyMaterials } from './components/student/StudyMaterials';
import { StudentForums } from './components/student/StudentForums';
import { StudentNotifications } from './components/student/StudentNotifications';
import { StudentAssignments } from './components/student/StudentAssignments';
import { StudentGrades } from './components/student/StudentGrades';
import StudentMessages from './components/student/StudentMessages';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" aria-label="Cargando"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Función para obtener el dashboard principal según el rol
  const getMainDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'coordinator':
        return <CoordinatorDashboard />;
      case 'rector':
        return <AdminDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <Sidebar />
          <MainWithSidebarMargin user={user} getMainDashboard={getMainDashboard} />
        </div>
      </SidebarContext.Provider>
    </Router>
  );
};

const MainWithSidebarMargin: React.FC<{ user: any, getMainDashboard: () => JSX.Element }> = ({ user, getMainDashboard }) => {
  const { collapsed } = useContext(SidebarContext);
  const { toasts, removeToast } = useToast();
  
  return (
    <>
      <main
        className={`flex-1 p-6 transition-all duration-200 pt-20 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}
        role="main"
      >
        <Routes>
          {/* Rutas principales según rol */}
          <Route path="/" element={getMainDashboard()} />
          <Route path="/dashboard" element={getMainDashboard()} />

          {/* Rutas para estudiantes */}
          {user.role === 'student' && (
            <>
              <Route path="/schedule" element={<StudentSchedule />} />
              <Route path="/materials" element={<StudyMaterials />} />
              <Route path="/forums" element={<StudentForums />} />
              <Route path="/notifications" element={<StudentNotifications />} />
              <Route path="/assignments" element={<StudentAssignments />} />
              <Route path="/grades" element={<StudentGrades />} />
              <Route path="/messages" element={<StudentMessages />} />
            </>
          )}

          {/* Rutas para docentes */}
          {user.role === 'teacher' && (
            <>
              <Route path="/my-students" element={<StudentList />} />
              <Route path="/my-subjects" element={<SubjectList />} />
              <Route path="/assignments" element={<AssignmentList />} />
              <Route path="/grades" element={<GradeList />} />
              <Route path="/reports" element={<ReportList />} />
            </>
          )}

          {/* Rutas para coordinadores */}
          {user.role === 'coordinator' && (
            <>
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/subjects" element={<SubjectList />} />
              <Route path="/assignments" element={<AssignmentList />} />
              <Route path="/grades" element={<GradeList />} />
              <Route path="/reports" element={<ReportList />} />
            </>
          )}

          {/* Rutas para administración/rector */}
          {user.role === 'rector' && (
            <>
              <Route path="/students" element={<StudentList />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/subjects" element={<SubjectList />} />
              <Route path="/assignments" element={<AssignmentList />} />
              <Route path="/grades" element={<GradeList />} />
              <Route path="/reports" element={<ReportList />} />
            </>
          )}

          {/* Rutas compartidas */}
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/settings" element={<SettingsView />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} position="top-right" />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ColorProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ColorProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;