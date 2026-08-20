import { 
  StudentProfile, 
  SubjectAttendance, 
  ClassScheduleItem, 
  Assignment, 
  Course, 
  FacultyMember, 
  CollegeEvent, 
  CampusNotice,
  ContactDepartment 
} from '../types';

import rlsCollegeLogo from '../assets/images/rls_bca_logo_1787220726835.jpg';

export const COLLEGE_INFO = {
  name: "RLS College Of BCA",
  tagline: "Autonomous Institution | Approved by AICTE & UGC | Accredited by NAAC with 'A++' Grade",
  logoUrl: rlsCollegeLogo,
  affiliation: "Affiliated to State University of Computer Studies",
  establishedYear: "1994",
  nirfRank: "Top BCA & Computer Applications Institute (NIRF 2025)",
  campusLocation: "RLS Knowledge Campus, Tech Innovation Boulevard, Sector 12, Metro Cyber City",
  phone: "+1 (800) 555-0199 / +1 (800) 555-0120",
  emergencyHelpline: "+1 (800) 555-HELP (24/7 Security & Health)",
  email: "helpdesk@rlscollege.edu",
  admissionsEmail: "admissions@rlscollege.edu",
  placementEmail: "placements@rlscollege.edu",
  workingHours: "Monday – Friday: 8:30 AM – 5:00 PM | Saturday: 9:00 AM – 1:00 PM"
};

export const SAMPLE_STUDENTS: StudentProfile[] = [
  {
    id: "std-01",
    name: "Alex Johnson",
    rollNo: "21BCA084",
    registerNo: "710021104084",
    department: "Bachelor of Computer Applications (BCA)",
    deptCode: "BCA",
    semester: 6,
    section: "A",
    academicYear: "2025 - 2026",
    cgpa: 8.92,
    totalCreditsEarned: 124,
    totalCreditsRequired: 160,
    overallAttendance: 88.5,
    advisorName: "Dr. Robert Vance",
    advisorEmail: "r.vance@rlscollege.edu",
    email: "alex.johnson@student.rlscollege.edu",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    batch: "2022 - 2026"
  },
  {
    id: "std-02",
    name: "Maya Patel",
    rollNo: "22BCA45",
    registerNo: "710022205045",
    department: "BCA (Data Analytics & AI)",
    deptCode: "BCA-AI",
    semester: 4,
    section: "B",
    academicYear: "2025 - 2026",
    cgpa: 9.15,
    totalCreditsEarned: 82,
    totalCreditsRequired: 160,
    overallAttendance: 92.0,
    advisorName: "Dr. Evelyn Reed",
    advisorEmail: "e.reed@rlscollege.edu",
    email: "maya.patel@student.rlscollege.edu",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    batch: "2023 - 2027"
  },
  {
    id: "std-03",
    name: "Rahul Sharma",
    rollNo: "21BCA032",
    registerNo: "710021106032",
    department: "BCA (Cloud & Cyber Security)",
    deptCode: "BCA-CS",
    semester: 6,
    section: "A",
    academicYear: "2025 - 2026",
    cgpa: 8.45,
    totalCreditsEarned: 120,
    totalCreditsRequired: 160,
    overallAttendance: 76.2,
    advisorName: "Prof. Kenneth Clark",
    advisorEmail: "k.clark@rlscollege.edu",
    email: "rahul.sharma@student.rlscollege.edu",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    batch: "2022 - 2026"
  }
];

export const SAMPLE_ATTENDANCE: Record<string, SubjectAttendance[]> = {
  "std-01": [
    {
      subjectCode: "CS601",
      subjectName: "Compiler Design & Construction",
      totalClasses: 42,
      attendedClasses: 38,
      percentage: 90.5,
      facultyName: "Dr. Alan Turing Wright",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Distributed Systems",
      totalClasses: 38,
      attendedClasses: 34,
      percentage: 89.4,
      facultyName: "Prof. Sarah Jenkins",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      totalClasses: 45,
      attendedClasses: 41,
      percentage: 91.1,
      facultyName: "Dr. Evelyn Reed",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      totalClasses: 36,
      attendedClasses: 29,
      percentage: 80.5,
      facultyName: "Dr. Marcus Thorne",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "CS605L",
      subjectName: "Cloud & Distributed Systems Lab",
      totalClasses: 18,
      attendedClasses: 17,
      percentage: 94.4,
      facultyName: "Prof. Sarah Jenkins",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "CS606L",
      subjectName: "Machine Learning Practical Lab",
      totalClasses: 18,
      attendedClasses: 15,
      percentage: 83.3,
      facultyName: "Dr. Evelyn Reed",
      minRequired: 75,
      status: "good"
    }
  ],
  "std-02": [
    {
      subjectCode: "AI401",
      subjectName: "Data Structures & Algorithm Optimization",
      totalClasses: 40,
      attendedClasses: 38,
      percentage: 95.0,
      facultyName: "Dr. Alan Turing Wright",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "AI402",
      subjectName: "Probability, Statistics & Linear Algebra",
      totalClasses: 35,
      attendedClasses: 32,
      percentage: 91.4,
      facultyName: "Dr. Samantha Rao",
      minRequired: 75,
      status: "good"
    },
    {
      subjectCode: "AI403",
      subjectName: "Database Management & Big Data",
      totalClasses: 38,
      attendedClasses: 34,
      percentage: 89.5,
      facultyName: "Prof. Vikram Sen",
      minRequired: 75,
      status: "good"
    }
  ],
  "std-03": [
    {
      subjectCode: "EC601",
      subjectName: "VLSI Design & Embedded Architecture",
      totalClasses: 40,
      attendedClasses: 31,
      percentage: 77.5,
      facultyName: "Prof. Kenneth Clark",
      minRequired: 75,
      status: "warning"
    },
    {
      subjectCode: "EC602",
      subjectName: "Digital Signal Processing",
      totalClasses: 36,
      attendedClasses: 27,
      percentage: 75.0,
      facultyName: "Dr. Priya Nair",
      minRequired: 75,
      status: "warning"
    },
    {
      subjectCode: "EC603",
      subjectName: "Wireless & 5G Communications",
      totalClasses: 34,
      attendedClasses: 26,
      percentage: 76.4,
      facultyName: "Dr. Robert Vance",
      minRequired: 75,
      status: "warning"
    }
  ]
};

export const SAMPLE_TIMETABLE: Record<string, ClassScheduleItem[]> = {
  "Monday": [
    {
      id: "tt-mon-1",
      day: "Monday",
      period: 1,
      startTime: "08:45 AM",
      endTime: "09:40 AM",
      subjectCode: "CS601",
      subjectName: "Compiler Design",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-mon-2",
      day: "Monday",
      period: 2,
      startTime: "09:40 AM",
      endTime: "10:35 AM",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Systems",
      facultyName: "Prof. Sarah Jenkins",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-mon-break1",
      day: "Monday",
      period: 0,
      startTime: "10:35 AM",
      endTime: "10:55 AM",
      subjectCode: "BREAK",
      subjectName: "Morning Tea & Refreshments",
      facultyName: "Campus Cafeteria",
      room: "Student Lounge / Cafe",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-mon-3",
      day: "Monday",
      period: 3,
      startTime: "10:55 AM",
      endTime: "11:50 AM",
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      facultyName: "Dr. Evelyn Reed",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-mon-4",
      day: "Monday",
      period: 4,
      startTime: "11:50 AM",
      endTime: "12:45 PM",
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      facultyName: "Dr. Marcus Thorne",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-mon-lunch",
      day: "Monday",
      period: 0,
      startTime: "12:45 PM",
      endTime: "01:35 PM",
      subjectCode: "LUNCH",
      subjectName: "Lunch Recess",
      facultyName: "Food Court",
      room: "Campus Dining Hub",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-mon-5",
      day: "Monday",
      period: 5,
      startTime: "01:35 PM",
      endTime: "03:25 PM",
      subjectCode: "CS606L",
      subjectName: "Machine Learning Practical Lab",
      facultyName: "Dr. Evelyn Reed & Lab TAs",
      room: "Lab 04 (GPU Cluster), Innovation Wing",
      type: "Lab"
    },
    {
      id: "tt-mon-6",
      day: "Monday",
      period: 6,
      startTime: "03:30 PM",
      endTime: "04:25 PM",
      subjectCode: "CS607T",
      subjectName: "Technical Aptitude & Career Seminar",
      facultyName: "Placement Training Cell",
      room: "Seminar Hall 2",
      type: "Seminar"
    }
  ],
  "Tuesday": [
    {
      id: "tt-tue-1",
      day: "Tuesday",
      period: 1,
      startTime: "08:45 AM",
      endTime: "09:40 AM",
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      facultyName: "Dr. Evelyn Reed",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-tue-2",
      day: "Tuesday",
      period: 2,
      startTime: "09:40 AM",
      endTime: "10:35 AM",
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      facultyName: "Dr. Marcus Thorne",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-tue-break1",
      day: "Tuesday",
      period: 0,
      startTime: "10:35 AM",
      endTime: "10:55 AM",
      subjectCode: "BREAK",
      subjectName: "Morning Tea & Refreshments",
      facultyName: "Campus Cafeteria",
      room: "Student Lounge / Cafe",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-tue-3",
      day: "Tuesday",
      period: 3,
      startTime: "10:55 AM",
      endTime: "11:50 AM",
      subjectCode: "CS601",
      subjectName: "Compiler Design",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-tue-4",
      day: "Tuesday",
      period: 4,
      startTime: "11:50 AM",
      endTime: "12:45 PM",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Systems",
      facultyName: "Prof. Sarah Jenkins",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-tue-lunch",
      day: "Tuesday",
      period: 0,
      startTime: "12:45 PM",
      endTime: "01:35 PM",
      subjectCode: "LUNCH",
      subjectName: "Lunch Recess",
      facultyName: "Food Court",
      room: "Campus Dining Hub",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-tue-5",
      day: "Tuesday",
      period: 5,
      startTime: "01:35 PM",
      endTime: "03:25 PM",
      subjectCode: "CS605L",
      subjectName: "Cloud & Distributed Systems Lab",
      facultyName: "Prof. Sarah Jenkins & Team",
      room: "Lab 02, Ramanujan Block",
      type: "Lab"
    },
    {
      id: "tt-tue-6",
      day: "Tuesday",
      period: 6,
      startTime: "03:30 PM",
      endTime: "04:25 PM",
      subjectCode: "CS-TUT",
      subjectName: "Algorithm Problem Solving Tutorial",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Tutorial"
    }
  ],
  "Wednesday": [
    {
      id: "tt-wed-1",
      day: "Wednesday",
      period: 1,
      startTime: "08:45 AM",
      endTime: "09:40 AM",
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      facultyName: "Dr. Marcus Thorne",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-wed-2",
      day: "Wednesday",
      period: 2,
      startTime: "09:40 AM",
      endTime: "10:35 AM",
      subjectCode: "CS601",
      subjectName: "Compiler Design",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-wed-break1",
      day: "Wednesday",
      period: 0,
      startTime: "10:35 AM",
      endTime: "10:55 AM",
      subjectCode: "BREAK",
      subjectName: "Morning Tea & Refreshments",
      facultyName: "Campus Cafeteria",
      room: "Student Lounge / Cafe",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-wed-3",
      day: "Wednesday",
      period: 3,
      startTime: "10:55 AM",
      endTime: "11:50 AM",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Systems",
      facultyName: "Prof. Sarah Jenkins",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-wed-4",
      day: "Wednesday",
      period: 4,
      startTime: "11:50 AM",
      endTime: "12:45 PM",
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      facultyName: "Dr. Evelyn Reed",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-wed-lunch",
      day: "Wednesday",
      period: 0,
      startTime: "12:45 PM",
      endTime: "01:35 PM",
      subjectCode: "LUNCH",
      subjectName: "Lunch Recess",
      facultyName: "Food Court",
      room: "Campus Dining Hub",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-wed-5",
      day: "Wednesday",
      period: 5,
      startTime: "01:35 PM",
      endTime: "03:25 PM",
      subjectCode: "PROJ601",
      subjectName: "Capstone Mini Project Phase-I",
      facultyName: "Faculty Project Review Board",
      room: "Project Incubation Lab 1",
      type: "Lab"
    },
    {
      id: "tt-wed-6",
      day: "Wednesday",
      period: 6,
      startTime: "03:30 PM",
      endTime: "04:25 PM",
      subjectCode: "LIB601",
      subjectName: "Digital Library & Research Hour",
      facultyName: "Chief Librarian",
      room: "Central Digital Library Level 2",
      type: "Tutorial"
    }
  ],
  "Thursday": [
    {
      id: "tt-thu-1",
      day: "Thursday",
      period: 1,
      startTime: "08:45 AM",
      endTime: "09:40 AM",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Systems",
      facultyName: "Prof. Sarah Jenkins",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-thu-2",
      day: "Thursday",
      period: 2,
      startTime: "09:40 AM",
      endTime: "10:35 AM",
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      facultyName: "Dr. Evelyn Reed",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-thu-break1",
      day: "Thursday",
      period: 0,
      startTime: "10:35 AM",
      endTime: "10:55 AM",
      subjectCode: "BREAK",
      subjectName: "Morning Tea & Refreshments",
      facultyName: "Campus Cafeteria",
      room: "Student Lounge / Cafe",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-thu-3",
      day: "Thursday",
      period: 3,
      startTime: "10:55 AM",
      endTime: "11:50 AM",
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      facultyName: "Dr. Marcus Thorne",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-thu-4",
      day: "Thursday",
      period: 4,
      startTime: "11:50 AM",
      endTime: "12:45 PM",
      subjectCode: "CS601",
      subjectName: "Compiler Design",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-thu-lunch",
      day: "Thursday",
      period: 0,
      startTime: "12:45 PM",
      endTime: "01:35 PM",
      subjectCode: "LUNCH",
      subjectName: "Lunch Recess",
      facultyName: "Food Court",
      room: "Campus Dining Hub",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-thu-5",
      day: "Thursday",
      period: 5,
      startTime: "01:35 PM",
      endTime: "02:30 PM",
      subjectCode: "OE601",
      subjectName: "Open Elective: Tech Entrepreneurship",
      facultyName: "Dr. Robert Vance",
      room: "Management Hall 104",
      type: "Theory"
    },
    {
      id: "tt-thu-6",
      day: "Thursday",
      period: 6,
      startTime: "02:35 PM",
      endTime: "04:25 PM",
      subjectCode: "CS608L",
      subjectName: "Network Security & Ethical Hacking Lab",
      facultyName: "Dr. Marcus Thorne",
      room: "Cyber Defense Lab 01",
      type: "Lab"
    }
  ],
  "Friday": [
    {
      id: "tt-fri-1",
      day: "Friday",
      period: 1,
      startTime: "08:45 AM",
      endTime: "09:40 AM",
      subjectCode: "CS601",
      subjectName: "Compiler Design & Construction",
      facultyName: "Dr. Alan Turing Wright",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-fri-2",
      day: "Friday",
      period: 2,
      startTime: "09:40 AM",
      endTime: "10:35 AM",
      subjectCode: "CS602",
      subjectName: "Cloud Computing & Systems",
      facultyName: "Prof. Sarah Jenkins",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-fri-break1",
      day: "Friday",
      period: 0,
      startTime: "10:35 AM",
      endTime: "10:55 AM",
      subjectCode: "BREAK",
      subjectName: "Morning Tea & Refreshments",
      facultyName: "Campus Cafeteria",
      room: "Student Lounge / Cafe",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-fri-3",
      day: "Friday",
      period: 3,
      startTime: "10:55 AM",
      endTime: "11:50 AM",
      subjectCode: "CS603",
      subjectName: "Machine Learning & Neural Networks",
      facultyName: "Dr. Evelyn Reed",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-fri-4",
      day: "Friday",
      period: 4,
      startTime: "11:50 AM",
      endTime: "12:45 PM",
      subjectCode: "CS604",
      subjectName: "Cryptography & Cyber Security",
      facultyName: "Dr. Marcus Thorne",
      room: "Room 302, Turing Block",
      type: "Theory"
    },
    {
      id: "tt-fri-lunch",
      day: "Friday",
      period: 0,
      startTime: "12:45 PM",
      endTime: "01:35 PM",
      subjectCode: "LUNCH",
      subjectName: "Lunch Recess",
      facultyName: "Food Court",
      room: "Campus Dining Hub",
      type: "Break",
      isBreak: true
    },
    {
      id: "tt-fri-5",
      day: "Friday",
      period: 5,
      startTime: "01:35 PM",
      endTime: "03:25 PM",
      subjectCode: "CLUB601",
      subjectName: "Student Club / Hackathon Mentorship Hour",
      facultyName: "Student Affairs & Club Leads",
      room: "Student Activity Center",
      type: "Seminar"
    },
    {
      id: "tt-fri-6",
      day: "Friday",
      period: 6,
      startTime: "03:30 PM",
      endTime: "04:25 PM",
      subjectCode: "MENT601",
      subjectName: "Faculty Mentoring & Counseling",
      facultyName: "Dr. Robert Vance (Advisor)",
      room: "Faculty Cabin 204",
      type: "Tutorial"
    }
  ]
};

export const SAMPLE_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-01",
    subjectCode: "CS603",
    subjectName: "Machine Learning & Neural Networks",
    title: "Convolutional Neural Network for Medical Image Classification",
    description: "Design and implement a PyTorch/TensorFlow CNN pipeline to classify pneumonia in chest X-ray scans with at least 89% validation accuracy. Submit source code, trained weights link, and 4-page IEEE formatted report.",
    assignedDate: "2026-08-12",
    dueDate: "2026-08-25",
    maxMarks: 50,
    status: "pending",
    priority: "high",
    submissionType: "Code Repository"
  },
  {
    id: "asg-02",
    subjectCode: "CS601",
    subjectName: "Compiler Design",
    title: "LALR(1) Syntax Analyzer & Symbol Table Generation",
    description: "Implement a Lex & Yacc parser for a subset of the C programming language that handles variable scope, arithmetic expressions, and syntax error recovery.",
    assignedDate: "2026-08-10",
    dueDate: "2026-08-28",
    maxMarks: 30,
    status: "pending",
    priority: "medium",
    submissionType: "PDF Document"
  },
  {
    id: "asg-03",
    subjectCode: "CS602",
    subjectName: "Cloud Computing & Distributed Systems",
    title: "Microservices Deployment with Docker & Kubernetes",
    description: "Containerize a multi-tier e-commerce backend, configure Kubernetes Deployment manifests with Ingress routing, auto-scaling, and rolling updates demonstration.",
    assignedDate: "2026-08-05",
    dueDate: "2026-08-22",
    maxMarks: 40,
    status: "submitted",
    priority: "high",
    submissionType: "Project Report",
    submittedOn: "2026-08-18",
    grade: "Pending Evaluation"
  },
  {
    id: "asg-04",
    subjectCode: "CS604",
    subjectName: "Cryptography & Cyber Security",
    title: "RSA Key Exchange & AES-256 Hybrid Encryption Protocol",
    description: "Build a socket-based encrypted chat program in Python implementing RSA-2048 key exchange combined with AES-GCM 256 for message confidentiality.",
    assignedDate: "2026-07-28",
    dueDate: "2026-08-14",
    maxMarks: 30,
    status: "graded",
    priority: "medium",
    submissionType: "PDF Document",
    submittedOn: "2026-08-12",
    grade: "28.5 / 30 (A+)"
  }
];

export const SAMPLE_COURSES: Course[] = [
  {
    id: "crs-cs601",
    code: "CS601",
    title: "Compiler Design & Construction",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    type: "Core Theory",
    facultyInCharge: "Dr. Alan Turing Wright",
    description: "In-depth study of the principles and practices of language translation, lexical analysis, syntax trees, semantic parsing, intermediate representation (3AC), runtime environments, and code optimization.",
    prerequisites: ["Formal Languages & Automata Theory (CS402)", "Data Structures & Algorithms (CS301)"],
    modules: [
      { unitNumber: 1, unitTitle: "Lexical Analysis & Regular Expressions", topics: ["Role of Lexical Analyzer", "Finite Automata", "Lex Specification", "Buffer Pairs"] },
      { unitNumber: 2, unitTitle: "Syntax Analysis & Parsing Techniques", topics: ["Context-Free Grammars", "LL(1) Top-down Parsing", "LR(0), SLR, LALR Bottom-up Parsing", "Yacc"] },
      { unitNumber: 3, unitTitle: "Syntax-Directed Translation & Type Checking", topics: ["Syntax-Directed Definitions", "Translation Schemes", "Type Systems", "Type Conversions"] },
      { unitNumber: 4, unitTitle: "Intermediate Code Generation & Runtime Storage", topics: ["Three-Address Code", "Quadruples & Triples", "Storage Allocation Strategies", "Activation Records"] },
      { unitNumber: 5, unitTitle: "Code Optimization & Target Code Generation", topics: ["Basic Blocks & Flow Graphs", "Peephole Optimization", "DAG Representation", "Register Allocation"] }
    ],
    textbooks: [
      "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman - Compilers: Principles, Techniques, and Tools (Dragon Book)",
      "Kenneth C. Louden - Compiler Construction: Principles and Practice"
    ]
  },
  {
    id: "crs-cs602",
    code: "CS602",
    title: "Cloud Computing & Distributed Systems",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    type: "Core Theory",
    facultyInCharge: "Prof. Sarah Jenkins",
    description: "Covers distributed system paradigms, virtualization, serverless architectures, cloud service models (IaaS, PaaS, SaaS), consensus algorithms (Raft/Paxos), and cloud-native microservices.",
    prerequisites: ["Computer Networks (CS503)", "Operating Systems (CS404)"],
    modules: [
      { unitNumber: 1, unitTitle: "Fundamentals of Distributed Systems", topics: ["System Models", "Networking & Interprocess Communication", "RPC & RMI", "Time and Global States"] },
      { unitNumber: 2, unitTitle: "Virtualization & Cloud Infrastructure", topics: ["Hypervisors (KVM, Xen)", "Containerization (Docker)", "Software-Defined Networking", "Cloud Storage"] },
      { unitNumber: 3, unitTitle: "Consensus & Distributed Coordination", topics: ["Mutual Exclusion", "Leader Election", "Paxos & Raft Consensus", "Fault Tolerance"] },
      { unitNumber: 4, unitTitle: "Cloud Architectures & Microservices", topics: ["Service-Oriented Architecture", "Kubernetes Orchestration", "API Gateways", "Serverless Computing"] },
      { unitNumber: 5, unitTitle: "Cloud Security, Governance & Cost Optimization", topics: ["Identity & Access Management (IAM)", "Data Encryption in Cloud", "FinOps", "Disaster Recovery"] }
    ],
    textbooks: [
      "George Coulouris, Jean Dollimore, Tim Kindberg - Distributed Systems: Concepts and Design",
      "Kai Hwang, Geoffrey C. Fox, Jack J. Dongarra - Distributed and Cloud Computing"
    ]
  },
  {
    id: "crs-cs603",
    code: "CS603",
    title: "Machine Learning & Neural Networks",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 2,
    type: "Core Theory",
    facultyInCharge: "Dr. Evelyn Reed",
    description: "Mathematical foundations and practical implementations of supervised learning, unsupervised clustering, ensemble models, deep feed-forward neural networks, CNNs, and recurrent networks.",
    prerequisites: ["Probability & Linear Algebra (MA302)", "Design & Analysis of Algorithms (CS401)"],
    modules: [
      { unitNumber: 1, unitTitle: "Foundations of Machine Learning", topics: ["Linear Regression", "Logistic Regression", "Gradient Descent Variants", "Bias-Variance Tradeoff"] },
      { unitNumber: 2, unitTitle: "Supervised Classification & Trees", topics: ["Support Vector Machines (SVM)", "Decision Trees & Random Forests", "XGBoost", "k-Nearest Neighbors"] },
      { unitNumber: 3, unitTitle: "Unsupervised Learning & Dimensionality Reduction", topics: ["K-Means & Hierarchical Clustering", "PCA", "t-SNE", "Gaussian Mixture Models"] },
      { unitNumber: 4, unitTitle: "Deep Neural Networks & Backpropagation", topics: ["Perceptrons & Multi-Layer Perceptrons", "Activation Functions", "Backpropagation Algorithm", "Regularization"] },
      { unitNumber: 5, unitTitle: "Deep Learning Architectures", topics: ["Convolutional Neural Networks (CNNs)", "Recurrent Networks (LSTMs)", "Transformers Overview", "Model Deployment"] }
    ],
    textbooks: [
      "Christopher M. Bishop - Pattern Recognition and Machine Learning",
      "Ian Goodfellow, Yoshua Bengio, Aaron Courville - Deep Learning (MIT Press)"
    ]
  },
  {
    id: "crs-cs604",
    code: "CS604",
    title: "Cryptography & Cyber Security",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    semester: 6,
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    type: "Core Theory",
    facultyInCharge: "Dr. Marcus Thorne",
    description: "Classical and modern cryptographic techniques, symmetric ciphers (DES/AES), asymmetric ciphers (RSA, ECC), cryptographic hash functions, digital signatures, PKI, and vulnerability assessments.",
    prerequisites: ["Discrete Mathematics (MA201)", "Computer Networks (CS503)"],
    modules: [
      { unitNumber: 1, unitTitle: "Classical Encryption & Mathematics of Cryptography", topics: ["Symmetric Cipher Model", "Substitution & Transposition Ciphers", "Modular Arithmetic", "Euclidean Algorithm"] },
      { unitNumber: 2, unitTitle: "Block Ciphers & Data Encryption Standard", topics: ["Feistel Cipher Structure", "DES & Triple DES", "Advanced Encryption Standard (AES)", "Modes of Operation"] },
      { unitNumber: 3, unitTitle: "Public-Key Cryptography & Key Management", topics: ["Principles of Public-Key Cryptosystems", "RSA Algorithm", "Diffie-Hellman Key Exchange", "Elliptic Curve Cryptography"] },
      { unitNumber: 4, unitTitle: "Cryptographic Hash Functions & Digital Signatures", topics: ["SHA-256 / SHA-3", "Message Authentication Codes (HMAC)", "Digital Signature Standard (DSS)", "X.509 Certificates"] },
      { unitNumber: 5, unitTitle: "Network Security & Threat Defense", topics: ["IPsec & TLS Protocols", "Firewalls & Intrusion Detection Systems", "Zero-Day Exploits", "Penetration Testing"] }
    ],
    textbooks: [
      "William Stallings - Cryptography and Network Security: Principles and Practice",
      "Bruce Schneier - Applied Cryptography: Protocols, Algorithms, and Source Code in C"
    ]
  },
  {
    id: "crs-ai401",
    code: "AI401",
    title: "Natural Language Processing & Generative AI",
    department: "Artificial Intelligence & Data Science",
    deptCode: "AI&DS",
    semester: 4,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    type: "Core Theory",
    facultyInCharge: "Dr. Samantha Rao",
    description: "Statistical language processing, vector semantics, sequence-to-sequence modeling, attention mechanisms, Transformer architectures (BERT, GPT), and Large Language Model fine-tuning techniques.",
    prerequisites: ["Python for Data Science (AI201)", "Linear Algebra (MA202)"],
    modules: [
      { unitNumber: 1, unitTitle: "Text Processing & Tokenization", topics: ["N-gram Models", "Byte-Pair Encoding", "TF-IDF", "Word2Vec & GloVe"] },
      { unitNumber: 2, unitTitle: "Sequence Modeling with RNNs", topics: ["Recurrent Neural Networks", "LSTM & GRU cells", "Named Entity Recognition (NER)", "Part-of-Speech Tagging"] },
      { unitNumber: 3, unitTitle: "Attention & The Transformer Architecture", topics: ["Self-Attention Mechanism", "Multi-Head Attention", "Positional Encoding", "Encoder-Decoder Framework"] },
      { unitNumber: 4, unitTitle: "Pretrained Language Models", topics: ["BERT & Masked LM", "GPT Family & Autoregressive Models", "T5 & BART", "Prompt Engineering"] },
      { unitNumber: 5, unitTitle: "Retrieval-Augmented Generation & Alignment", topics: ["Vector Databases & Embeddings", "RAG Pipelines", "RLHF Alignment", "Evaluation Metrics (BLEU, ROUGE)"] }
    ],
    textbooks: [
      "Dan Jurafsky and James H. Martin - Speech and Language Processing",
      "Lewis Tunstall, Leandro von Werra, Thomas Wolf - Natural Language Processing with Transformers"
    ]
  },
  {
    id: "crs-ec601",
    code: "EC601",
    title: "VLSI Design & Embedded Architecture",
    department: "Electronics & Communication Engineering",
    deptCode: "ECE",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    type: "Core Theory",
    facultyInCharge: "Prof. Kenneth Clark",
    description: "CMOS logic circuit design, stick diagrams, propagation delay analysis, FPGA synthesis, Verilog HDL modeling, ARM Cortex processor architecture, and low-power ASIC design.",
    prerequisites: ["Digital Electronics (EC302)", "Microprocessors & Microcontrollers (EC403)"],
    modules: [
      { unitNumber: 1, unitTitle: "MOS Transistor Principles & CMOS Inverter", topics: ["NMOS & PMOS Operations", "Threshold Voltage", "CMOS Inverter DC Characteristics", "Parasitic Capacitances"] },
      { unitNumber: 2, unitTitle: "Combinational & Sequential MOS Logic", topics: ["Static CMOS Logic", "Transmission Gates", "Dynamic Logic & Domino Logic", "Flip-Flops & Latches"] },
      { unitNumber: 3, unitTitle: "Verilog Hardware Description Language", topics: ["Behavioral & Structural Modeling", "Testbench Design", "Finite State Machines in Verilog", "Synthesis on FPGA"] },
      { unitNumber: 4, unitTitle: "Embedded Processor Architectures", topics: ["ARM Cortex-M Core", "Bus Architectures (AMBA, APB)", "Interrupt Handling", "Memory Management"] },
      { unitNumber: 5, unitTitle: "Design for Testability & Low Power VLSI", topics: ["Fault Models", "Scan Path Testing & BIST", "Clock Gating & Power Gating", "Physical Layout Rules"] }
    ],
    textbooks: [
      "Neil H.E. Weste, David Money Harris - CMOS VLSI Design: A Circuits and Systems Perspective",
      "Samir Palnitkar - Verilog HDL: A Guide to Digital Design and Synthesis"
    ]
  },
  {
    id: "crs-me601",
    code: "ME601",
    title: "Thermodynamics & Heat Transfer",
    department: "Mechanical Engineering",
    deptCode: "MECH",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    type: "Core Theory",
    facultyInCharge: "Dr. Vikram Sen",
    description: "First and Second Laws of Thermodynamics, entropy generation, conduction, convection, radiation heat transfer, heat exchangers, and refrigeration systems.",
    prerequisites: ["Engineering Physics (PH101)", "Fluid Mechanics (ME402)"],
    modules: [
      { unitNumber: 1, unitTitle: "Laws of Thermodynamics & Cycles", topics: ["Closed & Open Systems", "Carnot Cycle", "Rankine & Brayton Cycles", "Exergy Analysis"] },
      { unitNumber: 2, unitTitle: "Steady & Transient Conduction", topics: ["Fourier's Law", "Conduction in Cylinders & Spheres", "Extended Surfaces (Fins)", "Lumped Capacitance Method"] },
      { unitNumber: 3, unitTitle: "Forced & Natural Convection", topics: ["Boundary Layer Theory", "Dimensionless Numbers (Re, Pr, Nu, Gr)", "Flow Over Plates & Inside Tubes", "Empirical Correlations"] },
      { unitNumber: 4, unitTitle: "Radiation Heat Transfer", topics: ["Blackbody Radiation", "Planck's & Stefan-Boltzmann Laws", "View Factors", "Radiation Shields"] },
      { unitNumber: 5, unitTitle: "Heat Exchangers & Refrigeration", topics: ["LMTD Method", "NTU-Effectiveness Method", "Vapor Compression Refrigeration", "Eco-friendly Refrigerants"] }
    ],
    textbooks: [
      "Yunus A. Cengel, Michael A. Boles - Thermodynamics: An Engineering Approach",
      "Frank P. Incropera, David P. DeWitt - Fundamentals of Heat and Mass Transfer"
    ]
  },
  {
    id: "crs-cv601",
    code: "CV601",
    title: "Structural Analysis & Reinforced Concrete",
    department: "Civil Engineering",
    deptCode: "CIVIL",
    semester: 6,
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    type: "Core Theory",
    facultyInCharge: "Dr. Arvind Kulkarni",
    description: "Analysis of indeterminate beams and frames, moment distribution method, matrix stiffness approach, limit state design of reinforced concrete beams, columns, slabs, and footings.",
    prerequisites: ["Strength of Materials (CV302)", "Engineering Mechanics (CV201)"],
    modules: [
      { unitNumber: 1, unitTitle: "Indeterminate Structure Analysis", topics: ["Degree of Indeterminacy", "Slope Deflection Method", "Moment Distribution Method", "Portal Frames"] },
      { unitNumber: 2, unitTitle: "Matrix Flexibility & Stiffness Methods", topics: ["Element Stiffness Matrix", "Global Transformation", "Direct Stiffness Method", "Computer Implementation"] },
      { unitNumber: 3, unitTitle: "Limit State Design of Beams", topics: ["Singly & Doubly Reinforced Beams", "Flanged Beams (T & L Beams)", "Shear, Torsion & Bond Stress", "Serviceability Limits"] },
      { unitNumber: 4, unitTitle: "Design of Slabs & Staircases", topics: ["One-way & Two-way Slabs", "Restrained & Unrestrained Slabs", "Doglegged Staircase Design", "Deflection Checks"] },
      { unitNumber: 5, unitTitle: "Design of Columns & Footings", topics: ["Axially Loaded Short Columns", "Uniaxial & Biaxial Bending", "Isolated Square & Rectangular Footings", "Soil Bearing Stress"] }
    ],
    textbooks: [
      "S. Ramamrutham - Theory of Structures",
      "P.C. Varghese - Limit State Design of Reinforced Concrete"
    ]
  }
];

export const SAMPLE_FACULTY: FacultyMember[] = [
  {
    id: "fac-01",
    name: "Dr. Alan Turing Wright",
    title: "Ph.D., M.Tech (IIT Madras), Senior IEEE Member",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    designation: "Professor & Head of Department",
    qualification: "Ph.D. in High-Performance Compilers",
    experienceYears: 19,
    specialization: ["Compiler Optimization", "Parallel Algorithms", "System Architecture"],
    subjectsTaught: ["Compiler Design (CS601)", "Theory of Computation (CS402)", "Advanced System Programming"],
    email: "a.wright@rlscollege.edu",
    phoneExtension: "Ext. 4101",
    cabin: "Cabin CS-301, 3rd Floor, Turing Block",
    officeHours: "Monday & Wednesday: 02:30 PM - 04:30 PM",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Automated Program Synthesis, GPU-accelerated code generation, LLVM compiler frameworks."
  },
  {
    id: "fac-02",
    name: "Dr. Evelyn Reed",
    title: "Ph.D. (Stanford University), M.S. (Carnegie Mellon)",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    designation: "Professor & Director of AI Research Lab",
    qualification: "Ph.D. in Computer Vision & Neural Architectures",
    experienceYears: 14,
    specialization: ["Deep Learning", "Generative AI", "Medical Image Diagnostics"],
    subjectsTaught: ["Machine Learning & Neural Networks (CS603)", "Computer Vision (CS702)", "Deep Learning Systems"],
    email: "e.reed@rlscollege.edu",
    phoneExtension: "Ext. 4104",
    cabin: "Cabin CS-308, AI Innovation Wing",
    officeHours: "Tuesday & Thursday: 10:00 AM - 12:00 PM",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Diffusion models, Self-supervised representation learning, Multimodal medical imaging."
  },
  {
    id: "fac-03",
    name: "Prof. Sarah Jenkins",
    title: "M.Tech (IISc Bangalore), Certified AWS Solutions Architect",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    designation: "Associate Professor",
    qualification: "Ph.D. Candidate (Distributed Systems)",
    experienceYears: 11,
    specialization: ["Cloud Computing", "Kubernetes Orchestration", "Microservices"],
    subjectsTaught: ["Cloud Computing & Distributed Systems (CS602)", "Computer Networks (CS503)", "DevOps Engineering"],
    email: "s.jenkins@rlscollege.edu",
    phoneExtension: "Ext. 4112",
    cabin: "Cabin CS-205, 2nd Floor, Turing Block",
    officeHours: "Wednesday & Friday: 03:00 PM - 04:30 PM",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Edge-Cloud Continuum, Serverless cost modeling, Zero-downtime distributed consensus."
  },
  {
    id: "fac-04",
    name: "Dr. Marcus Thorne",
    title: "Ph.D. (Purdue University), CISSP, CEH",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    designation: "Associate Professor & Chief Information Security Advisor",
    qualification: "Ph.D. in Applied Cryptography & Zero-Trust Networks",
    experienceYears: 13,
    specialization: ["Cyber Security", "Quantum-Resistant Cryptography", "Ethical Hacking"],
    subjectsTaught: ["Cryptography & Cyber Security (CS604)", "Blockchain Architecture (CS705)", "Network Security Lab"],
    email: "m.thorne@rlscollege.edu",
    phoneExtension: "Ext. 4109",
    cabin: "Cabin CS-214, Cyber Security Lab Hub",
    officeHours: "Monday & Thursday: 11:00 AM - 01:00 PM",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Lattice-based Post-Quantum cryptography, Secure multi-party computation, Threat hunting AI."
  },
  {
    id: "fac-05",
    name: "Dr. Samantha Rao",
    title: "Ph.D. (IIT Bombay), Senior ACM Member",
    department: "Artificial Intelligence & Data Science",
    deptCode: "AI&DS",
    designation: "Professor & Head of AI&DS",
    qualification: "Ph.D. in Natural Language Understanding",
    experienceYears: 16,
    specialization: ["NLP", "Conversational AI", "Big Data Analytics"],
    subjectsTaught: ["Natural Language Processing (AI401)", "Big Data Technologies (AI502)", "Data Mining & Warehousing"],
    email: "s.rao@rlscollege.edu",
    phoneExtension: "Ext. 4201",
    cabin: "Cabin AI-101, Data Science Center",
    officeHours: "Tuesday & Friday: 02:00 PM - 04:00 PM",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Multilingual low-resource Transformers, Sentiment intelligence, Hallucination mitigation in LLMs."
  },
  {
    id: "fac-06",
    name: "Prof. Kenneth Clark",
    title: "M.Tech (NIT Trichy), IEEE VLSI Society Fellow",
    department: "Electronics & Communication Engineering",
    deptCode: "ECE",
    designation: "Professor & HoD of ECE",
    qualification: "Ph.D. in Low-Power ASIC Architectures",
    experienceYears: 22,
    specialization: ["VLSI Design", "Embedded Systems", "FPGA Accelerator Design"],
    subjectsTaught: ["VLSI Design (EC601)", "Digital System Design (EC302)", "Microcontrollers (EC403)"],
    email: "k.clark@rlscollege.edu",
    phoneExtension: "Ext. 4301",
    cabin: "Cabin EC-201, Raman Block",
    officeHours: "Monday & Wednesday: 10:30 AM - 12:30 PM",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Near-threshold voltage computing, RISC-V customized processor cores, Neuromorphic chips."
  },
  {
    id: "fac-07",
    name: "Dr. Robert Vance",
    title: "Ph.D., MBA, Dean of Student Affairs",
    department: "Computer Science & Engineering",
    deptCode: "CSE",
    designation: "Dean & Professor",
    qualification: "Ph.D. in Information Systems & Enterprise Strategy",
    experienceYears: 25,
    specialization: ["Tech Entrepreneurship", "Software Project Engineering", "Engineering Ethics"],
    subjectsTaught: ["Tech Entrepreneurship (OE601)", "Software Engineering Management"],
    email: "r.vance@rlscollege.edu",
    phoneExtension: "Ext. 4005",
    cabin: "Dean's Secretariat, Administrative Central Block",
    officeHours: "Monday to Friday: 03:00 PM - 05:00 PM",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Higher education analytics, Incubator ecosystems, Venture financing models."
  },
  {
    id: "fac-08",
    name: "Dr. Vikram Sen",
    title: "Ph.D. (IIT Delhi), Fellow of ASME",
    department: "Mechanical Engineering",
    deptCode: "MECH",
    designation: "Professor & Head of Mechanical Engineering",
    qualification: "Ph.D. in Computational Fluid Dynamics & Heat Exchangers",
    experienceYears: 20,
    specialization: ["Thermal Engineering", "Renewable Energy Systems", "Robotics & Mechatronics"],
    subjectsTaught: ["Thermodynamics & Heat Transfer (ME601)", "Fluid Power Control"],
    email: "v.sen@rlscollege.edu",
    phoneExtension: "Ext. 4401",
    cabin: "Cabin ME-102, Newton Mechanical Labs",
    officeHours: "Tuesday & Thursday: 01:30 PM - 03:30 PM",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    researchInterests: "Phase-change thermal storage materials, Solar thermal desalination, Drone aerodynamics."
  }
];

export const SAMPLE_EVENTS: CollegeEvent[] = [
  {
    id: "evt-01",
    title: "TechnoVision 2026: 36-Hour National Hackathon",
    category: "Technical",
    organizer: "RLS Innovation & Coding Society in partnership with Google Developer Student Clubs",
    date: "September 12 - 14, 2026",
    time: "09:00 AM Onwards",
    venue: "Main Computing Hub & Indoor Sports Arena",
    description: "Flagship national 36-hour hackathon bringing together over 600 coders across AI, Web3, Cloud Tech, and Mobile Apps. Prizes worth $15,000 + Incubation mentorship.",
    chiefGuestOrSpeaker: "Sundar Rajan (VP of Engineering, Cloud AI) & Venture Partner Investors",
    registrationDeadline: "September 05, 2026",
    entryFee: "Free for RLS College Students / $20 for External Teams",
    isRegistered: true,
    capacity: 650,
    enrolledCount: 520,
    imageTheme: "hackathon"
  },
  {
    id: "evt-02",
    title: "International Symposium on Next-Gen Generative AI & Robotics",
    category: "Conference",
    organizer: "Department of Computer Applications & AI",
    date: "August 29, 2026",
    time: "10:00 AM - 05:00 PM",
    venue: "Sir C.V. Raman Grand Auditorium",
    description: "Keynote talks, paper presentations, and live AI model demonstrations by international researchers from MIT, Stanford, and DeepMind.",
    chiefGuestOrSpeaker: "Dr. Elena Rostova (Director of AI, Zurich Tech)",
    registrationDeadline: "August 26, 2026",
    entryFee: "Complimentary (Academic Pass)",
    isRegistered: false,
    capacity: 800,
    enrolledCount: 680,
    imageTheme: "ai-symposium"
  },
  {
    id: "evt-03",
    title: "CAMPUS DRIVE 2026: Microsoft & Amazon Placement Prep Workshop",
    category: "Career",
    organizer: "Center for Corporate Relations & Placement Cell",
    date: "August 24, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "Seminar Hall 1 & Online Stream",
    description: "Intensive coding interview breakdown, system design case studies, behavioral STAR method preparation, and mock 1-on-1 rounds with alumni engineers.",
    chiefGuestOrSpeaker: "RLS Alumni Council Members working at Tier-1 Tech Giants",
    registrationDeadline: "August 23, 2026",
    entryFee: "Free for Pre-final & Final Year Students",
    isRegistered: true,
    capacity: 400,
    enrolledCount: 388,
    imageTheme: "placement"
  },
  {
    id: "evt-04",
    title: "RHYTHM 2026: Annual Inter-College Cultural Fest",
    category: "Cultural",
    organizer: "Student Activity Council & Cultural Guild",
    date: "October 08 - 10, 2026",
    time: "04:30 PM - 10:30 PM Daily",
    venue: "Central Open-Air Amphitheatre",
    description: "3 days of electrifying concerts, battle of the bands, choreography showcases, street plays, gaming arena, and food carnival with celebrity musical performances.",
    chiefGuestOrSpeaker: "Renowned Fusion Music Band & Celebrity Guest Performers",
    registrationDeadline: "October 01, 2026",
    entryFee: "Student ID Card Required for Free Access",
    isRegistered: false,
    capacity: 3500,
    enrolledCount: 2450,
    imageTheme: "cultural"
  },
  {
    id: "evt-05",
    title: "Hands-on Workshop: Quantum Computing with Qiskit",
    category: "Workshop",
    organizer: "IEEE Student Branch & Quantum Tech Circle",
    date: "September 02, 2026",
    time: "01:30 PM - 05:30 PM",
    venue: "Lab 05, Advanced Research Wing",
    description: "Hands-on implementation of quantum superposition, entanglement, Grover's search algorithm, and executing quantum circuits on real cloud quantum processors.",
    chiefGuestOrSpeaker: "Dr. Arvind Kulkarni & IBM Quantum Ambassador",
    registrationDeadline: "August 30, 2026",
    entryFee: "$5 (Kit & Certificate included)",
    isRegistered: false,
    capacity: 60,
    enrolledCount: 54,
    imageTheme: "quantum"
  },
  {
    id: "evt-06",
    title: "Annual Inter-Department Sports Olympiad 2026",
    category: "Sports",
    organizer: "Department of Physical Education & Sports Board",
    date: "September 18 - 20, 2026",
    time: "07:00 AM - 06:00 PM",
    venue: "College Sports Complex (Football Turf, Basketball Courts, Athletics Track)",
    description: "Intense sports rivalry across Football, Cricket, Basketball, Badminton, Table Tennis, Chess, and 4x100m Relay races with Championship Trophy.",
    chiefGuestOrSpeaker: "National Athletics Gold Medalist",
    registrationDeadline: "September 10, 2026",
    entryFee: "Free for registered team players",
    isRegistered: false,
    capacity: 1200,
    enrolledCount: 940,
    imageTheme: "sports"
  }
];

export const SAMPLE_NOTICES: CampusNotice[] = [
  {
    id: "ntc-01",
    title: "End-Semester Examination Schedule for Even Semesters (April-May 2026)",
    date: "August 19, 2026",
    category: "Examination",
    priority: "urgent",
    summary: "The Controller of Examinations has published the revised timetable for BCA Semesters 2, 4, and 6. Hall tickets will be downloadable via the student portal from August 28.",
    issuedBy: "Office of the Controller of Examinations"
  },
  {
    id: "ntc-02",
    title: "NVIDIA High-Performance AI GPU Cluster Access for Final Year Projects",
    date: "August 18, 2026",
    category: "Academic",
    priority: "important",
    summary: "Students undertaking deep learning, cloud apps, and generative AI capstone projects can now request dedicated compute quota on the newly commissioned GPU cluster.",
    issuedBy: "Dean of Academic Research & Innovation"
  },
  {
    id: "ntc-03",
    title: "Campus Recruitment Drive: Tier-1 Technology Cohort Registration",
    date: "August 16, 2026",
    category: "Placement",
    priority: "important",
    summary: "Eligibility criteria, coding assessment links, and resume submission deadlines for the upcoming Autumn 2026 on-campus placement season have been released.",
    issuedBy: "Center for Corporate Relations"
  },
  {
    id: "ntc-04",
    title: "Scholarship & Merit-cum-Means Financial Assistance Applications Open",
    date: "August 14, 2026",
    category: "General",
    priority: "regular",
    summary: "Eligible meritorious students can apply for the Alumni Endowment Trust scholarship before September 15 with income certificates and grade sheets.",
    issuedBy: "Office of Student Welfare & Financial Aid"
  }
];

export const CONTACT_DEPARTMENTS: ContactDepartment[] = [
  {
    name: "Admissions & New Enrollment Office",
    head: "Prof. Arthur Pendelton",
    email: "admissions@rlscollege.edu",
    phone: "+1 (800) 555-0111",
    location: "Admin Block, Ground Floor, Room G-02"
  },
  {
    name: "Controller of Examinations & Registrar",
    head: "Dr. M. Krishnamoorthy",
    email: "coe@rlscollege.edu",
    phone: "+1 (800) 555-0114",
    location: "Exam Cell Tower, Level 1"
  },
  {
    name: "Training & Placement Cell (CCR)",
    head: "Ms. Priyanka Deshmukh",
    email: "placements@rlscollege.edu",
    phone: "+1 (800) 555-0128",
    location: "Corporate Relations Wing, 4th Floor"
  },
  {
    name: "Dean of Student Affairs & Grievances",
    head: "Dr. Robert Vance",
    email: "studentaffairs@rlscollege.edu",
    phone: "+1 (800) 555-0133",
    location: "Student Services Complex, Room S-101"
  },
  {
    name: "Hostel & Residential Life Office",
    head: "Chief Warden Col. S. Rawat",
    email: "hostels@rlscollege.edu",
    phone: "+1 (800) 555-0145",
    location: "Boys & Girls Hostel Central Office"
  },
  {
    name: "Campus Health Center & Ambulance 24/7",
    head: "Dr. H. Nathan (Chief Medical Officer)",
    email: "healthcenter@rlscollege.edu",
    phone: "+1 (800) 555-0199",
    location: "Campus Medical Center (Near Gate 2)"
  }
];

export const COLLEGE_DEPARTMENTS_LIST = [
  { code: "CSE", name: "Computer Science & Engineering", icon: "Code", totalFaculty: 42, totalStudents: 720, labs: 8 },
  { code: "AI&DS", name: "Artificial Intelligence & Data Science", icon: "Brain", totalFaculty: 28, totalStudents: 480, labs: 6 },
  { code: "ECE", name: "Electronics & Communication Engineering", icon: "Cpu", totalFaculty: 36, totalStudents: 600, labs: 7 },
  { code: "MECH", name: "Mechanical Engineering", icon: "Cog", totalFaculty: 32, totalStudents: 520, labs: 9 },
  { code: "CIVIL", name: "Civil Engineering", icon: "Building2", totalFaculty: 24, totalStudents: 380, labs: 5 },
  { code: "EEE", name: "Electrical & Electronics Engineering", icon: "Zap", totalFaculty: 26, totalStudents: 420, labs: 6 }
];
