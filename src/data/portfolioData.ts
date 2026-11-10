import { Project, Experience, EducationItem, SkillCategory, CertificationItem } from '../types.ts';

export const PERSONAL_INFO = {
  name: 'Jyotiprakash Kundu',
  nickname: 'Jyoti',
  title: 'Python Full Stack Developer | Frontend Developer | Creative Developer',
  email: 'jyotiprakashkundu04@gmail.com',
  location: 'Bhubaneswar, Odisha, India',
  educationSummary: 'B.Tech in Computer Science Engineering, GIFT Autonomous, Bhubaneswar',
  currentRole: 'Python Full Stack Development Intern at THYO TECH PVT. LTD.',
  linkedin: 'https://www.linkedin.com/in/jyoti-prakash-kundu-1aa802374',
  github: 'https://github.com/jyotiprakashkundu',
  photoUrl: '/assets/aistudio/lky_465f9290.jpeg',
  bio: `I'm a Computer Science Engineering student and aspiring Python Full Stack Developer passionate about creating modern, scalable, and interactive web applications. With hands-on internship experience in full-stack architecture, backend APIs, and modern frontend design, I bridge technical logic with creative user experiences.`,
  status: 'Open to Full-time Opportunities & Internships',
};

export const PROJECTS: Project[] = [
  {
    id: 'wallvora',
    title: 'PROJECT 01 – WALLVORA',
    tagline: 'High-Performance Full-Stack Wallpaper Web Application',
    category: 'Full-Stack',
    description:
      'A full-stack wallpaper web application built with Next.js, Supabase, and Pexels API featuring seamless browsing, high-resolution downloads, and user favorites.',
    longDescription:
      'Wallvora is an all-in-one wallpaper discovery platform engineered with Next.js and Supabase. Users can browse millions of curated high-definition photos through the Pexels API, preview resolutions, download with one click, and manage saved collections through Supabase authentication and cloud storage.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'PostgreSQL', 'Pexels API'],
    features: [
      'Wallpaper browsing with responsive Masonry layout',
      'One-click high-resolution download functionality',
      'Favorite wallpapers bookmarking with Supabase database',
      'Full-screen HD image preview modal with aspect ratio details',
      'User authentication, session tokens & secure cloud storage',
    ],
    githubUrl: 'https://github.com/jyotiprakashkundu',
    demoUrl: 'https://github.com/jyotiprakashkundu',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    accentColor: '#8b5cf6', // Electric Purple
  },
  {
    id: 'travellora',
    title: 'PROJECT 02 – TRAVELLORA',
    tagline: 'Modern 3D Travel Planning & Booking Portal',
    category: 'Creative 3D',
    description:
      'An interactive travel planning portal combining 3D interactive destination exploration with comprehensive trip booking, hotel selection, and preference customization.',
    longDescription:
      'Travellora reinvents travel planning by incorporating Three.js 3D globe visualizations into itinerary construction. Travelers can explore international and domestic destinations, customize multi-city schedules, filter accommodations and local activities, and progress through an intuitive booking and payment workflow.',
    technologies: ['Node.js', 'Three.js', 'React.js', 'Tailwind CSS', 'Express.js', 'REST APIs'],
    features: [
      'Interactive 3D globe destination exploration & navigation',
      'Multi-destination trip planner with dynamic schedule calculation',
      'Hotel, resort and boutique accommodation selection engine',
      'Travel preference filters (adventure, relaxation, culture, budget)',
      'Curated activity selection & end-to-end checkout workflow',
    ],
    githubUrl: 'https://github.com/jyotiprakashkundu',
    demoUrl: 'https://github.com/jyotiprakashkundu',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    accentColor: '#06b6d4', // Soft Blue / Cyan
  },
  {
    id: 'english-odia-translation',
    title: 'PROJECT 03 – ENGLISH-ODIA TRANSLATION SYSTEM',
    tagline: 'Bidirectional Neural Translation Web Application',
    category: 'Web App',
    description:
      'A specialized translation web application designed to break linguistic barriers between English and Odia with real-time API integration and intuitive UI.',
    longDescription:
      'Developed to serve regional language localization, this application provides rapid English-to-Odia and Odia-to-English translation. It integrates Google Translation API endpoints into a responsive React frontend with instant clipboard copy, text-to-speech phonetic cues, and character counter.',
    technologies: ['React.js', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'Google Translation API'],
    features: [
      'Accurate English-to-Odia bidirectional translation',
      'Real-time API translation query integration with debounce optimization',
      'Interactive clean UI with one-tap copy and character statistics',
      'Audio pronunciation playback support for learning regional phrases',
      'Quick phrasebook for common conversational translations',
    ],
    githubUrl: 'https://github.com/jyotiprakashkundu',
    demoUrl: 'https://github.com/jyotiprakashkundu',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    accentColor: '#f43f5e', // Neon Red
  },
  {
    id: 'online-book-store',
    title: 'PROJECT 04 – ONLINE BOOK STORE',
    tagline: 'E-Commerce Platform Developed during CTTC Internship',
    category: 'E-Commerce',
    description:
      'An e-commerce book catalog application featuring dynamic book browsing, multi-criteria search, category filters, and an interactive shopping cart.',
    longDescription:
      'Developed during the Web Designing Internship at CTTC Bhubaneswar, this e-commerce application delivers a structured bookstore experience. It features full catalog filtering, category exploration (technical, literature, science), instant search, and a persistent client-side shopping cart with total calculation.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'Responsive Design'],
    features: [
      'Comprehensive book catalog browsing with price & rating badges',
      'Instant search functionality across titles, authors, and genres',
      'Interactive shopping cart with item addition, removal, and live totals',
      'Clean checkout review modal with order summary',
      '100% responsive layout across mobile, tablet, and desktop screens',
    ],
    githubUrl: 'https://github.com/jyotiprakashkundu',
    demoUrl: 'https://github.com/jyotiprakashkundu',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    accentColor: '#10b981', // Emerald
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'THYO TECH PVT. LTD.',
    role: 'Python Full Stack Developer Intern',
    period: 'Current / Recent',
    duration: 'Ongoing Internship',
    location: 'Bhubaneswar, India',
    type: 'Internship',
    highlights: [
      'Engineered Python full-stack features across backend API architecture and database integration.',
      'Designed and consumed RESTful APIs connecting relational databases with responsive frontend interfaces.',
      'Conducted system debugging, bug identification, and performance optimization for web services.',
      'Acquired practical software development experience adhering to agile workflows, Git version control, and code reviews.',
    ],
    technologies: ['Python', 'Flask', 'REST APIs', 'MySQL', 'JavaScript', 'Git', 'Debugging'],
    accentColor: '#8b5cf6',
  },
  {
    company: 'CTTC Bhubaneswar',
    role: 'Web Designing Intern',
    period: '45 Days Internship Program',
    duration: '45 Days',
    location: 'Bhubaneswar, Odisha',
    type: 'Internship',
    highlights: [
      'Mastered responsive web design principles, CSS grid systems, and semantic HTML5 structuring.',
      'Architected the Online Book Store e-commerce web application with interactive shopping cart workflows.',
      'Collaborated on cross-browser compatibility testing and responsive UI layouts.',
    ],
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'UI/UX Principles'],
    accentColor: '#06b6d4',
  },
  {
    company: 'IIG Versity Bhubaneswar',
    role: 'Programming Fundamentals Intern',
    period: '1 Month Internship Program',
    duration: '1 Month',
    location: 'Bhubaneswar, Odisha',
    type: 'Internship',
    highlights: [
      'Gained deep foundational command of programming paradigms, procedural logic, and memory concepts.',
      'Solved algorithmic problems emphasizing data structures, functions, and modular code architecture.',
      'Implemented clean coding standards and analytical problem-solving techniques.',
    ],
    technologies: ['Python', 'C / C++', 'Algorithms', 'Data Structures', 'Problem Solving'],
    accentColor: '#f43f5e',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'GIFT Autonomous, Bhubaneswar',
    location: 'Bhubaneswar, Odisha',
    boardOrUniversity: 'Biju Patnaik University of Technology (BPUT)',
    scoreOrStatus: 'Pursuing (Final Year)',
    period: '2021 – Present',
    highlights: [
      'Specializing in Full-Stack Web Development, Data Structures, Algorithms, Database Management Systems, and Software Engineering.',
      'Active developer in college tech activities, coding workshops, and project showcases.',
    ],
  },
  {
    degree: 'Intermediate (12th Science)',
    institution: 'Sagar Science Higher Secondary School',
    location: 'Balasore, Odisha',
    boardOrUniversity: 'Council of Higher Secondary Education (CHSE)',
    scoreOrStatus: '74.16%',
    period: 'Completed',
    highlights: [
      'Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals.',
      'Built strong analytical, mathematical, and logical foundations.',
    ],
  },
  {
    degree: 'Matriculation (10th Standard)',
    institution: 'Haripriya High School',
    location: 'Purusottampur, Odisha',
    boardOrUniversity: 'Board of Secondary Education (BSE Odisha)',
    scoreOrStatus: '89.50%',
    period: 'Completed with Distinction',
    highlights: [
      'Academic excellence across Mathematics, Science, and English.',
      'Recognized for academic dedication and problem solving.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    categoryKey: 'frontend',
    skills: [
      { name: 'HTML5', level: 'Semantic Markup', iconName: 'Code', description: 'Semantic, accessible document structures & SEO standards' },
      { name: 'CSS3', level: 'Modern Styling', iconName: 'Palette', description: 'Flexbox, Grid, keyframe animations & responsive design' },
      { name: 'JavaScript', level: 'ES6+ Engine', iconName: 'Cpu', description: 'Asynchronous JavaScript, DOM manipulation, promises & event loop' },
      { name: 'React.js', level: 'Component Architecture', iconName: 'Atom', description: 'Hooks, custom hooks, state management, virtual DOM' },
      { name: 'Next.js', level: 'Full-Stack Framework', iconName: 'Layers', description: 'App Router, SSR, API routes, image optimization' },
      { name: 'Tailwind CSS', level: 'Utility Engine', iconName: 'Wind', description: 'Rapid responsive styling, design systems & micro-interactions' },
      { name: 'Bootstrap', level: 'Rapid UI', iconName: 'Box', description: 'Component grids, modals, and responsive layout foundations' },
    ],
  },
  {
    title: 'Backend Engineering',
    categoryKey: 'backend',
    skills: [
      { name: 'Python', level: 'Core Language', iconName: 'Terminal', description: 'OOP, scripting, algorithms, data structures & automation' },
      { name: 'Flask', level: 'Microframework', iconName: 'Server', description: 'REST API routing, blueprints, authentication, middleware' },
      { name: 'Node.js', level: 'Runtime Environment', iconName: 'Boxes', description: 'Event-driven servers, Express routers, asynchronous I/O' },
      { name: 'REST APIs', level: 'Integration Architecture', iconName: 'Globe', description: 'API contracts, JSON serialization, status codes, JWT auth' },
    ],
  },
  {
    title: 'Databases & Storage',
    categoryKey: 'database',
    skills: [
      { name: 'MySQL', level: 'Relational Database', iconName: 'Database', description: 'Complex SQL queries, table schemas, indexing, relationships' },
      { name: 'Supabase', level: 'Backend-as-a-Service', iconName: 'Cloud', description: 'Realtime database, row-level security (RLS), auth, storage' },
      { name: 'PostgreSQL', level: 'Object-Relational', iconName: 'HardDrive', description: 'ACID compliance, schema modeling, high-concurrency queries' },
    ],
  },
  {
    title: 'Tools & Workflow',
    categoryKey: 'tools',
    skills: [
      { name: 'VS Code', level: 'Primary IDE', iconName: 'Monitor', description: 'Advanced debugging, extensions, productivity setups' },
      { name: 'Git', level: 'Version Control', iconName: 'GitBranch', description: 'Branching strategies, merge conflict resolution, commits' },
      { name: 'GitHub', level: 'Collaboration', iconName: 'Github', description: 'Open source repos, GitHub Actions, project management' },
      { name: 'Jupyter Notebook', level: 'Interactive Python', iconName: 'FileCode', description: 'Prototyping, algorithm validation, data analysis' },
    ],
  },
  {
    title: 'Creative Technologies',
    categoryKey: 'creative',
    skills: [
      { name: 'Three.js', level: '3D Web Experiences', iconName: 'BoxSelect', description: 'Procedural meshes, PBR lighting, shaders, WebGL scenes' },
      { name: 'Framer Motion', level: 'Animation Physics', iconName: 'Sparkles', description: 'Spring kinematics, layout animations, gesture controls' },
      { name: 'GSAP', level: 'High-Performance Motion', iconName: 'Activity', description: 'Timeline orchestration, scroll-triggered sequences' },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'NPTEL Soft Skill Development Certification',
    issuer: 'National Programme on Technology Enhanced Learning (NPTEL - IIT)',
    description:
      'Rigorous evaluation in professional communication, leadership dynamics, team collaboration, and workplace adaptability.',
    badge: 'NPTEL Certified',
  },
  {
    title: 'NPTEL Introduction to Internet of Things 4.0',
    issuer: 'National Programme on Technology Enhanced Learning (NPTEL - IIT)',
    description:
      'Comprehensive study of IoT architectures, sensor networks, cloud protocols, embedded computing, and Industry 4.0 applications.',
    badge: 'Industry 4.0',
  },
];
