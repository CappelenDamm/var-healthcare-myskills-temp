import React from 'react';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { StatsCards } from './components/StatsCards';
import { AdminCard } from './components/AdminCard';
import { RecentUpdates } from './components/RecentUpdates';
import { CourseReportPage } from './components/CourseReportPage';
import { ParticipantOverviewPage } from './components/ParticipantOverviewPage';
import { CourseAdministrationPage } from './components/CourseAdministrationPage';
import { CourseEnrollmentPage } from './components/CourseEnrollmentPage';
import { ReportsOverviewPage } from './components/ReportsOverviewPage';
import { CourseFolderAdminPage } from './components/CourseFolderAdminPage';
import { UserReportPage } from './components/UserReportPage';
import { MyCoursesPage } from './components/MyCoursesPage';
import { CreateCoursePage } from './components/CreateCoursePage';
import { BookOpen, Users, FileText, Info, GraduationCap, ClipboardCheck, ChevronDown } from 'lucide-react';
import sidebarImage from 'figma:asset/24a5b4c4df8207ec62e6e01134035ea81eac3c08.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<'dashboard' | 'reportsoverview' | 'report' | 'participants' | 'courseadmin' | 'coursefolderadmin' | 'enrollment' | 'userreport' | 'mycourses' | 'createcourse'>('dashboard');
  const [isRecentActivityOpen, setIsRecentActivityOpen] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<{ id: string; name: string } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Sidebar */}
      <aside className="hidden md:block w-16 flex-shrink-0">
        <div className="fixed top-0 left-0 h-full w-16">
          <img 
            src={sidebarImage} 
            alt="VAR Healthcare Sidebar" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {currentPage === 'dashboard' ? (
          <main className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
            {/* Breadcrumb */}
            <Breadcrumb onHomeClick={() => setCurrentPage('dashboard')} />
            
            {/* Stats Overview */}
            <StatsCards />
            
            {/* Administrator Actions */}
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-gray-800 mb-2">Administrasjonsverktøy</h2>
                <p className="text-gray-600">Verktøy for kursadministrasjon og brukeroppfølging</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AdminCard
                  icon={<BookOpen className="w-6 h-6" />}
                  title="Kursadministrasjon"
                  description="Opprett, rediger og organiser kurs og læringsmoduler for alle brukere."
                  buttonText="Administrer kurs"
                  variant="primary"
                  onClick={() => setCurrentPage('courseadmin')}
                />
                <AdminCard
                  icon={<Users className="w-6 h-6" />}
                  title="Deltageroversikt"
                  description="Følg med på kursdeltakernes fremgang, resultater og fullførte kurs."
                  buttonText="Se deltagere"
                  variant="primary"
                  onClick={() => setCurrentPage('userreport')}
                />
                <AdminCard
                  icon={<FileText className="w-6 h-6" />}
                  title="Rapporter"
                  description="Generer detaljerte rapporter over læringsaktivitet og kursstatistikk."
                  buttonText="Generer rapport"
                  variant="primary"
                  onClick={() => setCurrentPage('reportsoverview')}
                />
              </div>
            </section>
            
            {/* Recent Updates */}
            <section className="mb-12">
              <Collapsible open={isRecentActivityOpen} onOpenChange={setIsRecentActivityOpen}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors group">
                    <h2 className="text-gray-800 m-0">Nylig aktivitet</h2>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isRecentActivityOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t border-gray-100">
                      <RecentUpdates />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </section>
            
            {/* Mine ferdigheter section */}
            <section className="mb-12">
              <div className="mb-6">
                <h2 className="text-gray-800 mb-2">Mine ferdigheter</h2>
                <p className="text-gray-600">Administrer dine personlige kurs og kompetanser</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AdminCard
                  icon={<Info className="w-6 h-6" />}
                  title="Om Mine ferdigheter"
                  description="Lær mer om hvordan ferdighetssystemet fungerer og hvordan du tar det i bruk."
                  buttonText="Les mer"
                  variant="primary"
                  onClick={() => {}}
                />
                <AdminCard
                  icon={<GraduationCap className="w-6 h-6" />}
                  title="Mine kurs"
                  description="Få oversikt over alle kurs du har tatt eller er påmeldt i systemet."
                  buttonText="Se mine kurs"
                  variant="primary"
                  onClick={() => setCurrentPage('mycourses')}
                />
                <AdminCard
                  icon={<ClipboardCheck className="w-6 h-6" />}
                  title="Påmelding"
                  description="Utforsk tilgjengelige kurs og meld deg på for å utvikle nye ferdigheter."
                  buttonText="Meld deg på"
                  variant="primary"
                  onClick={() => setCurrentPage('enrollment')}
                />
              </div>
            </section>
          </main>
        ) : currentPage === 'reportsoverview' ? (
          <ReportsOverviewPage 
            onNavigateToCourseReport={() => setCurrentPage('report')} 
            onNavigateHome={() => setCurrentPage('dashboard')}
          />
        ) : currentPage === 'report' ? (
          <CourseReportPage 
            onNavigateToParticipants={() => setCurrentPage('participants')} 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToReportsOverview={() => setCurrentPage('reportsoverview')}
          />
        ) : currentPage === 'participants' ? (
          <ParticipantOverviewPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToReportsOverview={() => setCurrentPage('reportsoverview')}
            onNavigateToCourseReport={() => setCurrentPage('report')}
          />
        ) : currentPage === 'enrollment' ? (
          <CourseEnrollmentPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToMyCourses={() => setCurrentPage('mycourses')}
          />
        ) : currentPage === 'coursefolderadmin' ? (
          <CourseFolderAdminPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToCourseAdmin={() => setCurrentPage('courseadmin')}
            onNavigateToCreateCourse={() => setCurrentPage('createcourse')}
            folderName={selectedFolder?.name}
          />
        ) : currentPage === 'userreport' ? (
          <UserReportPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToReportsOverview={() => setCurrentPage('reportsoverview')}
          />
        ) : currentPage === 'mycourses' ? (
          <MyCoursesPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
          />
        ) : currentPage === 'createcourse' ? (
          <CreateCoursePage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToSkills={() => setCurrentPage('dashboard')}
            onNavigateToHomeService={() => setCurrentPage('coursefolderadmin')}
            onCancel={() => setCurrentPage('coursefolderadmin')}
            onSave={(courseData) => {
              console.log('Lagrer nytt kurs:', courseData);
              setCurrentPage('coursefolderadmin');
            }}
          />
        ) : (
          <CourseAdministrationPage 
            onNavigateHome={() => setCurrentPage('dashboard')}
            onNavigateToFolder={(folderId, folderName) => {
              setSelectedFolder({ id: folderId, name: folderName });
              setCurrentPage('coursefolderadmin');
            }}
          />
        )}
      </div>
    </div>
  );
}