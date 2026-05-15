import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: #020904;
    color: #c8dece;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  a { text-decoration: none; }

  /* ─── NAV ─────────────────────────────── */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 3rem;
    border-bottom: 0.5px solid rgba(34,107,58,0.2);
    background: rgba(2,9,4,0.95);
    position: fixed;
    top: 0; width: 100%;
    z-index: 100;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: box-shadow 0.3s;
  }

  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #e2f0e6;
  }
  .nav-logo span { color: #27a34d; }

  .nav-links { display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; }

  .nav-links a {
    color: rgba(200,222,206,0.4);
    font-size: 0.69rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transition: color 0.3s;
  }
  .nav-links a:hover { color: #4fd67a; }

  .nav-cv {
    color: #27a34d !important;
    border: 0.5px solid rgba(39,163,77,0.35) !important;
    padding: 0.38rem 1rem;
    transition: background 0.3s, border-color 0.3s, color 0.3s !important;
  }
  .nav-cv:hover {
    background: rgba(39,163,77,0.1) !important;
    border-color: rgba(39,163,77,0.6) !important;
    color: #4fd67a !important;
  }

  /* ─── HERO ─────────────────────────────── */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 3rem;
    max-width: 980px;
    margin: 0 auto;
  }
  .hero-inner { padding-top: 5rem; }

  .eyebrow {
    font-size: 0.67rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #27a34d;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .eyebrow::before {
    content: '';
    display: inline-block;
    width: 40px; height: 0.5px;
    background: #27a34d;
  }

  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 9vw, 6.5rem);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.02em;
    color: #e2f0e6;
  }
  .hero-name .green { color: #27a34d; font-style: italic; }

  .hero-sub {
    font-size: 1rem;
    color: rgba(200,222,206,0.48);
    max-width: 520px;
    margin-top: 2rem;
    line-height: 1.9;
    font-weight: 300;
  }

  .hero-cta { display: flex; gap: 1rem; margin-top: 3rem; flex-wrap: wrap; }

  /* ─── BUTTONS ─────────────────────────── */
  .btn-primary {
    background: #1b7a39;
    color: #e2f0e6;
    padding: 0.85rem 2rem;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    transition: background 0.3s;
    display: inline-block;
    border: 0.5px solid transparent;
  }
  .btn-primary:hover { background: #236e40; }

  .btn-ghost {
    border: 0.5px solid rgba(39,163,77,0.28);
    color: rgba(200,222,206,0.52);
    padding: 0.85rem 2rem;
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
    display: inline-block;
  }
  .btn-ghost:hover {
    border-color: rgba(39,163,77,0.6);
    color: #4fd67a;
    background: rgba(39,163,77,0.06);
  }

  /* ─── DIVIDER ─────────────────────────── */
  .divider {
    height: 0.5px;
    background: linear-gradient(90deg, transparent, rgba(39,163,77,0.25), transparent);
    margin: 0 3rem;
  }

  /* ─── SECTIONS ────────────────────────── */
  .section {
    padding: 5.5rem 3rem;
    max-width: 980px;
    margin: 0 auto;
  }

  .section-label {
    font-size: 0.62rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #27a34d;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .section-label::after {
    content: ''; flex: 1; height: 0.5px;
    background: rgba(39,163,77,0.18);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #e2f0e6;
    line-height: 1.2;
    margin-bottom: 2rem;
  }

  /* ─── ABOUT ───────────────────────────── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-text {
    font-size: 0.95rem;
    color: rgba(200,222,206,0.52);
    line-height: 2;
  }
  .about-text + .about-text { margin-top: 1.25rem; }

  .about-stats { display: flex; flex-direction: column; gap: 1.5rem; }

  .stat-item {
    border-left: 0.5px solid rgba(39,163,77,0.3);
    padding-left: 1.25rem;
  }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    color: #27a34d;
    line-height: 1;
  }
  .stat-label {
    font-size: 0.67rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(200,222,206,0.28);
    margin-top: 0.25rem;
  }

  .lang-row { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 2rem; }
  .lang-item {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(200,222,206,0.38);
    border-bottom: 0.5px solid rgba(39,163,77,0.3);
    padding-bottom: 0.2rem;
  }

  /* ─── EXPERIENCE ──────────────────────── */
  .exp-block {
    border-left: 0.5px solid rgba(39,163,77,0.22);
    padding-left: 2rem;
    position: relative;
  }
  .exp-block::before {
    content: '';
    position: absolute;
    left: -3.5px; top: 7px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #27a34d;
  }
  .exp-role {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #e2f0e6;
    margin-bottom: 0.2rem;
  }
  .exp-company {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #27a34d;
    margin-bottom: 0.35rem;
  }
  .exp-date {
    font-size: 0.68rem;
    color: rgba(200,222,206,0.25);
    letter-spacing: 0.07em;
    margin-bottom: 1.1rem;
  }
  .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .exp-bullets li {
    font-size: 0.87rem;
    color: rgba(200,222,206,0.48);
    line-height: 1.8;
    padding-left: 1rem;
    position: relative;
  }
  .exp-bullets li::before {
    content: '—';
    position: absolute; left: 0;
    color: rgba(39,163,77,0.4);
    font-size: 0.75rem;
  }

  /* ─── EDUCATION ───────────────────────── */
  .edu-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
    background: #040f06;
    border: 0.5px solid rgba(39,163,77,0.14);
    border-left: 2px solid rgba(39,163,77,0.5);
    padding: 2rem 2.5rem;
  }
  .edu-degree {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #e2f0e6;
    margin-bottom: 0.3rem;
  }
  .edu-institution {
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #27a34d;
    margin-bottom: 0.3rem;
  }
  .edu-date {
    font-size: 0.68rem;
    color: rgba(200,222,206,0.25);
    letter-spacing: 0.07em;
    margin-bottom: 1rem;
  }
  .edu-note {
    font-size: 0.87rem;
    color: rgba(200,222,206,0.42);
    line-height: 1.8;
    max-width: 520px;
  }
  .edu-badge {
    background: rgba(39,163,77,0.08);
    border: 0.5px solid rgba(39,163,77,0.3);
    color: #27a34d;
    font-size: 0.67rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    white-space: nowrap;
    align-self: flex-start;
  }

  /* ─── SKILLS ──────────────────────────── */
  .skills-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(200,222,206,0.38);
    border: 0.5px solid rgba(39,163,77,0.14);
    padding: 0.5rem 1rem;
    background: #020904;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
    cursor: default;
  }
  .skill-tag:hover {
    border-color: rgba(39,163,77,0.48);
    color: #4fd67a;
    background: rgba(39,163,77,0.05);
  }

  /* ─── PROJECTS ────────────────────────── */
  .projects-section {
    padding: 5.5rem 3rem;
    max-width: 980px;
    margin: 0 auto;
  }

  .projects-list { display: flex; flex-direction: column; gap: 2px; margin-top: 2rem; }

  .project-card {
    background: #030c05;
    border: 0.5px solid rgba(39,163,77,0.12);
    border-left: 2px solid rgba(39,163,77,0.18);
    padding: 2.5rem 2.75rem;
    position: relative;
    transition: border-color 0.35s, background 0.35s, border-left-color 0.35s;
  }
  .project-card:hover {
    background: #050f07;
    border-color: rgba(39,163,77,0.3);
    border-left-color: #27a34d;
  }

  .project-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.8rem;
    flex-wrap: wrap;
  }

  .project-index {
    font-size: 0.6rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(39,163,77,0.4);
    font-family: 'Inter', sans-serif;
  }

  .project-tag {
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(39,163,77,0.65);
    border: 0.5px solid rgba(39,163,77,0.2);
    padding: 0.28rem 0.75rem;
    background: rgba(39,163,77,0.04);
  }

  .project-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #e2f0e6;
    margin-bottom: 0.25rem;
    line-height: 1.25;
  }

  .project-summary {
    font-size: 0.83rem;
    color: #35b85e;
    font-style: italic;
    margin-bottom: 0.85rem;
    opacity: 0.85;
  }

  .project-tech {
    font-size: 0.6rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(200,222,206,0.25);
    margin-bottom: 1.1rem;
  }

  .project-desc {
    font-size: 0.875rem;
    color: rgba(200,222,206,0.44);
    line-height: 1.95;
    max-width: 820px;
    margin-bottom: 1.5rem;
  }

  .project-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .project-highlights { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .highlight-pill {
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    color: rgba(39,163,77,0.65);
    background: rgba(39,163,77,0.05);
    border: 0.5px solid rgba(39,163,77,0.16);
    padding: 0.3rem 0.8rem;
  }

  .project-links { display: flex; gap: 0.6rem; flex-shrink: 0; }
  .project-link {
    font-size: 0.63rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #27a34d;
    border: 0.5px solid rgba(39,163,77,0.28);
    padding: 0.45rem 1rem;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .project-link:hover {
    background: rgba(39,163,77,0.1);
    border-color: rgba(39,163,77,0.55);
    color: #4fd67a;
  }
  .project-link svg {
    width: 10px; height: 10px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex-shrink: 0;
  }

  /* ─── CONTACT ─────────────────────────── */
  .contact-section {
    padding: 6rem 3rem 5rem;
    max-width: 980px;
    margin: 0 auto;
  }
  .contact-large {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: #e2f0e6;
    line-height: 1.25;
    max-width: 560px;
    margin-bottom: 1.5rem;
  }
  .contact-large em { color: #27a34d; font-style: italic; }

  .contact-sub {
    font-size: 0.9rem;
    color: rgba(200,222,206,0.38);
    max-width: 440px;
    line-height: 1.9;
    margin-bottom: 1.75rem;
  }
  .contact-details { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 2.5rem; }
  .contact-line { font-size: 0.82rem; color: rgba(200,222,206,0.35); letter-spacing: 0.04em; }
  .contact-line a { color: rgba(200,222,206,0.35); transition: color 0.3s; }
  .contact-line a:hover { color: #4fd67a; }

  /* ─── FOOTER ──────────────────────────── */
  .footer {
    border-top: 0.5px solid rgba(39,163,77,0.1);
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.65rem;
    color: rgba(200,222,206,0.16);
    letter-spacing: 0.09em;
  }

  /* ─── ANIMATIONS ──────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; animation: fadeUp 0.8s ease forwards; }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }
  .delay-4 { animation-delay: 0.6s; }

  /* ─── RESPONSIVE ──────────────────────── */
  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }
  @media (max-width: 640px) {
    .nav { padding: 1.2rem 1.5rem; }
    .nav-links { gap: 1.2rem; }
    .hero, .section, .projects-section, .contact-section { padding-left: 1.5rem; padding-right: 1.5rem; }
    .divider { margin: 0 1.5rem; }
    .footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
    .project-card { padding: 2rem 1.5rem; }
    .project-footer { flex-direction: column; align-items: flex-start; }
    .edu-block { flex-direction: column; padding: 1.5rem; }
  }
`;

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const projects = [
  {
    title: "Parking Lot Management System",
    tech: "Java · Spring Boot · JPA · MySQL",
    tag: "Backend Engineering",
    summary: "Real-time slot intelligence for a smarter parking experience.",
    description:
      "Built from scratch as a production-grade full-stack system, this application manages an entire parking facility lifecycle — from the moment a vehicle enters to the moment it leaves. The backend uses Spring Boot with a layered architecture (Controller → Service → Repository) to handle ticket generation, slot availability tracking, and reservation workflows. JPA handles all entity relationships cleanly, and MySQL stores transactional data with referential integrity. The system supports multiple slot types, calculates dynamic fees based on duration, and generates printable tickets. Designed with scalability in mind: adding a new floor or slot category requires zero code changes.",
    highlights: ["Auto ticket generation & fee calculation", "Real-time slot availability tracking", "Multi-type slot support (Standard, VIP, Disabled)", "Clean layered Spring Boot architecture"],
    github: "https://github.com/ThulaniLunyawo",
  },
  {
    title: "Quiz Application",
    tech: "React · JavaScript · CSS",
    tag: "Frontend Development",
    summary: "A sharp, interactive learning tool built for speed and engagement.",
    description:
      "More than just a question-and-answer interface — this is a fully dynamic quiz engine built in React with stateful logic at its core. Questions are rendered dynamically from a structured data source, with each session randomising the order to prevent memorisation patterns. The scoring engine tracks correct answers in real time and presents a detailed results breakdown at the end, showing exactly which questions were missed and why. Micro-interactions, smooth transitions, and a clean progress bar keep users engaged throughout. A timer mode was also implemented to simulate real exam conditions and pressure.",
    highlights: ["Dynamic question rendering with randomisation", "Real-time scoring with full result breakdown", "Timer mode for exam simulation", "Fully responsive across all screen sizes"],
    github: "https://github.com/ThulaniLunyawo",
  },
  {
    title: "Bursary Management System",
    tech: "Java · Spring Boot · MySQL",
    tag: "Enterprise System",
    summary: "Streamlining financial aid — from application to final approval.",
    description:
      "A backend-heavy enterprise system built to eliminate the paperwork chaos of bursary administration. The platform manages the full lifecycle of a bursary application — students submit their details, upload supporting documents, and track their status in real time. Administrators get a dedicated dashboard to review, approve, or reject applications, with every decision logged for audit purposes. Eligibility business rules (income threshold, academic standing, course type) are enforced at the service layer, keeping data clean and consistent. The system dramatically reduced manual processing time by centralising records previously scattered across spreadsheets and email threads.",
    highlights: ["Full lifecycle: apply → review → approve", "Role-based access: Student vs Admin", "Eligibility rule engine at service layer", "Complete audit trail for all decisions"],
    github: "https://github.com/ThulaniLunyawo",
  },
  {
    title: "Student Portal API",
    tech: "Java · Spring Boot · Spring Security · JWT · MySQL",
    tag: "API Development",
    summary: "A secured RESTful backbone powering student data across web and mobile.",
    description:
      "A RESTful API built to serve as the backbone of a student information system, consumed by both web and mobile frontends. Authentication is handled using Spring Security with stateless JWT tokens — users log in once and carry a cryptographically signed token for all subsequent requests, removing the need for server-side session storage. Role-based access control ensures students, lecturers, and administrators each see only what they're permitted to see. The API exposes clean endpoints for course enrolment, marks retrieval, timetable access, and profile management — all documented with Swagger/OpenAPI so any frontend team can integrate without ambiguity.",
    highlights: ["Stateless JWT authentication via Spring Security", "Three-tier RBAC: Student / Lecturer / Admin", "RESTful endpoints with consistent JSON contracts", "Swagger/OpenAPI self-documenting interface"],
    github: "https://github.com/ThulaniLunyawo",
  },
  {
    title: "Task Manager App",
    tech: "React Native · Node.js · Express · MySQL",
    tag: "Mobile Development",
    summary: "A cross-platform productivity app that keeps teams aligned and on track.",
    description:
      "A mobile-first task management application built with React Native, running natively on both iOS and Android from a single codebase. Users create projects, assign tasks to team members, set deadlines, and manage progress through a Kanban-style board. The Node.js and Express backend handles all CRUD operations and exposes a clean REST API consumed directly by the mobile client. Push notifications fire automatically when a task is assigned or a deadline is approaching. Offline mode was implemented using local state persistence — users can work without an internet connection and all changes sync automatically when connectivity returns.",
    highlights: ["Single codebase for iOS & Android", "Kanban board with real-time task state", "Push notifications for assignments & deadlines", "Offline-first with automatic background sync"],
    github: "https://github.com/ThulaniLunyawo",
  },
];

const skills = [
  "Java", "Spring Boot", "Spring Security", "React", "Vue.js",
  "React Native", "JavaScript", "Node.js", "Python",
  "HTML", "CSS", "MySQL", "Git", "REST APIs",
  "OOP", "Agile / Scrum", "Unit Testing", "UI Design",
  "SDLC", "Team Collaboration",
];

const languages = ["English", "Xhosa", "Afrikaans"];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className="nav" style={{ boxShadow: scrolled ? "0 2px 48px rgba(0,0,0,0.9)" : "none" }}>
        <div className="nav-logo">Thulani<span>.</span></div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/ThulaniLunyawo" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/Thulani_Lunyawo_Resume.pdf" download="Thulani_Lunyawo_Resume.pdf" className="nav-cv">
            Download CV
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow fade-up delay-1">Software Developer &nbsp;·&nbsp; Cape Town, ZA</p>
          <h1 className="hero-name fade-up delay-2">
            Thulani<br />
            <span className="green">Lunyawo</span>
          </h1>
          <p className="hero-sub fade-up delay-3">
            ICT Applications Development graduate with a strong foundation in mobile,
            web, frontend, and backend technologies. Passionate about building reliable,
            user-focused software that solves real-world problems.
          </p>
          <div className="hero-cta fade-up delay-4">
            <a href="https://www.linkedin.com/in/thulanilunyawo-32a2272b6/" className="btn-primary" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/ThulaniLunyawo" className="btn-ghost" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:tyesilunyawo@gmail.com" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="section-label">About</div>
        <h2 className="section-title">Building things<br />that matter.</h2>
        <div className="about-grid">
          <div>
            <p className="about-text">
              Motivated and detail-oriented, I graduated from the Cape Peninsula University
              of Technology with a Diploma in ICT (Applications Development) — completing
              the three-year programme on record time with a 77% average.
            </p>
            <p className="about-text">
              I thrive on turning complex problems into clean, scalable software. My goal
              is to contribute to impactful projects in a collaborative environment and
              grow into a well-rounded full-stack engineer. Open to relocating anywhere.
            </p>
            <div className="lang-row">
              {languages.map((l) => (
                <span key={l} className="lang-item">{l}</span>
              ))}
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">77%</div>
              <div className="stat-label">Graduation average</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3 yrs</div>
              <div className="stat-label">Full-time study at CPUT</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1 yr</div>
              <div className="stat-label">Industry experience · Plum Systems</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Technologies &amp; tools</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="section">
        <div className="section-label">Experience</div>
        <h2 className="section-title">Where I've worked.</h2>
        <div className="exp-block">
          <div className="exp-role">Software Developer</div>
          <div className="exp-company">Plum Systems</div>
          <div className="exp-date">January 2025 – December 2025 &nbsp;·&nbsp; Cape Town, Western Cape</div>
          <ul className="exp-bullets">
            <li>Collaborated with team members to troubleshoot and resolve critical coding issues, enhancing overall system stability.</li>
            <li>Participated in code reviews, ensuring adherence to software quality standards and best practices for improved code maintainability.</li>
            <li>Debugged code to identify and fix errors efficiently across multiple modules.</li>
            <li>Engaged in daily stand-up meetings to communicate progress and surface challenges, facilitating timely problem-solving.</li>
            <li>Assisted in designing user interfaces with a strong focus on user experience.</li>
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* ── EDUCATION ── */}
      <section className="section">
        <div className="section-label">Education</div>
        <h2 className="section-title">Academic background.</h2>
        <div className="edu-block">
          <div>
            <div className="edu-degree">Diploma in ICT — Applications Development</div>
            <div className="edu-institution">Cape Peninsula University of Technology</div>
            <div className="edu-date">January 2023 – December 2025 &nbsp;·&nbsp; Cape Town, Western Cape</div>
            <p className="edu-note">
              Three-year programme covering Application Development (Theory &amp; Practice),
              Information Systems, Programming, UI Design, Communications Networks,
              Agile &amp; Professional Practice, and more. Graduated on record time.
            </p>
          </div>
          <div className="edu-badge">Avg. 77%</div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PROJECTS ── */}
      <section id="projects" className="projects-section">
        <div className="section-label">Selected work</div>
        <h2 className="section-title">Projects.</h2>
        <div className="projects-list">
          {projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-card-top">
                <span className="project-index">— {String(i + 1).padStart(2, "0")}</span>
                <span className="project-tag">{p.tag}</span>
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-summary">{p.summary}</div>
              <div className="project-tech">{p.tech}</div>
              <p className="project-desc">{p.description}</p>
              <div className="project-footer">
                <div className="project-highlights">
                  {p.highlights.map((h, j) => (
                    <span key={j} className="highlight-pill">{h}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.github} className="project-link" target="_blank" rel="noreferrer">
                    GitHub <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <div className="section-label">Capabilities</div>
        <h2 className="section-title">Skills &amp; tools.</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill} className="skill-tag">{skill}</div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div className="section-label">Contact</div>
        <p className="contact-large">
          Ready to build something <em>exceptional</em> together?
        </p>
        <p className="contact-sub">
          Open to internships and junior developer roles where I can contribute
          meaningfully and grow as a software engineer. Willing to relocate anywhere.
        </p>
        <div className="contact-details">
          <span className="contact-line"><a href="mailto:tyesilunyawo@gmail.com">tyesilunyawo@gmail.com</a></span>
          <span className="contact-line"><a href="tel:+27631659762">+27 63 165 9762</a></span>
          <span className="contact-line"><a href="https://github.com/ThulaniLunyawo" target="_blank" rel="noreferrer">github.com/ThulaniLunyawo</a></span>
          <span className="contact-line">Cape Town, Western Cape, 7448</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="mailto:tyesilunyawo@gmail.com" className="btn-primary">Email Me</a>
          <a href="https://www.linkedin.com/in/thulanilunyawo-32a2272b6/" className="btn-ghost" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/ThulaniLunyawo" className="btn-ghost" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/Thulani_Lunyawo_Resume.pdf" download="Thulani_Lunyawo_Resume.pdf" className="btn-ghost">Download CV</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>© 2025 Thulani Lunyawo</span>
        <span>Cape Town · South Africa</span>
      </footer>
    </>
  );
}