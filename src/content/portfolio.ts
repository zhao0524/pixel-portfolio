import type { LaptopScreenExperience, LaptopScreenProject } from '@/components/LaptopScreen';

export const CONTACT = {
  email: "davidzhao0524@gmail.com",
  github: "https://github.com/zhao0524",
  linkedin: "https://www.linkedin.com/in/david-zhao-0524dz/",
};

/** Served from `public/`. */
export const RESUME_URL = "/David_Zhao_swe.pdf";

export const PROJECTS: LaptopScreenProject[] = [
  {
    title: "Rivet",
    image: "/projects/rivet.jpg",
    description: "An AI-assisted hardware builder that turns a photo or prompt into an interactive 3D model built from separate parts, with exploded views and part selection. For its supported rover it produces a validated design from real catalogued parts, with a bill of materials, wiring, assembly steps and starter firmware.",
    tags: ["Next.js", "FastAPI", "Three.js", "Python"],
    award: "Winner of SOON Hacks",
    links: [
      { label: "Live", href: "https://www.userivet.site/" },
      { label: "GitHub", href: "https://github.com/zhao0524/Rivet" },
      { label: "Devpost", href: "https://devpost.com/software/rivet-lze4d5" },
    ],
  },
  {
    title: "Steady",
    image: "/projects/steady.jpg",
    description: "Turns a laptop webcam into a surgical training simulator. Real-time hand tracking drives virtual instruments in a 3D operating room, an expert ghost demonstrates each skill, and every attempt is scored, coached by voice and replayed against the reference motion.",
    tags: ["Next.js", "Three.js", "MediaPipe", "Python"],
    award: "Winner of Hack the Valley",
    links: [
      { label: "Live", href: "https://steady-snowy-seven.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/Steady" },
      { label: "Devpost", href: "https://devpost.com/software/aura-cjim1q" },
    ],
  },
  {
    title: "SCOUT",
    image: "/projects/scout.jpg",
    description: "Researches the history of a hackathon idea before you build it. A pipeline of research agents uncovers previous attempts, current competitors and repeated failure patterns, tells the story as a page-flipping notebook, then turns the remaining gap into a build plan.",
    tags: ["React", "Node.js", "Gemini", "AI Agents"],
    award: "Winner of HuskyHack",
    links: [
      { label: "GitHub", href: "https://github.com/RohanGottipati/Scout" },
      { label: "Devpost", href: "https://devpost.com/software/1-hlgbas" },
    ],
  },
  {
    title: "A.U.R.A",
    image: "/projects/aura.jpg",
    description: "An AI-powered platform that transforms 2D floor plans into fully interactive 3D environments you can walk through in the browser. Analyzes the layout, intelligently furnishes the space based on your prompt, and generates a realistic, editable scene for planning and visualization.",
    tags: ["Three.js", "AI", "3D"],
    award: "Winner of Bear Hack",
    links: [
      { label: "Live", href: "https://aura-bay-nu.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/AURA" },
      { label: "Devpost", href: "https://devpost.com/software/a-u-r-a-architectural-understanding-rendering-agent" },
    ],
  },
  {
    title: "Spar",
    image: "/projects/spar.jpg",
    description: "An AI-powered mock interview platform where candidates debug real codebases while thinking out loud to a live voice AI interviewer. Evaluates problem-solving, communication, and coding behavior to generate a hiring-style report.",
    tags: ["React", "Voice AI", "AI"],
    award: "Winner of Ignition Hack",
    links: [
      { label: "GitHub", href: "https://github.com/zhao0524/Spar" },
      { label: "Devpost", href: "https://devpost.com/software/spar-9getb3" },
    ],
  },
  {
    title: "GreenLens AI",
    image: "/projects/greenlens-ai.jpg",
    description: "Leverages machine learning to analyze complex data and deliver real-time, actionable insights through intuitive reports.",
    tags: ["Machine Learning", "Data Analysis", "AI"],
    award: "Winner of Data Mind Challenge",
    links: [
      { label: "Live", href: "https://greenlens-ai-pi.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/greenlens-ai" },
    ],
  },
  {
    title: "CareSync",
    image: "/projects/caresync.jpg",
    description: "An AI-powered care coordination platform connecting PSWs, family members, and coordinators through automated shift briefings, medication risk checks, and daily care summaries.",
    tags: ["React", "Node.js", "AI Agents"],
    award: "Winner of HackCanada",
    links: [
      { label: "Live", href: "https://frontend-three-iota-42.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/CareSync" },
      { label: "Devpost", href: "https://devpost.com/software/caresync-kj2ch4" },
    ],
  },
  {
    title: "Spectra",
    image: "/projects/spectra.jpg",
    description: "A real-time behavioral analytics platform acting as a security layer for AI agents on Solana. Monitors on-chain activity and detects anomalies like abnormal transaction velocity.",
    tags: ["Next.js", "TypeScript", "Solana", "Supabase"],
    award: "Winner of uOttaHack",
    links: [
      { label: "Live", href: "https://spectra-prod-gamma.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/Spectra" },
      { label: "Devpost", href: "https://devpost.com/software/s-e-n-t-r-a" },
    ],
  },
  {
    title: "FridgeChef",
    image: "/projects/fridgechef.jpg",
    description: "An AI-powered web app that turns a photo of your fridge into personalized recipes based on your ingredients and available cooking time. Detects what you have, adapts to your schedule, and sends recipes and grocery lists to reduce food waste.",
    tags: ["React", "AI", "Computer Vision"],
    links: [
      { label: "Live", href: "https://fridgechef-1.vercel.app/" },
      { label: "GitHub", href: "https://github.com/zhao0524/FridgeChef" },
      { label: "Devpost", href: "https://devpost.com/software/food-for-thought-wnfz1b" },
    ],
  },
  {
    title: "Web Editor",
    image: "/projects/web-editor.jpg",
    description: "A Chrome extension that lets users describe UI changes in plain English and applies them directly to any webpage in real time — no DevTools required.",
    tags: ["Chrome Extension", "JavaScript", "AI"],
    links: [
      { label: "GitHub", href: "https://github.com/zhao0524/web-editor-extension" },
    ],
  },
  {
    title: "Amazon Fullstack Clone",
    image: "/projects/amazon-fullstack-clone.jpg",
    description: "A full-stack e-commerce app replicating core Amazon features including product listings, shopping cart, and checkout with a responsive user interface.",
    tags: ["React", "Firebase", "product-API"],
    links: [
      { label: "GitHub", href: "https://github.com/zhao0524/amazon-clone" },
    ],
  },
  {
    title: "Motion Exercise Predictor",
    image: "/projects/motion-exercise-predictor.png",
    imageFit: "contain",
    description: "A machine learning app that detects movements through a wearable motion sensor and identifies exercises in real time to track workouts and monitor form.",
    tags: ["Python", "pandas", "numpy"],
    links: [
      { label: "GitHub", href: "https://github.com/zhao0524/fitness-machine-learning" },
    ],
  },
  {
    title: "EventFinder",
    image: "/projects/eventfinder.jpg",
    description: "A web app that helps users discover local events in real time, connecting people to nearby concerts, festivals, and community activities based on location and interests.",
    tags: ["Python", "HTML", "Flask"],
  },
];

export const EXPERIENCE: LaptopScreenExperience[] = [
  {
    role: "Junior Software Developer Intern",
    company: "Ontario Health",
    bullets: [
      "Modernized the healthcare application codebase by coordinating upgrades to 2 core technologies: Angular and Node.js, smoke testing each version increment to catch compatibility issues, and helping teammates update their local environments.",
      "Helped protect Ontario healthcare data by reviewing code and validating deployment settings across 4 containerized components, using Jenkins and OpenShift to keep sensitive configuration separate from Docker images.",
      "Supported centralized access to healthcare records across 2+ connected applications by contributing to Redis-backed data pipelines, tracing integration failures through logs and metrics, and checking record consistency across systems.",
    ],
  },
  {
    role: "Software Engineer",
    company: "DOUBL",
    bullets: [
      "Separated the local development and production databases to create a safer and more reliable development workflow.",
      "Developed the full-stack, client-facing website using React, FastAPI, and PostgreSQL.",
      "Improved the website's SEO through optimized page structure, metadata, and content.",
      "Managed and maintained the database, including updating schemas and ensuring data accuracy.",
      "Built web-scraping workflows to collect product information from partner websites and update the database.",
      "Fixed website issues and implemented new features based on business and user needs.",
      "Collaborated with the development team through stand-ups, sprint planning, testing, and code reviews.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Wilfrid Laurier University",
    bullets: [
      "Designed and developed machine learning models to analyze financial data, identifying patterns for prediction and decision-making.",
      "Conducted exploratory data analysis on market datasets to uncover trends, anomalies, and potential trading signals.",
      "Engineered features from time-series financial data to improve model performance in forecasting tasks.",
      "Evaluated model effectiveness using statistical metrics and backtesting techniques to simulate real-world performance.",
      "Implemented and compared multiple ML algorithms (e.g., regression, classification, time-series models) to optimize predictive accuracy.",
      "Built data pipelines to clean, preprocess, and structure large-scale financial datasets for efficient model training.",
      "Collaborated on research experiments, iterating on model design based on empirical results and domain-specific insights.",
    ],
  },
  {
    role: "Instruction Assistant",
    company: "Wilfrid Laurier University",
    bullets: [
      "Delivered hands-on support to students in data cleaning, visualization, and statistical modeling, improving project accuracy and analytical rigor.",
      "Guided students through complex concepts by breaking down technical material into clear, structured explanations.",
      "Reviewed and provided detailed feedback on assignments and projects, helping students strengthen problem-solving and coding approaches.",
      "Assisted in developing instructional materials and examples to reinforce key concepts in data analysis and modeling.",
      "Facilitated lab sessions and one-on-one support, addressing diverse learning needs and increasing student engagement.",
      "Identified common learning gaps and proactively adapted explanations to improve overall class comprehension.",
    ],
  },
  {
    role: "Board of Director",
    company: "Student Union",
    bullets: [
      "Directed strategic decision-making alongside executive leadership, shaping policies and initiatives that improved student engagement and campus-wide participation.",
      "Represented the student body in high-level discussions, advocating for student needs and influencing key organizational decisions.",
      "Oversaw budgeting and resource allocation, ensuring responsible financial management and alignment with organizational goals.",
      "Collaborated with cross-functional teams to plan and execute large-scale student events, increasing attendance and community involvement.",
      "Evaluated organizational performance through data-driven insights, recommending improvements to enhance operational efficiency.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Emergconnect",
    bullets: [
      "Improved NLP/LLM triage model accuracy by conducting error analysis and refining prompt structures, enhancing classification of patient complaints into appropriate urgency categories.",
      "Designed and implemented evaluation pipelines (confusion matrices, performance metrics) to systematically assess and iterate on model performance.",
      "Optimized model reliability by identifying edge cases and reducing misclassification through targeted testing and data-driven refinements.",
      "Collaborated with cross-functional teams to align model outputs with real-world triage requirements, improving usability in healthcare scenarios.",
      "Debugged and resolved frontend/mobile application issues, ensuring smoother integration between model outputs and user interface.",
      "Engineered structured testing workflows to validate model behavior across diverse input scenarios, improving consistency and robustness.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Laurier Supply Chain Association",
    bullets: [
      "Developed and deployed an interactive chatbot feature for the association's website, improving user engagement and accessibility of resources.",
      "Engineered conversational flows to streamline access to event information, membership details, and FAQs, reducing manual inquiries.",
      "Collaborated with cross-functional team members to integrate chatbot functionality into the frontend, ensuring a seamless user experience.",
      "Optimized chatbot responses through iterative testing and user feedback, increasing accuracy and relevance of information delivery.",
      "Contributed to website enhancement initiatives by identifying gaps in user interaction and implementing scalable solutions.",
      "Strengthened digital presence by improving navigation efficiency and reducing friction in accessing key association services.",
    ],
  },
  {
    role: "Math Tutor",
    company: "Varsity Tutors",
    bullets: [
      "Delivered one-on-one and small-group tutoring sessions in mathematics and data-related courses, improving student comprehension and academic performance.",
      "Simplified complex concepts (e.g., statistics, data analysis, algebra) into clear, structured explanations tailored to individual learning styles.",
      "Diagnosed student knowledge gaps through targeted questioning and practice assessments, increasing problem-solving accuracy over time.",
      "Guided students through assignments and exam preparation, reinforcing key concepts and effective study strategies.",
      "Fostered an engaging and supportive learning environment, boosting student confidence and participation.",
    ],
  },
];
