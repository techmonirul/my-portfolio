import profilePortraitImg from '../assets/images/monirul_profile_portrait_1791744727216.jpg';
import habitTrackerImg from '../assets/images/project_habit_tracker_1791744741018.jpg';
import dsaVisualizerImg from '../assets/images/project_dsa_visualizer_1791744751926.jpg';
import iotTelemetryImg from '../assets/images/project_iot_telemetry_1791744765498.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'algorithms' | 'iot' | 'systems';
  categoryLabel: string;
  year: string;
  featured: boolean;
  bentoWide?: boolean;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  hasInteractiveDemo?: 'dsa-visualizer' | 'iot-telemetry';
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  metrics: string[];
  tech: string[];
  architectureOverview: string;
  highlights: string[];
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface SkillGroup {
  id: string;
  category: 'languages' | 'web' | 'cs' | 'devops';
  title: string;
  summary: string;
  items: {
    name: string;
    level: string;
    context: string;
  }[];
}

export interface CPAlgorithmTemplate {
  id: string;
  title: string;
  topic: string;
  complexity: string;
  description: string;
  code: string;
}

export interface TechnicalArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  sections: {
    heading: string;
    body: string;
    code?: string;
  }[];
}

export const PROFILE_DATA = {
  name: 'Md. Monirul Islam',
  shortName: 'Monirul Islam',
  headline: 'Software Engineer & ICE Undergraduate',
  department: 'Information and Communication Engineering (ICE)',
  university: 'Pabna University of Science and Technology (PUST)',
  location: 'Pabna-6300, Bangladesh',
  session: '2024 – Present (Expected Graduation: 2028)',
  email: 'contact@monirul.dev.cv',
  website: 'https://monirul.dev.cv',
  github: 'https://github.com/monirul-dev',
  linkedin: 'https://linkedin.com/in/monirul-dev',
  defaultAvatar: profilePortraitImg,
  web3FormsAccessKey: '2d8246c7-9667-4a8a-b7b5-32536a4603ee',
  typewriterRoles: [
    'Software Engineer',
    'Full-Stack Web Architect',
    'ICE Undergraduate @ PUST',
    'Algorithmic Problem Solver (200+ CP)',
  ],
  bioLead:
    'Undergraduate engineering student in Information and Communication Engineering (ICE) at Pabna University of Science and Technology (PUST). Focused on Data Structures, Algorithm Optimization, Modern Web Architectures, and RESTful Microservices.',
  bioExtended:
    'My primary technical focus is engineering high-reliability web applications and low-latency backend services using C++, JavaScript (ES6+), TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, and Docker. I bridge core telecommunication, signal processing, and computer network fundamentals with disciplined software delivery.',
  engineeringPhilosophy: 'Bridging mathematical computer science and modern software delivery.',
  kpis: [
    {
      value: '200+',
      label: 'Algorithmic Problems Solved',
      context: 'Codeforces · LeetCode · Beecrowd',
    },
    {
      value: '1350+',
      label: 'Codeforces Max Rating',
      context: 'Graph Theory · Dynamic Programming · Trees',
    },
    {
      value: '100+',
      label: 'Active Student Peer Users',
      context: 'PUST Campus Productivity & Study Tools',
    },
    {
      value: '35%',
      label: 'API Latency Reduction',
      context: 'Indexed Aggregation & REST Caching',
    },
  ],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'languages',
    title: 'Programming Languages',
    summary: 'Systems programming, competitive problem solving, and full-stack application logic.',
    items: [
      { name: 'C++ (STL / C++20)', level: 'Advanced', context: '200+ CP solutions, ESP32 firmware, memory management' },
      { name: 'C', level: 'Advanced', context: 'Low-level pointers, microprocessors, OS systems labs' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', context: 'Asynchronous runtimes, HTML5 Canvas, full-stack web' },
      { name: 'TypeScript', level: 'Proficient', context: 'Type-safe React frontends and Express API contracts' },
      { name: 'Python', level: 'Proficient', context: 'Signal simulation scripts, automation, data analysis' },
      { name: 'SQL', level: 'Proficient', context: 'Normalized relational schemas, indexing, complex joins' },
    ],
  },
  {
    id: 'web',
    category: 'web',
    title: 'Web Architecture & Frameworks',
    summary: 'End-to-end client rendering, RESTful middleware, and responsive interface systems.',
    items: [
      { name: 'React.js', level: 'Advanced', context: 'Component architecture, custom hooks, state optimization' },
      { name: 'Node.js', level: 'Advanced', context: 'Event-driven backend services and real-time streams' },
      { name: 'Express.js', level: 'Advanced', context: 'REST API design, JWT authentication, rate limiting' },
      { name: 'Tailwind CSS', level: 'Advanced', context: 'Design systems, responsive grids, dark/light themes' },
      { name: 'HTML5 & CSS3', level: 'Advanced', context: 'Semantic markup, Canvas 2D rendering, WCAG accessibility' },
      { name: 'RESTful APIs & MQTT', level: 'Advanced', context: 'JSON payload design, WebSockets, IoT telemetry brokers' },
    ],
  },
  {
    id: 'databases',
    category: 'web',
    title: 'Databases & Data Persistence',
    summary: 'Document stores and relational database engines tuned for high-throughput queries.',
    items: [
      { name: 'MongoDB', level: 'Advanced', context: 'Aggregation pipelines, compound indexes, Mongoose ODM' },
      { name: 'PostgreSQL', level: 'Proficient', context: 'ACID transactions, relational modeling, query tuning' },
      { name: 'MySQL', level: 'Proficient', context: 'Academic DBMS coursework, relational schema normalization' },
    ],
  },
  {
    id: 'cs',
    category: 'cs',
    title: 'Core CS & ICE Engineering',
    summary: 'Foundational computer science theory combined with telecommunication engineering.',
    items: [
      { name: 'Data Structures & Algorithms', level: 'Advanced', context: 'Trees, Graphs, DP, Heaps, Segment Trees, DSU' },
      { name: 'Object-Oriented Programming', level: 'Advanced', context: 'Encapsulation, polymorphism, SOLID design patterns' },
      { name: 'Computer Networks & TCP/IP', level: 'Proficient', context: 'OSI layers, socket programming, routing protocols' },
      { name: 'Operating Systems', level: 'Proficient', context: 'Process scheduling, concurrency, virtual memory' },
      { name: 'Signals & Digital Communication', level: 'Proficient', context: 'Fourier transforms, modulation, telemetry encoding' },
    ],
  },
  {
    id: 'devops',
    category: 'devops',
    title: 'DevOps & Engineering Workflow',
    summary: 'Containerization, version control, Linux shell environments, and cloud deployment.',
    items: [
      { name: 'Git & GitHub', level: 'Advanced', context: 'Branching workflows, pull requests, CI automation' },
      { name: 'Docker', level: 'Proficient', context: 'Multi-stage container builds and isolated dev services' },
      { name: 'Linux / Bash', level: 'Proficient', context: 'CLI productivity, shell scripting, server administration' },
      { name: 'Postman', level: 'Advanced', context: 'Automated API endpoint testing and documentation' },
      { name: 'Vercel & Cloud Run', level: 'Proficient', context: 'Zero-downtime frontend and full-stack deployments' },
      { name: 'VS Code', level: 'Advanced', context: 'Custom debugging profiles, C++ GDB & ESLint toolchains' },
    ],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'habit-tracker',
    title: 'AI-Powered Habit & Accountability Tracker',
    subtitle: 'Full-Stack Gamified Productivity Platform with Streak Mathematics',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Architecture',
    year: '2026',
    featured: true,
    bentoWide: true,
    image: habitTrackerImg,
    githubUrl: 'https://github.com/monirul-dev',
    liveUrl: 'https://monirul.dev.cv',
    star: {
      situation: 'University students struggle with long-term study habit consistency and lack actionable routine telemetry.',
      task: 'Architect a full-stack accountability system featuring streak decay math, skip-card safeguards, and AI routine feedback.',
      action: 'Engineered a Node.js & Express REST API backed by compound-indexed MongoDB schemas and a reactive React frontend.',
      result: 'Adopted by 100+ student peers at PUST with a measured 35% reduction in dashboard API response latency.',
    },
    metrics: ['100+ Active PUST Peer Users', '35% Lower API Latency', '99.4% Uptime'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT Auth'],
    architectureOverview:
      'Built on a 3-tier RESTful architecture. The Express.js service layer validates JWT sessions and executes single-pass MongoDB aggregation pipelines to compute rolling 30-day consistency scores, streak multipliers, and automated skip-card triggers without N+1 query overhead.',
    highlights: [
      'Quantifiable Impact: Actively used by 100+ student peers at PUST for semester study tracking.',
      'Optimized MongoDB compound indexes (userId + logDate) reducing dashboard load latency by 35%.',
      'Stateless JWT authentication middleware with role-based accountability partner sharing.',
      'Automated routine analysis engine providing personalized weekly consistency diagnostics.',
    ],
    codeSnippet: {
      filename: 'streakEngine.controller.js',
      language: 'javascript',
      code: `// Single-pass MongoDB Aggregation for 30-Day Streak & Consistency Score
export async function computeUserStreakMetrics(userId, timezoneOffset = 360) {
  const pipeline = [
    { $match: { userId, completed: true } },
    { $sort: { logDate: -1 } },
    { $limit: 60 },
    {
      $group: {
        _id: "$userId",
        loggedDates: { $push: "$logDate" },
        totalCompleted: { $sum: 1 }
      }
    }
  ];
  const [stats] = await HabitLog.aggregate(pipeline);
  return evaluateStreakWithSkipCards(stats?.loggedDates || [], timezoneOffset);
}`,
    },
  },
  {
    id: 'dsa-visualizer',
    title: 'Interactive DSA & Memory Pointer Visualizer',
    subtitle: 'Step-by-Step HTML5 Canvas Engine for Pointers, Queues, Stacks & Trees',
    category: 'algorithms',
    categoryLabel: 'Algorithms & Interactive Canvas',
    year: '2026',
    featured: true,
    bentoWide: false,
    image: dsaVisualizerImg,
    githubUrl: 'https://github.com/monirul-dev',
    liveUrl: 'https://monirul.dev.cv',
    hasInteractiveDemo: 'dsa-visualizer',
    star: {
      situation: 'Undergraduates often struggle to visualize low-level memory pointer mutations (HEAD, TAIL, FRONT, REAR) during C++ lab sessions.',
      task: 'Build a zero-dependency interactive visualization engine that renders memory addresses and pointer transitions frame-by-frame.',
      action: 'Implemented a deterministic state-machine renderer using JavaScript ES6+ and HTML5 2D Canvas with live playback controls.',
      result: 'Reduced algorithm debugging and peer tutoring setup time by 50% during PUST ICE study sessions.',
    },
    metrics: ['50% Faster Peer Mentoring Setup', '60 FPS Canvas Rendering', 'Zero External Libraries'],
    tech: ['JavaScript (ES6+)', 'HTML5 Canvas', 'C++ Reference Models', 'CSS3'],
    architectureOverview:
      'Uses an immutable command-log state machine where every data structure mutation (enqueue, dequeue, push, pop, pointer relink) emits an atomic memory frame with simulated hex addresses (0x100–0x1F0), allowing forward/backward step debugging.',
    highlights: [
      'Reduced peer setup and explanation time by 50% during departmental algorithm mentoring.',
      'Real-time visualization of Circular Queue wrap-around, Stack LIFO frames, and Singly Linked List pointers.',
      'Synchronized C++20 reference code highlighting alongside memory address blocks.',
    ],
    codeSnippet: {
      filename: 'MemoryPointerEngine.js',
      language: 'javascript',
      code: `class CircularQueueVisualizer {
  constructor(capacity = 6) {
    this.capacity = capacity;
    this.buffer = new Array(capacity).fill(null);
    this.front = -1;
    this.rear = -1;
  }
  enqueue(value) {
    if ((this.rear + 1) % this.capacity === this.front) return { status: 'OVERFLOW' };
    if (this.front === -1) this.front = 0;
    this.rear = (this.rear + 1) % this.capacity;
    this.buffer[this.rear] = { value, addr: \`0x\${(256 + this.rear * 16).toString(16).toUpperCase()}\` };
    return { status: 'OK', front: this.front, rear: this.rear };
  }
}`,
    },
  },
  {
    id: 'iot-node',
    title: 'IoT Smart Environmental Telemetry Node',
    subtitle: 'ESP32 Firmware & Real-Time MQTT/REST Sensor Stream for ICE Lab',
    category: 'iot',
    categoryLabel: 'IoT & Embedded Telemetry',
    year: '2025',
    featured: true,
    bentoWide: false,
    image: iotTelemetryImg,
    githubUrl: 'https://github.com/monirul-dev',
    hasInteractiveDemo: 'iot-telemetry',
    star: {
      situation: 'Laboratory environments require continuous, low-power monitoring of ambient temperature, humidity, and air quality anomalies.',
      task: 'Engineer an embedded microcontroller node capable of streaming calibrated telemetry payloads over MQTT and HTTP REST.',
      action: 'Programmed non-blocking C++ firmware on an ESP32 microcontroller with ring-buffer sensor smoothing and deep-sleep scheduling.',
      result: 'Selected as a featured hardware-software showcase project at the PUST ICE Academic Exhibition.',
    },
    metrics: ['PUST ICE Exhibition Showcase', '< 45ms Local Broker Latency', 'Non-Blocking C++ Firmware'],
    tech: ['C++', 'ESP32 Microcontroller', 'MQTT Protocol', 'REST APIs', 'Sensor Calibration'],
    architectureOverview:
      'The ESP32 node samples environmental sensors using a 5-point moving average filter in C++ to eliminate ADC noise, serializes compact JSON telemetry frames, and publishes over MQTT with automatic Wi-Fi指數 backoff reconnection.',
    highlights: [
      'Showcased at the Pabna University of Science and Technology (PUST) ICE Academic Exhibition.',
      'Engineered C++ firmware with hardware watchdog timers and moving-average noise filtering.',
      'Real-time web dashboard integration with threshold alerting for air quality and thermal spikes.',
    ],
    codeSnippet: {
      filename: 'esp32_telemetry_node.cpp',
      language: 'cpp',
      code: `void publishTelemetryFrame() {
  float tempC = movingAverageFilter(readTemperatureADC());
  float humidity = readHumiditySensor();
  int airPpm = readMQ135GasPpm();

  char payload[160];
  snprintf(payload, sizeof(payload),
    "{\\"node\\":\\"PUST-ICE-01\\",\\"temp\\":%.2f,\\"hum\\":%.1f,\\"ppm\\":%d,\\"rssi\\":%d}",
    tempC, humidity, airPpm, WiFi.RSSI()
  );
  mqttClient.publish("pust/ice/telemetry/node01", payload);
}`,
    },
  },
  {
    id: 'campus-notice-service',
    title: 'PUST ICE Academic Notice & Routine Microservice',
    subtitle: 'Role-Based Departmental Schedule, Exam Alert & Resource Portal',
    category: 'fullstack',
    categoryLabel: 'Backend & Database Systems',
    year: '2025',
    featured: false,
    image: habitTrackerImg,
    githubUrl: 'https://github.com/monirul-dev',
    star: {
      situation: 'Departmental class reschedules, lab syllabus updates, and exam notices were scattered across informal messaging groups.',
      task: 'Build a centralized, searchable academic portal with semester-wise filtering and instant notice archiving.',
      action: 'Designed a normalized PostgreSQL schema with Express.js REST endpoints and a responsive React client.',
      result: 'Streamlined access to course syllabi, lab manuals, and exam schedules for undergraduate cohorts.',
    },
    metrics: ['Normalized PostgreSQL Schema', 'Sub-20ms Search Queries', 'Role-Based Access'],
    tech: ['PostgreSQL', 'Express.js', 'React.js', 'Node.js', 'Docker'],
    architectureOverview:
      'Uses PostgreSQL full-text search (tsvector) to index academic notices, course codes (ICE-2101, ICE-2103), and lab resources, containerized with Docker Compose for reproducible deployment.',
    highlights: [
      'PostgreSQL relational schema enforcing foreign-key integrity across semesters, courses, and notices.',
      'Full-text search indexing for instant lookup by course code or instructor.',
      'Dockerized development environment with automated database seeding.',
    ],
    codeSnippet: {
      filename: 'schema.sql',
      language: 'sql',
      code: `CREATE TABLE academic_notices (
  notice_id SERIAL PRIMARY KEY,
  course_code VARCHAR(16) NOT NULL,
  batch_session VARCHAR(16) NOT NULL DEFAULT '2024-2028',
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_notices_course_batch ON academic_notices(course_code, batch_session);`,
    },
  },
  {
    id: 'signal-modulation-lab',
    title: 'Digital Signal & Modulation Waveform Analyzer',
    subtitle: 'Interactive ASK, FSK, PSK & Nyquist Sampling Theorem Simulator',
    category: 'systems',
    categoryLabel: 'ICE Signal Processing',
    year: '2025',
    featured: false,
    image: dsaVisualizerImg,
    githubUrl: 'https://github.com/monirul-dev',
    star: {
      situation: 'Understanding carrier wave modulation (ASK, FSK, BPSK) and AWGN channel noise requires interactive visual experimentation.',
      task: 'Develop a mathematical waveform synthesizer for Signals & Digital Communication coursework.',
      action: 'Implemented discrete-time sinusoidal synthesis and binary bitstream encoding in Python and JavaScript.',
      result: 'Provided clear visual verification of carrier frequency shifts, phase inversions, and SNR degradation.',
    },
    metrics: ['ASK · FSK · BPSK Synthesis', 'Real-Time Bitstream Encoding', 'ICE Coursework Tool'],
    tech: ['Python', 'JavaScript (ES6+)', 'Signals & Systems', 'Digital Communication'],
    architectureOverview:
      'Computes discrete time-domain samples y[n] = A·cos(2π·fc·t + φ) across configurable carrier frequencies and bit rates, demonstrating phase reversals at bit transitions for BPSK.',
    highlights: [
      'Synthesizes Amplitude-Shift Keying (ASK), Frequency-Shift Keying (FSK), and Binary Phase-Shift Keying (BPSK).',
      'Interactive carrier frequency and binary payload input for ICE communication labs.',
      'Clean mathematical alignment with Signals & Systems undergraduate curriculum at PUST.',
    ],
    codeSnippet: {
      filename: 'bpsk_modulator.py',
      language: 'python',
      code: `import numpy as np

def modulate_bpsk(bitstream: list[int], fc: float = 10.0, fs: int = 1000):
    t = np.linspace(0, len(bitstream), len(bitstream) * fs, endpoint=False)
    carrier = np.cos(2 * np.pi * fc * t)
    phase_symbols = np.repeat([1 if b == 1 else -1 for b in bitstream], fs)
    return t, carrier * phase_symbols`,
    },
  },
  {
    id: 'cp-cli-runner',
    title: 'C++20 Competitive Programming Stress-Test Harness',
    subtitle: 'Automated Brute-Force vs Optimal Solution Diffing & Benchmark CLI',
    category: 'algorithms',
    categoryLabel: 'Developer Tooling & CP',
    year: '2026',
    featured: false,
    image: iotTelemetryImg,
    githubUrl: 'https://github.com/monirul-dev',
    star: {
      situation: 'Finding edge-case counterexamples during Codeforces and LeetCode contests manually is slow and error-prone.',
      task: 'Create a fast Linux/Bash and C++ stress-testing harness that generates random test cases until outputs diverge.',
      action: 'Wrote a POSIX shell & C++ generator script measuring execution time and memory footprints across 1,000+ iterations.',
      result: 'Helped solve 200+ competitive programming challenges and achieve a 1350+ Codeforces rating.',
    },
    metrics: ['1,000+ Randomized Test Runs/Min', 'Automated Counterexample Isolation', 'C++20 / Bash'],
    tech: ['C++20', 'Linux / Bash', 'GDB', 'Algorithmic Testing'],
    architectureOverview:
      'Compiles `generator.cpp`, `brute.cpp`, and `optimal.cpp` with `-O2 -fsanitize=address,undefined` flags and pipes randomized graph/array inputs until an assertion or diff mismatch is captured.',
    highlights: [
      'Detects off-by-one errors, integer overflows, and corner-case graph disconnects automatically.',
      'Integrated with AddressSanitizer (ASan) and UndefinedBehaviorSanitizer (UBSan).',
      'Used daily for Codeforces, LeetCode, and Beecrowd problem preparation.',
    ],
    codeSnippet: {
      filename: 'stress_test.sh',
      language: 'bash',
      code: `#!/usr/bin/env bash
g++ -O2 gen.cpp -o gen && g++ -O2 brute.cpp -o brute && g++ -O2 sol.cpp -o sol
for ((i = 1; i <= 500; ++i)); do
  ./gen $i > input.txt
  ./brute < input.txt > out_brute.txt
  ./sol < input.txt > out_sol.txt
  diff -w out_brute.txt out_sol.txt || { echo "Mismatch on test #$i"; exit 1; }
done`,
    },
  },
];

export const EDUCATION_DATA = {
  degree: 'Bachelor of Science (B.Sc.) in Information and Communication Engineering (ICE)',
  institution: 'Pabna University of Science and Technology (PUST)',
  location: 'Pabna-6300, Bangladesh',
  period: '2024 – Present (Expected Graduation: 2028)',
  status: 'Enrolled Undergraduate Degree Program',
  summary:
    'Rigorous engineering curriculum combining computer science, software systems, algorithmic analysis, relational database design, computer networks, and telecommunication engineering.',
  coursework: [
    {
      code: 'ICE-2101',
      title: 'Data Structures & Algorithms',
      focus: 'Asymptotic complexity, trees, graph traversals, sorting, dynamic memory allocation',
    },
    {
      code: 'ICE-2103',
      title: 'Object-Oriented Programming (C++)',
      focus: 'Classes, inheritance, polymorphism, STL containers, exception safety',
    },
    {
      code: 'ICE-2201',
      title: 'Database Management Systems (MySQL / PostgreSQL)',
      focus: 'Relational algebra, B+ tree indexing, 3NF/BCNF normalization, ACID transactions',
    },
    {
      code: 'ICE-3101',
      title: 'Computer Networks & Protocols',
      focus: 'TCP/IP stack, subnetting, routing algorithms (Dijkstra/OSPF), socket programming',
    },
    {
      code: 'ICE-2205',
      title: 'Signals & Digital Communication',
      focus: 'Fourier analysis, sampling theorem, pulse code modulation, ASK/FSK/PSK',
    },
    {
      code: 'ICE-3105',
      title: 'Operating Systems & System Programming',
      focus: 'Process synchronization, deadlocks, virtual memory paging, Linux kernel basics',
    },
  ],
};

export const ACHIEVEMENTS_DATA = [
  {
    id: 'cp-achievement',
    title: 'Competitive Programming Milestone (200+ Solved · 1350+ CF Rating)',
    organization: 'Codeforces · LeetCode · Beecrowd',
    year: '2024 – 2026',
    description:
      'Solved 200+ algorithmic challenges across Codeforces (Max Rating: 1350+), LeetCode, and Beecrowd with a core focus on graph theory, shortest paths, dynamic programming, greedy heuristics, and custom data structures.',
    metric: '1350+ Max Rating',
  },
  {
    id: 'fullstack-cert',
    title: 'Full-Stack Web Software Engineering Certification',
    organization: 'Advanced Software Architecture & REST Systems',
    year: '2026',
    description:
      'Completed intensive full-stack web engineering credentials covering React component state architectures, Node.js & Express REST API security, MongoDB/PostgreSQL query optimization, and Docker container workflows.',
    metric: '2026 Credential',
  },
  {
    id: 'pust-ice-showcase',
    title: 'PUST ICE Academic Project Showcase Selection',
    organization: 'Department of Information and Communication Engineering, PUST',
    year: '2025',
    description:
      'Recognized for designing and demonstrating the ESP32 IoT Smart Environmental Telemetry Node & Interactive DSA Memory Pointer Visualizer for departmental peers.',
    metric: 'Departmental Honor',
  },
];

export const CP_STATS = {
  totalSolved: 215,
  codeforcesMaxRating: 1368,
  platforms: [
    {
      name: 'Codeforces',
      handle: 'monirul_ice',
      metric: '1368 Max Rating (Pupil)',
      solved: '110+ Problems',
      focus: 'Constructive Algorithms, Graphs, Greedy, Number Theory',
    },
    {
      name: 'LeetCode',
      handle: 'monirul-dev',
      metric: 'Top 20% Consistency',
      solved: '65+ Problems',
      focus: 'Dynamic Programming, Trees, Two Pointers, Sliding Window',
    },
    {
      name: 'Beecrowd / Online Judges',
      handle: 'monirul_pust',
      metric: 'ICPC Preliminary Practice',
      solved: '40+ Problems',
      focus: 'Ad-Hoc, Computational Geometry, String Processing',
    },
  ],
  topicDistribution: [
    { topic: 'Graph Theory (BFS, DFS, Dijkstra, DSU)', count: 48, percentage: 88 },
    { topic: 'Dynamic Programming & Memoization', count: 42, percentage: 82 },
    { topic: 'Trees, Binary Search & Segment Trees', count: 50, percentage: 90 },
    { topic: 'Greedy, Sorting & Two Pointers', count: 45, percentage: 86 },
    { topic: 'Number Theory & Bit Manipulation', count: 30, percentage: 75 },
  ],
};

export const CP_TEMPLATES: CPAlgorithmTemplate[] = [
  {
    id: 'dijkstra-template',
    title: 'Dijkstra Single-Source Shortest Path with Path Reconstruction',
    topic: 'Graph Theory · Shortest Paths',
    complexity: 'Time: O((V + E) log V) · Space: O(V + E)',
    description:
      'Priority-queue based shortest path implementation in C++20 used for weighted routing problems and network latency modeling.',
    code: `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const ll INF = 1e18;

vector<ll> dijkstra(int n, int src, const vector<vector<pair<int, ll>>>& adj, vector<int>& parent) {
    vector<ll> dist(n + 1, INF);
    parent.assign(n + 1, -1);
    priority_queue<pair<ll, int>, vector<pair<ll, int>>, greater<>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [v, weight] : adj[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
  },
  {
    id: 'dsu-template',
    title: 'Disjoint Set Union (Union-Find) with Path Compression & Rank',
    topic: 'Data Structures · Connected Components',
    complexity: 'Time: O(α(N)) amortized · Space: O(N)',
    description:
      'Near-constant time component merging and cycle detection used in Kruskal MST and dynamic connectivity problems.',
    code: `struct DSU {
    vector<int> parent, sz;
    int components;

    explicit DSU(int n) : parent(n + 1), sz(n + 1, 1), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    bool unite(int i, int j) {
        int root_i = find(i), root_j = find(j);
        if (root_i == root_j) return false;
        if (sz[root_i] < sz[root_j]) swap(root_i, root_j);
        parent[root_j] = root_i;
        sz[root_i] += sz[root_j];
        components--;
        return true;
    }
};`,
  },
  {
    id: 'segtree-template',
    title: 'Iterative Range Sum & Point Update Segment Tree',
    topic: 'Range Queries · Trees',
    complexity: 'Time: O(log N) per query/update · Space: O(2N)',
    description:
      'Cache-friendly 2N-sized iterative Segment Tree in C++ for high-speed range queries without recursion overhead.',
    code: `struct SegmentTree {
    int n;
    vector<long long> tree;

    explicit SegmentTree(const vector<int>& arr) : n(arr.size()), tree(2 * n, 0) {
        for (int i = 0; i < n; i++) tree[n + i] = arr[i];
        for (int i = n - 1; i > 0; --i) tree[i] = tree[i << 1] + tree[i << 1 | 1];
    }

    void update(int pos, long long val) {
        for (tree[pos += n] = val; pos > 1; pos >>= 1)
            tree[pos >> 1] = tree[pos] + tree[pos ^ 1];
    }

    long long query(int l, int r) { // [l, r)
        long long res = 0;
        for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
            if (l & 1) res += tree[l++];
            if (r & 1) res += tree[--r];
        }
        return res;
    }
};`,
  },
];

export const TECHNICAL_ARTICLES: TechnicalArticle[] = [
  {
    id: 'mongodb-latency-optimization',
    title: 'How I Reduced Dashboard REST API Latency by 35% in Our PUST Habit Tracker',
    date: 'August 2026',
    readTime: '5 min read',
    category: 'Backend Engineering · MongoDB',
    summary:
      'A practical breakdown of replacing sequential N+1 Mongoose queries with compound ESR (Equality, Sort, Range) indexes and single-pass aggregation pipelines.',
    sections: [
      {
        heading: '1. Diagnosing the Bottleneck Under 100+ Concurrent Peer Users',
        body: 'When our AI-Powered Habit & Accountability Tracker reached 100+ student users at PUST, loading the 30-day streak overview required fetching user profiles, habit definitions, and 30 days of completion logs separately. Average response time hovered around 310ms.',
      },
      {
        heading: '2. Applying the ESR (Equality, Sort, Range) Indexing Rule',
        body: 'By inspecting `explain("executionStats")`, we noticed collection scans (`COLLSCAN`) on habit logs. We introduced a compound index matching our exact query predicate: equality on `userId`, sort on `logDate: -1`, and projection of `completed` status.',
        code: `db.habit_logs.createIndex(
  { userId: 1, logDate: -1, completed: 1 },
  { name: "idx_user_date_covered" }
);`,
      },
      {
        heading: '3. Measured Outcome',
        body: 'Combined with a single `$facet` aggregation pipeline that calculates current streak, longest streak, and skip-card balances in one database round-trip, P95 response latency dropped from 310ms to 201ms—a 35.1% reduction.',
      },
    ],
  },
  {
    id: 'pointer-visualization-canvas',
    title: 'Designing a Deterministic Memory Pointer State Machine in Vanilla ES6+',
    date: 'June 2026',
    readTime: '6 min read',
    category: 'Data Structures · Graphics',
    summary:
      'Why visual mental models of HEAD, TAIL, FRONT, and REAR pointers accelerate undergraduate C++ debugging by 50%.',
    sections: [
      {
        heading: '1. The Gap Between C++ Syntax and Heap Memory Layout',
        body: 'In undergraduate Data Structures labs, writing `temp->next = head;` is syntactically simple, yet off-by-one pointer bugs and circular queue wrap-around conditions `(rear + 1) % capacity == front` frequently trip up students.',
      },
      {
        heading: '2. Modeling Operations as Immutable Memory Snapshots',
        body: 'Instead of mutating DOM nodes directly, the visualizer records every operation as a snapshot containing simulated hexadecimal addresses (`0x100`, `0x110`) and pointer registers. This enables instant backward and forward stepping.',
      },
    ],
  },
  {
    id: 'esp32-mqtt-telemetry',
    title: 'Low-Power ESP32 Telemetry: Moving-Average ADC Filtering & MQTT Reliability',
    date: 'March 2026',
    readTime: '4 min read',
    category: 'ICE Hardware · IoT',
    summary:
      'Lessons from building the PUST ICE Exhibition Environmental Node: taming ESP32 analog-to-digital non-linearity and Wi-Fi reconnection spikes.',
    sections: [
      {
        heading: '1. Smoothing Noisy Gas & Thermal Sensor Readings in C++',
        body: 'Raw analog readings from MQ-135 air quality sensors exhibit voltage jitter when the ESP32 Wi-Fi radio transmits bursts. Implementing a circular ring buffer in C++ allowed O(1) moving-average smoothing without dynamic heap allocation.',
      },
      {
        heading: '2. Lightweight JSON Serialization Over MQTT',
        body: 'Using fixed stack buffers (`snprintf`) instead of heavy `String` concatenation prevented heap fragmentation during continuous 24-hour exhibition runs at the ICE lab.',
      },
    ],
  },
];
