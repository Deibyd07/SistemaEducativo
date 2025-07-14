import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, LogOut, FileText, ClipboardList, BarChart3, MessageSquare, Calendar as CalendarIcon, CheckCircle, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useColor } from '../../contexts/ColorContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const location = useLocation();
  const navigate = useNavigate();

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: '1', type: 'assignment', title: 'Nueva tarea de Matemáticas', time: 'Hace 2h', read: false },
    { id: '2', type: 'grade', title: 'Calificación actualizada en Historia', time: 'Hace 4h', read: false },
    { id: '3', type: 'event', title: 'Reunión de padres mañana', time: 'Hace 1d', read: false },
    { id: '4', type: 'forum', title: 'Nueva respuesta en foro de Física', time: 'Hace 2d', read: true }
  ]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Keyboard navigation for dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (showDropdown) {
        if (event.key === 'Escape') {
          setShowDropdown(false);
          notificationButtonRef.current?.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <ClipboardList className="h-4 w-4 text-blue-500" aria-hidden="true" />;
      case 'grade': return <BarChart3 className="h-4 w-4 text-green-500" aria-hidden="true" />;
      case 'event': return <CalendarIcon className="h-4 w-4 text-purple-500" aria-hidden="true" />;
      case 'forum': return <MessageSquare className="h-4 w-4 text-orange-500" aria-hidden="true" />;
      default: return <FileText className="h-4 w-4 text-gray-400" aria-hidden="true" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate('/settings');
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
  };

  return (
    <header 
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 fixed top-0 left-0 right-0 z-50 pl-16 sm:pl-6"
      role="banner"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white" id="page-title">Sistema Educativo</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Notificaciones */}
          <div className="relative">
            <button
              ref={notificationButtonRef}
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              onClick={handleNotificationToggle}
              aria-label={`Ver notificaciones${unreadCount > 0 ? `, ${unreadCount} sin leer` : ''}`}
              aria-expanded={showDropdown}
              aria-haspopup="true"
              aria-describedby={showDropdown ? 'notifications-dropdown' : undefined}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {unreadCount > 0 && (
                <span 
                  className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"
                  aria-label={`${unreadCount} notificaciones sin leer`}
                ></span>
              )}
            </button>
            {showDropdown && (
              <div
                ref={dropdownRef}
                id="notifications-dropdown"
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                role="dialog"
                aria-labelledby="notifications-title"
                aria-describedby="notifications-list"
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <span id="notifications-title" className="font-semibold text-gray-900 dark:text-white">Notificaciones</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={markAllAsRead} 
                    disabled={unreadCount === 0}
                    aria-label="Marcar todas las notificaciones como leídas"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" aria-hidden="true" /> 
                    Marcar todo como leído
                  </Button>
                </div>
                <div 
                  id="notifications-list"
                  className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700"
                  role="listbox"
                  aria-label="Lista de notificaciones"
                >
                  {notifications.length === 0 && (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400" role="status">No tienes notificaciones</div>
                  )}
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${n.read ? 'opacity-60' : ''}`}
                      role="option"
                      aria-selected={!n.read}
                      tabIndex={0}
                    >
                      <div aria-hidden="true">{getNotificationIcon(n.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{n.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{n.time}</div>
                      </div>
                      {!n.read && (
                        <span 
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          aria-label="No leída"
                        ></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avatar del usuario */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={handleProfileClick} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProfileClick();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Ver perfil y configuración"
            title="Ver perfil"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:underline">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role === 'student' ? 'Estudiante' : 
                 user?.role === 'teacher' ? 'Docente' :
                 user?.role === 'coordinator' ? 'Coordinador' :
                 user?.role === 'rector' ? 'Administración' : 'Usuario'}
              </p>
            </div>
            <div 
              className={`w-8 h-8 ${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-100')} dark:bg-opacity-20 rounded-full flex items-center justify-center`}
              aria-hidden="true"
            >
              <span className={`${secondaryClasses.text} font-semibold text-sm`}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};