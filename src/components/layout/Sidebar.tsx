import React, { useState, createContext, useContext } from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  FileText, 
  Calendar,
  Settings,
  LogOut,
  MessageSquare,
  Bell,
  Menu,
  Mail
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useColor } from '../../contexts/ColorContext';
import { cn } from '../../utils/cn';

export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/', roles: ['student', 'teacher', 'coordinator', 'rector'] },
    { id: 'students', name: 'Estudiantes', icon: Users, path: '/students', roles: ['coordinator', 'rector'] },
    { id: 'teachers', name: 'Docentes', icon: GraduationCap, path: '/teachers', roles: ['coordinator', 'rector'] },
    { id: 'subjects', name: 'Materias', icon: BookOpen, path: '/subjects', roles: ['teacher', 'coordinator', 'rector'] },
    { id: 'assignments', name: 'Tareas', icon: ClipboardList, path: '/assignments', roles: ['student', 'teacher', 'coordinator', 'rector'] },
    { id: 'grades', name: 'Calificaciones', icon: BarChart3, path: '/grades', roles: ['student', 'teacher', 'coordinator', 'rector'] },
    { id: 'schedule', name: 'Horario', icon: Calendar, path: '/schedule', roles: ['student'] },
    { id: 'materials', name: 'Material de Estudio', icon: BookOpen, path: '/materials', roles: ['student'] },
    { id: 'forums', name: 'Foros', icon: MessageSquare, path: '/forums', roles: ['student'] },
    { id: 'notifications', name: 'Notificaciones', icon: Bell, path: '/notifications', roles: ['student'] },
    { id: 'reports', name: 'Reportes', icon: FileText, path: '/reports', roles: ['teacher', 'coordinator', 'rector'] },
    { id: 'calendar', name: 'Calendario', icon: Calendar, path: '/calendar', roles: ['student', 'teacher', 'coordinator', 'rector'] },
    { id: 'settings', name: 'Configuración', icon: Settings, path: '/settings', roles: ['student', 'teacher', 'coordinator', 'rector'] },
    { id: 'messages', name: 'Mensajería', icon: Mail, path: '/messages', roles: ['student', 'teacher', 'coordinator', 'rector'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  const handleMobileToggle = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleCollapseToggle = () => {
    setCollapsed((v) => !v);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {/* Botón hamburguesa para móvil */}
      <button
        className={`fixed top-4 left-4 z-50 ${secondaryClasses.bg} text-white p-2 rounded-lg shadow-lg block lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2`}
        onClick={handleMobileToggle}
        aria-label="Abrir menú de navegación"
        aria-expanded={mobileOpen}
        aria-controls="sidebar-navigation"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      
      {/* Overlay para móvil */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity lg:static lg:bg-transparent',
          mobileOpen ? 'block' : 'hidden lg:block'
        )}
        onClick={handleMobileClose}
        aria-hidden="true"
      ></div>
      
      <aside
        id="sidebar-navigation"
        className={cn(
          'h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-200 flex flex-col',
          'lg:fixed lg:top-0 lg:left-0 lg:z-60',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'fixed z-50 top-0 left-0 block shadow-2xl' : 'hidden lg:flex',
        )}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* Header y toggle */}
        <div className={`sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 ${secondaryClasses.bg}`}>
          <h1 className={cn('text-xl font-bold text-white transition-all', collapsed && 'hidden')}>
            <span className="sr-only">Sistema Educativo - </span>
            Sistema Educativo
          </h1>
          
          {/* Botón colapsar/expandir: SOLO escritorio */}
          <button
            className={`text-white p-2 rounded-lg ${secondaryClasses.hover} transition-colors hidden lg:block ml-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
            onClick={handleCollapseToggle}
            aria-label={collapsed ? 'Expandir menú de navegación' : 'Colapsar menú de navegación'}
            aria-expanded={!collapsed}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          
          {/* Botón cerrar overlay: SOLO móvil */}
          <button
            className={`text-white p-2 rounded-lg ${secondaryClasses.hover} transition-colors block lg:hidden ml-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
            onClick={handleMobileClose}
            aria-label="Cerrar menú de navegación"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto" role="navigation" aria-label="Menú principal">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActiveItem = isActive(item.path);
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                onKeyDown={(e) => handleKeyDown(e, item.path)}
                className={cn(
                  'w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  isActiveItem
                    ? `${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-50')} dark:bg-opacity-20 ${secondaryClasses.text} border-r-2 ${secondaryClasses.border}`
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                  `focus:ring-2 ${secondaryClasses.border}`,
                  collapsed && 'justify-center px-0'
                )}
                title={collapsed ? item.name : undefined}
                aria-current={isActiveItem ? 'page' : undefined}
                aria-label={collapsed ? item.name : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </button>
            );
          })}
        </nav>
        
        {/* User info y logout */}
        <div className={cn('border-t border-gray-200 dark:border-gray-700 p-4 transition-all', collapsed && 'px-2')} role="complementary" aria-label="Información del usuario"> 
          <div className={cn('flex items-center mb-3', collapsed && 'justify-center')}> 
            <div 
              className={`w-10 h-10 ${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-100')} dark:bg-opacity-20 rounded-full flex items-center justify-center`}
              aria-hidden="true"
            >
              <span className={`${secondaryClasses.text} font-semibold`}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role === 'student' ? 'Estudiante' : 
                   user?.role === 'teacher' ? 'Docente' :
                   user?.role === 'coordinator' ? 'Coordinador' :
                   user?.role === 'rector' ? 'Administración' : 'Usuario'}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
              collapsed && 'justify-center px-0'
            )}
            aria-label="Cerrar sesión"
          >
            <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
            {!collapsed && 'Cerrar Sesión'}
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};