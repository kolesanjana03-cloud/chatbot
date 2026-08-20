export type NavigationTab = 
  | 'home'
  | 'dashboard'
  | 'courses'
  | 'timetable'
  | 'faculty'
  | 'events'
  | 'contact';

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  registerNo: string;
  department: string;
  deptCode: string;
  semester: number;
  section: string;
  academicYear: string;
  cgpa: number;
  totalCreditsEarned: number;
  totalCreditsRequired: number;
  overallAttendance: number;
  advisorName: string;
  advisorEmail: string;
  email: string;
  avatarUrl: string;
  batch: string;
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  facultyName: string;
  minRequired: number;
  status: 'good' | 'warning' | 'critical';
}

export interface ClassScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  type: 'Theory' | 'Lab' | 'Tutorial' | 'Break' | 'Seminar';
  isBreak?: boolean;
}

export interface Assignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  submissionType: 'PDF Document' | 'Code Repository' | 'Project Report' | 'Presentation';
  grade?: string;
  submittedOn?: string;
}

export interface CourseModule {
  unitNumber: number;
  unitTitle: string;
  topics: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  deptCode: string;
  semester: number;
  credits: number;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  type: 'Core Theory' | 'Professional Elective' | 'Open Elective' | 'Laboratory' | 'Project Work';
  facultyInCharge: string;
  description: string;
  prerequisites: string[];
  modules: CourseModule[];
  textbooks: string[];
  referenceLinks?: { title: string; url: string }[];
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: string;
  deptCode: string;
  designation: string;
  qualification: string;
  experienceYears: number;
  specialization: string[];
  subjectsTaught: string[];
  email: string;
  phoneExtension: string;
  cabin: string;
  officeHours: string;
  avatarUrl: string;
  researchInterests: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Sports' | 'Career' | 'Conference';
  organizer: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  chiefGuestOrSpeaker?: string;
  registrationDeadline: string;
  entryFee: string;
  isRegistered?: boolean;
  capacity: number;
  enrolledCount: number;
  imageTheme: string;
}

export interface CampusNotice {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Examination' | 'Placement' | 'General' | 'Hostel';
  priority: 'urgent' | 'important' | 'regular';
  summary: string;
  issuedBy: string;
}

export interface ContactDepartment {
  name: string;
  head: string;
  email: string;
  phone: string;
  location: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionTab?: NavigationTab;
    query?: string;
  }[];
}
