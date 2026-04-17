import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ChevronDown, Filter, Clock } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  instructor: string;
  instructorInitials: string;
  instructorColor: string;
  procedures: number;
  knowledgeContent: number;
  progress: number;
  duration: string;
  folder: string;
}

interface MyCoursesPageProps {
  onNavigateHome?: () => void;
}

const folders = [
  { id: 'all', name: 'Alle kursmapper' },
  { id: 'no-folder', name: 'Kurs uten mappe' },
  { id: 'home-service', name: 'Hjemmetjenesten' },
  { id: 'mandatory', name: 'Obligatoriske kurs for alle ansatte' },
  { id: 'method-1', name: 'Metode 1' },
  { id: 'ny-test', name: 'NyTest' },
];

const ongoingCourses: Course[] = [
  {
    id: '1',
    name: 'Skrepeleg eldre',
    instructor: 'Ann Kristin Rotegård',
    instructorInitials: 'AR',
    instructorColor: '#D4A574',
    procedures: 7,
    knowledgeContent: 3,
    progress: 0,
    duration: '3 timer',
    folder: 'Hjemmetjenesten'
  },
  {
    id: '2',
    name: 'Fallforebygging i hjemmet',
    instructor: 'Emma Barlindhaug',
    instructorInitials: 'EB',
    instructorColor: '#7FCCAD',
    procedures: 4,
    knowledgeContent: 2,
    progress: 0,
    duration: '2.5 timer',
    folder: 'Hjemmetjenesten'
  },
  {
    id: '3',
    name: 'Akutt helsehjelp',
    instructor: 'Emma Barlindhaug',
    instructorInitials: 'EB',
    instructorColor: '#7FCCAD',
    procedures: 5,
    knowledgeContent: 4,
    progress: 0,
    duration: '4 timer',
    folder: 'Obligatoriske kurs for alle ansatte'
  },
  {
    id: '4',
    name: 'Personlig hygiene',
    instructor: 'Emma Barlindhaug',
    instructorInitials: 'EB',
    instructorColor: '#7FCCAD',
    procedures: 3,
    knowledgeContent: 4,
    progress: 0,
    duration: '2 timer',
    folder: 'Hjemmetjenesten'
  },
  {
    id: '5',
    name: 'Vitale målinger /NEWS',
    instructor: 'Emma Barlindhaug',
    instructorInitials: 'EB',
    instructorColor: '#7FCCAD',
    procedures: 4,
    knowledgeContent: 10,
    progress: 0,
    duration: '3.5 timer',
    folder: 'Metode 1'
  },
  {
    id: '6',
    name: 'Infeksjonsforebygging',
    instructor: 'Emma Barlindhaug',
    instructorInitials: 'EB',
    instructorColor: '#7FCCAD',
    procedures: 3,
    knowledgeContent: 6,
    progress: 0,
    duration: '2.5 timer',
    folder: 'Obligatoriske kurs for alle ansatte'
  },
  {
    id: '7',
    name: 'PVK (for nyansatte)',
    instructor: 'Mikael Næss',
    instructorInitials: 'MN',
    instructorColor: '#6B9FE8',
    procedures: 4,
    knowledgeContent: 5,
    progress: 44,
    duration: '5 timer',
    folder: 'NyTest'
  },
  {
    id: '8',
    name: 'Tester',
    instructor: 'Mikael Næss',
    instructorInitials: 'MN',
    instructorColor: '#6B9FE8',
    procedures: 2,
    knowledgeContent: 0,
    progress: 50,
    duration: '1.5 timer',
    folder: 'NyTest'
  },
];

export function MyCoursesPage({ onNavigateHome }: MyCoursesPageProps) {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'archived' | 'assessments'>('ongoing');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [showFolderDropdown, setShowFolderDropdown] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  const selectedFolderName = folders.find(f => f.id === selectedFolder)?.name || 'Alle kursmapper';

  const filteredCourses = ongoingCourses.filter(course => {
    if (selectedFolder === 'all') return true;
    return course.folder === folders.find(f => f.id === selectedFolder)?.name;
  });

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Mine ferdigheter', 'Mine kurs']}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-800">Mine kurs</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'ongoing'
                ? 'border-[#0F547A] text-gray-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Pågående kurs
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'archived'
                ? 'border-[#0F547A] text-gray-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Arkiverte kurs
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'assessments'
                ? 'border-[#0F547A] text-gray-800'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Mine vurderinger
          </button>
        </div>
      </div>

      {/* Filter and Folder Selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filter
          </button>

          <div className="relative">
            <button
              onClick={() => setShowFolderDropdown(!showFolderDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              <span>{selectedFolderName}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFolderDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showFolderDropdown && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
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
        </div>
      </div>

      {/* Content */}
      {activeTab === 'ongoing' && (
        <div className="space-y-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
            >
              {/* Course Header */}
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                {/* Expand Icon */}
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    expandedCourses.has(course.id) ? 'rotate-180' : ''
                  }`}
                />

                {/* Course Name */}
                <div className="flex-1 text-gray-800 text-sm">
                  {course.name} <span className="text-gray-500">({course.folder})</span>
                </div>

                {/* Instructor Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: course.instructorColor }}
                >
                  {course.instructorInitials}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Procedures */}
                  <div className="w-28 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs text-center">
                    Prosedyre ({course.procedures})
                  </div>

                  {/* Knowledge Content */}
                  <div className="w-36 px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs text-center">
                    Kunnskapsstoff ({course.knowledgeContent})
                  </div>

                  {/* Duration */}
                  <div className="w-24 flex items-center justify-center gap-1 px-2 py-1 bg-[#E5F5EF] rounded text-gray-700 text-xs">
                    <Clock className="w-3 h-3 text-[#7FCCAD]" />
                    {course.duration}
                  </div>

                  {/* Progress */}
                  {course.progress > 0 ? (
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                          fill="none"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke={course.progress === 100 ? '#7FCCAD' : '#DDB726'}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 16}`}
                          strokeDashoffset={`${2 * Math.PI * 16 * (1 - course.progress / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-700">
                        {course.progress}%
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                      0%
                    </div>
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {expandedCourses.has(course.id) && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-gray-700">Kursleder:</span>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-gray-700">Mappe:</span>
                      <span>{course.folder}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-gray-700">Varighet:</span>
                      <span>{course.duration}</span>
                    </div>
                    {course.progress > 0 && (
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-700">Fremdrift</span>
                          <span className="text-xs text-gray-600">{course.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#DDB726] transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    <div className="pt-1">
                      <button className="px-3 py-1.5 bg-[#7FCCAD] hover:bg-[#6FBBA0] text-white rounded-lg transition-colors text-xs">
                        Fortsett kurs
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'archived' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Ingen arkiverte kurs</p>
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">Ingen vurderinger ennå</p>
        </div>
      )}

      {/* Summary */}
      {activeTab === 'ongoing' && filteredCourses.length > 0 && (
        <div className="mt-6 text-gray-600 text-sm">
          Viser {filteredCourses.length} pågående kurs
        </div>
      )}
    </main>
  );
}