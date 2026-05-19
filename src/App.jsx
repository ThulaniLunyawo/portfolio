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
    max-width: 1100px;
    margin: 0 auto;
  }
  .hero-inner {
    padding-top: 5rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 5rem;
    align-items: center;
    width: 100%;
  }
  .hero-photo-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .hero-photo-wrap::before {
    content: '';
    position: absolute;
    inset: -10px;
    border: 0.5px solid rgba(39,163,77,0.2);
    z-index: 0;
  }
  .hero-photo-wrap::after {
    content: '';
    position: absolute;
    bottom: -14px;
    right: -14px;
    width: 55%;
    height: 55%;
    border-right: 2px solid #27a34d;
    border-bottom: 2px solid #27a34d;
    z-index: 0;
  }
  .hero-photo {
    width: 270px;
    height: 350px;
    object-fit: cover;
    object-position: center top;
    display: block;
    position: relative;
    z-index: 1;
    filter: grayscale(15%) contrast(1.05);
  }

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
  @media (max-width: 860px) {
    .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-photo-wrap { order: -1; }
    .hero-photo { width: 160px; height: 200px; }
  }
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
          <div className="hero-text">
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
              <a href="https://www.linkedin.com/in/thulani-lunyawo-32a2272b6/" className="btn-primary" target="_blank" rel="noreferrer">
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
          <div className="hero-photo-wrap fade-up delay-2">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAUAA8ADASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/2gAMAwEAAhADEAAAAtlzYoiiUCiVSKIoiiKIoiiFIoiiUACiUBSKAACiKBQBQKBQIpRZS8+mCWWaSwAksJKrM1CSkzneTIJncMzVMrBLay0iTQzrPSotFUVkuUi6zo68u3FZQAFJVMquYsBSKCiKIoAKJNQKIoiiTQyolAUiiUABSKABSKAFBQFAFIUKUVs81mpqASwSwiypKMrEiwzNQkokoy1CKI0JZo56zus6lLvNEsJaJZY78O/FYUigtFUw0ucqIoiiKCiLAUiiKIoiiKI1CKIAoihKABSKAACgBQFABQItlFDo1zXhZZQEsEsEsIsIsqLEk1CSjM1CLAUlCVTl159aytJVIUiyAO/HtyWFSVVWhQKucqJNDLQy1CUE1CKIolAoiiKIokoiiUCiLAUiiKABSKABSUAhQFFlKmzv5vT5I56zpoBLBKJLBKqSiAk1EgWKTM0M2iTQzqaOPbl2MiqoiwLIA78e3JYtJpSUFCzS5y1CKMqIoiwFIogAACwFIAAAAUiiKIolAAAqIqgBYlABQWUvXl6CeT0+Mus6lBUsAICLKSwBIsIsIpYCKIollTl349zmUpaSohVgO3PryFUFAFDc1LmLCKJNQijKiKIoiwAAAAAAAAAAAKIoigAIFqUgABQFAHr4dTh5O3lr0axvNBQICLBKqAixAJKIoixUoiiWVOXfh6DmaJqUKJNDLRenPrzAKUlADqq5yoyoyogIokoiiAAAAiiKAIoiiKAAACiKIoAAKAgAUAA7zp548vm3x1PdvG86BUsAEogIsoCLEAiwlFiiLCWVOPp8/prlqahWgpZNQiw6c+mBKABQD0SrnM1CTUJNQk1CKICKIBKJQiiKIolCKIoigAAAAAolAAWIoAFEolnU6+P0+E8M5dNT6O86xoFEAAIKSiASiBAEoiwSlhTj6fN6k5aztbZoWUhBLDpz6YICgqUA9Ky5koyoysIsEoiwiwAAASiKIoiiLAoigAAAAAAWJQAAKACwejh6Dh872/Lry9+Hez6es6xoFSiAASygEogEsAQCwEoyo4+ry+o56zoupVoJNZEDedZICgoAPUsuZKJLCLCLCLACLABKIoiwAAAAAFIoiiUEoAACCiKJQAUBTW3M8vyvd83UduPY+prOsaBQIABKqCAoCLAEAiiKEo4eryes52aW2UVSZsIDcsMqAKAD2Sy5k1DKwiwiwiwiiAiiLAABKIoiiUAAAAAAABYigAAoFBSW6N+X0+E8Hk68tSd+HY+rrO86ipYBKIAKggAKAiiABAJQ4erzekxZVtlKCLDINAgAKAD2zUuczUJKMzUICAiwSiASiKIoiwAAAAAKIoigAAAIUACgC2UvTGzl8/2fLrySNR249Y+vrOs6CWLACKIBKIqoAABFIAAE4+nzekxZS2VbKLiwSw1c6MgAoAPdNS5zNQysGdQkogIsIsAIoiwAAAAAAAAAFIoAAACBQBQtmi1zPN8j6HytQB6vL9E9es6zoJQIsAIsAAEqoACUIogAOffh6DnZpLZRYWSwSwu8bMAAoBT3yrnM1DMsIsJLBLACAgAAEoiiLAAoiiKIoigAAAAUlAIWUWUtmjXm9HiPB4e/DUA6emeY+1rOs6sqWAASwSiLAABKIsAAEqoDn6PP3M6zoWUAk1CSwu8dDmBZQCg+hNS4zNRczUMzUMrCSiSiAAiwAASwAUAAAAAACwAFAAgUAtlLrOzHzvZ8uzxQ0lnojp5dZPt6zvOgliiAAiwASiLABLAAAKijn25dCWUtlAEsIB059DnQAFgU+gN4y1mXM1DM1DM1CSwSwSwAQAAEogFlAAAABSUAJQAAUgBQalLWTy/I+j8jUlir7PP0jy7za+5vOsasqWAAiiAiiAAiiAAiiLADO86qUNygCTUJKJ15dY5lIoFC09w6YSozNSXOdQzNQksIsICASwAAAiiWUAAAAoAAAAFAIKBRVNcO/jPB870efUUr1eX1eSLZa+5vOsa0sliiLCKIsIoiwSiKIACKIsAJZaVRVCjLUMzUJ159I5qBQtJVPYOmAJNTLM1FzLCSwkokoksAIogAAAAAAAKAAAolABSBQUamjHg9fy08GTR6PP6jhiaqg+7rO8a0tly1DLUIoyok1CKICKIsEoiiKIokua2oalKWJNQzNDPTGzC0lUltJbTHr+R9DeO4oIk1mXM1DM1kksIsIsIsAEsAAAAACUAWCgWCgAFAFlKWLWTzfH+l8azI01135ItitGj7mprGultlw1DLQw0MzQy1CTUIoy1CTQyoiiKMtQmOvM6KFaJbTM3DM0MblMaaJbYltWKPk9/H268/sb+b9GKKSozneZczUMzWSSiSiAgEAAAAAAAACgAoBQACgtWLx7eU+f8AN9Pm1B2N+XpzKlrWsaPu7x0xrtTNiiTUJNDLUMqJNDM3Ky1DLQyok0MqIozz7cTu1BpoltMzYxNyMN5M7m1igAD4W+Wu3L1+r53aX7Ly+oAZ1IzneZczUMyiSiSiSiTUIAAAAAAACgWCgWUAWUWUtmoz4PZ8qz5+U1Hp4dZeAq2VLrO1+315dsa6jNASiKICKIogEoijLUIoy0MtKz5/T5j1qGlFumcTpDE1Gs53iGsbUAQEPg6k7cunTjo9f0fkemX6jG4Amd5jM1lczUJLCLCAgIAAAAAAACpQCgWUAWUWaLYjzfG+n8azCXU7+f0eeUWmpUus1fuduHoxroM0CUAEsAAAIohSAASiKHl9Xkr2lGpU2N5S5iRM6ZuZZvGlAICD8/05Xty3qDfbz7PofQ+N7c32ikqM53mXM1EzNZJLCLFSwSwAAAAAAAWCgWCgoFlGpY1z6eY8Hy/V5dSdeXc54lpZS2aGs6Ptejz+nGtjNAICiAAAAAAixRSKAHk9fjs9yUtlTY1ljWM1LlqRJZrNKgILEPz9ze3Le+Wy6kO3fydT6/o+T9LN6CmdIxNSMTUMzUJLCBZKqCQhaQqCoKAACpQCpSpRZS2WL4fX8uz52CrvXAlloDVzotmj7Xp83pxrYzRAAFAAAAAAAAAAeT1+Sz2WDVhN3K5kSaRFkSJZQQqQqD8+l7c7c03vls1rMPR6/n95fta8HvgKk1IxN5jM1kzNQysJLLQIJAAAAFgqCgWC2FoLZS6zqPP8b6fxbMR0rfn3goBaalLrNPt+ny+vGtDNSiKIpYAsCiLAAAQqCoAL4/X5LPZZS2U1IREWZuREgCyCoog/P2Xpztzatg6Xn0LvnT1/Q+R6ZfsOPaAMzeYzneTE1DMsJLLUsBJKgsAABYKACpRYLYXVzpNZ1xjwfK9fk0deWzlYKBQtlq6g+17PJ68aozQAABAsAABFqCoABCoL5PV5T16zqy2UEGbkmbkRCywCBKsQ+Ajpz1c0qWtIOrn0NdvPs9/0vh+3N+klEoxNSMTWVznUTMsECEKgqBYKgqCoKlKlKgtlW6zU34/V82Pm8zU6cu3FQBsyUVoejh9U9Xbj2xqiUAAABAAASxQAEogAHl9Xmr0659EtlBCZ1gmdZIQ1mwIKgEPz9uenO2C3NLc01cq7OXWNd/LV+z7vg/Vj0gk1iJi4VmZSzOTcwNMQ2wOkyNXA2xTTI0gtzS3NLc0tlLvG4x8X6nw6xrPSs4BZQBqUs16Dv6W47defTOqJQBCwABCoACFsAAhLBbES+fvwrvvn0Lc6LGRm5JmwkQ3nWCoCCoPjc/Vx3jjdYsqDTNLYNXI6zOjfr8Gl/R9vhfTy9HPz8Y9PPzYr05847OVrpM2KgtgtlAAFgqUtzS3NLc01c01rEl8fyfZ5NSdJkkolUS0mrk39bn3h0U3vGs62iWoBCoBCoKkKgqQqCoKyKgsg1w68a7b57NXNLEJGREEQ3nWAQqCwPNw9WdZ8HP3eezzOmLJc0qDVyLrFOmVL6/JF+hOOctpatu4zu7M3dXF0JaFIVSNaOc604T0U819EODtkwsS6yrpy6eKPm4rTWN5M2iKFUejh9Y3tqFblliXaJbIKkNSCoKyKgrIqCsjUiqgqQqC8t4Om+WjdxSyQuQhBA6c94CCoAMZ3LnnjtmvJx9/BPFn0ctM2aTLWzm7jl6Jo3yYW3lY7erye6M7mpZbalUlolqI1CUFg1cw3edOt5U7XlY7Zzozz7083yfpfH1Mam6woy0MtCTXqPR6G4tupW7uOOOnJdIlqAgqCyCoLEKirEKgqCoACC41kusbLc0EEsICSw6c+nMAAAudyzE3E547Q83H6HOzwz1Y05XRNYZXLROeOsl4779yevPfNxrpqOTqObqOTrDm6K46z0jDasTpmMrTLSs2iULrFjd508Xzvt+az5z2c68zvk5N5rNg19Xl6ourqW7u4lQ5cenJdIlsAAgsAAgCgCBYKgAAksJ05dQACAhBLDpz3gAAihck3M0Z1LMqM8+uLOGeg5XoOWd+SvS89PZ18Go+l2+TuX7Gvkbj61+VtfpPn097w6PW8tTfTiO05U6YkG8aLAAiqk0MrBYLm05TsOE9EOGugbbL0nSCZLiYJjWVolAQAAEsAAAIAAAAKiyOfbh3oIASwiwiw1jeKCAAE3LMzUIsAsmNjldjDoOPP05OV7DnelOe9UmrqXN3TF3qOLvTzz02vK9ZPFj6GTw330+dPpj5U+sPkz64+RPsQ+RPsD40+yPjPsQ+TPrw+T6fYMtDLQnWaNZmSyZGbCTWVqyUBKIogAAIsAAAVLAAAE49+HoqUliwAgJLE1jeAAADrNk5zpDnnrmsTcMgAlCLBRFBQ1c6NXNl1c01c00zTSDWUNa57KgtzSoKgqUAASiTUCjLcRGS5QRKSwZsl1BQAEAAABAAAAIAAAOHp8vpoIBRAREQ1nWQAAD0IiyjOdjnOks5TcrFpItXM3lCiVVloUhQtlLc0tzS3NLELvnsqDTNKgtzSoKgqCoLENoKgzGUsSkuSxCxJdBRJQsAEKgAAQAACCwAAOHp83poiWoBEEEsNZsCCoAO7JNXFNSF1AmdEy1CLTOd5C0igBZQBUKCoLcjUQb57NM0qC3I0yNMjTI0yNMjUkTdwrbASZNSCxCpCol0FILAAELAAAAIAACCoKg4eny+qiIqABEEStAkAADaJNMjTI6XnTVwNTI0zRJDbNNMjSC3I0zSoKzTTI0gsQdOXQqCoLYKgWCwAAEsSigMxCxCpCoLc1dCUgqAgqCoLAEKgqCwCAAQqU4ery+qoiKgsQSykC2UyQAArBNsU1cU0yNXNiyC3IszK6Mo1cU0yNILcjUgtyNMjVwN5ZNdOPQ2wNsDdwNsDbA2xTTJNMw3Mw6Mq0yJlDUgsQqQ1caXcSWoKgqCwCCoKgAAAIoEEWkOXq8nqMgsAQEAGs6MwAAOTBndwXbBN3mXprlo0xE6OdNZmTpeY6uY6zA6OY6OY6OY6OeD0PJk9zw7PXnlo6b5bNMDbFNMjSDTI0zSsjTMNMw6MjVwEzDbA3Mw0zDe+XRdoAAAAABCoKgAAAEKlIF4+ryetMWVRCwEsBB057MJCoKg87FudMjcyNsDpeegyNMDeGTd506OdNsDd5jbmOnPnDS7rlOnImc5Tp38o+prweuXo5o6OdNsDo5jo5jq5U6TmOkwNudOjEOl5Usma6TI1JDTMOnbz9joSWyCoKgqUIKgqCoKgqCwFyKkKhePs8frTNgsACEVEHXj2OURFgqDyzNsqQ2yNMU3cCsDcyOmLg0yNXI0wNyQ1lirrEO949pc8vTg8+PRDi6jHeaTqwNsDdwNsw2wNsDczDbA1cVNsxd3nTWWTbI3lCos338/eXrlJazSoKgqCoKgqCoLFFzDUgqCyCs05ezx+szc0sgsQIVER24dzigsCyU8SLKg1IqojSCILcq3z1g1cVNMjTI1ILlhdM6zbrNOuZFkkNaxo69OWrJcVNM1NMjTI0yNMqqQ0kLcjbI0xTeUNXNKiFza1383ol6xJSUpCoKgqCoKgtQsgAAILAIMery+ms3NlsBLCEQQd/P6DhAsQoPCiyxLNRCoNIDNKnQzjWCoLYKgqCY6+ZeuuEj0vLTvnna1eI73hT09vJ9WPE+gT59948D3+U5s2qkKgqCoKg1IFzTebk2gtgWUejz+iXrnWJagqCkKCoKgtkLAJQgqCoBCorPo83oM6xZdRCxARECenzeg4EolFzTwXK5qCywApAg6b50mNczSCoKlGdYXHTGpZNDnO+LOdqpO2Tn0D0fS+Z9PLSWSyxfl+vpys8qWlgIKgqCoNJCoN5sNIKC3I138/oXtm5lAWEqFqCgEKgpCoKgWAQqBYM9+HUllKgsQQECejz944pKqCg8ELmpVSwBKQjWS750uNZFAABRd8tc5ZrCts6isStd+CPRyDv9D5v0E3PLyl+hfF2O3n7+dPINQAAACUAFgpCgoAL6PP3XtLJYAlLAWCoKgqCoLAAIKgAAbxS2DSAgQIQd+HY5SwQKDwC5WVUsRAsoigtMlIoiiKCiZ3k4yxVzTd51ctEvblte3bh7JPn59+I8T0eRfZ3+d6rILAAEolCLCrCKMgoKAC9uPU9ESaQALAWCoAKgsACwAAICoKQ2CwBBKIQnfh2jnmygAPDYsBBAC3NKlFgiC2CoKgtzSyU4KXC5JZTTNXedaTr7+Gs3pjx7O/k75PJ06czsxqyosrI1IKgqQ6SUiAg0lKQtlL15dD0Z1iassAKAAAAQUJZQACKEsCwubk6gKICSiQJ15dIznWaAA8KLKhLECUqCoNJTIKgqCpQUj3YXwrgudRMVlbZTfXn1M8tWXjvtkxcDvvzSPTvz9iOvGyosqCsjUg2kLEKg0g0g0g305dT0Z3magJQALAUiiKIoiiKIoiiLAsGN8zuoKjLWaksJLCbxouN4AAPAi5ELEKQ1AqDSUygoKmiX6X1D4f2e6XyfD/AEvkPgY9nkrnUTTnqtO3tjye71eKXzedg3eY6Tlo6TOlu86jpvl0Xk7+fWREqCoNxCwKkNXNLYLYN9uHc9E1maiiKIoiiKIoiiKIoiwWAACKHHtwPXLI1ZpcTWUmdZqSwllNY6cwAQ8ELkAQAssFlFzoy9P1z4v0vql8vqASLjVOV1xLx7ZPJ5/bzry9OgnSU6dOfSPH8/7fzTx45ypQus2XesWOlxpd75U5ztw1mhEDcsIAC3NLYLYNejz+g9OdTOoAAAKAAAAAASiAAELw78D1yyNWVWOmEznWamaIDpz6cwgoPnIuagpAQoFlH2fT6F0zDVxsAAkoTKM56jjdZOfL0Dy66Yq7xuOfwf0mT4P0fpjyeL7A/LZ/S/HryXCOl51e+vP1l3ltODWdZA3LCEKBYLYLZS+jz+g9UszoCUEsAoAICgAAAEAAgcPR5z2SyNWaWZ1hJLmskIDpz6cwCg+aLkCwICywfS8P6I65zVb49idOWzQAIDOOmTC0zemYnLWCXdMXQWUAS5EYOHz/AK3Y/Lz9D8k8pV1146jtx6q4yrnUsEsAKBZRZS+jzeg9YzqWKsAICgCWCKqAAAAQAAcO/nPbnWY1vBdY1EznWazLCQOvPfMqUA+cluRAAAdD6nvzFnTj0J249SazDvIKkKlIoVkc7zJ0zuCiLAQWUnOwmKN7ZOPXnxPj4+r8k6XntddeOo1y9HKxCwgQNIFlKlL38/c9gmiCwAhYBKqIqCopYLAAILAAcO3A9sQ1YixCZuakCIOvPpzAKg+dYuQAEC/U+Z+jGbhdc9eY9Xfx+ssDVzTSCoKkLlkkui2WBSSwFGbyIyG8dhy1zPN6PL9Op8L9B5o/OVDe+epenXjpc59HnuUSywNJRZRYL249j2DOiCooAIIKiqgqABYAEAQqC8O3E9cQ3c2EuSS5qSwhDty6cxYFg+eS5AAA+l9Tl0XHLtxNcO3En0Pl/RLvI3ZyOzh4T6rx+wQJjYmgogBAsnMvPfMM6Ompiplg4+vxe8aiPj+H9D+fGsF665bjrrlpeWfT5dZ0zpFlKBZS9ePU9pJpci6yCCoKgsgqCoKgqCoACAQvLpzPSg1caLEJLkksEQ68+nMXNKg+eLkAB6fN9s9cuVxnfIxYPP7vH3T28d/PXj9LydyVyO/p+f7TbItgtzoohJg3mZLM0YvMu+fWunK8xi4OXu+b706a5dZZ8P6ngPCousWXesDrmaOC51ndzoWUJS9Oez3ImiCoACCoLAqBYLAIKgsQpCwLz3g7INWUsQZsIQgOnPeAADwC5AA7/d8nrWmjjz3gzm5My809Pm3k5+ls1zvRfP7MaLrno6JDe+XUZcwzSZomdYJgNdOeyYZS8tcjh9L5Xc+j4OWS66YPDNZlXNl1c01rFLy7cbNWLLrNKC757PaJqBBFqEqUIWwABCoSwWoCCoLAZ1lOlzTVzVqCSwksSEOmN4BF0g8JbmEL05fZPbjWJdb5da5ce/I5zeDHPphLIPTw68Tt159F3YGpopTWoMY1kFJNZJz1yM6lTUoxm4Jy3zPLm8j1b8fc9ebTx8fT5pYQ1c1dXOjXPcTNi5thbrGi7xo9qWWILAWCoC1clIlACVCAFJRAJUSw1c01ZVAksJLEhDpmwgFhfFC4Sl6/f8PrVc6G8Q68OmTlnpzOWdZTOs9S4DvvG13A1rOxc9DWdcSM6KUzjWDGKQUZ1yGLknPWTy8enKrYTt7PndpcQlzKJZSpTWuezKywC2DWsaPbc6lyABYKgusxWs7MagayE1hALBQRAJQCbxo1c1bKJLlEsEDclM2BYPCNZaz9WX6PTnmXpOMrbhTtM0541zMQSdOfQxvHU3rOl0lOlzTXTnocbC6mhLDHHeEECCYQmNZJnWTwZ1mwlN41BrCXUslliyoNa57Xpn0+dMqJYTVzpfbc2UgqCoKFITpMw3KElW51kgCEAEFgqCb59C3OlWCSxJLCA0lIADwE1np+j/OfWl9S5lnPSued4NZujnnfMzcaHTJHXl1NbzVus7NxDWUJqaLVHLXIzbkksTLWCZ1DMQZsPn53myWDWbAQtyjUsCbXPZDtnj6ThNQgRrOl9ms6liCpQAlABCywLFAAIAQBAUMdeXUXNXRBmxJLAQus7MAA8KtZu52ldvPk9z53OX7Xp/P+mvr8vPovPfI59fJ6U6TWDXbn1VrGjesbKgllNM6NSZIuSRCSxJjUJmwmaJnUPnZ1lAq5sQFBLKWe/wAHWPpfO+p5ZfB38+rPVy7c15rBc6PZvn0lyCwAALAAsAFBIAAAQAWU59uHcJSoVmwSxIsG8bMgA8Wr1sc7wNa5/RPAtlq6Xlj0ZOephL9D530bOuNQ7bzpRS7xosQ0yNsw0yNZSLmwznUsmdZJnUE1kko+bjWUCkEsFA1EFSPpej5n1pr5PD6fzbOvo8fqjlOvOsUPZvn1lyAAAAAgpF304w3gQAAQqABZTj6PP6CXOlAS5IsSSidMaMgAxyvCxZ9Ad9eGXzXGjpvGprUUxjpE4/Q8Xr1OmsdjdtiVRYqyEsgqCoNIVLmJKszLCAkolU+TmywBLEsCwWwgC/U+V6V+p8r7Hjl+Z05259nJ1l4TUr0deXWWAAlCVSAiwsAFAAJUgAAAOXfz+gllWgSwksIEazoylAPDHuub7L5M6x4bnUusaje+e5res6WZ3Ix0znU9nfzelOlxDbI3IssABLszaEsIFksTM1DKjNUlD4wsVBKAIsiggsayl+v2+Z9jOvjef6nzLL6/H0rtz9HE6duPWUgAWAFAAAAAAgQABLCg4+nzeglmlFSSlksMrEms0zQslHvcYx868tRZbJrNl3rGprprnvN3FMZ6ZrXp8fbWfVedjtLk1c2yyCpSoNb56lsYsrOhEAGdIysFF+KS5qEUUBKAIEFXX1/i+xfp/K+587N+XU1n09PL6ldeXWWJQFIKQqBQIKCoASAELAAA5d/P6BYXVzSyiZ1DMpJZowUgPZ8rXCxCwsFguspem+W8a63ntdTVrjrWLPT08vtRnI6aiyXFNM02lHSJczW0xNcxFFgsujE3lWbzPki5AFWESgAAgLvA+50+Z9rOvheX6vy7HXjuz1dvP2mkFBBCgBSUBBCoKgWAlEsFgqU5d+HYWVWpYWUiysrlJZTNgssPDDWLFlgFlpA1rFzrpvj0zeuuWremNIz6vLLPVeXazry1xrpedTVzDtvz9DtOMj2Y56XGRJppVlEsM53s58vV5T5Uq4lChYsALLFLEAA6fd/PfRl+h8n7/wAyX4+/oejU+f3zqWAEAAAAACCkKgWCwACUqDn157NWVbc0tzYpKksM1EAEPANYACJQBaC652a665al7XnqXcUz6/L0s68pNTesk3ZozOvU8+/VY88cq6ayjc5joxTeufRdayMefv5U+eLBYiygEsLKWLEAssJ25U/Q3532c6+Q6eCum+PUAECwqBULAXNCUM0JQlACCxDSCaxs0zTTI3edXdwNSBJUpAD56rklqUiKIoFM0GuvKXeuW5rprnqXcBrKzt08u7PZ1+bD6k8vsPPy9HBMsbqaDVwOmuSOzltezA15fTs+BZbkABLBNQAAlsAWBO/3fzn0pfo/K+58yX5/fnuiUEKlIAAABAAIKgsAAAlM7zoINIKg0yNQFzTSUsVfnUuAUEAALIFPo47Yt8D3+KW3Fzrd5U6Xno3FpKOenFPb6PjTU/Qeb5f0E1fZmXyvQTzz1F8r16PJ13g7uXlPnhkFssoVMrAIAAlS2pSd+FP0evnfbzr83q5sAELAqAlAAEAAsACUELAWUlkNAAWABYFza0SNXI8QQsoEJRQCWdOfqPdjVOGPVK+bn3+GVIlqDW+Q7XjuN5iXlj03U8t9GLMfR+Zmz9I/O+w+vr5+pfdw8XE9OPFxs9HCWzrKiLJaSrFIABKiBEqgWUO/6D8z9SV5vT5SwAACUEKCAEKgqCoAAABCy5s2SUBYLAFIK3m5jSDyCwAVJQJQslvo82T7WPl9a9vPz8T1cfPLNa5al0llqDVzTeYl1MLLLTnDWagBAUKCOyXIlUABLKFJKiTUQpUssiierzVfbjn1lgAIAUgLAAIAAFgAAEKBnWa3LIEFQoBaQjUsEsjyjWRQAQWUCJnfOwLRACwLvnZdojTNrTKWsk1mZoWwQoBChAOtM0FASwLAAQUJUKLEADp38vploUgFBCywAAAiiAAAAEKQuNZNzWSoFgoAEDUsKg8oubc6IslTUQKFjON4sCkFAAAtlKiFF1MBCxYALAsCpUBeusagWEAlIVYAQqUCkskLKSpb6fN6gFllIAAACKAIlCUASgQsAsLjXM7Z3kShAAWCwLLCg8xWc0suallqpNZTSJc51mgsIUAUgLAAqABYAABaliKQWU66zqAlSxAosUokqIsLKqTUKCSyL6fN6ShQEAAAABALBKJQShLAsFlJjfM7ZoAgBClqSyNSwsI85bmKrOgBSxAjnLNQlWAAAAAAAAAAAAALCyw67x0iUlShLBKIKEioKWosAGdSSery+pVlUCKIUkoASgAgsAAAAQoJjfM7SwLBLABQZqi4k0F86ksqyAAssUiZxLNAWVAAAAAAAAAAAACwAO28dM2KItM3QxOuTmsEsJZUtVZSoUyonfh3irJaKEFISqASwEBSAoIoSwAlBz6czqyy1LNICUSwlsNGdSSkl4lsIssCkLAlsOQpLAAAAAKACAAAAAoIWADv15983LSFKARk5zWSLKllNWWIqookoz38/pi0WKIolgFIBKIsJQSgAC5sBQlJy68jrFiyyiUlgssEsKlC5j//2gAMAwEAAgADAAAAISkqrlqsvCENPGssIDEJGMBDMMGFJcWX0zy4vgsuMGT7kmhmM7+CNdZy4pjmvghivgsvHIFAEAEPLCMIDOMDGMDJJOBZ524+vlkpGJZfyhtvuluNLdYb2mskAICjFvAFOMMPPPNKDcPHDGNBDMDJOBeVy5TFulllppIcS3jvptuEcbd36EfNBALEMNLFPPLAIMIHPLEJCEPDGMBOIf5+y2W/olmlkGCNTo/40y+3dbRy0MILJGNAPOJKMDLDNOPDDDOMMMIDDMsBe495/wBWVMJaqqRQmWfo7qIvPtFMo6QhgSBQShSjzjCQwwwwwgAQxyzDDAQ7ic4+fsWXguoKrZCjWnnGZLItNO8dvLDxCBSiiigjByE0E03DAzjDAwwzDDAxzA4/s1GOusJa5KrQCU2WLKa/HPNRwBBDzhQj1XVSAyE123nDGHXnAwwyzzCE3vMftHWG6MIb4KxAxD3l1dppNpqixRDxQhSTmm2VgTV0wlDDDDTDAQwQwyzuc8/NfU1jYMpL4JQhAxT3113+e+ITRijxQBy1k2WXUnUlHHS0EwxzjDGBAAR/LOd+cuxEJ/4L6pD4gCQkHHFEvoKJygDBwBw1G2WWXEnGUUxjDCAAAywxzzvM/wDzbfpUKq5yqS+A++IAw89hh3CGCQs8A0AcRxIxppkZsYxw088888wwwEMN/jPzXPl0sqBK2KyqSw8EAY8shbH+UcAME8A8191UYIEkAw0MIAAAIAEc4wBBd/7PnbddCqVuC2K2OCQ8ogw8cY5BI8Eo88Q4YgMhcUAo8MAQw08wwwwwAAE85hPrPbs2+V9SOCWa2+qSmeCQ4soAswUQsIUA74wwkY4sM0IAU8gAAAEM8084Bf7fPdZkuK5uyuK2CS2KW+uIwE8o8EoUgc6buk8wwMUUgc8AQ+qAAAU4kMoAdjXnvVE0ighauOyKyOKyOCymOA04MwYOa2PT8+gc8MgKuUssAyqCCU8AU8E9hfzb1UWk28lGiG6G6GayOKyGOI400gUGyPTJ08/wMEYaWCy+CCCCCi0AU8QhVjaa8/Cu4I66G2quW6Oyme6iCMQsKCaFRNBRT8uGgEciimKWCCCCCKesUsAA4EoS4DAmkAylth4ZhUDmS+qC2yK6/wB2LcQwnGm/PlsBGmiqnoggggglvkPFOAPFNuKksnHOss105731RcTUbTYhybWT94vognxPPHVomkmkkvjiggggvgrvKFKKHtRelLeIeg086+87049z+4SxYA80J3shtp18fvlxvjpquvvsloggnitlKFKOFqicmJRGxgow1/6y86zz1/zWZVLTTYsiqr+/d/Plox35lnsggggktrgrtFKIiqviKOKKwgj8983xyy9isgjSVUl1PNirlvE93U/OK/8As+pgs4Y44JL4pJgihZ2pKhxzwEIb/wC8M+CqIsoAAhlFttJHznHrR8jXqy8p3Hzj8g7zDTzjPzvk0ga+eeG40kdDTzw80w08gEMM4V14OM9DTLBtjN07TF++3X7PcUHPf/8A7w8y75iV2jrlviBAXQwQRdffZDDOBDHoYJHXRec5Vfw8VaYf/vq5m/y9ww4w1/8Att+qXsvIppbKJ/2UEEF3kFSiBDypAnmzXWFn0mWOuu8Wvb36dgOcuf8ATnL/AN6678a1whqjostobQRXcZTcbEMH3F2UeRQUKVQfbQox3939zM7xioU956x37+y47RfGLlumoo4baQdSdaRaR+4z/wA41DHGQACjQxDwAktdPtcycF8vBTS65ohiBJeWOLSAJYhkonF2V+E3O/M9yEXlk4x5qZhgwzxuQdA/vmWSKOqAySbaLabwRdlldiCDRTX5YngL6J+JalXywjCgDoiZCjRTgABwnLNB0j1riit9PcG/jfbiDCqldY4zjnRLy257K57I7iE203ADwrWmmxwggDCIpXKtesClP58jSCFVsvta7xgQxjRzTgpa7n4N/uNf6IL7/wDPBnNffXnjlvPPOe+xZPx1VZlO0qy8h9FBxhXLbzTz/CldHz51tZx9JB1NJAU8+DRg0ooZX/8A/wBuJBI46a6+PdkLat9JqrShzzjABAA4cd/3Et3kF32EF2kEE33GE33iSU3/AP8A8/hmo6JSHQaJBtoy66/wfSfaQPNPOMqp5dVT4RucRSccWccT3880TDJZUyjgswbXFPRWXeVSafZURbYdWdLAAgEss4dReYRbsbWcRXeYwTPMjwgHDz6yzIGMYMg/gxXef+xwYWMOFceLPPIAokusk4UedbeZMSQ//wApDa4JK7LZrJ64bBiQTn0TijTJqYwao7KJKJK5boTyIY7rPc/nVkFUVxYIIJK447LKIzGRQbBiSSjRwXh+Lu6iUlPd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OpnCz9ZuVyRytnP4DD+UeCyyyCCEGXTwIYYhCEIMRb/8nDbL/wDWeG2ww22w2w2222222220tvhyfC+Atssssud1f356t/4dttttvdttstttvjbbbZBHwuyPw2WWUyzi4fu22223w7RMXDDi5TztfVlqT7ec+l26h6urgcX6R9L9Io4o4pAyIiGGGIeB6P8A8Ze4/wD8o8B//AA9D7Pp/Bf1Fxk+IzeJjNnHw+XxttttttsttttttvNtvjbbbbfOxcT+meXbbZbZlmWSy43H9lttsttvgQh9riiM6h5rMvzfrcPHrf0lx/AEQpMggsss8ltsPgT/AOs9N2ff/V/zIeP2/EuafA/hd1z6uIs/PhfA8pfDCLh/dtstttttsttttv8Azbb4Gb6Jbx7b43wzKWWXC4/vttttttlR9o8QUgxNn/RH/DYS5huJh+uQmMuIt8Ntht87bHg23yf/AFnptf0P9fkDHhjza+b9vx98ev8AF8n7xsT6uH9PIYO2t8WcGfL9222+Ntt8b/xbbbbbLbPg22HZ4N7PHl38FmKWWcPK2W22223fvC8f3v2vt8vsXjrHhz++yH58HhPx+fhm2wC//GMC5x/5eGvyBvhtttttttsss/cbbbbBuL9PDgJ8I8vBnEnw/vxvjbbbbbbZbfJvgtttulststttttsMP6LLINtttsssyzPIH9Xhtttt/K3CKYtcthzcZpetzrgIh5x+YB8szH4bv/8AJxF/Dttttthttttttttttt8dH6/A9z4/Xw4DwxjymPhOY+Rj5G+G28S+G222+Gy2222y2222228T05//AKXVDxbbbLLLLMy/vj/j4T888R+A726eQXz4YfzuA/AHjPz/AP7+f9omPH/5D1ct1/5R5B5efHNmxY8MeG2JJa/qmY8Dtf1/g8XkHl+JZs+B8jbW0J1bbbbbbbbbbbbbbbbbbDbPTxyFxV9Q2222+D4M3D9t0frw/ibtfMONndjscPDAPdgvuN79WZJHzWMv56fgXiKTFmz82fm/bwP+DxPDu/8AuvVxnX/l+QS/vfvfv4HhPw9v7wZ/U/gD/MeDwPDku3l5DuT4/qWW22223PLbbbbbbbbbfG22zbb56Lbs/b/d0/WHiHbfGyyy+G4/suK/Pg2x42PvFX6uUYXm3afBnk92pz52Xsixndy93vc08PyMa9xyilJ+9+8D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"
              alt="Thulani Lunyawo"
              className="hero-photo"
            />
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
          <a href="https://www.linkedin.com/in/thulani-lunyawo-32a2272b6/" className="btn-ghost" target="_blank" rel="noreferrer">LinkedIn</a>
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