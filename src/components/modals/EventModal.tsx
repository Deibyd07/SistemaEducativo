import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Event {
  id?: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'exam' | 'meeting' | 'holiday' | 'assignment' | 'event';
  location: string;
  participants: string[];
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  onSave: (event: Partial<Event>) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date ? event.date.toISOString().split('T')[0] : '',
    startTime: event?.startTime || '08:00',
    endTime: event?.endTime || '09:00',
    type: event?.type || 'event' as const,
    location: event?.location || '',
    participants: event?.participants?.join(', ') || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventTypes = [
    { value: 'exam', label: 'Examen', color: 'bg-red-500' },
    { value: 'meeting', label: 'Reunión', color: 'bg-blue-500' },
    { value: 'holiday', label: 'Feriado', color: 'bg-green-500' },
    { value: 'assignment', label: 'Tarea', color: 'bg-yellow-500' },
    { value: 'event', label: 'Evento', color: 'bg-purple-500' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.startTime) newErrors.startTime = 'La hora de inicio es requerida';
    if (!formData.endTime) newErrors.endTime = 'La hora de fin es requerida';
    
    // Validar que la hora de fin sea después de la hora de inicio
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'La hora de fin debe ser posterior a la hora de inicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        date: new Date(formData.date),
        participants: formData.participants.split(',').map(p => p.trim()).filter(p => p)
      });
      onClose();
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {event ? 'Editar Evento' : 'Nuevo Evento'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Información Básica */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Información del Evento
            </h3>
            <div className="space-y-4">
              <Input
                label="Título del Evento"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                error={errors.title}
                placeholder="Ej: Examen Final de Matemáticas"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe el evento, instrucciones especiales, etc..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Evento
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Fecha y Hora
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Fecha"
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                error={errors.date}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <Input
                label="Hora de Inicio"
                type="time"
                value={formData.startTime}
                onChange={(e) => updateField('startTime', e.target.value)}
                error={errors.startTime}
                required
              />
              <Input
                label="Hora de Fin"
                type="time"
                value={formData.endTime}
                onChange={(e) => updateField('endTime', e.target.value)}
                error={errors.endTime}
                required
              />
            </div>
          </div>

          {/* Ubicación y Participantes */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Ubicación y Participantes
            </h3>
            <div className="space-y-4">
              <Input
                label="Ubicación"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                icon={<MapPin className="h-4 w-4" />}
                placeholder="Ej: Aula 101, Auditorio, Laboratorio de Física"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Participantes
                </label>
                <input
                  type="text"
                  value={formData.participants}
                  onChange={(e) => updateField('participants', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 10mo A, 11mo B, Todos los docentes (separar con comas)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separe múltiples participantes con comas
                </p>
              </div>
            </div>
          </div>

          {/* Vista Previa */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Vista Previa</h4>
            <div className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-1 ${eventTypes.find(t => t.value === formData.type)?.color}`}></div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{formData.title || 'Sin título'}</p>
                <p>{formData.date ? new Date(formData.date).toLocaleDateString('es-ES') : 'Sin fecha'}</p>
                <p>{formData.startTime} - {formData.endTime}</p>
                {formData.location && <p>📍 {formData.location}</p>}
                {formData.participants && <p>👥 {formData.participants}</p>}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {event ? 'Actualizar' : 'Crear'} Evento
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};