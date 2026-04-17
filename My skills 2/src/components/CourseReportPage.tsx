import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Star, ArrowDown, Search } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';

interface CourseStats {
  enrolled: number;
  assessments: number;
  solutions: number;
}

interface Course {
  id: string;
  name: string;
  stats: CourseStats;
}

interface CourseReportPageProps {
  onNavigateToParticipants?: () => void;
  onNavigateHome?: () => void;
  onNavigateToReportsOverview?: () => void;
}

export function CourseReportPage({ onNavigateToParticipants, onNavigateHome, onNavigateToReportsOverview }: CourseReportPageProps) {
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'deltaker' | 'oppslag'>('deltaker');

  const courses: Course[] = [
    {
      id: '1',
      name: 'PVK (for nyansatte)',
      stats: { enrolled: 14, assessments: 18, solutions: 15 }
    },
    {
      id: '2',
      name: 'Fall blant eldre',
      stats: { enrolled: 4, assessments: 7, solutions: 15 }
    },
    {
      id: '3',
      name: 'SVK-trening (for 3. års student, 1. semester)',
      stats: { enrolled: 1, assessments: 0, solutions: 3 }
    },
    {
      id: '4',
      name: 'Førstehjelp',
      stats: { enrolled: 2, assessments: 3, solutions: 7 }
    }
  ];

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const renderCourseDetails = (courseId: string) => {
    if (courseId === '1') {
      return (
        <div className="px-6 py-6 bg-white border-t border-gray-200">
          {/* Om kurset section */}
          <div className="mb-6">
            <h3 className="text-gray-800 mb-3 font-semibold">Om kurset</h3>
            <div className="pb-4 mb-4">
              <p className="text-gray-700 mb-1"><span className="font-semibold">Opprettet:</span> 16.12.2021</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Kursleder:</span> Mikael Næss</p>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <p className="text-gray-600">Testkurs</p>
            </div>
            <div className="border-t border-gray-200 mb-4"></div>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => {
                  setActiveTab('deltaker');
                  if (onNavigateToParticipants) {
                    onNavigateToParticipants();
                  }
                }}
                className={`px-6 py-2.5 rounded transition-colors ${
                  activeTab === 'deltaker'
                    ? 'bg-[#7FCCAD] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Deltakeroversikt
              </button>
              <button
                onClick={() => setActiveTab('oppslag')}
                className={`px-6 py-2.5 rounded transition-colors flex items-center gap-2 ${
                  activeTab === 'oppslag'
                    ? 'bg-[#7FCCAD] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Search className="w-4 h-4" />
                Søk opp deltager
              </button>
            </div>
          </div>

          {/* Prosedyre section */}
          <div className="mb-6">
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-800">Prosedyre</h4>
            </div>
            <div className="space-y-0">
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Perifert venekateter (PVK): stell av innstikksted
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt vurderinger: 5/14</span>
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 4/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Perifert venekateter (PVK): fjerning
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt vurderinger: 6/14</span>
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 2/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Perifert venekateter (PVK): skylling
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt vurderinger: 3/14</span>
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 1/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Perifert venekateter (PVK): innleggelse
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt vurderinger: 4/14</span>
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 2/14</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kunnskapsstoff section */}
          <div>
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 mb-2">
              <ArrowDown className="w-5 h-5 text-gray-600" />
              <h4 className="text-gray-800">Kunnskapsstoff</h4>
            </div>
            <div className="space-y-0">
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Om perifert venekateter (PVK) og innleggelse, stell og skylling
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 2/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Om perifert venekateter (PVK) og vurderinger før etablering og valg av innstikksted
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 1/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Om perifert venekateter (PVK) og komplikasjoner
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 1/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Om perifert venekateter (PVK) – skifte og fjerning
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 1/14</span>
                </div>
              </div>
              <div className="px-4 py-3 flex items-start justify-between hover:bg-gray-50">
                <span className="text-gray-700 underline cursor-pointer">
                  Perifert venekateter (PVK): vurdering før innleggelse
                </span>
                <div className="flex gap-6 text-gray-600 ml-4">
                  <span className="whitespace-nowrap">Sendt lesebekreftelse: 1/14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-gray-600">
          Detaljer for dette kurset er ikke tilgjengelig ennå.
        </p>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Rapporter', 'Hjemmetjenesten']}
        pathClickHandlers={[onNavigateToReportsOverview, undefined]}
      />

      {/* Page Title */}
      <h1 className="mb-8 text-gray-800">Rapport, kursoversikt</h1>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => toggleCourse(course.id)}
              className="w-full px-6 py-5 grid grid-cols-[minmax(0,1fr)_36px_auto] gap-6 items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                {expandedCourses.has(course.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
                <span className="text-gray-800 text-left break-words">{course.name}</span>
              </div>

              <div className="w-9 h-9 bg-[#DDB726] rounded-full flex items-center justify-center text-white flex-shrink-0 justify-self-center">
                MN
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                  Påmeldte ({course.stats.enrolled})
                </span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                  Vurderinger ({course.stats.assessments})
                </span>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">
                  Lesebekreftelse ({course.stats.solutions})
                </span>
              </div>
            </button>

            {expandedCourses.has(course.id) && renderCourseDetails(course.id)}
          </div>
        ))}
      </div>
    </main>
  );
}