import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Datos simulados de usuarios para diferentes roles
const mockUsers = [
  // Estudiantes
  {
    id: '1',
    email: 'estudiante1@school.com',
    password: 'estudiante123',
    firstName: 'Juan',
    lastName: 'Pérez',
    role: 'student' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'estudiante2@school.com',
    password: 'estudiante123',
    firstName: 'María',
    lastName: 'García',
    role: 'student' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'estudiante3@school.com',
    password: 'estudiante123',
    firstName: 'Carlos',
    lastName: 'López',
    role: 'student' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Docentes
  {
    id: '4',
    email: 'docente1@school.com',
    password: 'docente123',
    firstName: 'Ana',
    lastName: 'Martínez',
    role: 'teacher' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    email: 'docente2@school.com',
    password: 'docente123',
    firstName: 'Luis',
    lastName: 'Hernández',
    role: 'teacher' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    email: 'docente3@school.com',
    password: 'docente123',
    firstName: 'Carmen',
    lastName: 'Rodríguez',
    role: 'teacher' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Coordinadores
  {
    id: '7',
    email: 'coordinador@school.com',
    password: 'coordinador123',
    firstName: 'Roberto',
    lastName: 'González',
    role: 'coordinator' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    email: 'coordinador2@school.com',
    password: 'coordinador123',
    firstName: 'Patricia',
    lastName: 'Fernández',
    role: 'coordinator' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Rector
  {
    id: '9',
    email: 'rector@school.com',
    password: 'rector123',
    firstName: 'Dr. Manuel',
    lastName: 'Jiménez',
    role: 'rector' as UserRole,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // Administración
  {
    id: '10',
    email: 'admin@school.com',
    password: 'admin123',
    firstName: 'Sofía',
    lastName: 'Vargas',
    role: 'rector' as UserRole, // Usamos rector para administración
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de verificación de autenticación
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('edugestión-user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Buscar usuario en los datos simulados
      const foundUser = mockUsers.find(
        user => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error('Credenciales inválidas');
      }

      // Crear objeto usuario sin la contraseña
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        isActive: foundUser.isActive,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt
      };
      
      setUser(userData);
      localStorage.setItem('edugestión-user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edugestión-user');
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Verificar si el email ya existe
      const existingUser = mockUsers.find(user => user.email === userData.email);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Simulación de registro - en producción conectar con Supabase
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('edugestión-user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Error al registrar usuario: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date() };
    setUser(updatedUser);
    localStorage.setItem('edugestión-user', JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    register,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};