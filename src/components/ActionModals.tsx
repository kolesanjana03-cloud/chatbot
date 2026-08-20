import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  User, 
  Ticket, 
  Sparkles, 
  AlertCircle, 
  Download, 
  Send,
  Search,
  BookOpen,
  Users,
  MapPin,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { 
  Assignment, 
  FacultyMember, 
  CollegeEvent, 
  CampusNotice, 
  StudentProfile, 
  Course,
  NavigationTab
} from '../types';
import { COLLEGE_INFO } from '../data/collegeData';

// ==========================================
// 1. Assignment Submit Modal
// ==========================================
interface AssignmentSubmitModalProps {
  assignment: Assignment | null;
  onClose: () => void;
  onSubmit: (assignmentId: string, repoUrl: string, notes: string) => void;
}

export const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  assignment,
  onClose,
  onSubmit
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(assignment.id, repoUrl, notes);
        onClose();
      }, 1500);
    }, 800);
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            {assignment.subjectCode} Submission
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {assignment.title}
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            Due: {assignment.dueDate} • Max Marks: {assignment.maxMarks}
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Assignment Solution Submitted!</h4>
            <p className="text-xs text-slate-500">Your file has been timestamped and sent for grading.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* File upload box */}
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-5 text-center bg-slate-50 cursor-pointer relative">
              <input
                type="file"
                onChange={handleSimulatedFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">
                {fileName ? fileName : "Click to select PDF report or drop file"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Accepted: .pdf, .zip, .docx (Max 25MB)
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Code Repository or Google Drive Link (Optional)
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your-username/assignment-repo"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Submission Remarks / Student Comments
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Brief notes on methodology or experimental results..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-xs"
              >
                {isSubmitting ? "Uploading..." : "Confirm Submission"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. Faculty Consultation Booking Modal
// ==========================================
interface ConsultationModalProps {
  faculty: FacultyMember | null;
  currentStudent: StudentProfile;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  faculty,
  currentStudent,
  onClose
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedSlot, setSelectedSlot] = useState('02:30 PM - 03:00 PM');
  const [purpose, setPurpose] = useState('Academic Doubts & Course Guidance');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!faculty) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <img
            src={faculty.avatarUrl}
            alt={faculty.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-100"
          />
          <div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
              {faculty.deptCode}
            </span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Book Office Hour Consultation
            </h3>
            <p className="text-xs text-slate-500">{faculty.name} • {faculty.cabin}</p>
          </div>
        </div>

        {isBooked ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Consultation Slot Confirmed!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Appointment scheduled for <strong>{selectedDate} ({selectedSlot})</strong> at <strong>{faculty.cabin}</strong>. A calendar invite has been sent to <strong>{currentStudent.email}</strong>.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Consultation Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-08-21"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Available Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                >
                  <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                  <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                  <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
                  <option value="03:30 PM - 04:00 PM">03:30 PM - 04:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consultation Purpose</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
              >
                <option value="Academic Doubts & Course Guidance">Academic Doubts & Course Guidance</option>
                <option value="Capstone Mini-Project Review">Capstone Mini-Project Review</option>
                <option value="Research Paper / Publication Guidance">Research Paper / Publication Guidance</option>
                <option value="Recommendation Letter (LOR) Discussion">Recommendation Letter (LOR) Discussion</option>
                <option value="General Academic Mentorship">General Academic Mentorship</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specific Discussion Topics</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention specific questions or modules you would like to discuss..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirm Appointment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 3. Faculty Email Modal
// ==========================================
interface FacultyEmailModalProps {
  faculty: FacultyMember | null;
  currentStudent: StudentProfile;
  onClose: () => void;
}

export const FacultyEmailModal: React.FC<FacultyEmailModalProps> = ({
  faculty,
  currentStudent,
  onClose
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!faculty) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            Send Official Message to {faculty.name}
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            To: {faculty.email} • From: {currentStudent.email}
          </p>
        </div>

        {sent ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Message Dispatched!</h4>
            <p className="text-xs text-slate-500">Your email has been queued in the faculty inbox with your student credentials.</p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 mt-2"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Query regarding Lab Assignment 3 or Project Review"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message Content</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Dear Professor, I am writing to discuss..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. Event Register Modal
// ==========================================
interface EventRegisterModalProps {
  event: CollegeEvent | null;
  currentStudent: StudentProfile;
  onClose: () => void;
  onConfirm: (eventId: string) => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
  event,
  currentStudent,
  onClose,
  onConfirm
}) => {
  const [registered, setRegistered] = useState(false);

  if (!event) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    onConfirm(event.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {registered ? (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Ticket className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Event Pass Issued!</h3>
              <p className="text-xs text-slate-600">
                You are registered for <strong>{event.title}</strong>
              </p>
            </div>

            {/* Digital Entry Pass Box */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-4 text-left space-y-3 font-mono text-xs border border-slate-800 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={COLLEGE_INFO.logoUrl} 
                    alt="RLS BCA" 
                    className="w-4 h-4 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] text-blue-400 uppercase font-bold">RLS Digital Pass</span>
                </div>
                <span className="text-[10px] text-slate-400">ID: RLS-PASS-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm font-sans truncate">{event.title}</div>
                <div className="text-slate-400 text-[11px] font-sans">{event.venue}</div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                <span>Student: {currentStudent.name}</span>
                <span className="text-emerald-400">Roll: {currentStudent.rollNo}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {event.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Confirm Registration: {event.title}
              </h3>
              <p className="text-xs text-slate-500">
                {event.date} • {event.time} • {event.venue}
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-slate-700">
              <div className="font-semibold text-slate-900">Registration Details:</div>
              <div>Student Name: <strong>{currentStudent.name}</strong></div>
              <div>Department: <strong>{currentStudent.department}</strong> ({currentStudent.rollNo})</div>
              <div>Registration Fee: <strong className="text-emerald-700">{event.entryFee}</strong></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Confirm Registration</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 5. Leave Application Modal
// ==========================================
interface LeaveApplicationModalProps {
  currentStudent: StudentProfile;
  onClose: () => void;
}

export const LeaveApplicationModal: React.FC<LeaveApplicationModalProps> = ({
  currentStudent,
  onClose
}) => {
  const [leaveType, setLeaveType] = useState('On-Duty (Technical Symposium / Hackathon)');
  const [startDate, setStartDate] = useState('2026-08-28');
  const [endDate, setEndDate] = useState('2026-08-29');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">
            Apply for On-Duty (OD) / Medical Leave
          </h3>
          <p className="text-xs text-slate-500">
            Approved leaves are credited towards attendance records upon Faculty Advisor validation.
          </p>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Leave Request Forwarded!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your OD application for <strong>{startDate} to {endDate}</strong> has been routed to your Faculty Advisor (<strong>{currentStudent.advisorName}</strong>) for digital signature.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500 mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Leave Category</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-medium"
              >
                <option value="On-Duty (Technical Symposium / Hackathon)">On-Duty (Technical Symposium / Hackathon)</option>
                <option value="On-Duty (Sports / Inter-Collegiate)">On-Duty (Sports / Inter-Collegiate)</option>
                <option value="On-Duty (Placement Drive / Internship Interview)">On-Duty (Placement Drive / Internship Interview)</option>
                <option value="Medical Leave (Certified by Doctor)">Medical Leave (Certified by Doctor)</option>
                <option value="Personal Leave / Emergency">Personal Leave / Emergency</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reason & Event Details *</label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Mention event name, organizing institution, or medical ailment..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900"
                required
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Leave Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 6. Notice Details Modal
// ==========================================
interface NoticeDetailsModalProps {
  notice: CampusNotice | null;
  onClose: () => void;
}

export const NoticeDetailsModal: React.FC<NoticeDetailsModalProps> = ({
  notice,
  onClose
}) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative space-y-5">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
              notice.priority === 'urgent' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {notice.category} • {notice.priority.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-mono">{notice.date}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {notice.title}
          </h3>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
          <p>{notice.summary}</p>
          <p className="text-slate-500 text-xs">
            All registered candidates and department heads are advised to take note of the above circular instructions. For further assistance, contact the respective administrative wing.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            <div className="font-bold text-slate-900">{notice.issuedBy}</div>
            <div className="text-[11px] text-slate-400">RLS College Of BCA</div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 7. Global Quick Search Modal (Ctrl+K)
// ==========================================
interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  faculty: FacultyMember[];
  events: CollegeEvent[];
  onSelectNav: (tab: NavigationTab) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  faculty,
  events,
  onSelectNav
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedCourses = courses.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase()) ||
    c.department.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.department.toLowerCase().includes(query.toLowerCase()) ||
    f.subjectsTaught.some(s => s.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 3);

  const matchedEvents = events.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.category.toLowerCase().includes(query.toLowerCase()) ||
    e.venue.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-0">
        {/* Search Input Bar */}
        <div className="relative p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, faculty, events, or timetable slots..."
            className="w-full text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[420px] overflow-y-auto space-y-5 text-xs">
          {query.trim() === '' ? (
            <div className="text-center py-6 text-slate-400 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl p-0.5 bg-gradient-to-br from-blue-600 to-indigo-800 shadow-md">
                <img 
                  src={COLLEGE_INFO.logoUrl} 
                  alt="RLS College Of BCA Logo" 
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-slate-600 font-medium text-xs">Search across RLS College Of BCA database...</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button onClick={() => { onSelectNav('courses'); onClose(); }} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700">Courses</button>
                <button onClick={() => { onSelectNav('timetable'); onClose(); }} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700">Timetable</button>
                <button onClick={() => { onSelectNav('faculty'); onClose(); }} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700">Faculty</button>
                <button onClick={() => { onSelectNav('events'); onClose(); }} className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700">Events</button>
              </div>
            </div>
          ) : (
            <>
              {/* Courses Matches */}
              {matchedCourses.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Courses ({matchedCourses.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCourses.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { onSelectNav('courses'); onClose(); }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-mono font-bold text-blue-700 mr-2">{c.code}</span>
                          <span className="font-semibold text-slate-800">{c.title}</span>
                          <span className="text-slate-500 text-[11px] block">{c.department}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty Matches */}
              {matchedFaculty.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-violet-600" />
                    <span>Faculty Members ({matchedFaculty.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedFaculty.map(f => (
                      <div
                        key={f.id}
                        onClick={() => { onSelectNav('faculty'); onClose(); }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50/30 cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={f.avatarUrl} alt={f.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <span className="font-semibold text-slate-800">{f.name}</span>
                            <span className="text-slate-500 text-[11px] block">{f.designation} • {f.department}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Matches */}
              {matchedEvents.length > 0 && (
                <div className="space-y-2">
                  <div className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    <span>Campus Events ({matchedEvents.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedEvents.map(e => (
                      <div
                        key={e.id}
                        onClick={() => { onSelectNav('events'); onClose(); }}
                        className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-slate-800">{e.title}</span>
                          <span className="text-slate-500 text-[11px] block">{e.date} • {e.venue}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedCourses.length === 0 && matchedFaculty.length === 0 && matchedEvents.length === 0 && (
                <div className="text-center py-6 text-slate-400">
                  No matching results for "{query}".
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
