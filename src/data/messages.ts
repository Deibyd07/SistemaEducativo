export interface Message {
  id: string;
  from: string; // userId
  to: string;   // userId
  text: string;
  date: string;
}

export const messages: Message[] = [
  { id: 'm1', from: 'u1', to: 'u3', text: 'Hola Juan, ¿cómo vas con la tarea?', date: '2024-06-01T10:00:00' },
  { id: 'm2', from: 'u3', to: 'u1', text: '¡Hola profe! Ya casi la termino.', date: '2024-06-01T10:05:00' },
  { id: 'm3', from: 'u4', to: 'u3', text: '¿Tienes el apunte de historia?', date: '2024-06-01T09:00:00' },
  { id: 'm4', from: 'u3', to: 'u4', text: 'Sí, te lo paso por aquí.', date: '2024-06-01T09:10:00' },
  { id: 'm5', from: 'u2', to: 'u3', text: 'Recuerda la reunión de mañana.', date: '2024-06-01T08:00:00' },
]; 