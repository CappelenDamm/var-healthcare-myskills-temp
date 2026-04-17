import React, { useState } from 'react';
import { ChevronDown, Download, Search } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

interface Participant {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  progress: number;
  hasCertificate: boolean;
}

interface CircularProgressProps {
  progress: number;
  size?: number;
}

function CircularProgress({ progress, size = 40 }: CircularProgressProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // Color based on progress
  let strokeColor = '#7FCCAD'; // Green for high progress
  if (progress < 50) {
    strokeColor = '#EF4444'; // Red for low progress
  } else if (progress < 70) {
    strokeColor = '#DDB726'; // Yellow for medium progress
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-gray-700">{progress}%</span>
      </div>
    </div>
  );
}

interface ParticipantOverviewPageProps {
  courseName?: string;
  onBack?: () => void;
  onNavigateHome?: () => void;
  onNavigateToReportsOverview?: () => void;
  onNavigateToCourseReport?: () => void;
}

export function ParticipantOverviewPage({ courseName = "PVK (for nyansatte)", onBack, onNavigateHome, onNavigateToReportsOverview, onNavigateToCourseReport }: ParticipantOverviewPageProps) {
  const [expandedParticipants, setExpandedParticipants] = useState<Set<string>>(new Set());
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const participants: Participant[] = [
    { id: '1', name: 'Marit Solhaug', initials: 'MS', avatarColor: '#D4A574', progress: 77, hasCertificate: false },
    { id: '2', name: 'Ann Kristin Rotegård', initials: 'AR', avatarColor: '#7FCCAD', progress: 66, hasCertificate: false },
    { id: '3', name: 'Emma Barlindhaug', initials: 'EB', avatarColor: '#6B9C9C', progress: 30, hasCertificate: false },
    { id: '4', name: 'Tone Bratteteig', initials: 'TB', avatarColor: '#E88B5A', progress: 100, hasCertificate: true },
    { id: '5', name: 'Bente Schjødt-Osmo', initials: 'BS', avatarColor: '#6B9FE8', progress: 40, hasCertificate: false },
    { id: '6', name: 'Mikael Næss', initials: 'MN', avatarColor: '#8CAA7A', progress: 50, hasCertificate: false },
    { id: '7', name: 'Sidsel Bøge', initials: 'SB', avatarColor: '#4DB8D8', progress: 100, hasCertificate: true },
    { id: '8', name: 'sabine bressa', initials: 'sb', avatarColor: '#E89FA4', progress: 42, hasCertificate: false },
    { id: '9', name: 'Martin Smevik', initials: 'MS', avatarColor: '#E8A774', progress: 100, hasCertificate: true },
    { id: '10', name: 'Anne-karine Hjortnæs', initials: 'AH', avatarColor: '#8B9B5A', progress: 100, hasCertificate: true },
    { id: '11', name: 'Live Korsvold', initials: 'LK', avatarColor: '#C88F5A', progress: 50, hasCertificate: false },
    { id: '12', name: 'Synne Grefsgård', initials: 'SG', avatarColor: '#5ACCC4', progress: 52, hasCertificate: false },
  ];

  const filteredParticipants = participants
    .filter(p => showCompletedOnly ? p.progress === 100 : true)
    .filter(p => 
      searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.initials.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const toggleParticipant = (participantId: string) => {
    const newExpanded = new Set(expandedParticipants);
    if (newExpanded.has(participantId)) {
      newExpanded.delete(participantId);
    } else {
      newExpanded.add(participantId);
    }
    setExpandedParticipants(newExpanded);
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Rapporter', 'Hjemmetjenesten', courseName, 'Deltakeroversikt']}
        pathClickHandlers={[onNavigateToReportsOverview, onNavigateToCourseReport, undefined, undefined]}
      />

      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-gray-800">{courseName}</h1>
          
          {/* Toggle for completed only - positioned on the right */}
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-gray-700">Vis kun fullførte</span>
            <div 
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ backgroundColor: showCompletedOnly ? '#7FCCAD' : '#D1D5DB' }}
              onClick={() => setShowCompletedOnly(!showCompletedOnly)}
            >
              <div 
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform"
                style={{ transform: showCompletedOnly ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </div>
          </label>
        </div>
        <p className="text-gray-600 text-lg">Deltakeroversikt</p>
        
        {/* Search Field */}
        <div className="relative mt-4 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Søk etter deltager..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-transparent text-gray-700"
          />
        </div>
      </div>

      {/* Participant List */}
      <div className="space-y-3">
        {filteredParticipants.map((participant) => (
          <div 
            key={participant.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: participant.avatarColor }}
                >
                  <span className="text-sm">{participant.initials}</span>
                </div>

                {/* Name */}
                <span className="text-gray-800 flex-1">{participant.name}</span>

                {/* Chevron */}
                <button
                  onClick={() => toggleParticipant(participant.id)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedParticipants.has(participant.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Progress Circle */}
                <CircularProgress progress={participant.progress} />

                {/* Certificate Download */}
                {participant.hasCertificate && (
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded transition-colors">
                    <span className="text-gray-700">Last ned kursbevis</span>
                    <Download className="w-4 h-4 text-red-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedParticipants.has(participant.id) && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600">
                  Detaljer for {participant.name} vil vises her...
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}