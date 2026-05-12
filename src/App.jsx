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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-400 mx-auto mb-8"></div>
          <p className="text-green-400 text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black border-b border-green-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-400">
              TL
            </h1>
            <div className="hidden md:flex items-center gap-6">
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
                  className={`px-4 py-2 text-sm transition-colors ${
                    activeSection === id
                      ? 'text-green-400 border-b-2 border-green-400'
                      : 'text-gray-300 hover:text-green-400'
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
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 pt-24 bg-black">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-green-400">
            Thulani Lunyawo
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8">
            <TypeWriter text="ICT Applications Development Graduate" speed={50} />
          </p>

          <p className="text-gray-400 max-w-xl leading-relaxed mb-12 mx-auto">
            Passionate software engineer building innovative digital solutions that solve real-world problems
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <SmoothScrollLink
              to="#projects"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              View My Work
            </SmoothScrollLink>

            <SmoothScrollLink
              to="#contact"
              className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
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
      <section id="about" className="px-6 py-24 max-w-6xl mx-auto bg-gray-900">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400">
              About Me
            </h2>

            <p className="text-gray-300 leading-8 text-lg mb-6">
              Recently graduated with a Diploma in ICT in Applications Development from the Cape Peninsula University of Technology, maintaining an impressive average of <span className="text-green-400 font-bold">77%</span>.
            </p>

            <p className="text-gray-400 leading-8 text-lg">
              My technical expertise spans full-stack development, with specialization in Java, Spring Boot, React, and modern software architecture. I'm passionate about Agile methodologies and collaborative team development.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg border border-green-800">
            <h3 className="text-2xl font-bold mb-6 text-green-400">Quick Details</h3>

            <div className="space-y-4">
              <div className="pb-4 border-b border-green-700">
                <p className="text-gray-300"><span className="text-green-400 font-bold">📚 Qualification:</span><br/> Diploma in ICT: Applications Development</p>
              </div>

              <div className="pb-4 border-b border-green-700">
                <p className="text-gray-300"><span className="text-green-400 font-bold">📍 Location:</span><br/> Cape Town, South Africa</p>
              </div>

              <div className="pb-4 border-b border-green-700">
                <p className="text-green-400 font-bold">🎯 Focus:<br/> Full-Stack Software Development</p>
              </div>

              <div>
                <p className="text-gray-300"><span className="text-green-400 font-bold">💡 Interests:</span><br/> Mobile Apps, Frontend & Backend Development, Cloud Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-24 bg-black border-t border-green-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-400">
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 text-center rounded-lg border border-green-700 hover:border-green-600 transition-colors"
              >
                <p className="font-semibold text-lg text-gray-100">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-24 max-w-6xl mx-auto bg-gray-900">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-400">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-lg border border-green-700 hover:border-green-600 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-400">{project.title}</h3>

              <p className="text-gray-300 leading-7 text-sm mb-4">
                {expandedProject === index ? project.details : project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-green-800 text-green-300 px-3 py-1 rounded text-xs font-medium border border-green-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors text-sm"
                >
                  {expandedProject === index ? "Show Less" : "Learn More"}
                </button>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-semibold transition-colors text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-24 bg-black border-t border-green-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-green-400">
            Professional Experience
          </h2>

          <div className="bg-gray-800 p-8 rounded-lg border border-green-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-1 h-12 bg-green-400 rounded-full"></div>
              <div>
                <h3 className="text-2xl font-bold text-green-400">Plum Systems</h3>
                <p className="text-green-300 mt-1 font-semibold">Software Development Experience</p>
              </div>
            </div>

            <p className="text-gray-300 mt-6 leading-8 text-lg">
              Collaborated with team members to troubleshoot and resolve coding issues, participated in code reviews, debugged applications, attended Agile stand-up meetings, and contributed to improving software quality and user experience. Gained practical experience in professional development practices and team collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 text-center max-w-5xl mx-auto bg-gray-900">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-400">
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/ThulaniLunyawo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            GitHub
          </a>

          <a
            href="mailto:tyesilunyawo@gmail.com"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            Email
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="tel:0655177003"
            className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            📞 065 517 7003
          </a>

          <a
            href="tel:0631659762"
            className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-bold transition-colors"
          >
            📞 063 165 9762
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-green-800 text-center text-gray-400 text-sm bg-black">
        <p>© 2026 Thulani Lunyawo. All rights reserved.</p>
      </footer>
    </div>
  );
}

