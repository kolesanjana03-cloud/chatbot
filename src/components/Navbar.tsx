import React, { useState } from 'react';
import { 
  GraduationCap, 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  Users, 
  Sparkles, 
  PhoneCall, 
  Search, 
  Bell, 
  Menu, 
  X,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { NavigationTab, StudentProfile, CampusNotice } from '../types';
import { COLLEGE_INFO } from '../data/collegeData';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currentStudent: StudentProfile;
  studentsList: StudentProfile[];
  onSelectStudent: (student: StudentProfile) => void;
  notices: CampusNotice[];
  onOpenSearch: () => void;
  onOpenChatbot?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentStudent,
  studentsList,
  onSelectStudent,
  notices,
  onOpenSearch,
  onOpenChatbot
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [showNoticesDropdown, setShowNoticesDropdown] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'events', label: 'Events', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all shadow-lg shadow-black/10">
      {/* Top micro-bar for college accreditation & emergency contact */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-300 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              RLS College Of BCA • NAAC 'A++' Grade
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 font-normal">Autonomous Computer Studies Institution</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-slate-400">
              Campus Helpline: <strong className="text-white font-mono">{COLLEGE_INFO.phone.split('/')[0]}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-medium text-[11px]">Academic Portal Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Logo & College Identity - Adjusted for perfect placement on all screen sizes */}
          <button 
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0 min-w-max"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/30 group-hover:ring-blue-400/60 transition-all shrink-0 overflow-hidden">
              <img 
                src={COLLEGE_INFO.logoUrl} 
                alt="RLS College Of BCA Official Emblem Logo" 
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg lg:text-xl xl:text-2xl tracking-tight text-white group-hover:text-blue-200 transition-colors whitespace-nowrap">
                  RLS College <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-black">Of BCA</span>
                </span>
                <span className="hidden md:inline-flex px-1.5 py-0.5 text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded tracking-wider">
                  AUTONOMOUS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Student Academic Portal & Assistant</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/70 p-1.5 rounded-full border border-slate-700/60 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Assistant Quick Launcher */}
            {onOpenChatbot && (
              <button
                id="navbar-ai-bot-btn"
                onClick={onOpenChatbot}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-xs border border-blue-400/30 transition-all hover:scale-105 active:scale-95"
                title="Ask RLS College AI Assistant"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </button>
            )}

            {/* Search shortcut button */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-2 text-xs transition-colors"
              title="Search Courses, Faculty, Events (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden xl:inline text-slate-400">Search</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-slate-900 border border-slate-700 rounded text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="notifications-dropdown-btn"
                onClick={() => setShowNoticesDropdown(!showNoticesDropdown)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 relative transition-colors"
                title="Campus Circulars & Notices"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {notices.length}
                </span>
              </button>

              {showNoticesDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-4 text-slate-200 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      <h3 className="text-sm font-semibold text-white">Campus Circulars & Notices</h3>
                    </div>
                    <span className="text-[11px] text-slate-400">{notices.length} updates</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto mt-2 space-y-1">
                    {notices.map((notice) => (
                      <div key={notice.id} className="pt-2 pb-2 hover:bg-slate-800/40 p-2 rounded-lg transition-colors">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            notice.priority === 'urgent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                            notice.priority === 'important' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {notice.category}
                          </span>
                          <span className="text-[10px] text-slate-400">{notice.date}</span>
                        </div>
                        <h4 className="text-xs font-medium text-slate-100 hover:text-blue-300 line-clamp-2">
                          {notice.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                          {notice.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-center">
                    <button
                      onClick={() => {
                        setShowNoticesDropdown(false);
                        handleNavClick('home');
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      View all notice boards <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Student Profile Quick Switcher */}
            <div className="relative">
              <button
                id="student-profile-toggle-btn"
                onClick={() => setShowStudentMenu(!showStudentMenu)}
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 px-2.5 py-1.5 rounded-xl transition-all"
              >
                <img 
                  src={currentStudent.avatarUrl} 
                  alt={currentStudent.name} 
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/50" 
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                    {currentStudent.name}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {currentStudent.deptCode} • Sem {currentStudent.semester}
                  </div>
                </div>
              </button>

              {showStudentMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-3 text-slate-200">
                  <div className="px-2 py-1.5 border-b border-slate-800 mb-2">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Switch Student Profile
                    </p>
                    <p className="text-xs text-slate-300">
                      Select sample student to view tailored dashboard
                    </p>
                  </div>
                  <div className="space-y-1">
                    {studentsList.map((st) => (
                      <button
                        key={st.id}
                        id={`switch-student-${st.id}`}
                        onClick={() => {
                          onSelectStudent(st);
                          setShowStudentMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center gap-3 transition-colors ${
                          st.id === currentStudent.id
                            ? 'bg-blue-600/30 border border-blue-500/40 text-white'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <img 
                          src={st.avatarUrl} 
                          alt={st.name} 
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate flex items-center justify-between">
                            <span>{st.name}</span>
                            {st.id === currentStudent.id && (
                              <span className="text-[10px] bg-blue-500/30 text-blue-300 px-1.5 py-0.2 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {st.department}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            Roll: {st.rollNo} • CGPA {st.cgpa}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 px-2">
                    <button
                      onClick={() => {
                        setShowStudentMenu(false);
                        handleNavClick('dashboard');
                      }}
                      className="w-full text-center text-xs py-1 text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Go to Full Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30' 
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {onOpenChatbot && (
            <div className="pt-2">
              <button
                id="mobile-drawer-ai-bot-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChatbot();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md"
              >
                <Bot className="w-4 h-4" />
                <span>Open College AI Assistant</span>
              </button>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Student: <strong className="text-white">{currentStudent.name}</strong> ({currentStudent.deptCode})</span>
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-blue-400 font-medium hover:underline"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      )}
      {/* Mobile Bottom Quick-Navigation Bar (Sticky on small screens for easy one-hand usage) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'timetable', label: 'Schedule', icon: CalendarDays },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'faculty', label: 'Faculty', icon: Users },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-bottom-nav-${item.id}`}
                onClick={() => handleNavClick(item.id as NavigationTab)}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1.5 rounded-xl transition-all ${
                  isActive 
                    ? 'text-blue-400 font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-lg transition-transform ${isActive ? 'bg-blue-600/20 text-blue-400 scale-110' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
