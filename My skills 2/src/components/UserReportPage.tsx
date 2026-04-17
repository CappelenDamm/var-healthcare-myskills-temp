import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ChevronDown, Search, Users, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  enrolled: number;
  assessments: number;
  readConfirmations: number;
  groups: string[];
}

interface UserReportPageProps {
  onNavigateHome?: () => void;
  onNavigateToReportsOverview?: () => void;
}

export function UserReportPage({ 
  onNavigateHome,
  onNavigateToReportsOverview 
}: UserReportPageProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const folders = [
    { id: 'all', name: 'Alle kursmapper' },
    { id: 'no-folder', name: 'Kurs uten mappe' },
    { id: 'semester-1', name: 'Semester 1' },
    { id: 'method-1', name: 'Metode 1' },
    { id: 'new-hire', name: 'Nyansaktkurs' },
    { id: 'home-service', name: 'Hjemmetjenesten' },
    { id: 'mandatory', name: 'Obligatoriske kurs for alle ansatte' },
    { id: 'ny-test', name: 'NyTest' },
  ];

  const groups = [
    { id: 'all', name: 'Alle grupper' },
    { id: 'group-nurses', name: 'Sykepleiere' },
    { id: 'group-doctors', name: 'Leger' },
    { id: 'group-assistants', name: 'Helsefagarbeidere' },
    { id: 'group-admins', name: 'Administrativt personale' },
    { id: 'group-new-hires', name: 'Nyansatte 2024' },
  ];

  const users: User[] = [
    { 
      id: '1', 
      name: 'Marit Solhaug', 
      initials: 'MS', 
      avatarColor: '#D4A574',
      enrolled: 2,
      assessments: 8,
      readConfirmations: 5,
      groups: ['all', 'group-nurses']
    },
    { 
      id: '2', 
      name: 'Ann Kristin Rotegård', 
      initials: 'AR', 
      avatarColor: '#7FCCAD',
      enrolled: 0,
      assessments: 4,
      readConfirmations: 3,
      groups: ['all', 'group-nurses']
    },
    { 
      id: '3', 
      name: 'Emma Barlindhaug', 
      initials: 'EB', 
      avatarColor: '#6B9C9C',
      enrolled: 20,
      assessments: 28,
      readConfirmations: 15,
      groups: ['all', 'group-doctors']
    },
    { 
      id: '4', 
      name: 'Tone Bratteteig', 
      initials: 'TB', 
      avatarColor: '#E88B5A',
      enrolled: 2,
      assessments: 1,
      readConfirmations: 0,
      groups: ['all', 'group-nurses', 'group-new-hires']
    },
    { 
      id: '5', 
      name: 'Bente Schjødt-Osmo', 
      initials: 'BS', 
      avatarColor: '#6B9FE8',
      enrolled: 4,
      assessments: 0,
      readConfirmations: 0,
      groups: ['all', 'group-assistants']
    },
    { 
      id: '6', 
      name: 'Mikael Næss', 
      initials: 'MN', 
      avatarColor: '#8CAA7A',
      enrolled: 13,
      assessments: 21,
      readConfirmations: 16,
      groups: ['all', 'group-doctors']
    },
    { 
      id: '7', 
      name: 'Sidsel Bøge', 
      initials: 'SB', 
      avatarColor: '#4DB8D8',
      enrolled: 1,
      assessments: 0,
      readConfirmations: 0,
      groups: ['all', 'group-admins']
    },
    { 
      id: '8', 
      name: 'sabine bressa', 
      initials: 'sb', 
      avatarColor: '#E89FA4',
      enrolled: 1,
      assessments: 0,
      readConfirmations: 0,
      groups: ['all', 'group-assistants', 'group-new-hires']
    },
    { 
      id: '9', 
      name: 'Martin Smevik', 
      initials: 'MS', 
      avatarColor: '#E8A774',
      enrolled: 2,
      assessments: 0,
      readConfirmations: 0,
      groups: ['all', 'group-admins']
    },
    { 
      id: '10', 
      name: 'Anne-karine Hjortnæs', 
      initials: 'AH', 
      avatarColor: '#8B9B5A',
      enrolled: 5,
      assessments: 12,
      readConfirmations: 8,
      groups: ['all', 'group-nurses']
    },
    { 
      id: '11', 
      name: 'Live Korsvold', 
      initials: 'LK', 
      avatarColor: '#C88F5A',
      enrolled: 3,
      assessments: 7,
      readConfirmations: 4,
      groups: ['all', 'group-assistants']
    },
    { 
      id: '12', 
      name: 'Synne Grefsgård', 
      initials: 'SG', 
      avatarColor: '#5ACCC4',
      enrolled: 6,
      assessments: 9,
      readConfirmations: 5,
      groups: ['all', 'group-nurses', 'group-new-hires']
    },
  ];

  const selectedFolderName = folders.find(f => f.id === selectedFolder)?.name || 'Alle kursmapper';
  const selectedGroupName = groups.find(g => g.id === selectedGroup)?.name || 'Alle grupper';

  // Filter users based on search term and selected group
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.initials.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = selectedGroup === 'all' || user.groups.includes(selectedGroup);
    
    return matchesSearch && matchesGroup;
  });

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Deltageroversikt']}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-gray-800">Rapport, brukeroversikt</h1>
        
        {/* Filter and Folder Dropdown */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Filter</span>
          
          <div className="relative">
            <button
              onClick={() => setShowFolderDropdown(!showFolderDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">{selectedFolderName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFolderDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFolderDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => {
                      setSelectedFolder(folder.id);
                      setShowFolderDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedFolder === folder.id ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {folder.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">{selectedGroupName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showGroupDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showGroupDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => {
                      setSelectedGroup(group.id);
                      setShowGroupDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedGroup === group.id ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Søk etter bruker..."
          className="w-full px-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FCCAD]"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3 w-5 h-5 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Active Filters */}
      {(selectedGroup !== 'all' || searchTerm) && (
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Aktive filtre:</span>
          {selectedGroup !== 'all' && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5F5EF] border border-[#7FCCAD] rounded-full text-sm">
              <Users className="w-3.5 h-3.5 text-[#7FCCAD]" />
              <span className="text-gray-700">{selectedGroupName}</span>
              <button
                onClick={() => setSelectedGroup('all')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          {searchTerm && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5F5EF] border border-[#7FCCAD] rounded-full text-sm">
              <Search className="w-3.5 h-3.5 text-[#7FCCAD]" />
              <span className="text-gray-700">"{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm('')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* User List */}
      <div className="space-y-2">
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-1">Ingen brukere funnet</p>
            <p className="text-sm text-gray-400">Prøv å endre søkekriteriene eller fjern filtre</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                {/* Avatar and Name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    <span className="text-white text-xs">{user.initials}</span>
                  </div>
                  <span className="text-gray-800 truncate text-sm">{user.name}</span>
                </div>

                {/* Statistics Badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Enrolled */}
                  <div className="w-28 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs text-center">
                    Påmeldt ({user.enrolled})
                  </div>

                  {/* Assessments */}
                  <div className="w-36 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs text-center">
                    Vurderinger ({user.assessments})
                  </div>

                  {/* Read Confirmations */}
                  <div className="w-40 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs text-center">
                    Lesebekreftelser ({user.readConfirmations})
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 text-gray-600 text-sm">
        Viser {filteredUsers.length} brukere
      </div>
    </main>
  );
}