import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Search, ChevronDown, BookOpen, Users, X, Clock, GraduationCap } from 'lucide-react';
import enrollmentIcon from 'figma:asset/408c39c8dc64e76d6e59c336c3851dc0bb547b9e.png';

interface Course {
  id: string;
  name: string;
  folder: string;
  instructor: string;
  participants: number;
  duration: string;
  status: 'enrolled' | 'available';
}

interface CourseEnrollmentPageProps {
  onNavigateHome: () => void;
  onNavigateToMyCourses?: () => void;
}

const instructors = [
  { id: 'all', name: 'Alle kursledere' },
  { id: 'marit', name: 'Marit Solhaug' },
  { id: 'emma', name: 'Emma Barlindhaug' },
  { id: 'mikael', name: 'Mikael Næss' },
  { id: 'anne-karine', name: 'Anne-karine Hjortnæs' },
  { id: 'live', name: 'Live Korsvold' },
];

const courses: Course[] = [
  { 
    id: 'pvk-grunnkurs', 
    name: 'PVK Grunnkurs', 
    folder: 'Hjemmetjenesten',
    instructor: 'Emma Barlindhaug',
    participants: 24,
    duration: '4 timer',
    status: 'enrolled'
  },
  { 
    id: 'pvk-videregående', 
    name: 'PVK Videregående', 
    folder: 'Hjemmetjenesten',
    instructor: 'Emma Barlindhaug',
    participants: 18,
    duration: '6 timer',
    status: 'available'
  },
  { 
    id: 'medikamenthåndtering', 
    name: 'Medikamenthåndtering', 
    folder: 'Semester 1',
    instructor: 'Marit Solhaug',
    participants: 45,
    duration: '3 timer',
    status: 'enrolled'
  },
  { 
    id: 'hygiene-rutiner', 
    name: 'Hygiene og smittevern', 
    folder: 'Nye prosedyrer 2024',
    instructor: 'Marit Solhaug',
    participants: 67,
    duration: '2 timer',
    status: 'available'
  },
  { 
    id: 'dokumentasjon', 
    name: 'Dokumentasjonskurs', 
    folder: 'Nyansatte sykepleiere',
    instructor: 'Anne-karine Hjortnæs',
    participants: 12,
    duration: '4 timer',
    status: 'enrolled'
  },
  { 
    id: 'kommunikasjon', 
    name: 'Kommunikasjon med pårørende', 
    folder: 'Nyansatte sykepleiere',
    instructor: 'Live Korsvold',
    participants: 15,
    duration: '3 timer',
    status: 'available'
  },
  { 
    id: 'legemiddelhåndtering', 
    name: 'Legemiddelhåndtering videregående', 
    folder: 'NyTest',
    instructor: 'Mikael Næss',
    participants: 8,
    duration: '5 timer',
    status: 'available'
  },
  { 
    id: 'ernæring', 
    name: 'Ernæring og kosthold', 
    folder: 'Sykehjemmet',
    instructor: 'Live Korsvold',
    participants: 32,
    duration: '2.5 timer',
    status: 'available'
  },
  { 
    id: 'demens-omsorg', 
    name: 'Demensomsorg grunnkurs', 
    folder: 'Sykehjemmet',
    instructor: 'Anne-karine Hjortnæs',
    participants: 28,
    duration: '6 timer',
    status: 'enrolled'
  },
  { 
    id: 'palliasjon', 
    name: 'Palliativ behandling', 
    folder: 'Kurs uten mappe',
    instructor: 'Mikael Næss',
    participants: 19,
    duration: '4 timer',
    status: 'available'
  },
];

export function CourseEnrollmentPage({ onNavigateHome, onNavigateToMyCourses }: CourseEnrollmentPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'folders' | 'list'>('folders');

  const selectedInstructorName = instructors.find(i => i.id === selectedInstructor)?.name || 'Alle kursledere';

  // Filter courses based on search term and selected instructor
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.folder.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInstructor = selectedInstructor === 'all' || 
      course.instructor.toLowerCase().includes(instructors.find(i => i.id === selectedInstructor)?.name.toLowerCase() || '');
    
    return matchesSearch && matchesInstructor;
  });

  // Group courses by folder for folder view
  const courseFolders = Array.from(new Set(courses.map(c => c.folder)));

  const handleCourseClick = (courseId: string) => {
    console.log('Åpner kurs:', courseId);
    // Her kan du senere implementere navigasjon til det spesifikke kurset
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Påmelding']}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-gray-800">Påmelding til kurs</h1>
          
          {/* My Courses Button */}
          {onNavigateToMyCourses && (
            <button
              onClick={onNavigateToMyCourses}
              className="flex items-center gap-2 px-4 py-2 bg-[#DDB726] hover:bg-[#C9A622] text-white rounded-lg transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              Til Mine kurs
            </button>
          )}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('folders')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'folders' 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Kursmapper
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Alle kurs
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Søk etter kurs..."
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

        {/* Instructor Filter */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Kursleder</span>
          <div className="relative">
            <button
              onClick={() => setShowInstructorDropdown(!showInstructorDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">{selectedInstructorName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showInstructorDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showInstructorDropdown && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {instructors.map((instructor) => (
                  <button
                    key={instructor.id}
                    onClick={() => {
                      setSelectedInstructor(instructor.id);
                      setShowInstructorDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedInstructor === instructor.id ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    {instructor.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedInstructor !== 'all' || searchTerm) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Aktive filtre:</span>
            {selectedInstructor !== 'all' && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5F5EF] border border-[#7FCCAD] rounded-full text-sm">
                <Users className="w-3.5 h-3.5 text-[#7FCCAD]" />
                <span className="text-gray-700">{selectedInstructorName}</span>
                <button
                  onClick={() => setSelectedInstructor('all')}
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
      </div>

      {/* Content Area */}
      {viewMode === 'folders' ? (
        /* Folder Grid View */
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-gray-800">Kursmapper</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {courseFolders.map((folder, index) => {
              const folderCourses = filteredCourses.filter(c => c.folder === folder);
              if (folderCourses.length === 0) return null;
              
              return (
                <button
                  key={folder}
                  onClick={() => console.log('Åpner mappe:', folder)}
                  className="group flex flex-col items-center justify-center bg-[#E5F5EF] border border-[#C0E6D6] rounded-lg p-5 min-h-[140px] transition-all duration-200 hover:border-[#0F547A] hover:shadow-md hover:-translate-y-1 text-gray-700 hover:text-[#0F547A] animate-fadein"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img 
                    src={enrollmentIcon} 
                    alt="Course icon"
                    className="w-12 h-12 mb-3 opacity-70 transition-opacity duration-200 group-hover:opacity-100"
                  />
                  <span className="text-center break-words leading-tight mb-2">
                    {folder}
                  </span>
                  <span className="text-xs text-gray-500">
                    {folderCourses.length} kurs
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {filteredCourses.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-1">Ingen kurs funnet</p>
              <p className="text-sm text-gray-400">Prøv å endre søkekriteriene eller fjern filtre</p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                <div className="col-span-4">Kursnavn</div>
                <div className="col-span-2">Mappe</div>
                <div className="col-span-2">Kursleder</div>
                <div className="col-span-2 text-center">Deltakere</div>
                <div className="col-span-1 text-center">Varighet</div>
                <div className="col-span-1 text-center">Status</div>
              </div>
              
              {/* Course Rows */}
              {filteredCourses.map((course, index) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#7FCCAD] flex-shrink-0" />
                    <span className="text-gray-800 truncate">{course.name}</span>
                  </div>
                  <div className="col-span-2 flex items-center text-gray-600 text-sm truncate">
                    {course.folder}
                  </div>
                  <div className="col-span-2 flex items-center text-gray-600 text-sm truncate">
                    {course.instructor}
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded text-gray-700 text-sm">
                      <Users className="w-3.5 h-3.5" />
                      {course.participants}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-center justify-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'enrolled' 
                        ? 'bg-[#7FCCAD] text-white' 
                        : 'bg-[#DDB726] text-white'
                    }`}>
                      {course.status === 'enrolled' ? 'Påmeldt' : 'Meld på'}
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Summary Footer */}
      {viewMode === 'list' && filteredCourses.length > 0 && (
        <div className="mt-6 text-gray-600 text-sm">
          Viser {filteredCourses.length} kurs
        </div>
      )}
    </main>
  );
}