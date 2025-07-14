import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { useColor } from '../../contexts/ColorContext';

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { getSecondaryColorClasses } = useColor();
  const secondaryClasses = getSecondaryColorClasses();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const credentials = [
    {
      role: 'Estudiante',
      email: 'estudiante1@school.com',
      password: 'estudiante123',
      description: 'Acceso al campus virtual y módulos estudiantiles'
    },
    {
      role: 'Docente',
      email: 'docente1@school.com',
      password: 'docente123',
      description: 'Gestión de materias, tareas y calificaciones'
    },
    {
      role: 'Coordinador',
      email: 'coordinador@school.com',
      password: 'coordinador123',
      description: 'Administración académica y reportes'
    },
    {
      role: 'Rector',
      email: 'rector@school.com',
      password: 'rector123',
      description: 'Gestión institucional completa'
    },
    {
      role: 'Administración',
      email: 'admin@school.com',
      password: 'admin123',
      description: 'Acceso administrativo completo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 ${secondaryClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">EduGestión</h1>
          <p className="text-gray-600 dark:text-gray-300">Sistema Administrativo Escolar</p>
        </div>

        {/* Formulario de login */}
        <Card className="shadow-xl">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Campo de contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Botón de login */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            {/* Credenciales de prueba */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowCredentials(!showCredentials)}
                className="w-full flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Info className="h-4 w-4 mr-2" />
                {showCredentials ? 'Ocultar' : 'Mostrar'} credenciales de prueba
              </button>

              {showCredentials && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Credenciales de Prueba:
                  </h4>
                  <div className="space-y-3">
                    {credentials.map((cred, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {cred.role}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEmail(cred.email);
                              setPassword(cred.password);
                              setError('');
                            }}
                          >
                            Usar
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                          {cred.description}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Email:</span> {cred.email}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-medium">Password:</span> {cred.password}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sistema de gestión escolar y campus virtual
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Versión 2.0 - Campus Virtual Integrado
          </p>
        </div>
      </div>
    </div>
  );
};