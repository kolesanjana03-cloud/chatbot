import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ShieldAlert, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Bus, 
  Train, 
  Car,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { COLLEGE_INFO, CONTACT_DEPARTMENTS } from '../data/collegeData';

export const ContactSection: React.FC = () => {
  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    rollNo: '',
    userRole: 'Current Student',
    department: 'Computer Science & Engineering',
    category: 'Academic Query',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in your name, email address, and inquiry message.');
      return;
    }

    setFormError(null);
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      rollNo: '',
      userRole: 'Current Student',
      department: 'Computer Science & Engineering',
      category: 'Academic Query',
      subject: '',
      message: ''
    });
    setFormSubmitted(false);
  };

  const faqs = [
    {
      q: "What is the minimum attendance required to appear for End-Semester Exams?",
      a: "As per RLS College Autonomous Academic Regulations, every student must secure a minimum of 75% overall attendance and at least 75% in each individual theory and laboratory course. Students with 65%-74% attendance due to genuine medical reasons must produce certified medical proof for condonation approval from the Dean."
    },
    {
      q: "How can I obtain an official Bonafide Certificate or Transcript?",
      a: "Bonafide certificates can be requested through the Student Services desk in the Admin Block (Room S-101) or by submitting a ticket online via this portal. Transcripts are processed by the Controller of Examinations within 3-5 working days."
    },
    {
      q: "What are the central library working hours during exam months?",
      a: "The Central Digital Library operates 24/7 during continuous assessment tests and end-semester examination months. During regular semesters, it is open Monday through Saturday from 08:00 AM to 10:00 PM."
    },
    {
      q: "How does the college provide placement assistance & training?",
      a: "The Training & Placement Cell conducts 150+ hours of dedicated coding bootcamps, mock technical interviews, aptitude assessments, and soft skills training starting from the 4th semester for all eligible students."
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block shrink-0 p-1 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl shadow-lg ring-2 ring-blue-400/30">
              <img 
                src={COLLEGE_INFO.logoUrl} 
                alt="RLS College Of BCA Logo" 
                className="w-14 h-14 rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Campus Contact & Administrative Helpdesks</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Contact RLS College Of BCA
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                Get in touch with administrative offices, academic departments, examination controllers, and 24/7 student support.
              </p>
            </div>
          </div>

          <div className="bg-rose-950/60 border border-rose-800/80 rounded-2xl p-4 text-center min-w-[140px]">
            <span className="text-[11px] text-rose-300 font-bold uppercase tracking-wider">Emergency 24/7</span>
            <div className="text-sm font-bold text-white mt-1">{COLLEGE_INFO.emergencyHelpline.split(' ')[0]}</div>
            <span className="text-[10px] text-rose-300">Security & Health Desk</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Left (College Info & Helpdesks) | Right (Contact Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 Columns */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Campus Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span>Main Campus Coordinates</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block font-semibold">{COLLEGE_INFO.name}</strong>
                  <span>{COLLEGE_INFO.campusLocation}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span>General Enquiries</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-xs">
                    {COLLEGE_INFO.phone}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span>Central Email</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 text-xs">
                    {COLLEGE_INFO.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 text-xs">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Official Office Hours</strong>
                  <span className="text-slate-600">{COLLEGE_INFO.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Helpdesk Directory */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Departmental Offices & Helpdesks
            </h3>

            <div className="space-y-3">
              {CONTACT_DEPARTMENTS.map((dept, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{dept.name}</span>
                    <span className="text-blue-600 font-mono text-[11px] font-semibold">{dept.phone}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-0.5">
                    <span>Officer: <strong className="text-slate-700">{dept.head}</strong></span>
                    <span className="font-mono text-[11px]">{dept.email}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Location: {dept.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Interactive Contact Form & Transport */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Inquiry Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Student Inquiry & Grievance Desk</span>
              </h2>
              <p className="text-xs text-slate-500">
                Submit academic inquiries, examination questions, fee receipts, or hostel grievances.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-emerald-900">
                    Inquiry Submitted Successfully!
                  </h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Your request reference ticket has been logged (Ticket #RLS-2026-{Math.floor(1000 + Math.random() * 9000)}). The respective department advisor will respond to <strong className="text-emerald-900">{formData.email}</strong> within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex.johnson@student.rlscollege.edu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Roll / Register No (Optional)</label>
                    <input
                      type="text"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      placeholder="e.g. 21BCA084"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs font-medium"
                    >
                      <option value="Academic Query">Academic & Course Registration</option>
                      <option value="Attendance & Leave">Attendance & Medical Condonation</option>
                      <option value="Examination & Grade Cards">Examination & Grade Cards</option>
                      <option value="Training & Placements">Training & Placements</option>
                      <option value="Hostel & Transportation">Hostel & Transportation</option>
                      <option value="General Administration">General Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subject / Summary</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your query"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please provide complete details regarding your inquiry or request..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-xs"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry Ticket</span>
                </button>
              </form>
            )}
          </div>

          {/* Transportation & Getting to Campus */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bus className="w-4 h-4 text-blue-600" />
              <span>Campus Transit & Direction Guide</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Train className="w-4 h-4 text-indigo-600" />
                  <span>Metro Rail</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Cyber Tech Park Station (Line 3), 400m from Main Entrance Gate 1.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Bus className="w-4 h-4 text-emerald-600" />
                  <span>College Buses</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  32 Dedicated bus routes covering all major city zones & suburbs.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>Parking</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Multi-level secure 2-wheeler and 4-wheeler parking at Gate 3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Frequently Asked Questions (Student Guidelines)
            </h2>
            <p className="text-xs text-slate-500">
              Key college policies regarding attendance, examinations, and facilities
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-500 shrink-0 border border-slate-200">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
