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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Loading Portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TL
            </h1>
            <div className="hidden md:flex items-center gap-8">
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
                  className={`text-sm font-semibold transition-all duration-300 relative ${
                    activeSection === id
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                  {activeSection === id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                  )}
                </SmoothScrollLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 pt-24 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/50 rounded-full">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Welcome to my portfolio</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Thulani</span>
            <br/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Lunyawo</span>
          </h1>

          <div className="h-12 mb-8">
            <p className="text-xl md:text-2xl font-semibold text-gray-300">
              <TypeWriter text="ICT Applications Development Graduate" speed={50} />
            </p>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-12 mx-auto">
            Passionate software engineer crafting innovative digital solutions with modern technologies and creative design
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            <SmoothScrollLink
              to="#projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transform hover:scale-105"
            >
              View My Work
            </SmoothScrollLink>

            <SmoothScrollLink
              to="#contact"
              className="px-8 py-4 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 font-bold rounded-lg transition-all duration-300"
            >
              Get In Touch
            </SmoothScrollLink>
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
      <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>

            <p className="text-gray-300 leading-8 text-lg mb-6">
              I recently graduated with a <span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Diploma in ICT: Applications Development</span> from the Cape Peninsula University of Technology, maintaining an impressive average of <span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">77%</span>.
            </p>

            <p className="text-gray-300 leading-8 text-lg">
              My technical expertise spans full-stack development with specialization in Java, Spring Boot, React, and modern software architecture. I'm passionate about Agile methodologies and collaborative team development.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 border border-purple-500/50 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Quick Details</h3>

            <div className="space-y-6">
              <div className="pb-4 border-b border-purple-500/30">
                <p className="text-gray-300"><span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">📚 Qualification:</span><br/> Diploma in ICT: Applications Development</p>
              </div>

              <div className="pb-4 border-b border-purple-500/30">
                <p className="text-gray-300"><span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">📍 Location:</span><br/> Cape Town, South Africa</p>
              </div>

              <div className="pb-4 border-b border-purple-500/30">
                <p className="text-gray-300"><span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">🎯 Focus:</span><br/> Full-Stack Software Development</p>
              </div>

              <div>
                <p className="text-gray-300"><span className="font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">💡 Interests:</span><br/> Mobile Apps, Frontend & Backend Development, Cloud Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-24 bg-gradient-to-r from-slate-900/50 to-purple-900/50 border-y border-purple-500/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 border border-purple-500/30 p-4 text-center rounded-lg hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-105"
              >
                <p className="font-semibold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
        <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 border border-purple-500/30 p-8 rounded-2xl transition-all duration-300 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>

              <div className="relative">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400">{project.title}</h3>

                <p className="text-gray-300 leading-7 text-sm mb-4">
                  {expandedProject === index ? project.details : project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm shadow-lg shadow-purple-500/50"
                  >
                    {expandedProject === index ? "Show Less" : "Learn More"}
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-24 bg-gradient-to-r from-slate-900/50 to-purple-900/50 border-y border-purple-500/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>

          <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-12 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1.5 h-16 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              <div>
                <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Plum Systems</h3>
                <p className="text-purple-400 mt-2 font-semibold">Software Development Experience</p>
              </div>
            </div>

            <p className="text-gray-300 mt-6 leading-8 text-lg">
              Collaborated with team members to troubleshoot and resolve coding issues, participated in code reviews, debugged applications, attended Agile stand-up meetings, and contributed to improving software quality and user experience. Gained practical experience in professional development practices and team collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 text-center max-w-5xl mx-auto">
        <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>

        <p className="text-gray-300 text-xl leading-8 mb-12 max-w-2xl mx-auto">
          I'm actively seeking graduate opportunities, internships, and software development roles where I can continue learning and growing within the tech industry.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <a
            href="https://www.linkedin.com/in/thulani-lunyawo-32a2272b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/50 transform hover:scale-105"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/ThulaniLunyawo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-slate-500/50 transform hover:scale-105"
          >
            GitHub
          </a>

          <a
            href="mailto:tyesilunyawo@gmail.com"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-purple-500/50 transform hover:scale-105"
          >
            Email
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="tel:0655177003"
            className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-sm"
          >
            📞 065 517 7003
          </a>

          <a
            href="tel:0631659762"
            className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-sm"
          >
            📞 063 165 9762
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-purple-500/30 text-center text-gray-400 text-sm bg-slate-900/50">
        <p>© 2026 Thulani Lunyawo. All rights reserved. | Crafted with passion 💜</p>
      </footer>
    </div>
  );
}

