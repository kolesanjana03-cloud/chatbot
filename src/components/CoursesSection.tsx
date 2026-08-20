import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  BookMarked,
  Filter,
  Sparkles
} from 'lucide-react';
import { Course } from '../types';
import { COLLEGE_DEPARTMENTS_LIST } from '../data/collegeData';

interface CoursesSectionProps {
  courses: Course[];
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ courses }) => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedSemester, setSelectedSemester] = useState<number | 'ALL'>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);
  const [syllabusModalCourse, setSyllabusModalCourse] = useState<Course | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesDept = selectedDept === 'ALL' || course.deptCode === selectedDept;
    const matchesSem = selectedSemester === 'ALL' || course.semester === selectedSemester;
    const matchesType = selectedType === 'ALL' || course.type === selectedType;
    const matchesSearch = 
      searchQuery.trim() === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.facultyInCharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.modules.some(m => m.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesDept && matchesSem && matchesType && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCourseId(expandedCourseId === id ? null : id);
  };

  const handleDownloadMaterials = (courseCode: string, type: string) => {
    setDownloadNotice(`Downloading ${courseCode} ${type} package... Ready!`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic Curriculum & Syllabus Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              BCA & Computer Applications Courses & Curriculum
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Outcome-Based Education (OBE) syllabus, unit-wise module structures, recommended textbooks, and downloadable study materials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center min-w-[120px]">
              <span className="text-xs text-slate-400 font-medium">Total Courses</span>
              <div className="text-2xl font-bold text-blue-400">{courses.length}</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center min-w-[120px]">
              <span className="text-xs text-slate-400 font-medium">Departments</span>
              <div className="text-2xl font-bold text-emerald-400">{COLLEGE_DEPARTMENTS_LIST.length}</div>
            </div>
          </div>
        </div>

        {/* Download notification toast */}
        {downloadNotice && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {downloadNotice}
            </span>
            <button onClick={() => setDownloadNotice(null)} className="text-emerald-300 hover:text-white">✕</button>
          </div>
        )}
      </section>

      {/* Filter and Search Toolbar */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course name, course code (e.g. CS601), professor, or syllabus topic..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Department Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter by Department
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDept('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDept === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Departments ({courses.length})
            </button>
            {COLLEGE_DEPARTMENTS_LIST.map((dept) => {
              const count = courses.filter(c => c.deptCode === dept.code).length;
              return (
                <button
                  key={dept.code}
                  onClick={() => setSelectedDept(dept.code)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedDept === dept.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {dept.code} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Semester & Type Secondary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Semesters (Sem 1 to Sem 8)</option>
              <option value={4}>Semester 4 (2nd Year)</option>
              <option value={6}>Semester 6 (3rd Year)</option>
              <option value={8}>Semester 8 (Final Year)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Course Category</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Categories (Theory, Labs, Electives)</option>
              <option value="Core Theory">Core Theory</option>
              <option value="Professional Elective">Professional Elective</option>
              <option value="Laboratory">Laboratory</option>
            </select>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredCourses.length}</strong> courses</span>
          <span>Click any course to expand detailed syllabus & topics</span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No courses match your filter criteria</h3>
            <p className="text-xs text-slate-500">Try resetting filters or searching with a different keyword.</p>
            <button
              onClick={() => {
                setSelectedDept('ALL');
                setSelectedSemester('ALL');
                setSelectedType('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;
            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isExpanded ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Course Main Bar */}
                <div
                  onClick={() => toggleExpand(course.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 border border-blue-200">
                      <span>{course.deptCode}</span>
                      <span className="text-[10px] text-blue-500">S{course.semester}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                          {course.code}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          {course.title}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          course.type === 'Core Theory' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          course.type === 'Laboratory' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {course.type}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span>Department: <strong className="text-slate-700">{course.department}</strong></span>
                        <span>•</span>
                        <span>Faculty in Charge: <strong className="text-slate-700">{course.facultyInCharge}</strong></span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600 font-mono">
                        {course.credits} Credits
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        L-T-P: {course.lectureHours}-{course.tutorialHours}-{course.practicalHours}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Course Modules & Syllabus */}
                {isExpanded && (
                  <div className="border-t border-slate-200 p-5 sm:p-6 bg-slate-50/50 space-y-6">
                    {/* Course Overview */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Course Description & Objectives
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                        {course.description}
                      </p>
                    </div>

                    {/* Prerequisites */}
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-slate-600">Prerequisites:</span>
                        {course.prerequisites.map((prereq, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-200/80 text-slate-700 rounded-md font-mono text-[11px]">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Unit-wise Modules */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                        <span>Unit-wise Syllabus Structure</span>
                        <span className="text-[11px] font-normal text-slate-400">5 Modular Units</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.modules.map((mod) => (
                          <div key={mod.unitNumber} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                                U{mod.unitNumber}
                              </span>
                              <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                {mod.unitTitle}
                              </h5>
                            </div>
                            <ul className="text-xs text-slate-600 space-y-1 pl-8 list-disc">
                              {mod.topics.map((t, idx) => (
                                <li key={idx} className="leading-tight">{t}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Textbooks */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-blue-600" />
                        <span>Prescribed Reference Textbooks</span>
                      </h4>
                      <ul className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                        {course.textbooks.map((tb, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="font-mono text-slate-400 font-bold">[{idx + 1}]</span>
                            <span>{tb}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Continuous Assessment (50 Marks) + End Sem Exam (50 Marks)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownloadMaterials(course.code, 'Question Bank')}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Question Bank</span>
                        </button>
                        <button
                          onClick={() => handleDownloadMaterials(course.code, 'Lecture Notes')}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Notes & Slides</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
