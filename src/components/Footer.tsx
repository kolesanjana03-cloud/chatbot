import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  Award, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { NavigationTab } from '../types';
import { COLLEGE_INFO, COLLEGE_DEPARTMENTS_LIST } from '../data/collegeData';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: College Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-0.5 shadow-md ring-2 ring-blue-400/30 overflow-hidden shrink-0">
                <img 
                  src={COLLEGE_INFO.logoUrl} 
                  alt="RLS College Of BCA Logo" 
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">
                  {COLLEGE_INFO.name}
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  Autonomous Institute • Estd. 1994
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to academic excellence, innovative software research, and holistic student career development in computer applications.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="px-2 py-1 rounded bg-blue-900/40 text-blue-300 border border-blue-800/80 font-semibold text-[11px]">
                NAAC 'A++' Grade
              </span>
              <span className="px-2 py-1 rounded bg-emerald-900/40 text-emerald-300 border border-emerald-800/80 font-semibold text-[11px]">
                NBA Accredited
              </span>
              <span className="px-2 py-1 rounded bg-indigo-900/40 text-indigo-300 border border-indigo-800/80 font-semibold text-[11px]">
                AICTE Approved
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Student Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-400 transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-blue-400 transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('courses')} className="hover:text-blue-400 transition-colors">
                  Courses & Syllabi
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('timetable')} className="hover:text-blue-400 transition-colors">
                  Class Timetable
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faculty')} className="hover:text-blue-400 transition-colors">
                  Faculty Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-blue-400 transition-colors">
                  Campus Events
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors">
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Departments */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Engineering Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {COLLEGE_DEPARTMENTS_LIST.map((dept) => (
                <li key={dept.code}>
                  <button 
                    onClick={() => handleNav('courses')}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{dept.name} ({dept.code})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Campus Helpdesk & Emergency */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Campus Contact & Helpdesk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.campusLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono text-slate-200">{COLLEGE_INFO.phone.split('/')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-mono text-slate-200">{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] text-rose-400 font-semibold">
                  24/7 Security & Medical Helpline:
                </div>
                <div className="font-mono text-xs text-white font-bold">
                  {COLLEGE_INFO.emergencyHelpline}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Micro-Row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COLLEGE_INFO.name}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Academic Regulations 2026</span>
            <span>•</span>
            <span>Student Code of Conduct</span>
            <span>•</span>
            <span>Grievance Cell</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
