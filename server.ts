import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONIRUL_SYSTEM_INSTRUCTION = `You are the official AI Portfolio & CV Assistant for Md. Monirul Islam.
Your role is to help recruiters, hiring managers, fellow engineers, professors, and visitors learn about Md. Monirul Islam's background, engineering skills, projects, education, and achievements, or evaluate his fit for software engineering roles.

KEY FACTS ABOUT MD. MONIRUL ISLAM:
- Full Name: Md. Monirul Islam
- Title: Software Engineer & Information and Communication Engineering (ICE) Undergraduate
- University: Pabna University of Science and Technology (PUST), Pabna-6300, Bangladesh
- Degree: B.Sc. in Information and Communication Engineering (ICE), Session 2024 – Present (Expected Graduation: 2028)
- Email: contact@monirul.dev.cv
- Website: https://monirul.dev.cv
- GitHub: https://github.com/monirul-dev
- LinkedIn: https://linkedin.com/in/monirul-dev

TECHNICAL SKILLS:
- Languages: C++, C, JavaScript (ES6+), TypeScript, Python, SQL
- Web & Frameworks: React.js, Node.js, Express.js, HTML5, CSS3, Tailwind CSS, RESTful APIs, MQTT
- Databases: MongoDB, PostgreSQL, MySQL
- Core CS & ICE: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Computer Networks & TCP/IP, Operating Systems, Signals & Digital Communication
- DevOps & Tools: Docker, Git, GitHub, Linux / Bash, Postman, Vercel, VS Code

FEATURED PROJECTS (STAR Methodology):
1. AI-Powered Habit & Accountability Tracker (Full-Stack):
   - Built with React.js, Node.js, Express.js, MongoDB, JWT Auth, Tailwind CSS.
   - Impact: Used by 100+ student peers at PUST; optimized MongoDB compound indexes & aggregation pipelines for a 35% reduction in API response latency.
2. Interactive DSA & Memory Pointer Visualizer (Algorithms & Canvas):
   - Built with Vanilla JavaScript (ES6+), HTML5 2D Canvas, CSS3.
   - Impact: Step-by-step memory pointer (HEAD, TAIL, FRONT, REAR) and circular queue/linked list visualizer; reduced peer tutoring setup time by 50% at PUST.
3. IoT Smart Environmental Telemetry Node (ICE Hardware & Embedded):
   - Built with C++, ESP32 Microcontroller, MQTT, REST APIs, MQ-135 & thermal sensors.
   - Impact: Showcased at PUST ICE Academic Exhibition; features moving-average ADC noise filtering and low-latency MQTT telemetry.
4. PUST ICE Academic Notice & Routine Microservice:
   - Built with PostgreSQL, Express.js, React, Docker.
5. Digital Signal & Modulation Waveform Analyzer:
   - Built with Python & JavaScript for ASK, FSK, and BPSK modulation synthesis.
6. C++20 Competitive Programming Stress-Test Harness:
   - Built with C++20 and Linux Bash for automated counterexample discovery.

COMPETITIVE PROGRAMMING & ACHIEVEMENTS:
- Solved 200+ algorithmic problems across Codeforces, LeetCode, and Beecrowd.
- Codeforces Max Rating: 1350+ (strong in Graph Theory, Dijkstra, Trees, Segment Trees, Disjoint Set Union, Dynamic Programming).
- Full-Stack Web Software Certification (2026).

COMMUNICATION RULES:
- Respond in the same language the user writes in (English or Bengali / বাংলা). If the user writes in Banglish, reply warmly in clear Bengali or English as appropriate.
- Keep answers concise, structured, factual, and professional.
- When asked to evaluate a job description, highlight concrete proof points from Monirul's projects (e.g. 35% latency reduction, 100+ users, 200+ CP problems solved, ICE @ PUST background).
- Encourage visitors to reach out via the Contact page or email contact@monirul.dev.cv for interviews or collaborations.`;

function buildLocalFallbackReply(message: string): string {
  const lower = message.toLowerCase();
  const isBangla = /[\u0980-\u09FF]/.test(message) || lower.includes('monirul ke') || lower.includes('kemon');

  if (isBangla) {
    if (lower.includes('প্রজেক্ট') || lower.includes('project')) {
      return `**মোঃ মনিরুল ইসলামের প্রধান প্রজেক্টসমূহ:**\n\n1. **AI-Powered Habit & Accountability Tracker:** React, Node.js, Express এবং MongoDB দিয়ে তৈরি ফুল-স্ট্যাক অ্যাপ, যা PUST-এর ১০০+ শিক্ষার্থী ব্যবহার করছে এবং এতে API Latency ৩৫% কমানো হয়েছে।\n2. **Interactive DSA & Memory Pointer Visualizer:** JavaScript ES6+ ও HTML5 Canvas দিয়ে তৈরি মেমোরি পয়েন্টার (Front, Rear, Head) ভিজ্যুয়ালাইজার, যা আপনি এই ওয়েবসাইটের **Projects & Lab** পেজে সরাসরি চালিয়ে দেখতে পারেন।\n3. **IoT Smart Environmental Telemetry Node:** ESP32 ও C++ দিয়ে তৈরি রিয়েল-টাইম MQTT সেন্সর নোড, যা PUST ICE Academic Exhibition-এ প্রদর্শিত হয়েছে।`;
    }
    if (lower.includes('স্কিল') || lower.includes('skill') || lower.includes('দক্ষতা')) {
      return `**মোঃ মনিরুল ইসলামের টেকনিক্যাল স্কিলসমূহ:**\n\n- **Languages:** C, C++ (200+ CP Solved), JavaScript (ES6+), TypeScript, Python, SQL\n- **Web & Backend:** React.js, Node.js, Express.js, Tailwind CSS, REST APIs\n- **Databases:** MongoDB, PostgreSQL, MySQL\n- **Core CS & ICE:** Data Structures & Algorithms, OOP, Computer Networks, Operating Systems, Signals & Systems\n- **DevOps & Tools:** Docker, Git & GitHub, Linux/Bash, Postman`;
    }
    return `হ্যালো! আমি **মোঃ মনিরুল ইসলামের** এআই পোর্টফোলিও অ্যাসিস্ট্যান্ট। তিনি **পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের (PUST)** ইনফরমেশন অ্যান্ড কমিউনিকেশন ইঞ্জিনিয়ারিং (**ICE**) বিভাগের একজন আন্ডারগ্র্যাজুয়েট শিক্ষার্থী এবং **Software Engineer**।\n\n- **কম্পিটিটিভ প্রোগ্রামিং:** ২০০+ প্রবলেম সলভড (Codeforces Max Rating: 1350+)\n- **প্রধান স্ট্যাক:** C++, JavaScript, React, Node.js, Express, MongoDB, PostgreSQL ও Docker\n- **যোগাযোগ:** contact@monirul.dev.cv\n\nআপনি তার প্রজেক্ট, সিভি (CV), স্কিল বা জব-ফিট সম্পর্কে যেকোনো প্রশ্ন করতে পারেন!`;
  }

  if (lower.includes('project') || lower.includes('habit') || lower.includes('visualizer') || lower.includes('iot')) {
    return `**Md. Monirul Islam's Key Engineering Projects:**\n\n1. **AI-Powered Habit & Accountability Tracker (Full-Stack):** Built with React, Node.js, Express, and MongoDB. Adopted by **100+ PUST student peers** with a **35% reduction in API response latency** via compound indexing.\n2. **Interactive DSA & Memory Pointer Visualizer:** Built with ES6+ and HTML5 Canvas to visualize low-level memory pointers (\`HEAD\`, \`TAIL\`, \`FRONT\`, \`REAR\`). Reduced peer mentoring setup time by **50%**. *(Try it live on the Projects & Lab tab!)*\n3. **IoT Smart Environmental Telemetry Node:** C++ firmware on ESP32 streaming MQTT/REST sensor telemetry, showcased at the **PUST ICE Academic Exhibition**.`;
  }

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
    return `**Technical Stack & Competencies:**\n\n- **Languages:** C++, C, JavaScript (ES6+), TypeScript, Python, SQL\n- **Web & Backend:** React.js, Node.js, Express.js, Tailwind CSS, RESTful Microservices, MQTT\n- **Databases:** MongoDB (Aggregation & ESR Indexing), PostgreSQL, MySQL\n- **Core CS & ICE:** Data Structures & Algorithms (200+ CP problems solved, 1350+ CF rating), OOP, Computer Networks, Operating Systems, Signals & Systems\n- **DevOps:** Docker, Git/GitHub, Linux/Bash, Postman, Vercel`;
  }

  if (lower.includes('education') || lower.includes('university') || lower.includes('pust') || lower.includes('degree')) {
    return `**Education & Academic Credentials:**\n\n- **Degree:** B.Sc. in Information and Communication Engineering (ICE)\n- **Institution:** Pabna University of Science and Technology (PUST), Pabna-6300, Bangladesh\n- **Timeline:** 2024 – Present (Expected Graduation: 2028)\n- **Core Coursework:** Data Structures & Algorithms, OOP in C++, Database Management Systems, Computer Networks, Operating Systems, Signals & Digital Communication.`;
  }

  if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
    return `**Direct Contact Information:**\n\n- **Email:** contact@monirul.dev.cv\n- **Portfolio:** https://monirul.dev.cv\n- **GitHub:** github.com/monirul-dev\n- **LinkedIn:** linkedin.com/in/monirul-dev\n- **Location:** ICE Department, PUST, Pabna-6300, Bangladesh\n\nYou can also send a direct message using the Contact form on this website!`;
  }

  return `Hello! I'm **Md. Monirul Islam's AI Portfolio Assistant**. Here is a quick snapshot of his profile:\n\n- **Role:** Software Engineer & B.Sc. in ICE Undergraduate at **PUST**\n- **Core Stack:** C++, JavaScript/TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, Docker\n- **Track Record:** **200+ CP problems solved** (1350+ Codeforces rating), **100+ active student users** on his Full-Stack Habit Tracker, and **35% API latency reduction**.\n- **Contact:** contact@monirul.dev.cv\n\nAsk me about his **projects, C++ & algorithmic background, full-stack architecture, education at PUST**, or paste a **Job Description** to evaluate his fit!`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [] } = req.body as {
        message?: string;
        history?: { role: 'user' | 'model'; text: string }[];
      };

      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        res.json({ reply: buildLocalFallbackReply(message), source: 'knowledge-base' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents = [
        ...history.slice(-8).map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: MONIRUL_SYSTEM_INSTRUCTION,
          temperature: 0.5,
        },
      });

      const replyText = response.text || buildLocalFallbackReply(message);
      res.json({ reply: replyText, source: 'gemini' });
    } catch (error) {
      console.error('Gemini API error, using structured portfolio knowledge fallback:', error);
      const userMessage = req.body?.message || '';
      res.json({
        reply: buildLocalFallbackReply(userMessage),
        source: 'knowledge-base',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
