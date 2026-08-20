import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { StudentDashboard } from './components/StudentDashboard';
import { CoursesSection } from './components/CoursesSection';
import { TimetableSection } from './components/TimetableSection';
import { FacultySection } from './components/FacultySection';
import { EventsSection } from './components/EventsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIChatbot } from './components/AIChatbot';
import { 
  AssignmentSubmitModal, 
  ConsultationModal, 
  FacultyEmailModal, 
  EventRegisterModal, 
  LeaveApplicationModal, 
  NoticeDetailsModal, 
  QuickSearchModal 
} from './components/ActionModals';
import { 
  NavigationTab, 
  StudentProfile, 
  Assignment, 
  FacultyMember, 
  CollegeEvent, 
  CampusNotice 
} from './types';
import { 
  SAMPLE_STUDENTS, 
  SAMPLE_ATTENDANCE, 
  SAMPLE_TIMETABLE, 
  SAMPLE_ASSIGNMENTS, 
  SAMPLE_COURSES, 
  SAMPLE_FACULTY, 
  SAMPLE_EVENTS, 
  SAMPLE_NOTICES 
} from './data/collegeData';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Student State
  const [studentsList] = useState<StudentProfile[]>(SAMPLE_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(SAMPLE_STUDENTS[0]);

  // Data States
  const [assignments, setAssignments] = useState<Assignment[]>(SAMPLE_ASSIGNMENTS);
  const [events, setEvents] = useState<CollegeEvent[]>(SAMPLE_EVENTS);
  const [courses] = useState(SAMPLE_COURSES);
  const [faculty] = useState(SAMPLE_FACULTY);
  const [notices] = useState(SAMPLE_NOTICES);

  // Modal States
  const [activeSubmitAssignment, setActiveSubmitAssignment] = useState<Assignment | null>(null);
  const [activeConsultationFaculty, setActiveConsultationFaculty] = useState<FacultyMember | null>(null);
  const [activeEmailFaculty, setActiveEmailFaculty] = useState<FacultyMember | null>(null);
  const [activeRegisterEvent, setActiveRegisterEvent] = useState<CollegeEvent | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [activeNoticeModal, setActiveNoticeModal] = useState<CampusNotice | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Current Attendance and Daily Schedule
  const currentAttendance = SAMPLE_ATTENDANCE[currentStudent.id] || SAMPLE_ATTENDANCE['std-01'];
  const todaySchedule = SAMPLE_TIMETABLE['Monday'] || [];

  // Global Keyboard Shortcut for Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectStudent = (student: StudentProfile) => {
    setCurrentStudent(student);
  };

  const handleToggleAssignment = (assignmentId: string) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          status: asg.status === 'pending' ? 'submitted' : 'pending'
        };
      }
      return asg;
    }));
  };

  const handleSubmitAssignment = (assignmentId: string, repoUrl: string, notes: string) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          status: 'submitted',
          submittedOn: new Date().toISOString().split('T')[0],
          grade: 'Under Evaluation'
        };
      }
      return asg;
    }));
  };

  const handleRegisterEventConfirm = (eventId: string) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return {
          ...evt,
          isRegistered: true,
          enrolledCount: evt.enrolledCount + 1
        };
      }
      return evt;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* College Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentStudent={currentStudent}
        studentsList={studentsList}
        onSelectStudent={handleSelectStudent}
        notices={notices}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-20 lg:pb-8">
        {activeTab === 'home' && (
          <HeroHome
            setActiveTab={setActiveTab}
            currentStudent={currentStudent}
            notices={notices}
            assignments={assignments}
            todaySchedule={todaySchedule}
            onOpenNotice={(n) => setActiveNoticeModal(n)}
            onOpenChatbot={() => setIsChatbotOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <StudentDashboard
            currentStudent={currentStudent}
            studentsList={studentsList}
            onSelectStudent={handleSelectStudent}
            attendanceList={currentAttendance}
            todaySchedule={todaySchedule}
            assignments={assignments}
            onToggleAssignmentStatus={handleToggleAssignment}
            onOpenSubmitModal={(asg) => setActiveSubmitAssignment(asg)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesSection courses={courses} />
        )}

        {activeTab === 'timetable' && (
          <TimetableSection />
        )}

        {activeTab === 'faculty' && (
          <FacultySection
            facultyList={faculty}
            onOpenConsultationModal={(fac) => setActiveConsultationFaculty(fac)}
            onOpenEmailModal={(fac) => setActiveEmailFaculty(fac)}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            onRegisterEvent={(evt) => setActiveRegisterEvent(evt)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* College Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Interactive Action Modals */}
      {activeSubmitAssignment && (
        <AssignmentSubmitModal
          assignment={activeSubmitAssignment}
          onClose={() => setActiveSubmitAssignment(null)}
          onSubmit={handleSubmitAssignment}
        />
      )}

      {activeConsultationFaculty && (
        <ConsultationModal
          faculty={activeConsultationFaculty}
          currentStudent={currentStudent}
          onClose={() => setActiveConsultationFaculty(null)}
        />
      )}

      {activeEmailFaculty && (
        <FacultyEmailModal
          faculty={activeEmailFaculty}
          currentStudent={currentStudent}
          onClose={() => setActiveEmailFaculty(null)}
        />
      )}

      {activeRegisterEvent && (
        <EventRegisterModal
          event={activeRegisterEvent}
          currentStudent={currentStudent}
          onClose={() => setActiveRegisterEvent(null)}
          onConfirm={handleRegisterEventConfirm}
        />
      )}

      {isLeaveModalOpen && (
        <LeaveApplicationModal
          currentStudent={currentStudent}
          onClose={() => setIsLeaveModalOpen(false)}
        />
      )}

      {activeNoticeModal && (
        <NoticeDetailsModal
          notice={activeNoticeModal}
          onClose={() => setActiveNoticeModal(null)}
        />
      )}

      {isSearchModalOpen && (
        <QuickSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          courses={courses}
          faculty={faculty}
          events={events}
          onSelectNav={setActiveTab}
        />
      )}

      {/* Floating AI College Assistant Chatbot */}
      <AIChatbot
        setActiveTab={setActiveTab}
        isOpen={isChatbotOpen}
        setIsOpen={setIsChatbotOpen}
      />
    </div>
  );
}
