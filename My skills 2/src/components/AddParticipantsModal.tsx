import React, { useState } from 'react';
import { X, Search, Users, UserPlus, ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  department: string;
  role: string;
  isEnrolled?: boolean;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  department: string;
}

interface AddParticipantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  onAddParticipants: (userIds: string[]) => void;
  onAddGroup: (groupId: string) => void;
}

export function AddParticipantsModal({ 
  isOpen, 
  onClose, 
  courseName,
  onAddParticipants,
  onAddGroup 
}: AddParticipantsModalProps) {
  const [activeTab, setActiveTab] = useState<'individuals' | 'groups'>('individuals');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Mock data - brukere
  const allUsers: User[] = [
    { id: '1', name: 'Marit Solhaug', initials: 'MS', avatarColor: '#D4A574', department: 'Hjemmetjenesten', role: 'Sykepleier', isEnrolled: true },
    { id: '2', name: 'Ann Kristin Rotegård', initials: 'AR', avatarColor: '#7FCCAD', department: 'Hjemmetjenesten', role: 'Sykepleier', isEnrolled: true },
    { id: '3', name: 'Emma Barlindhaug', initials: 'EB', avatarColor: '#6B9C9C', department: 'Hjemmetjenesten', role: 'Avdelingsleder', isEnrolled: false },
    { id: '4', name: 'Tone Bratteteig', initials: 'TB', avatarColor: '#E88B5A', department: 'Sykehjemmet', role: 'Sykepleier', isEnrolled: false },
    { id: '5', name: 'Bente Schjødt-Osmo', initials: 'BS', avatarColor: '#6B9FE8', department: 'Sykehjemmet', role: 'Helsefagarbeider', isEnrolled: false },
    { id: '6', name: 'Mikael Næss', initials: 'MN', avatarColor: '#8CAA7A', department: 'Hjemmetjenesten', role: 'Helsefagarbeider', isEnrolled: false },
    { id: '7', name: 'Sidsel Bøge', initials: 'SB', avatarColor: '#4DB8D8', department: 'Akuttmottaket', role: 'Sykepleier', isEnrolled: false },
    { id: '8', name: 'Sabine Bressa', initials: 'SB', avatarColor: '#E89FA4', department: 'Akuttmottaket', role: 'Lege', isEnrolled: false },
    { id: '9', name: 'Martin Smevik', initials: 'MS', avatarColor: '#E8A774', department: 'Sykehjemmet', role: 'Fysioterapeut', isEnrolled: false },
    { id: '10', name: 'Anne-karine Hjortnæs', initials: 'AH', avatarColor: '#8B9B5A', department: 'Hjemmetjenesten', role: 'Sykepleier', isEnrolled: false },
    { id: '11', name: 'Live Korsvold', initials: 'LK', avatarColor: '#C88F5A', department: 'Rehabilitering', role: 'Ergoterapeut', isEnrolled: false },
    { id: '12', name: 'Synne Grefsgård', initials: 'SG', avatarColor: '#5ACCC4', department: 'Rehabilitering', role: 'Sykepleier', isEnrolled: false },
    { id: '13', name: 'Kari Hansen', initials: 'KH', avatarColor: '#9B7FCC', department: 'Hjemmetjenesten', role: 'Helsefagarbeider', isEnrolled: false },
    { id: '14', name: 'Ole Nilsen', initials: 'ON', avatarColor: '#CC7F8B', department: 'Sykehjemmet', role: 'Sykepleier', isEnrolled: false },
    { id: '15', name: 'Lise Andersen', initials: 'LA', avatarColor: '#7FCC9B', department: 'Akuttmottaket', role: 'Helsefagarbeider', isEnrolled: false },
  ];

  // Mock data - grupper
  const allGroups: Group[] = [
    { id: 'g1', name: 'Hjemmetjenesten - Alle ansatte', memberCount: 45, description: 'Alle ansatte i hjemmetjenesten', department: 'Hjemmetjenesten' },
    { id: 'g2', name: 'Hjemmetjenesten - Sykepleiere', memberCount: 18, description: 'Sykepleiere i hjemmetjenesten', department: 'Hjemmetjenesten' },
    { id: 'g3', name: 'Sykehjemmet - Nattevakt', memberCount: 12, description: 'Nattevakt på sykehjemmet', department: 'Sykehjemmet' },
    { id: 'g4', name: 'Nyansatte 2024', memberCount: 23, description: 'Alle nyansatte i 2024', department: 'Alle' },
    { id: 'g5', name: 'Akuttmottaket - Team A', memberCount: 8, description: 'Team A på akuttmottaket', department: 'Akuttmottaket' },
  ];

  const departments = [
    { id: 'all', name: 'Alle avdelinger' },
    { id: 'hjemmetjenesten', name: 'Hjemmetjenesten' },
    { id: 'sykehjemmet', name: 'Sykehjemmet' },
    { id: 'akuttmottaket', name: 'Akuttmottaket' },
    { id: 'rehabilitering', name: 'Rehabilitering' },
  ];

  // Filtrering
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || 
      user.department.toLowerCase() === selectedDepartment.toLowerCase();
    
    return matchesSearch && matchesDepartment;
  });

  const filteredGroups = allGroups.filter(group => {
    const matchesSearch = searchQuery === '' || 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || 
      group.department.toLowerCase() === selectedDepartment.toLowerCase() ||
      group.department === 'Alle';
    
    return matchesSearch && matchesDepartment;
  });

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleAddSelected = () => {
    onAddParticipants(Array.from(selectedUsers));
    setSelectedUsers(new Set());
    onClose();
  };

  const handleAddGroupToServer = (groupId: string) => {
    onAddGroup(groupId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-800 mb-1">Legg til deltakere</h2>
            <p className="text-gray-600 text-sm">Kurs: {courseName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('individuals')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'individuals'
                ? 'border-[#7FCCAD] text-[#0F547A]'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Enkeltpersoner</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'groups'
                ? 'border-[#7FCCAD] text-[#0F547A]'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Grupper</span>
            </div>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={activeTab === 'individuals' ? 'Søk etter navn eller rolle...' : 'Søk etter gruppenavn...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] justify-between"
              >
                <span className="text-gray-700">
                  {departments.find(d => d.id === selectedDepartment)?.name || 'Alle avdelinger'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showDepartmentDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDepartmentDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-20">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDepartment(dept.id);
                        setShowDepartmentDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-gray-700"
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === 'individuals' ? (
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                    user.isEnrolled
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : selectedUsers.has(user.id)
                      ? 'bg-[#E5F5EF] border-[#7FCCAD]'
                      : 'bg-white border-gray-200 hover:border-[#7FCCAD]'
                  }`}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    disabled={user.isEnrolled}
                    className="w-4 h-4 rounded border-gray-300 text-[#7FCCAD] focus:ring-[#7FCCAD] disabled:opacity-50 cursor-pointer"
                  />

                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: user.avatarColor }}
                  >
                    <span className="text-sm">{user.initials}</span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 truncate">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.role} • {user.department}</p>
                  </div>

                  {/* Enrolled Badge */}
                  {user.isEnrolled && (
                    <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded-full text-sm flex-shrink-0">
                      Allerede påmeldt
                    </span>
                  )}
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Ingen brukere funnet
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Create Group Button */}
              <button
                onClick={() => setShowCreateGroup(true)}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#7FCCAD] hover:bg-[#E5F5EF] transition-colors text-gray-600 hover:text-[#0F547A]"
              >
                <Plus className="w-5 h-5" />
                <span>Opprett ny gruppe</span>
              </button>

              {/* Groups List */}
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:border-[#7FCCAD] hover:bg-[#E5F5EF] transition-all"
                >
                  {/* Group Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#7FCCAD] flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>

                  {/* Group Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 mb-1">{group.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{group.memberCount} medlemmer</span>
                      <span>•</span>
                      <span>{group.department}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => console.log('Rediger gruppe:', group.id)}
                      className="p-2 hover:bg-white rounded transition-colors"
                      title="Rediger gruppe"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleAddGroupToServer(group.id)}
                      className="px-4 py-2 bg-[#DDB726] hover:bg-[#C9A622] text-white rounded-lg transition-colors"
                    >
                      Legg til
                    </button>
                  </div>
                </div>
              ))}

              {filteredGroups.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Ingen grupper funnet
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer - Only show for individuals tab */}
        {activeTab === 'individuals' && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {selectedUsers.size} {selectedUsers.size === 1 ? 'person' : 'personer'} valgt
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleAddSelected}
                  disabled={selectedUsers.size === 0}
                  className="px-6 py-2 bg-[#DDB726] hover:bg-[#C9A622] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Legg til valgte
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
