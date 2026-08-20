import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  MapPin, 
  Clock, 
  GraduationCap, 
  Calendar, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Award, 
  Phone,
  MessageSquare
} from 'lucide-react';
import { FacultyMember } from '../types';
import { COLLEGE_DEPARTMENTS_LIST } from '../data/collegeData';

interface FacultySectionProps {
  facultyList: FacultyMember[];
  onOpenConsultationModal: (faculty: FacultyMember) => void;
  onOpenEmailModal: (faculty: FacultyMember) => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({
  facultyList,
  onOpenConsultationModal,
  onOpenEmailModal
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  const filteredFaculty = facultyList.filter((fac) => {
    const matchesDept = selectedDept === 'ALL' || fac.deptCode === selectedDept;
    const matchesSearch = 
      searchQuery.trim() === '' ||
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.subjectsTaught.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      fac.specialization.some(sp => sp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      fac.researchInterests.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              <span>Distinguished Academic Faculty Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Faculty Directory & Mentorship
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Connect with leading professors, research supervisors, and academic advisors for course consultation and project mentorship.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center min-w-[130px]">
            <span className="text-xs text-slate-400 font-medium">Faculty Members</span>
            <div className="text-2xl font-bold text-violet-400">{facultyList.length}</div>
            <span className="text-[10px] text-slate-500 font-mono">100% PhD / M.Tech</span>
          </div>
        </div>
      </section>

      {/* Search and Department Filter Toolbar */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by professor name, department, subjects handled (e.g. Machine Learning, Compiler), or research interest..."
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

        {/* Department Filter Pills */}
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
              All Departments ({facultyList.length})
            </button>
            {COLLEGE_DEPARTMENTS_LIST.map((dept) => {
              const count = facultyList.filter(f => f.deptCode === dept.code).length;
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
      </section>

      {/* Faculty Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredFaculty.length}</strong> faculty profiles</span>
          <span>Book office hours or email directly for student guidance</span>
        </div>

        {filteredFaculty.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No faculty members found</h3>
            <p className="text-xs text-slate-500">Try adjusting your search terms or department selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaculty.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Profile Bar */}
                  <div className="flex items-start gap-4">
                    <img
                      src={fac.avatarUrl}
                      alt={fac.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100 shadow-xs shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                          {fac.deptCode}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {fac.experienceYears}+ Yrs Exp
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {fac.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600">
                        {fac.designation}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {fac.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Subjects Taught */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Subjects Handled
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.subjectsTaught.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specializations & Research */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Research & Specialization
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                      {fac.researchInterests}
                    </p>
                  </div>

                  {/* Cabin & Office Hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-mono text-slate-700 truncate">{fac.cabin}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{fac.officeHours}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{fac.phoneExtension}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenEmailModal(fac)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => onOpenConsultationModal(fac)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
