import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { ChevronDown, Plus, Edit2, Trash2, ChevronRight, Folder } from 'lucide-react';
import { AddParticipantsModal } from './AddParticipantsModal';

interface CourseFolderAdminPageProps {
  onNavigateHome: () => void;
  onNavigateToCourseAdmin: () => void;
  onNavigateToCreateCourse?: () => void;
  onNavigateToSubfolder?: (folderId: string, folderName: string) => void;
  folderName?: string;
  breadcrumbPath?: string[];
  breadcrumbHandlers?: Array<(() => void) | undefined>;
}

interface Course {
  id: string;
  name: string;
  instructor: {
    name: string;
    initials: string;
    color: string;
  };
  enrolledCount: number;
  isPublished?: boolean;
}

interface SubFolder {
  id: string;
  name: string;
}

export function CourseFolderAdminPage({ 
  onNavigateHome, 
  onNavigateToCourseAdmin,
  onNavigateToCreateCourse,
  onNavigateToSubfolder,
  folderName = "Hjemmetjenesten",
  breadcrumbPath,
  breadcrumbHandlers
}: CourseFolderAdminPageProps) {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [selectedInstructor, setSelectedInstructor] = useState<string>('all');
  const [showInstructorDropdown, setShowInstructorDropdown] = useState(false);
  const [showAddParticipantsModal, setShowAddParticipantsModal] = useState(false);
  const [selectedCourseForEnrollment, setSelectedCourseForEnrollment] = useState<Course | null>(null);

  const subfolders: SubFolder[] = [
    { id: 'mappe-1', name: 'Mappe' }
  ];

  const courses: Course[] = [
    {
      id: '1',
      name: 'Fallforebygging i hjemmet',
      instructor: { name: 'Emma Barlindhaug', initials: 'EB', color: '#D4A574' },
      enrolledCount: 2,
      isPublished: true
    },
    {
      id: '2',
      name: 'Ernæringskartlegging',
      instructor: { name: 'Emma Barlindhaug', initials: 'EB', color: '#D4A574' },
      enrolledCount: 1,
      isPublished: false
    },
    {
      id: '3',
      name: 'Vitale målinger',
      instructor: { name: 'Emma Barlindhaug', initials: 'EB', color: '#D4A574' },
      enrolledCount: 3,
      isPublished: false
    }
  ];

  const instructors = [
    { id: 'all', name: 'Alle kursledere', initials: 'Ak', color: '#7FCCAD' },
    { id: 'eb', name: 'Emma Barlindhaug', initials: 'EB', color: '#D4A574' }
  ];

  const filteredCourses = selectedInstructor === 'all' 
    ? courses 
    : courses.filter(c => c.instructor.initials === selectedInstructor.toUpperCase());

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const handleAddCourse = () => {
    if (onNavigateToCreateCourse) {
      onNavigateToCreateCourse();
    } else {
      console.log('Legg til nytt kurs');
    }
  };

  const handleEditFolder = () => {
    console.log('Rediger mappe');
  };

  const handleDeleteFolder = () => {
    console.log('Slett mappe');
  };

  const handleAddParticipants = (course: Course) => {
    setSelectedCourseForEnrollment(course);
    setShowAddParticipantsModal(true);
  };

  const handleSubfolderClick = (folderId: string, folderName: string) => {
    if (onNavigateToSubfolder) {
      onNavigateToSubfolder(folderId, folderName);
    }
  };

  const handleAddFolder = () => {
    console.log('Legg til ny undermappe');
  };

  // Use provided breadcrumb path or default
  const currentBreadcrumbPath = breadcrumbPath || ['Kursadministrasjon', folderName];
  const currentBreadcrumbHandlers = breadcrumbHandlers || [onNavigateToCourseAdmin, undefined];

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={currentBreadcrumbPath}
        pathClickHandlers={currentBreadcrumbHandlers}
      />

      {/* Header with title and action buttons */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-gray-800 mb-2">Administrer kursmappe {folderName}</h1>
            <p className="text-gray-600">Kurs samlet her er for alle ansatte i {folderName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleEditFolder}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Rediger mappe"
            >
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleDeleteFolder}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Slett mappe"
            >
              <Trash2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Subfolders Section */}
      {subfolders.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-800">Undermapper</h2>
            <button
              onClick={handleAddFolder}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Legg til mappe</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {subfolders.map((folder, index) => (
              <button
                key={folder.id}
                onClick={() => handleSubfolderClick(folder.id, folder.name)}
                className="group flex flex-col items-center justify-center bg-[#E5F5EF] border border-[#C0E6D6] rounded-lg p-4 min-h-[110px] transition-all duration-200 hover:border-[#0F547A] hover:shadow-md hover:-translate-y-1 text-gray-700 hover:text-[#0F547A]"
              >
                <Folder 
                  className="w-10 h-10 mb-2 text-[#DDB726] transition-colors duration-200 group-hover:text-[#0F547A]" 
                  fill="currentColor"
                />
                <span className="text-center text-sm break-words leading-tight">
                  {folder.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Courses Section Header */}
      <div className="mb-4">
        <h2 className="text-gray-800">Kurs</h2>
      </div>

      {/* Add Course Button and Filter */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <span>Legg til kurs</span>
          <div className="w-5 h-5 bg-[#7FCCAD] rounded-full flex items-center justify-center">
            <Plus className="w-3.5 h-3.5 text-white" />
          </div>
        </button>

        {/* Instructor Filter Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Filter</span>
            <button
              onClick={() => setShowInstructorDropdown(!showInstructorDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors min-w-[200px] justify-between"
            >
              <span className="text-gray-700">
                {instructors.find(i => i.id === selectedInstructor)?.name || 'Alle kursledere'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showInstructorDropdown ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Dropdown Menu */}
          {showInstructorDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[240px] z-10">
              {instructors.map((instructor) => (
                <button
                  key={instructor.id}
                  onClick={() => {
                    setSelectedInstructor(instructor.id);
                    setShowInstructorDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: instructor.color }}
                  >
                    <span className="text-sm">{instructor.initials}</span>
                  </div>
                  <span className="text-gray-700">{instructor.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleCourse(course.id)}
              className="w-full px-6 py-5 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              {/* Chevron */}
              <div className="flex-shrink-0">
                {expandedCourses.has(course.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </div>

              {/* Course Name */}
              <span className="text-gray-800 text-left flex-1">{course.name}</span>

              {/* Published Badge */}
              {course.isPublished && (
                <span className="px-3 py-1 bg-[#7FCCAD] text-white rounded-full text-sm flex-shrink-0">
                  Publisert
                </span>
              )}

              {/* Instructor Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: course.instructor.color }}
              >
                <span className="text-sm">{course.instructor.initials}</span>
              </div>

              {/* Enrolled Count */}
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap flex-shrink-0">
                Påmeldte ({course.enrolledCount})
              </span>
            </button>

            {/* Expanded Content */}
            {expandedCourses.has(course.id) && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600">
                  Kursdetaljer for "{course.name}" vil vises her...
                </p>
                <button
                  onClick={() => handleAddParticipants(course)}
                  className="mt-4 px-4 py-2 bg-[#7FCCAD] text-white rounded-lg hover:bg-[#6FCF97] transition-colors"
                >
                  Legg til deltakere
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600">Ingen kurs funnet for valgt filter.</p>
        </div>
      )}

      {/* Add Participants Modal */}
      {showAddParticipantsModal && selectedCourseForEnrollment && (
        <AddParticipantsModal
          isOpen={showAddParticipantsModal}
          courseName={selectedCourseForEnrollment.name}
          onClose={() => {
            setShowAddParticipantsModal(false);
            setSelectedCourseForEnrollment(null);
          }}
          onAddParticipants={(userIds) => {
            console.log('Legger til brukere:', userIds, 'til kurs:', selectedCourseForEnrollment.name);
            // Her ville du normalt sendt dette til serveren
          }}
          onAddGroup={(groupId) => {
            console.log('Legger til gruppe:', groupId, 'til kurs:', selectedCourseForEnrollment.name);
            // Her ville du normalt sendt dette til serveren
          }}
        />
      )}
    </main>
  );
}
