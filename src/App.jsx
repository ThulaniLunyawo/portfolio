import React, { useState, useEffect, useRef } from 'react';

// TypeWriter Component for AI automation
const TypeWriter = ({ text, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

// AnimatedCounter Component for AI automation
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// SmoothScrollLink Component for AI automation
const SmoothScrollLink = ({ to, children, className = '' }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.querySelector(to);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default function Portfolio() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Parking Lot Management System",
      description: "A smart parking reservation and ticket management system developed using Java, Spring Boot, JPA, and MySQL with repository and service layers.",
      details: "This project is a comprehensive parking management solution with features including real-time parking slot availability, automated ticket generation, payment processing, and booking management. Built with a robust backend architecture using Spring Boot with REST APIs, it provides seamless integration with a user-friendly interface. Key features include user authentication, reservation management, ticket tracking, and administrative dashboard for monitoring and reporting.",
      technologies: ["Java", "Spring Boot", "JPA", "MySQL", "REST API"],
      github: "https://github.com/ThulaniLunyawo/parking-system",
      demo: "#"
    },
    {
      title: "Quiz Application",
      description: "An interactive quiz application designed with modern frontend technologies and backend integration to improve user engagement and learning experiences.",
      details: "An engaging educational platform that allows users to create, take, and share quizzes. Features include multiple question types (multiple choice, true/false, short answer), real-time scoring, progress tracking, and detailed result analytics. The application supports user authentication, quiz categorization, and leaderboards. Built with modern frontend technologies for a responsive design and smooth user experience across all devices.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      github: "https://github.com/ThulaniLunyawo/quiz-app",
      demo: "#"
    },
    {
      title: "Bursary Management System",
      description: "A system developed to manage bursary applications, approvals, and student records while improving administrative efficiency.",
      details: "A comprehensive bursary management platform designed to streamline the application and approval process for educational funding. Features include online application submission, document uploads, automated eligibility checking, and approval workflows. Administrators can track applications, generate reports, and manage student records. The system improves processing time, reduces paperwork, and provides transparency for applicants throughout the approval process.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "React", "Docker"],
      github: "https://github.com/ThulaniLunyawo/bursary-system",
      demo: "#"
    },
  ];

  const skills = [
    "Java", "Spring Boot", "React", "Vue.js", "JavaScript",
    "React Native", "Python", "Node.js", "Spring Security",
    "Git & GitHub", "HTML", "CSS", "MySQL", "Agile Methodologies",
    "Scrum", "Unit Testing", "Object-Oriented Programming",
    "User Interface Design", "Software Development Lifecycle", "Team Collaboration"
  ];

  const stats = [
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" },
    { label: "Happy Clients", value: 6, suffix: "+" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-green-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto mb-8"></div>
          <p className="text-green-400 text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden">
      {/* Animated Background Elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-b from-slate-950/98 via-slate-950/95 to-slate-950/80 backdrop-blur-3xl border-b border-emerald-500/20 shadow-2xl shadow-slate-950/80 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black bg-linear-to-r from-cyan-300 via-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300">
              TL
            </h1>
            <div className="hidden md:flex items-center gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <SmoothScrollLink
                  key={id}
                  to={`#${id}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                    activeSection === id
                      ? 'bg-linear-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/40'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-white/5 border border-transparent hover:border-emerald-500/20'
                  }`}
                >
                  {label}
                </SmoothScrollLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center px-6 py-32 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-12 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-screen filter blur-3xl animate-glow"></div>
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full mix-blend-screen filter blur-3xl animate-glow" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-12 left-1/3 w-96 h-96 bg-slate-500/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mb-6 inline-block">
            <span className="text-sm font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase">Welcome to my portfolio</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter bg-linear-to-r from-cyan-200 via-emerald-300 to-lime-300 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Thulani<br/>Lunyawo
          </h1>

          <div className="h-12 mb-8">
            <p className="text-xl md:text-3xl text-transparent bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text font-semibold">
              <TypeWriter text="ICT Applications Development Graduate" speed={50} />
            </p>
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-4 font-light">
            Passionate software engineer building innovative digital solutions that solve real-world problems
          </p>

          <p className="text-gray-400 max-w-xl leading-relaxed mb-12 mx-auto">
            Specializing in full-stack development with expertise in Java, Spring Boot, React, and modern software architecture
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <SmoothScrollLink
              to="#projects"
              className="group relative bg-linear-to-r from-cyan-500 to-teal-500 text-slate-950 px-8 py-4 rounded-full font-bold shadow-2xl shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_140px_rgba(6,182,212,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </SmoothScrollLink>

            <SmoothScrollLink
              to="#contact"
              className="border-2 border-cyan-400/50 text-white px-8 py-3 rounded-full font-bold bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/15 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              Get In Touch
            </SmoothScrollLink>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-emerald-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-slate-950/50 to-slate-950/90 border-y border-emerald-500/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"></div>
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 ring-1 ring-emerald-500/20 p-8 text-center shadow-2xl shadow-emerald-500/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:ring-emerald-500/40 group-hover:shadow-[0_20px_80px_-30px_rgba(16,185,129,0.3)] backdrop-blur-sm border border-slate-700/50">
                  <div className="text-5xl md:text-6xl font-black bg-linear-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-300 text-sm md:text-base font-semibold tracking-wide">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-28 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase mb-3 block">About Me</span>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent leading-tight">
                Innovative Developer & Problem Solver
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-8 text-lg">
                Recently graduated with a <span className="text-green-400 font-bold">Diploma in ICT: Applications Development</span> from Cape Peninsula University of Technology, maintaining an impressive <span className="text-emerald-400 font-bold">77% average</span>.
              </p>

              <p className="text-gray-400 leading-8 text-lg">
                My technical expertise spans full-stack development, with specialization in Java, Spring Boot, React, and modern software architecture. Passionate about Agile methodologies, collaborative development, and creating solutions that make a real impact.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="w-2 h-16 bg-linear-to-b from-green-400 to-emerald-600 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-400 font-semibold">Always learning, constantly growing</p>
                <p className="text-xs text-gray-500 mt-1">Dedicated to mastering modern development practices</p>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500"></div>
            <div className="relative rounded-3xl p-12 shadow-2xl shadow-cyan-500/20 ring-1 ring-emerald-500/20 border border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:ring-emerald-500/40">
              <h3 className="text-2xl font-bold mb-10 text-cyan-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                Quick Details
              </h3>

              <div className="space-y-8">
                <div className="pb-6 border-b border-green-500/30">
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">📚 Qualification</p>
                  <p className="text-white font-semibold">Diploma in ICT: Applications Development</p>
                </div>

                <div className="pb-6 border-b border-green-500/30">
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">📍 Location</p>
                  <p className="text-white font-semibold">Cape Town, South Africa</p>
                </div>

                <div className="pb-6 border-b border-green-500/30">
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">🎯 Focus</p>
                  <p className="text-white font-semibold">Full-Stack Software Development</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">💡 Interests</p>
                  <div className="flex flex-wrap gap-3">
                    {["Mobile Apps", "Frontend", "Backend", "Cloud Solutions"].map((interest, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-28 bg-gradient-to-b from-slate-950/50 to-slate-950/90 border-y border-emerald-500/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase mb-3 block">My toolkit</span>
            <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Technical Skills
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/40 to-cyan-500/40 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300"></div>
                <div className="relative rounded-3xl p-6 text-center ring-1 ring-emerald-500/20 bg-gradient-to-br from-slate-900/75 to-slate-800/75 border border-slate-700/60 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_80px_-30px_rgba(16,185,129,0.4)] group-hover:ring-emerald-500/40 backdrop-blur-sm">
                  <p className="font-bold text-lg text-slate-100 group-hover:text-emerald-300 transition-colors">{skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-28 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase mb-3 block">Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500"></div>
              
              <div className="relative rounded-3xl p-8 h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-[0_50px_150px_-40px_rgba(16,185,129,0.5)] group-hover:border-emerald-500/40 backdrop-blur-md overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300"></div>

                <div className="relative flex-grow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-500/20 to-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/20">
                      <span className="text-lg">→</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{project.title}</h3>
                  </div>

                  <p className="text-gray-300 leading-7 text-sm mb-6 min-h-20">
                    {expandedProject === index ? project.details : project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-linear-to-r from-green-500/20 to-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-green-500/40 shadow-lg shadow-green-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative flex gap-3 pt-6 border-t border-emerald-500/20">
                  <button
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    className="flex-1 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-full font-bold transition-all duration-300 text-sm shadow-lg shadow-green-500/30 hover:shadow-green-500/50 group-hover:translate-x-0"
                  >
                    {expandedProject === index ? "Show Less" : "Learn More"}
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-4 py-3 rounded-full font-bold transition-all duration-300 text-sm shadow-lg shadow-slate-500/20 hover:shadow-slate-500/40"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-28 bg-gradient-to-b from-slate-950/50 to-slate-950/90 border-y border-emerald-500/20 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase mb-3 block">Professional Journey</span>
            <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Work Experience
            </h2>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-500"></div>
            
            <div className="relative bg-linear-to-br from-slate-900/95 to-slate-800/95 border border-emerald-500/20 rounded-3xl p-12 shadow-2xl shadow-emerald-500/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_40px_120px_-40px_rgba(16,185,129,0.4)] group-hover:border-emerald-500/40 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-emerald-500/5 to-cyan-500/5 rounded-full -z-0 blur-3xl"></div>
              
              <div className="relative flex items-start gap-6 mb-6">
                <div className="w-2 h-20 bg-linear-to-b from-green-400 via-emerald-500 to-cyan-600 rounded-full shadow-lg shadow-emerald-500/30"></div>
                <div>
                  <h3 className="text-4xl font-black text-transparent bg-linear-to-r from-green-300 to-emerald-300 bg-clip-text">Plum Systems</h3>
                  <p className="text-emerald-400 mt-2 font-bold text-lg">Software Development Experience</p>
                </div>
              </div>

              <p className="text-gray-300 leading-8 text-lg relative">
                Collaborated with experienced developers to troubleshoot and resolve coding issues, participated in comprehensive code reviews, debugged complex applications, and attended daily Agile stand-up meetings. Gained practical experience in professional development practices, best practices, and collaborative team environments. Contributed to meaningful improvements in software quality and overall user experience.
              </p>

              <div className="mt-8 pt-8 border-t border-emerald-500/20 flex gap-6 flex-wrap">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Type</p>
                  <p className="text-emerald-300 font-bold">Professional Experience</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Technologies</p>
                  <p className="text-emerald-300 font-bold">Java, Spring, React, Git</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Impact</p>
                  <p className="text-emerald-300 font-bold">Quality Improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-28 text-center max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold text-transparent bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text tracking-widest uppercase mb-3 block">Get in touch</span>
          <h2 className="text-5xl md:text-6xl font-black bg-linear-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent mb-8">
            Let's Connect
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-8 mb-4 max-w-2xl mx-auto">
            I'm actively seeking graduate opportunities, internships, and software development roles where I can continue learning and growing within the tech industry.
          </p>

          <p className="text-gray-400 max-w-xl mx-auto">
            Feel free to reach out via email or any of my social platforms. I'm excited to discuss opportunities and collaborate on innovative projects!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <a
            href="https://www.linkedin.com/in/thulani-lunyawo-32a2272b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/ThulaniLunyawo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-950 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-slate-500/40 hover:shadow-slate-500/60 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </span>
          </a>

          <a
            href="mailto:tyesilunyawo@gmail.com"
            className="group relative bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 transform hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </span>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="tel:0655177003"
            className="group relative border-2 border-green-400/60 hover:border-green-400 bg-green-500/5 hover:bg-green-500/15 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-green-500/20 transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              065 517 7003
            </span>
          </a>

          <a
            href="tel:0631659762"
            className="group relative border-2 border-emerald-400/60 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 backdrop-blur-sm shadow-lg shadow-emerald-500/20 transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              063 165 9762
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-emerald-500/20 bg-gradient-to-r from-slate-950/80 to-slate-950/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">© 2026 Thulani Lunyawo. All rights reserved.</p>
              <p className="text-emerald-400/60 text-xs mt-1">Crafted with passion and code 💜</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#home" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-semibold">Back to top</a>
              <div className="w-1 h-4 bg-gradient-to-b from-emerald-500/30 to-emerald-500/0 rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

