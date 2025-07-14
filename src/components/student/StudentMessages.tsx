import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Search, ArrowLeft } from 'lucide-react';
import { users, User } from '../../data/users';
import { messages as allMessages, Message } from '../../data/messages';

const currentUserId = 'u3'; // Simula el usuario actual (Juan Pérez)

// Hook para detectar si es móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

const StudentMessages: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(allMessages);
  const chatRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Lista de usuarios con los que hay conversación o todos menos el actual
  const contacts = users.filter(u => u.id !== currentUserId && u.name.toLowerCase().includes(search.toLowerCase()));

  // Mensajes de la conversación seleccionada
  const conversation = selectedUserId
    ? messages.filter(m =>
        (m.from === currentUserId && m.to === selectedUserId) ||
        (m.from === selectedUserId && m.to === currentUserId)
      )
    : [];

  // Último mensaje de cada contacto
  const getLastMessage = (userId: string) => {
    const conv = messages.filter(m =>
      (m.from === currentUserId && m.to === userId) ||
      (m.from === userId && m.to === currentUserId)
    );
    return conv.length > 0 ? conv[conv.length - 1] : null;
  };

  // Scroll automático al último mensaje
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation, selectedUserId]);

  const handleSend = () => {
    if (!message.trim() || !selectedUserId) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      from: currentUserId,
      to: selectedUserId,
      text: message,
      date: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
  };

  const selectedUser = users.find(u => u.id === selectedUserId);

  return (
    <div className="flex h-[80vh] bg-white rounded-lg shadow overflow-hidden">
      {/* Sidebar de contactos */}
      {(!isMobile || !selectedUserId) && (
        <div className="w-72 border-r bg-gray-50 flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">Mensajería</span>
          </div>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                className="w-full pl-8 pr-2 py-2 rounded bg-white border text-sm"
                placeholder="Buscar contacto..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts.length === 0 && (
              <div className="text-gray-400 text-center mt-8">Sin contactos</div>
            )}
            <ul>
              {contacts.map(u => {
                const lastMsg = getLastMessage(u.id);
                return (
                  <li
                    key={u.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-100 transition ${selectedUserId === u.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedUserId(u.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                      {u.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{u.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {lastMsg ? `${lastMsg.from === currentUserId ? 'Tú: ' : ''}${lastMsg.text}` : 'Sin mensajes'}
                      </div>
                    </div>
                    {lastMsg && (
                      <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                        {new Date(lastMsg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {/* Panel de chat */}
      {(!isMobile || selectedUserId) && (
        <div className="flex-1 flex flex-col">
          {/* Cabecera */}
          <div className="h-16 border-b flex items-center px-6 bg-white">
            {isMobile && selectedUserId && (
              <button
                className="mr-3 p-2 text-blue-600 flex items-center"
                onClick={() => setSelectedUserId(null)}
              >
                <ArrowLeft className="h-5 w-5 mr-1" /> Volver
              </button>
            )}
            {selectedUser ? (
              <>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 mr-3">
                  {selectedUser.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div className="font-semibold">{selectedUser.name}</div>
                  <div className="text-xs text-gray-400 capitalize">{selectedUser.role}</div>
                </div>
              </>
            ) : (
              <span className="text-gray-400">Selecciona un contacto para chatear</span>
            )}
          </div>
          {/* Mensajes */}
          <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
            {selectedUserId ? (
              conversation.length === 0 ? (
                <div className="text-gray-400 text-center mt-10">No hay mensajes aún.</div>
              ) : (
                <ul className="space-y-2">
                  {conversation.map((msg, idx) => (
                    <li key={msg.id} className={`flex ${msg.from === currentUserId ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow ${msg.from === currentUserId ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-xs text-gray-200 mt-1 text-right">{new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <div className="text-gray-400 text-center mt-10">Selecciona un contacto para ver la conversación.</div>
            )}
          </div>
          {/* Input de mensaje */}
          <div className="h-20 border-t bg-white flex items-center px-6 gap-2">
            <input
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder={selectedUser ? `Escribe un mensaje para ${selectedUser.name}` : 'Selecciona un contacto'}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              disabled={!selectedUserId}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center disabled:opacity-50"
              onClick={handleSend}
              disabled={!selectedUserId || !message.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMessages; 