import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AdminCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function AdminCard({ icon, title, description, buttonText, variant = 'primary', onClick }: AdminCardProps) {
  const bgColor = variant === 'primary' 
    ? 'bg-gradient-to-br from-teal-50 to-teal-100' 
    : 'bg-white';
  
  const iconBgColor = variant === 'primary'
    ? 'bg-teal-600'
    : 'bg-slate-600';

  return (
    <div className="group h-full">
      <button 
        onClick={onClick}
        className="block h-full no-underline w-full text-left"
      >
        <div className={`${bgColor} rounded-xl p-6 h-full flex flex-col transition-all duration-300 border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1`}>
          {icon && (
            <div className={`${iconBgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
          )}
          <h3 className="text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 flex-grow mb-4">{description}</p>
          <div className="flex items-center gap-2 text-teal-700 group-hover:text-teal-800 transition-colors">
            <span className="font-medium">{buttonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>
    </div>
  );
}