import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Users, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  FileText,
  Activity,
  Layers,
  HelpCircle,
  Building,
  Bell,
  Bot
} from 'lucide-react';
import { NavigationTab, StudentProfile, CampusNotice, Assignment, ClassScheduleItem } from '../types';
import { COLLEGE_INFO, COLLEGE_DEPARTMENTS_LIST } from '../data/collegeData';

interface HeroHomeProps {
  setActiveTab: (tab: NavigationTab) => void;
  currentStudent: StudentProfile;
  notices: CampusNotice[];
  assignments: Assignment[];
  todaySchedule: ClassScheduleItem[];
  onOpenNotice: (notice: CampusNotice) => void;
  onOpenChatbot?: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  setActiveTab,
  currentStudent,
  notices,
  assignments,
  todaySchedule,
  onOpenNotice,
  onOpenChatbot
}) => {
  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const nextClass = todaySchedule.find(s => !s.isBreak);

  return (
    <div className="space-y-10 pb-12">
      {/* College Banner & Welcome Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10 lg:p-12 border border-slate-700/60 shadow-2xl">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Accreditation Badge & Logo Crest */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                <img 
                  src={COLLEGE_INFO.logoUrl} 
                  alt="RLS College Of BCA Logo" 
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-300"
                  referrerPolicy="no-referrer"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Autonomous Institution • Estd. {COLLEGE_INFO.establishedYear}</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                Affiliated State Univ.
              </div>
            </div>

            {/* Main College Heading with Official Emblem */}
            <div className="flex items-start gap-4">
              <div className="hidden sm:block shrink-0 p-1 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-xl ring-2 ring-blue-400/30">
                <img 
                  src={COLLEGE_INFO.logoUrl} 
                  alt="RLS College Of BCA Seal" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.15]">
                  RLS College <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Of BCA</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                  Empowering the innovators of tomorrow through outcome-based computer applications pedagogy, advanced software labs, and AI-driven student assistance.
                </p>
              </div>
            </div>

            {/* Quick stats tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <div className="text-xl font-bold text-blue-400">NAAC A++</div>
                <div className="text-xs text-slate-400">Top Tier Accreditation</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3">
                <div className="text-xl font-bold text-emerald-400">#34 NIRF</div>
                <div className="text-xs text-slate-400">National College Rank</div>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 col-span-2 sm:col-span-1">
                <div className="text-xl font-bold text-indigo-400">98.4%</div>
                <div className="text-xs text-slate-400">Placement Record</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-go-dashboard-btn"
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all transform active:scale-98 cursor-pointer"
              >
                <span>Open Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {onOpenChatbot && (
                <button
                  id="hero-ask-ai-bot-btn"
                  onClick={onOpenChatbot}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-md flex items-center gap-2 transition-all transform active:scale-98 cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-white" />
                  <span>Ask AI Assistant</span>
                </button>
              )}
              <button
                id="hero-view-timetable-btn"
                onClick={() => setActiveTab('timetable')}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Today's Timetable</span>
              </button>
              <button
                id="hero-explore-courses-btn"
                onClick={() => setActiveTab('courses')}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Explore Courses</span>
              </button>
            </div>
          </div>

          {/* Student Quick Assistant Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentStudent.avatarUrl} 
                    alt={currentStudent.name} 
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500" 
                  />
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">
                      {currentStudent.name}
                    </h2>
                    <p className="text-xs text-blue-300 font-mono">
                      {currentStudent.rollNo} • Sem {currentStudent.semester}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 bg-blue-500/10 hover:bg-blue-500/20 px-2.5 py-1 rounded-lg border border-blue-500/30 transition-colors"
                >
                  Portal <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Student status pills */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Attendance</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {currentStudent.overallAttendance}%
                  </div>
                  <div className="text-[10px] text-slate-400">Good Standing</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">CGPA</span>
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-amber-300 mt-1">
                    {currentStudent.cgpa}
                  </div>
                  <div className="text-[10px] text-slate-400">Credits: {currentStudent.totalCreditsEarned}/{currentStudent.totalCreditsRequired}</div>
                </div>
              </div>

              {/* Next Class Highlight */}
              {nextClass && (
                <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-300 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      Next Scheduled Class
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                      {nextClass.startTime} - {nextClass.endTime}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {nextClass.subjectName} ({nextClass.subjectCode})
                  </div>
                  <div className="text-xs text-slate-300 flex items-center justify-between">
                    <span>{nextClass.facultyName}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{nextClass.room}</span>
                  </div>
                </div>
              )}

              {/* Pending Assignments Reminder */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    {pendingAssignments.length}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Pending Assignments</div>
                    <div className="text-[11px] text-slate-400">Submissions due this week</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs text-slate-300 hover:text-white font-medium underline"
                >
                  View Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Student Assistant Hub
            </h2>
            <p className="text-sm text-slate-600">
              Quick access to academic resources, schedules, faculty support, and campus activities
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Dashboard */}
          <div 
            id="hub-card-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Activity className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Academic Dashboard
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track personal attendance metrics, simulator forecaster, upcoming classes, and assignment deadlines.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-blue-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Open My Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Courses */}
          <div 
            id="hub-card-courses"
            onClick={() => setActiveTab('courses')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Courses & Syllabi
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Browse detailed syllabi for all departments, credit distributions, textbooks, and course module notes.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-indigo-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Department Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Timetable */}
          <div 
            id="hub-card-timetable"
            onClick={() => setActiveTab('timetable')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Weekly Timetable
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interactive day-by-day and week-matrix schedule with classroom room numbers, lab allocations, and timings.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-emerald-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Check Class Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Faculty */}
          <div 
            id="hub-card-faculty"
            onClick={() => setActiveTab('faculty')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-violet-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-violet-600 group-hover:text-white transition-all">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                Faculty Directory
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Meet our distinguished professors, view cabin numbers, office hours, and book 1-on-1 consultations.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-violet-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Connect with Faculty</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 5: Events */}
          <div 
            id="hub-card-events"
            onClick={() => setActiveTab('events')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-rose-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                Events & Hackathons
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Register for upcoming technical symposiums, workshops, placement drives, cultural fests, and sports.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-rose-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Campus Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 6: Contact */}
          <div 
            id="hub-card-contact"
            onClick={() => setActiveTab('contact')}
            className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-cyan-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-600 group-hover:text-white transition-all">
              <Building className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                Contact & Helplines
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Campus address, office extensions, admissions helpdesk, exam controller, and grievance inquiry submission.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-cyan-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Campus Contact Information</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* College Departments Overview */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Academic Departments at RLS College Of BCA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              State-of-the-art laboratories, industry centers of excellence, and specialized research wings
            </p>
          </div>
          <button
            onClick={() => setActiveTab('courses')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View All Courses & Syllabi <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLEGE_DEPARTMENTS_LIST.map((dept) => (
            <div
              key={dept.code}
              onClick={() => setActiveTab('courses')}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {dept.code}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {dept.labs} Specialized Labs
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                {dept.name}
              </h4>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-100">
                <span>{dept.totalFaculty} Faculty Members</span>
                <span>{dept.totalStudents}+ Students</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Campus Notice Board & Circulars Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Official Campus Notices & Circulars
              </h2>
              <p className="text-xs text-slate-500">
                Published by Office of the Dean, Controller of Examinations, and Academic Registrar
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            Live Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => onOpenNotice(notice)}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  notice.priority === 'urgent' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                  notice.priority === 'important' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {notice.category} • {notice.priority.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400 font-mono">{notice.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {notice.summary}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span className="font-medium">{notice.issuedBy}</span>
                <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  Read Circular <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* College Life & Facilities Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Central 24/7 Digital Library</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over 120,000 physical volumes, IEEE Xplore, ACM Digital Library, and Springer Nature digital access with high-speed quiet study pods.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Innovation & Incubation Hub</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Funded startup incubator supporting student tech ventures with seed capital, patent assistance, and dedicated GPU compute clusters.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-950 to-blue-950 text-white rounded-2xl p-6 space-y-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Career & Placement Center</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            250+ top global companies recruit annually. Comprehensive coding bootcamps, resume vetting, and alumni mentorship networks.
          </p>
        </div>
      </section>
    </div>
  );
};
