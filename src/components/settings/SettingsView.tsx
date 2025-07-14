import React, { useState } from 'react';
import { Save, User, Bell, Shield, Palette, Mail, Smartphone, Eye, EyeOff, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useColor } from '../../contexts/ColorContext';

export const SettingsView: React.FC = () => {
  const { secondaryColor, setSecondaryColor, getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    // Perfil del estudiante
    firstName: 'María',
    lastName: 'González',
    email: 'maria.gonzalez@estudiante.edu.ve',
    phone: '+58 412-1234567',
    studentId: '2024-001',
    grade: '3er Año',
    section: 'A',
    
    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    assignmentReminders: true,
    gradeNotifications: true,
    eventNotifications: true,
    
    // Privacidad
    profileVisibility: 'public',
    showGrades: true,
    showSchedule: true,
    allowMessages: true,
    
    // Seguridad
    passwordMinLength: 8,
    sessionTimeout: 30,
    twoFactorAuth: false,
    
    // Apariencia
    secondaryColor: '#10B981',
    language: 'es',
    compactMode: false
  });
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'privacy', name: 'Privacidad', icon: Eye },
    { id: 'security', name: 'Seguridad', icon: Shield },
    { id: 'appearance', name: 'Apariencia', icon: Palette }
  ];

  const handleSave = () => {
    // Aquí se guardarían las configuraciones
    console.log('Configuraciones guardadas:', settings);
    alert('Configuraciones guardadas exitosamente');
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePhoto(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configuración</h1>
          <p className="text-gray-600 dark:text-gray-300">Gestiona tu perfil y preferencias</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navegación de pestañas */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium text-left transition-colors ${
                        activeTab === tab.id
                          ? `${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-50')} dark:bg-opacity-20 ${secondaryClasses.text} border-r-2 ${secondaryClasses.border}`
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="mr-3 h-4 w-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Contenido de configuración */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Perfil del Estudiante */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative w-28 h-28 mb-2">
                      <img
                        src={profilePhoto || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(settings.firstName + ' ' + settings.lastName) + '&background=3B82F6&color=fff&size=128'}
                        alt="Foto de perfil"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
                      />
                      <label htmlFor="profile-photo-upload" className={`absolute bottom-2 right-2 ${secondaryClasses.bg} ${secondaryClasses.hover} text-white rounded-full p-2 cursor-pointer shadow-lg`}>
                        <Camera className="h-5 w-5" />
                        <input
                          id="profile-photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Haz clic en la cámara para cambiar tu foto</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      value={settings.firstName}
                      onChange={(e) => updateSetting('firstName', e.target.value)}
                    />
                    <Input
                      label="Apellido"
                      value={settings.lastName}
                      onChange={(e) => updateSetting('lastName', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      icon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Teléfono"
                      value={settings.phone}
                      onChange={(e) => updateSetting('phone', e.target.value)}
                      icon={<Smartphone className="h-4 w-4" />}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Número de Estudiante"
                      value={settings.studentId}
                      onChange={(e) => updateSetting('studentId', e.target.value)}
                      disabled
                    />
                    <Input
                      label="Grado"
                      value={settings.grade}
                      onChange={(e) => updateSetting('grade', e.target.value)}
                      disabled
                    />
                    <Input
                      label="Sección"
                      value={settings.section}
                      onChange={(e) => updateSetting('section', e.target.value)}
                      disabled
                    />
                  </div>
                </div>
              )}

              {/* Configuración de Notificaciones */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipos de Notificaciones</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Notificaciones por email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Notificaciones por SMS</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Notificaciones push</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recordatorios Específicos</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.assignmentReminders}
                          onChange={(e) => updateSetting('assignmentReminders', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Recordatorios de tareas</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.gradeNotifications}
                          onChange={(e) => updateSetting('gradeNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Notificaciones de calificaciones</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.eventNotifications}
                          onChange={(e) => updateSetting('eventNotifications', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Notificaciones de eventos</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Privacidad */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Visibilidad del Perfil</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="public"
                          checked={settings.profileVisibility === 'public'}
                          onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                          className="border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Público</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value="private"
                          checked={settings.profileVisibility === 'private'}
                          onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                          className="border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Privado</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Información Visible</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.showGrades}
                          onChange={(e) => updateSetting('showGrades', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Mostrar calificaciones</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.showSchedule}
                          onChange={(e) => updateSetting('showSchedule', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Mostrar horario</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.allowMessages}
                          onChange={(e) => updateSetting('allowMessages', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Permitir mensajes</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Seguridad */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Configuración de Contraseña</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => updateSetting('twoFactorAuth', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Autenticación de dos factores</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sesión</h4>
                    <div className="space-y-3">
                      <label className="block text-sm text-gray-700 dark:text-gray-300">
                        Tiempo de sesión (minutos)
                        <input
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Configuración de Apariencia */}
              {activeTab === 'appearance' && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Color Secundario</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { name: 'Verde', value: '#10B981', class: 'bg-green-500' },
                          { name: 'Azul', value: '#3B82F6', class: 'bg-blue-500' },
                          { name: 'Púrpura', value: '#8B5CF6', class: 'bg-purple-500' },
                          { name: 'Rosa', value: '#EC4899', class: 'bg-pink-500' },
                          { name: 'Naranja', value: '#F59E0B', class: 'bg-orange-500' },
                          { name: 'Rojo', value: '#EF4444', class: 'bg-red-500' },
                          { name: 'Cian', value: '#06B6D4', class: 'bg-cyan-500' },
                          { name: 'Índigo', value: '#6366F1', class: 'bg-indigo-500' }
                        ].map((color) => (
                          <label
                            key={color.value}
                            className={`relative flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                              secondaryColor === color.value
                                ? `${secondaryClasses.border} ${secondaryClasses.bg.replace('bg-', 'bg-').replace('-500', '-50')} dark:bg-opacity-20`
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                            }`}
                          >
                            <input
                              type="radio"
                              name="secondaryColor"
                              value={color.value}
                              checked={secondaryColor === color.value}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-8 h-8 rounded-full ${color.class} mb-2`}></div>
                            <span className="text-xs text-gray-700 dark:text-gray-300 text-center">{color.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Idioma</h4>
                    <select
                      value={settings.language}
                      onChange={(e) => updateSetting('language', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Compacto</h4>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.compactMode}
                        onChange={(e) => updateSetting('compactMode', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Activar modo compacto</span>
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};