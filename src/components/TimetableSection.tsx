import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User, 
  Download, 
  Printer, 
  CheckCircle2, 
  Share2, 
  Calendar, 
  Coffee, 
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ClassScheduleItem } from '../types';
import { SAMPLE_TIMETABLE, COLLEGE_DEPARTMENTS_LIST } from '../data/collegeData';

export const TimetableSection: React.FC = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedDept, setSelectedDept] = useState<string>('CSE');
  const [selectedSem, setSelectedSem] = useState<number>(6);
  const [selectedSec, setSelectedSec] = useState<string>('A');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentDaySchedule = SAMPLE_TIMETABLE[selectedDay] || [];

  const handleAction = (actionName: string) => {
    setToastMessage(`${actionName} successful! Your schedule is synchronized.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Academic Timetable & Schedule Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Weekly Class & Laboratory Schedule
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Spring Semester 2026 • Regular Working Hours 08:45 AM – 04:25 PM • 50-minute structured academic periods.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('Schedule Sync to Google Calendar')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Sync Calendar</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Timetable</span>
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)}>✕</button>
          </div>
        )}
      </section>

      {/* Control Bar: Class Filters & Day Selectors */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {COLLEGE_DEPARTMENTS_LIST.map(d => (
                <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Semester</label>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value={4}>Semester 4 (2nd Year)</option>
              <option value={6}>Semester 6 (3rd Year - Current)</option>
              <option value={8}>Semester 8 (4th Year)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Section / Classroom</label>
            <select
              value={selectedSec}
              onChange={(e) => setSelectedSec(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="A">Section A (Room 302, Turing Block)</option>
              <option value="B">Section B (Room 304, Turing Block)</option>
              <option value="C">Section C (Room 306, Ramanujan Block)</option>
            </select>
          </div>
        </div>

        {/* Day Selector Tabs & View Mode Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setViewMode('day');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected && viewMode === 'day'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs self-start sm:self-auto">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === 'day' ? 'bg-white text-blue-600 font-semibold shadow-xs' : 'text-slate-600'
              }`}
            >
              Day Detailed View
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                viewMode === 'week' ? 'bg-white text-blue-600 font-semibold shadow-xs' : 'text-slate-600'
              }`}
            >
              Full Week Matrix
            </button>
          </div>
        </div>
      </section>

      {/* Day Detailed View */}
      {viewMode === 'day' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Schedule for <strong className="text-slate-800">{selectedDay}</strong> • {selectedDept} Sem {selectedSem} (Sec {selectedSec})
            </span>
            <span className="font-mono">6 Academic Hours + 2 Recesses</span>
          </div>

          <div className="space-y-3">
            {currentDaySchedule.map((slot, index) => {
              if (slot.isBreak) {
                return (
                  <div
                    key={slot.id}
                    className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-900 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-200/60 text-amber-800 flex items-center justify-center font-bold text-base">
                        ☕
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-wide uppercase text-amber-800">
                          {slot.subjectName}
                        </div>
                        <div className="text-xs text-amber-700">
                          {slot.room} • {slot.facultyName}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-amber-900">
                      {slot.startTime} – {slot.endTime}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={slot.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Period Badge */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex flex-col items-center justify-center font-mono shrink-0">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Hour</span>
                      <span className="text-base font-bold leading-none">{slot.period}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200">
                          {slot.subjectCode}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">
                          {slot.subjectName}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          slot.type === 'Lab' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                          slot.type === 'Seminar' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {slot.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.facultyName}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-mono text-slate-700">{slot.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5 justify-end">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>{slot.startTime} – {slot.endTime}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Duration: 55 Minutes
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Full Week Matrix Grid View */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
          <div className="min-w-[760px] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">
                Full Week Matrix Grid (Mon - Fri)
              </h3>
              <span className="text-slate-500 font-mono">B.Tech CSE - 6th Semester (Sec A)</span>
            </div>

            <div className="space-y-3">
              {daysOfWeek.map((day) => {
                const daySlots = (SAMPLE_TIMETABLE[day] || []).filter(s => !s.isBreak);
                return (
                  <div key={day} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 w-24">
                        {day}
                      </span>
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        {daySlots.map((slot, i) => (
                          <div
                            key={slot.id}
                            className="bg-white p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 transition-colors text-left"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1 rounded">
                                {slot.subjectCode}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                P{slot.period}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-slate-800 truncate" title={slot.subjectName}>
                              {slot.subjectName}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate mt-0.5">
                              {slot.room}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
