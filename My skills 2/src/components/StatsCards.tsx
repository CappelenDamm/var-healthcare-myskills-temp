import React from 'react';
import { BookOpen, Users, TrendingUp, CheckCircle } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

function StatCard({ icon, label, value, change, changeType = 'positive' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 mb-2">{label}</p>
          <p className="text-gray-900 mb-1">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-4 h-4 ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center">
          <div className="text-teal-600">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        icon={<BookOpen className="w-6 h-6" />}
        label="Aktive kurs"
        value="24"
        change="+3 denne måneden"
        changeType="positive"
      />
      <StatCard
        icon={<Users className="w-6 h-6" />}
        label="Totale deltagere"
        value="342"
        change="+18 denne uken"
        changeType="positive"
      />
      <StatCard
        icon={<CheckCircle className="w-6 h-6" />}
        label="Fullførte kurs"
        value="156"
        change="+12 denne uken"
        changeType="positive"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Gjennomføringsrate"
        value="87%"
        change="+5% fra forrige måned"
        changeType="positive"
      />
    </div>
  );
}
