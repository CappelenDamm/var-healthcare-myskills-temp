import React from 'react';
import { Clock, BookOpen, UserPlus, Edit } from 'lucide-react';

interface UpdateItem {
  type: 'edit' | 'create' | 'assign';
  text: string;
  author: string;
  time: string;
}

export function RecentUpdates() {
  const updates: UpdateItem[] = [
    {
      type: 'edit',
      text: 'Håndhygiene i praksis',
      author: 'Mikael Næss',
      time: 'for 2 timer siden'
    },
    {
      type: 'create',
      text: 'Førstehjelp for nyansatte',
      author: 'Admin',
      time: 'i går'
    },
    {
      type: 'assign',
      text: 'Introduksjon til VAR ble tildelt 15 nye deltagere',
      author: '',
      time: 'for 2 dager siden'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'edit':
        return <Edit className="w-5 h-5 text-blue-600" />;
      case 'create':
        return <BookOpen className="w-5 h-5 text-green-600" />;
      case 'assign':
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActionText = (type: string) => {
    switch (type) {
      case 'edit':
        return 'oppdatert';
      case 'create':
        return 'opprettet';
      default:
        return '';
    }
  };

  return (
    <div className="divide-y divide-gray-100">
      {updates.map((update, index) => (
        <div 
          key={index}
          className="p-5 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(update.type)}
            </div>
            <div className="flex-1 min-w-0">
              {update.type === 'assign' ? (
                <p className="text-gray-700">
                  {update.text}
                </p>
              ) : (
                <p className="text-gray-700">
                  Kurset <span className="text-gray-900">{update.text}</span> ble {getActionText(update.type)} av{' '}
                  <span className="text-gray-900">{update.author}</span>
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">{update.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}