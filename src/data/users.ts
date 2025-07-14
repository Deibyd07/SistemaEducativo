export interface User {
  id: string;
  name: string;
  role: 'profesor' | 'estudiante';
}

export const users: User[] = [
  { id: 'u1', name: 'Prof. Ana', role: 'profesor' },
  { id: 'u2', name: 'Prof. Carlos', role: 'profesor' },
  { id: 'u3', name: 'Juan Pérez', role: 'estudiante' },
  { id: 'u4', name: 'Ana López', role: 'estudiante' },
  { id: 'u5', name: 'Laura Fernández', role: 'estudiante' },
  { id: 'u6', name: 'María González', role: 'estudiante' },
]; 