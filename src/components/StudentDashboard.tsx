import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  UploadCloud, 
  Calculator, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Award, 
  PlusCircle, 
  MinusCircle,
  Check, 
  ExternalLink,
  Info,
  CalendarCheck,
  Send,
  Code2,
  Database,
  Cloud,
  Shield,
  Brain,
  Cpu,
  Coffee,
  MapPin,
  Flame,
  AlertTriangle,
  FileCheck2,
  CheckCircle,
  Layers,
  ChevronDown,
  Mail,
  Building,
  BarChart3,
  Bookmark,
  Share2
} from 'lucide-react';
import { 
  StudentProfile, 
  SubjectAttendance, 
  ClassScheduleItem, 
  Assignment,
  NavigationTab 
} from '../types';
import { COLLEGE_INFO } from '../data/collegeData';

interface StudentDashboardProps {
  currentStudent: StudentProfile;
  studentsList: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  attendanceList: SubjectAttendance[];
  todaySchedule: ClassScheduleItem[];
  assignments: Assignment[];
  onToggleAssignmentStatus: (assignmentId: string) => void;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onOpenLeaveModal: () => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentStudent,
  studentsList,
  onSelectStudent,
  attendanceList,
  todaySchedule,
  assignments,
  onToggleAssignmentStatus,
  onOpenSubmitModal,
  onOpenLeaveModal,
  setActiveTab
}) => {
  // Attendance Simulator state
  const [targetAttendance, setTargetAttendance] = useState<number>(75);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(attendanceList[0]?.subjectCode || '');
  const [simulatedMisses, setSimulatedMisses] = useState<number>(0);
  const [simulatedAttends, setSimulatedAttends] = useState<number>(0);

  // Filter assignments
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const filteredAssignments = assignments.filter(asg => {
    if (assignmentFilter === 'all') return true;
    return asg.status === assignmentFilter;
  });

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;

  const selectedSubject = attendanceList.find(s => s.subjectCode === selectedSubjectCode) || attendanceList[0];

  // Helper for subject icons
  const getSubjectIcon = (code: string) => {
    if (code.includes('601') || code.includes('CS') || code.includes('BCA')) return Code2;
    if (code.includes('602') || code.includes('Cloud')) return Cloud;
    if (code.includes('603') || code.includes('AI') || code.includes('ML')) return Brain;
    if (code.includes('604') || code.includes('Sec')) return Shield;
    if (code.includes('DB') || code.includes('502')) return Database;
    return Cpu;
  };

  // Simulator calculations
  const calculateSimulatedResult = () => {
    if (!selectedSubject) return { newPct: 0, classesNeeded: 0, classesCanMiss: 0 };
    const currentAttended = selectedSubject.attendedClasses;
    const currentTotal = selectedSubject.totalClasses;

    const newAttended = currentAttended + simulatedAttends;
    const newTotal = currentTotal + simulatedAttends + simulatedMisses;
    const newPct = newTotal > 0 ? (newAttended / newTotal) * 100 : 0;

    const targetDecimal = targetAttendance / 100;
    let classesNeeded = 0;
    if (selectedSubject.percentage < targetAttendance) {
      const numerator = (targetDecimal * currentTotal) - currentAttended;
      const denominator = 1 - targetDecimal;
      classesNeeded = Math.ceil(numerator / denominator);
      if (classesNeeded < 0) classesNeeded = 0;
    }

    let classesCanMiss = 0;
    if (selectedSubject.percentage >= targetAttendance) {
      classesCanMiss = Math.floor((currentAttended / targetDecimal) - currentTotal);
      if (classesCanMiss < 0) classesCanMiss = 0;
    }

    return {
      newPct: Number(newPct.toFixed(1)),
      classesNeeded,
      classesCanMiss,
      projectedClasses: newTotal,
      projectedAttended: newAttended
    };
  };

  const simResult = calculateSimulatedResult();

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* 1. Student Digital Identity & Academic Standing Banner */}
      <section 
        id="student-profile-card"
        className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-blue-900/60 shadow-xl shadow-blue-950/20 relative overflow-hidden"
      >
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Student Profile Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <div className="relative shrink-0 self-start sm:self-center">
              <img 
                src={currentStudent.avatarUrl} 
                alt={currentStudent.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-400/40 shadow-xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-bold text-white border-2 border-slate-900 shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Active
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentStudent.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-mono font-bold tracking-wide">
                  {currentStudent.rollNo}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-[11px] font-semibold tracking-wide flex items-center gap-1.5">
                  <img 
                    src={COLLEGE_INFO.logoUrl} 
                    alt="RLS College Of BCA" 
                    className="w-3.5 h-3.5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>RLS College Of BCA</span>
                </span>
              </div>

              <p className="text-sm text-slate-300 font-medium">
                {currentStudent.department}
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 font-mono pt-0.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  Semester {currentStudent.semester} (Sec {currentStudent.section})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Batch {currentStudent.batch}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  Advisor: <strong className="text-white font-sans">{currentStudent.advisorName}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Key Academic Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
            {/* CGPA */}
            <div className="bg-slate-800/90 backdrop-blur-xs border border-blue-500/20 rounded-2xl p-3 sm:p-3.5 text-center transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-300 font-medium">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>CGPA</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5 tracking-tight">
                {currentStudent.cgpa}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block truncate">
                ★ Distinction
              </span>
            </div>

            {/* Credits */}
            <div className="bg-slate-800/90 backdrop-blur-xs border border-blue-500/20 rounded-2xl p-3 sm:p-3.5 text-center transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-300 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Credits</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-blue-300 mt-0.5 tracking-tight">
                {currentStudent.totalCreditsEarned}
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">
                of {currentStudent.totalCreditsRequired}
              </span>
            </div>

            {/* Overall Attendance */}
            <div className="bg-slate-800/90 backdrop-blur-xs border border-blue-500/20 rounded-2xl p-3 sm:p-3.5 text-center transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-300 font-medium">
                <ShieldCheck className={`w-3.5 h-3.5 ${currentStudent.overallAttendance >= 75 ? 'text-emerald-400' : 'text-rose-400'}`} />
                <span>Attendance</span>
              </div>
              <div className={`text-xl sm:text-2xl font-black mt-0.5 tracking-tight ${currentStudent.overallAttendance >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentStudent.overallAttendance}%
              </div>
              <span className={`text-[10px] font-semibold block truncate ${currentStudent.overallAttendance >= 75 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {currentStudent.overallAttendance >= 75 ? '✓ Exam Eligible' : '⚠ Shortage'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Profile Switching bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-medium">Switch Sample Student Profile:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {studentsList.map(st => (
              <button
                key={st.id}
                id={`dashboard-switch-student-${st.id}`}
                onClick={() => onSelectStudent(st)}
                className={`px-3 py-1.5 rounded-xl font-medium text-xs transition-all flex items-center gap-1.5 ${
                  st.id === currentStudent.id
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30 ring-2 ring-blue-400/50'
                    : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <img src={st.avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
                <span>{st.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({st.deptCode})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Quick Action Shortcut Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          id="quick-apply-leave-btn"
          onClick={onOpenLeaveModal}
          className="p-3.5 bg-white hover:bg-amber-50/50 border border-slate-200/90 hover:border-amber-300 rounded-2xl shadow-xs transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 flex items-center justify-center shrink-0 transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Apply Leave / OD</div>
            <div className="text-[11px] text-slate-500">Official medical & duty pass</div>
          </div>
        </button>

        <button
          id="quick-timetable-btn"
          onClick={() => setActiveTab('timetable')}
          className="p-3.5 bg-white hover:bg-blue-50/50 border border-slate-200/90 hover:border-blue-300 rounded-2xl shadow-xs transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Weekly Schedule</div>
            <div className="text-[11px] text-slate-500">Lectures & lab timings</div>
          </div>
        </button>

        <button
          id="quick-notes-btn"
          onClick={() => setActiveTab('courses')}
          className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200/90 hover:border-indigo-300 rounded-2xl shadow-xs transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 flex items-center justify-center shrink-0 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">Course Syllabus</div>
            <div className="text-[11px] text-slate-500">Modules & study materials</div>
          </div>
        </button>

        <button
          id="quick-faculty-btn"
          onClick={() => setActiveTab('faculty')}
          className="p-3.5 bg-white hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-300 rounded-2xl shadow-xs transition-all flex items-center gap-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Advisor Meeting</div>
            <div className="text-[11px] text-slate-500">Book office consultation</div>
          </div>
        </button>
      </section>

      {/* 3. Main 2-Column Grid: Left Column (Attendance & Simulator) | Right Column (Schedule & Assignments) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left 7 Columns: Attendance Tracking & Interactive Forecaster */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Card: Subject-Wise Attendance */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Subject-Wise Attendance
                  </h2>
                  <p className="text-xs text-slate-500">
                    Strict minimum 75% attendance mandatory for exam hall ticket eligibility
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Sem Average: {currentStudent.overallAttendance}%
                </span>
              </div>
            </div>

            {/* Attendance Progress Bars */}
            <div className="space-y-3.5">
              {attendanceList.map((sub) => {
                const isGood = sub.percentage >= 75;
                const SubjectIcon = getSubjectIcon(sub.subjectCode);
                return (
                  <div 
                    key={sub.subjectCode} 
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition-all space-y-2 bg-slate-50/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0">
                          <SubjectIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-slate-200/80 text-slate-800 rounded">
                              {sub.subjectCode}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {sub.subjectName}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-sm font-black font-mono ${isGood ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {sub.percentage}%
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isGood ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {isGood ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-rose-600" />}
                          {isGood ? 'Eligible' : 'Shortage'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-3 bg-slate-200/70 rounded-full overflow-hidden relative">
                      {/* 75% Cutoff Marker */}
                      <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-500 z-10" title="75% Cutoff Marker"></div>
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          sub.percentage >= 85 ? 'bg-emerald-500' :
                          sub.percentage >= 75 ? 'bg-blue-600' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(sub.percentage, 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-0.5">
                      <span>Attended: <strong className="text-slate-900 font-bold">{sub.attendedClasses}</strong> / {sub.totalClasses} classes</span>
                      <span className="text-slate-600 truncate">Prof. {sub.facultyName.split(' ')[1] || sub.facultyName}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Attendance Forecaster & Simulator Box */}
            <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <span>Attendance Simulator & Safe-Leave Forecaster</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Live Calculator
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select a subject to project future attendance and calculate how many classes you can safely miss or need to attend to stay eligible.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Select Subject</label>
                  <select
                    value={selectedSubjectCode}
                    onChange={(e) => {
                      setSelectedSubjectCode(e.target.value);
                      setSimulatedAttends(0);
                      setSimulatedMisses(0);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-xs shadow-xs"
                  >
                    {attendanceList.map(s => (
                      <option key={s.subjectCode} value={s.subjectCode}>
                        {s.subjectCode} - {s.subjectName} ({s.percentage}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Cutoff Threshold</label>
                  <select
                    value={targetAttendance}
                    onChange={(e) => setTargetAttendance(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-xs shadow-xs"
                  >
                    <option value={75}>75% (Minimum College Exam Cutoff)</option>
                    <option value={80}>80% (Safe Buffer)</option>
                    <option value={85}>85% (Scholarship & Distinction Target)</option>
                    <option value={90}>90% (Dean's Honor Roll)</option>
                  </select>
                </div>
              </div>

              {/* Simulation Interactive Buttons */}
              <div className="bg-white/80 rounded-xl p-3 border border-blue-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-700">Simulate Next Classes:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSimulatedAttends(prev => prev + 1)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+1 Attend ({simulatedAttends})</span>
                  </button>
                  <button
                    onClick={() => setSimulatedMisses(prev => prev + 1)}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <MinusCircle className="w-3.5 h-3.5" />
                    <span>+1 Miss ({simulatedMisses})</span>
                  </button>
                  {(simulatedAttends > 0 || simulatedMisses > 0) && (
                    <button
                      onClick={() => { setSimulatedAttends(0); setSimulatedMisses(0); }}
                      className="text-[11px] text-slate-500 hover:text-slate-800 underline px-1"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Simulation Result Output */}
              {selectedSubject && (
                <div className="bg-white rounded-xl p-4 border border-blue-200 text-xs space-y-2.5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between font-semibold text-slate-800 gap-2">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Status for <strong>{selectedSubject.subjectCode}</strong>:
                    </span>
                    <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                      Current: {selectedSubject.percentage}% ({selectedSubject.attendedClasses}/{selectedSubject.totalClasses})
                      {(simulatedAttends > 0 || simulatedMisses > 0) && (
                        <span className="ml-1 text-indigo-700">➜ Projected: {simResult.newPct}%</span>
                      )}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    {selectedSubject.percentage >= targetAttendance ? (
                      <div className="flex items-start gap-2.5 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                        <div>
                          <strong>Safe Attendance Standing:</strong> You can safely take leave for up to{' '}
                          <strong className="text-emerald-900 underline font-black">{simResult.classesCanMiss} upcoming class(es)</strong>{' '}
                          and still maintain your target {targetAttendance}% exam eligibility.
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 text-rose-800">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                        <div>
                          <strong>Attendance Shortage Alert:</strong> You must attend the next{' '}
                          <strong className="text-rose-900 underline font-black">{simResult.classesNeeded} consecutive class(es)</strong>{' '}
                          without absence to bring your attendance back to the mandatory {targetAttendance}% cutoff.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Card: Student Administrative & Digital Services */}
          <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Student Administrative Services</h3>
                <p className="text-[11px] text-slate-400">Official digital requests & academic records</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={onOpenLeaveModal}
                className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 flex flex-col justify-between text-xs font-medium text-slate-200 transition-colors text-left group"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <span className="font-bold text-white">Leave / OD Pass</span>
                <span className="text-[11px] text-slate-400">Submit medical or on-duty slip</span>
              </button>

              <button
                onClick={() => setActiveTab('faculty')}
                className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 flex flex-col justify-between text-xs font-medium text-slate-200 transition-colors text-left group"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <span className="font-bold text-white">Book Advisor</span>
                <span className="text-[11px] text-slate-400">Schedule cabin consultation</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className="p-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 flex flex-col justify-between text-xs font-medium text-slate-200 transition-colors text-left group"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <span className="font-bold text-white">Curriculum & Notes</span>
                <span className="text-[11px] text-slate-400">Download syllabus & question banks</span>
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 gap-1">
              <div>
                Academic Advisor: <strong className="text-white">{currentStudent.advisorName}</strong>
              </div>
              <div className="text-[11px] text-blue-400 font-mono">
                {currentStudent.advisorEmail}
              </div>
            </div>
          </section>
        </div>

        {/* Right 5 Columns: Today's Schedule & Assignments */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          
          {/* Card: Today's Class Schedule */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Today's Schedule (Monday)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Daily lectures, laboratory, and tutorial periods
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('timetable')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
              >
                <span>Full Week</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-3">
              {todaySchedule.map((slot, idx) => {
                if (slot.isBreak) {
                  return (
                    <div 
                      key={slot.id} 
                      className="py-2.5 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between"
                    >
                      <span className="font-semibold flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        {slot.subjectName}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-amber-700">
                        {slot.startTime} – {slot.endTime}
                      </span>
                    </div>
                  );
                }

                const SubjectIcon = getSubjectIcon(slot.subjectCode);
                const isNext = idx === 0; // Highlight first slot as upcoming

                return (
                  <div
                    key={slot.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isNext 
                        ? 'border-blue-400 bg-blue-50/40 shadow-xs' 
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isNext ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <span>P{slot.period}</span>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold font-mono px-1.5 py-0.5 rounded bg-blue-100/80 text-blue-800">
                            {slot.subjectCode}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {slot.subjectName}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            slot.type === 'Lab' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {slot.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{slot.facultyName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-slate-600 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <div className="font-bold text-slate-900 flex items-center gap-1 sm:justify-end">
                          <Clock className="w-3 h-3 text-blue-500" />
                          {slot.startTime} – {slot.endTime}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 sm:justify-end">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {slot.room}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Card: Upcoming Assignments & Lab Deadlines */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Assignments & Lab Submissions
                  </h2>
                  <p className="text-xs text-slate-500">
                    Track homework, lab records, code repositories
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Tabs with Badges */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs overflow-x-auto">
              {[
                { key: 'all', label: 'All', count: assignments.length },
                { key: 'pending', label: 'Pending', count: pendingCount },
                { key: 'submitted', label: 'Submitted', count: submittedCount },
                { key: 'graded', label: 'Graded', count: gradedCount },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setAssignmentFilter(tab.key as any)}
                  className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    assignmentFilter === tab.key
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    assignmentFilter === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Assignment List */}
            <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredAssignments.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <FileCheck2 className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  No assignments currently found under this filter.
                </div>
              ) : (
                filteredAssignments.map((asg) => (
                  <div
                    key={asg.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all space-y-2.5 bg-slate-50/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded">
                        {asg.subjectCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        asg.status === 'submitted' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        asg.status === 'graded' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                        asg.priority === 'high' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                        'bg-amber-100 text-amber-700 border border-amber-200'
                      }`}>
                        {asg.priority === 'high' && asg.status === 'pending' && <Flame className="w-3 h-3 text-rose-600" />}
                        {asg.status === 'pending' ? `Due ${asg.dueDate}` : asg.status.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {asg.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {asg.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/80">
                      <span className="font-mono text-[11px]">Max Marks: <strong>{asg.maxMarks}</strong></span>
                      {asg.grade && (
                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Score: {asg.grade}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-1 flex items-center justify-end gap-2">
                      {asg.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => onToggleAssignmentStatus(asg.id)}
                            className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            Mark Done
                          </button>
                          <button
                            onClick={() => onOpenSubmitModal(asg)}
                            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Submit Solution</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => onToggleAssignmentStatus(asg.id)}
                          className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                        >
                          Mark as Incomplete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

