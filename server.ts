import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const COLLEGE_SYSTEM_PROMPT = `
You are the Official AI Student Assistant for "RLS College Of BCA".
Your personality is friendly, encouraging, knowledgeable, concise, and professional.

### Institutional Knowledge Base:
- Institution Name: RLS College Of BCA (Autonomous, Approved by AICTE & UGC, Accredited by NAAC with 'A++' Grade).
- Affiliation: Affiliated to State University of Computer Studies.
- Established: 1994.
- Campus Address: RLS Knowledge Campus, Tech Innovation Boulevard, Sector 12, Metro Cyber City.
- Contact Details: Phone: +1 (800) 555-0199 | Emergency Helpline: +1 (800) 555-HELP | Email: helpdesk@rlscollege.edu | Admissions: admissions@rlscollege.edu | Placements: placements@rlscollege.edu.
- Operating Hours: Monday to Friday: 8:30 AM - 5:00 PM | Saturday: 9:00 AM - 1:00 PM.

### Core Academics & Departments:
1. BCA General / Core Computer Applications (HoD: Dr. Alan Turing Wright, Room B-302)
2. BCA Data Analytics & Artificial Intelligence (Coordinator: Dr. Evelyn Reed, Room AI-104)
3. BCA Cloud Computing & Cyber Security (Coordinator: Dr. Marcus Thorne, Room C-205)
4. BCA Web & Full-Stack Development (Lead: Prof. Sarah Jenkins, Room L-102)

### Key Academic Rules & Facilities:
- Minimum Attendance Requirement: Strict 75% attendance in both theory and practical lab classes to be eligible for end-semester university examinations.
- Grading System: 10-point CGPA scale (O: 10, A+: 9, A: 8, B+: 7, B: 6, C: 5, F: 0).
- Timetable Schedule: Monday to Saturday, 6 periods daily (Period 1: 09:00 AM - 09:55 AM, Period 2: 10:00 AM - 10:55 AM, Tea Break: 10:55 AM - 11:15 AM, Period 3: 11:15 AM - 12:10 PM, Period 4: 12:15 PM - 01:10 PM, Lunch Break: 01:10 PM - 02:00 PM, Period 5: 02:00 PM - 02:55 PM, Period 6: 03:00 PM - 03:55 PM).
- Major Events: "BYTE-FEST 2026" (Annual Tech Fest, April 14), "HackRLS 36-Hour Hackathon" (March 28), "Industry Connect & Career Fair" (May 08).
- Library: Central Digital Library & Learning Commons with 45,000+ volumes, IEEE/ACM digital access, open 8:00 AM - 8:00 PM.

### Response Instructions:
1. Provide accurate, helpful, student-friendly answers formatted in clean markdown (bullet points, bold text).
2. Keep answers concise, clear, and actionable.
3. If asked about student tasks (like checking timetable, booking faculty, calculating attendance, downloading syllabus, submitting assignments), guide them to the appropriate portal tab (Home, Dashboard, Courses, Timetable, Faculty, Events, Contact).
4. Maintain a warm collegiate tone.
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const ai = getGenAI();

  if (ai) {
    try {
      // Build conversation contents
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (item.text && (item.role === 'user' || item.role === 'model')) {
            contents.push({
              role: item.role,
              parts: [{ text: item.text }]
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents,
        config: {
          systemInstruction: COLLEGE_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I'm here to help with all questions about RLS College Of BCA! What would you like to know?";
      return res.json({ reply: responseText });
    } catch (err: any) {
      console.warn('Gemini API query error, using contextual fallback:', err?.message || err);
      // Proceed to fallback handler below
    }
  }

  // Knowledge base fallback response generator
  const lowerMsg = message.toLowerCase();
  let fallbackReply = "";

  if (lowerMsg.includes('attendance') || lowerMsg.includes('absent') || lowerMsg.includes('percentage') || lowerMsg.includes('75')) {
    fallbackReply = `### 📊 Attendance Regulations at RLS College Of BCA
- **Mandatory Minimum**: You must maintain at least **75% aggregate attendance** in every theory and practical lab course to appear for the semester exams.
- **Medical Leave & OD**: Submit an official medical certificate or On-Duty (OD) pass approved by your Proctor / HoD within 3 days.
- **Attendance Forecaster**: Check the **Student Dashboard** tab to simulate missed classes or calculate how many consecutive classes you need to reach 75%+!`;
  } else if (lowerMsg.includes('timetable') || lowerMsg.includes('schedule') || lowerMsg.includes('class') || lowerMsg.includes('period')) {
    fallbackReply = `### 🗓️ BCA Timetable & Daily Schedule
- **Daily Timings**: 9:00 AM – 3:55 PM across 6 lecture periods with Tea Break (10:55 AM) & Lunch Break (1:10 PM).
- **Saturday**: Half-day sessions focusing on Lab Practicals, Project Reviews, and Seminar Forums.
- **Live Timetable Viewer**: Navigate to the **Timetable** tab on the navigation bar to filter by Day, Room, Course, or Faculty!`;
  } else if (lowerMsg.includes('course') || lowerMsg.includes('subject') || lowerMsg.includes('syllabus') || lowerMsg.includes('bca')) {
    fallbackReply = `### 📚 BCA Academic Programs & Courses
RLS College Of BCA offers industry-aligned specializations:
1. **Core Computer Applications**: Data Structures, Java, Database Systems, Web Technologies.
2. **AI & Data Science**: Machine Learning, Python Analytics, Neural Networks.
3. **Cloud & Cyber Security**: Cloud Infrastructure, Cryptography, Network Defense.

You can view complete unit-by-unit syllabi, recommended textbooks, and download course documents in the **Courses** tab!`;
  } else if (lowerMsg.includes('faculty') || lowerMsg.includes('professor') || lowerMsg.includes('hod') || lowerMsg.includes('teacher') || lowerMsg.includes('doctor')) {
    fallbackReply = `### 👨‍🏫 Faculty Directory & Office Hours
- **HoD of BCA**: Dr. Alan Turing Wright (Cabin B-302, Office Hours: 3:00 PM – 4:30 PM).
- **Faculty Mentors**: Dr. Evelyn Reed (AI/ML), Dr. Marcus Thorne (Cyber Security), Prof. Sarah Jenkins (Cloud & Web).
- **Booking Consultations**: Head over to the **Faculty** tab to view cabins, emails, and book 1-on-1 academic mentorship sessions directly!`;
  } else if (lowerMsg.includes('event') || lowerMsg.includes('fest') || lowerMsg.includes('hackathon') || lowerMsg.includes('workshop')) {
    fallbackReply = `### 🚀 Upcoming Campus Events & Competitions
- **BYTE-FEST 2026**: Annual Flagship Inter-Collegiate Tech Symposium (April 14, Main Auditorium).
- **HackRLS 36-Hour Hackathon**: National Student Codeathon (March 28, Innovation Hub).
- **Industry Connect & Job Fair**: Top IT Recruiters & Internship Showcase (May 08).

Check out the **Events** tab to register and download your Digital Entry Pass!`;
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('help') || lowerMsg.includes('emergency') || lowerMsg.includes('phone') || lowerMsg.includes('email') || lowerMsg.includes('address')) {
    fallbackReply = `### 📞 Contact & Emergency Helplines
- **Campus Address**: RLS Knowledge Campus, Tech Innovation Boulevard, Sector 12, Metro Cyber City.
- **General Helpdesk**: \`+1 (800) 555-0199\` | \`helpdesk@rlscollege.edu\`
- **24/7 Student Helpline**: \`+1 (800) 555-HELP\`
- **Admissions Office**: \`admissions@rlscollege.edu\`
- **Placement Cell**: \`placements@rlscollege.edu\``;
  } else if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey') || lowerMsg.includes('who are you')) {
    fallbackReply = `Hello! 👋 I am your **RLS College Of BCA Assistant**. 

I can assist you with:
- **Academic Timetable** & daily class schedules
- **Attendance Rules** & forecaster calculations
- **Course Syllabi**, textbooks & modules
- **Faculty Cabins**, office hours & consultation slots
- **Campus Events**, hackathons & digital passes
- **College Contacts**, helpline numbers & exam cell details

How can I help you today?`;
  } else {
    fallbackReply = `Thank you for your query! At **RLS College Of BCA**, we're here to assist you throughout your academic journey.

You can explore the interactive sections in this portal:
- **Dashboard**: Track CGPA, attendance statistics, and assignment deadlines.
- **Courses**: View comprehensive syllabus units and download course materials.
- **Timetable**: Check daily classroom and lab schedules.
- **Faculty**: Find mentor contact details and book consultation hours.
- **Events**: Register for upcoming tech symposiums and workshops.
- **Contact**: Reach out to administrative and academic departments.

Feel free to ask any specific question about our college, courses, or campus life!`;
  }

  return res.json({ reply: fallbackReply });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RLS College Of BCA Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
