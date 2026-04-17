import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Folder, Plus } from 'lucide-react';

interface CourseAdministrationPageProps {
  onNavigateHome: () => void;
  onNavigateToFolder?: (folderId: string, folderName: string) => void;
}

const folders = [
  { id: 'hjemmetjenesten', name: 'Hjemmetjenesten' },
  { id: 'semester-1', name: 'Semester 1' },
  { id: 'nye-prosedyrer-2024', name: 'Nye prosedyrer 2024' },
  { id: 'nyansatte-sykepleiere', name: 'Nyansatte sykepleiere' },
  { id: 'nytest', name: 'NyTest' },
  { id: 'sykehjemmet', name: 'Sykehjemmet' },
  { id: 'kurs-uten-mappe', name: 'Kurs uten mappe' },
];

export function CourseAdministrationPage({ onNavigateHome, onNavigateToFolder }: CourseAdministrationPageProps) {
  const handleFolderClick = (folderId: string, folderName: string) => {
    console.log('Åpner mappe:', folderId);
    if (onNavigateToFolder) {
      onNavigateToFolder(folderId, folderName);
    }
    // Her kan du senere implementere navigasjon til den spesifikke mappen
  };

  const handleAddFolder = () => {
    console.log('Legg til ny mappe');
    // Her kan du senere implementere funksjonalitet for å legge til en ny mappe
  };

  return (
    <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
      {/* Breadcrumb */}
      <Breadcrumb 
        onHomeClick={onNavigateHome}
        currentPath={['Kursadministrasjon']}
      />

      {/* Folder Navigation Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
        {/* Header with title and button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <h2 className="text-gray-800">Kursmapper</h2>
          
          <button
            onClick={handleAddFolder}
            className="flex items-center gap-2 bg-[#0F547A] hover:bg-[#0A3C57] text-white px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Legg til mappe</span>
          </button>
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {folders.map((folder, index) => (
            <button
              key={folder.id}
              onClick={() => handleFolderClick(folder.id, folder.name)}
              className="group flex flex-col items-center justify-center bg-[#E5F5EF] border border-[#C0E6D6] rounded-lg p-5 min-h-[140px] transition-all duration-200 hover:border-[#0F547A] hover:shadow-md hover:-translate-y-1 text-gray-700 hover:text-[#0F547A] animate-fadein"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Folder 
                className="w-12 h-12 mb-3 text-[#DDB726] transition-colors duration-200 group-hover:text-[#0F547A]" 
                fill="currentColor"
              />
              <span className="text-center break-words leading-tight">
                {folder.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}