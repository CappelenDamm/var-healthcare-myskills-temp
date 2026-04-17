import React, { useState } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Plus } from 'lucide-react';
import graduationIcon from 'figma:asset/408c39c8dc64e76d6e59c336c3851dc0bb547b9e.png';

interface CreateCoursePageProps {
  onNavigateHome?: () => void;
  onNavigateToSkills?: () => void;
  onNavigateToHomeService?: () => void;
  onCancel?: () => void;
  onSave?: (courseData: CourseData) => void;
}

interface CourseData {
  name: string;
  description: string;
  duration: string;
}

export function CreateCoursePage({
  onNavigateHome,
  onNavigateToSkills,
  onNavigateToHomeService,
  onCancel,
  onSave,
}: CreateCoursePageProps) {
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({
        name: courseName,
        description: courseDescription,
        duration: courseDuration,
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Mine ferdigheter', 'Hjemmetjenesten', 'Nytt kurs']}
        pathClickHandlers={[onNavigateToSkills, onNavigateToHomeService, undefined]}
      />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-gray-800 mb-6 text-3xl">Nytt kurs</h1>
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-gray-300"></div>
          <img src={graduationIcon} alt="Graduation Cap" className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Left Column - Kurs informasjon */}
        <div>
          <h2 className="text-gray-700 mb-6">Kurs informasjon</h2>
          
          <div className="space-y-6">
            {/* Navn på kurs */}
            <div>
              <label htmlFor="course-name" className="block text-sm text-gray-600 mb-2">
                Navn på kurs
              </label>
              <input
                id="course-name"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Navn på kurs"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-transparent"
              />
            </div>

            {/* Beskrivelse av kurs */}
            <div>
              <label htmlFor="course-description" className="block text-sm text-gray-600 mb-2">
                Beskrivelse av kurs
              </label>
              <textarea
                id="course-description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Beskrivelse av kurs"
                rows={8}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-transparent resize-none"
              />
            </div>

            {/* Varighet */}
            <div>
              <label htmlFor="course-duration" className="block text-sm text-gray-600 mb-2">
                Varighet
              </label>
              <input
                id="course-duration"
                type="text"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                placeholder="f.eks. 3 timer"
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7FCCAD] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Legg til relevant innhold */}
        <div>
          <h2 className="text-gray-700 mb-6">Legg til relevant innhold i kurset</h2>
          
          <div className="space-y-4">
            {/* Legg til prosedyrer */}
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <span>Legg til prosedyrer</span>
              <div className="w-6 h-6 bg-[#0F547A] rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Legg til kunnskapsstoff */}
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <span>Legg til kunnskapsstoff</span>
              <div className="w-6 h-6 bg-[#0F547A] rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Legg til kursledere */}
            <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <span>Legg til kursledere</span>
              <div className="w-6 h-6 bg-[#0F547A] rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Avbryt
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-[#0F547A] text-white rounded hover:bg-[#0D4563] transition-colors"
        >
          Lagre
        </button>
      </div>
    </main>
  );
}