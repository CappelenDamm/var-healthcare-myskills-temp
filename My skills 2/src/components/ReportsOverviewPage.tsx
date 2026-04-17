import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import enrollmentIcon from 'figma:asset/408c39c8dc64e76d6e59c336c3851dc0bb547b9e.png';

interface ReportsOverviewPageProps {
  onNavigateHome: () => void;
  onNavigateToCourseReport: () => void;
}

const reportCategories = [
  { id: 'hjemmetjenesten', name: 'Hjemmetjenesten' },
  { id: 'semester-1', name: 'Semester 1' },
  { id: 'nye-prosedyrer-2024', name: 'Nye prosedyrer 2024' },
  { id: 'nyansatte-sykepleiere', name: 'Nyansatte sykepleiere' },
  { id: 'nytest', name: 'NyTest' },
  { id: 'sykehjemmet', name: 'Sykehjemmet' },
  { id: 'kurs-uten-mappe', name: 'Kurs uten mappe' },
];

export function ReportsOverviewPage({ onNavigateHome, onNavigateToCourseReport }: ReportsOverviewPageProps) {
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'hjemmetjenesten') {
      onNavigateToCourseReport();
    } else {
      console.log('Åpner rapport for:', categoryId);
      // Her kan du senere implementere navigasjon til andre rapporter
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Rapporter']}
      />

      {/* Reports Navigation Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
        {/* Header with title */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h2 className="text-gray-800">Kursmapper</h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {reportCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group flex flex-col items-center justify-center bg-[#E5F5EF] border border-[#C0E6D6] rounded-lg p-5 min-h-[140px] transition-all duration-200 hover:border-[#0F547A] hover:shadow-md hover:-translate-y-1 text-gray-700 hover:text-[#0F547A] animate-fadein"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img 
                src={enrollmentIcon} 
                alt="Report icon"
                className="w-12 h-12 mb-3 opacity-70 transition-opacity duration-200 group-hover:opacity-100"
              />
              <span className="text-center break-words leading-tight">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}