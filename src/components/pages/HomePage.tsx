// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Rocket, Sparkles, Terminal, Cpu, Globe, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects, Skills, Passions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for Visual Flair ---

const SectionDivider = () => (
  <div className="w-full flex items-center justify-center py-12 opacity-30">
    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
    <div className="mx-4 text-accent-teal font-paragraph text-xs tracking-[0.2em]">SYSTEM_CHECK</div>
    <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
  </div>
);

const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent-magenta opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent-teal opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-paragraph border border-accent-teal/30 bg-accent-teal/5 text-accent-teal hover:bg-accent-teal/10 transition-colors cursor-default">
    {children}
  </span>
);

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [projects, setProjects] = useState<Projects[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [passions, setPassions] = useState<Passions[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [isLoadingPassions, setIsLoadingPassions] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  // --- Scroll & Parallax Hooks ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    loadProjects();
    loadSkills();
    loadPassions();
    generateMatrixChars();
  }, []);

  const generateMatrixChars = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]);
    setMatrixChars(charArray);
  };

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<Projects>('projects');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const loadSkills = async () => {
    try {
      const result = await BaseCrudService.getAll<Skills>('skills');
      setSkills(result.items);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setIsLoadingSkills(false);
    }
  };

  const loadPassions = async () => {
    try {
      const result = await BaseCrudService.getAll<Passions>('passions');
      setPassions(result.items);
    } catch (error) {
      console.error('Error loading passions:', error);
    } finally {
      setIsLoadingPassions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:psubhransubehera@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.name}%0D%0AEmail: ${formData.email}`;
    window.location.href = mailtoLink;
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground relative overflow-clip selection:bg-accent-teal/30 selection:text-accent-teal">
      
      {/* --- Dynamic Background Layer --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a3a] via-[#0a0a2a] to-[#050515]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        {/* Matrix Rain (Preserved & Enhanced) */}
        <div className="absolute inset-0 opacity-20">
          {matrixChars.map((char, i) => (
            <motion.div
              key={i}
              className="absolute text-accent-teal font-paragraph text-xs writing-vertical-rl"
              initial={{ y: -100, x: Math.random() * 100 + '%', opacity: 0 }}
              animate={{
                y: ['0vh', '100vh'],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: 'linear',
              }}
              style={{ left: `${(i / 50) * 100}%` }}
            >
              {char}
            </motion.div>
          ))}
        </div>
        
        {/* Parallax Stars */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/d5a106_4cd422884db5458b8ea2397f49518a0f~mv2.png?originWidth=1152&originHeight=576')] opacity-5 bg-repeat mix-blend-screen" />
      </div>

      {/* --- Progress Bar --- */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-teal to-accent-magenta z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      <Header />

      <main className="relative z-10 flex flex-col gap-0">
        
        {/* --- Hero Section: The Command Center --- */}
        <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <div className="max-w-[120rem] w-full mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Content */}
              <div className="lg:col-span-8 flex flex-col justify-center text-left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="h-px w-12 bg-accent-teal"></span>
                    <span className="font-paragraph text-accent-teal tracking-widest text-sm uppercase">System Online</span>
                  </div>
                  
                  <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.9] tracking-tight">
                    <span className="block text-white mix-blend-difference">PRIYABRATA</span>
                    <span className="block bg-gradient-to-r from-accent-teal via-white to-accent-magenta bg-clip-text text-transparent">
                      SUBHRANSU
                    </span>
                    <span className="block text-muted-gray/50">BEHERA</span>
                  </h1>

                  <p className="font-paragraph text-lg md:text-xl text-muted-gray max-w-2xl mb-10 border-l-2 border-accent-magenta/50 pl-6 py-2">
                    Full Stack Developer <span className="text-accent-teal mx-2">//</span> Space Tech Enthusiast <span className="text-accent-teal mx-2">//</span> Problem Solver
                  </p>

                  <div className="flex flex-wrap gap-6">
                    <Button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative overflow-hidden bg-transparent border border-accent-teal text-accent-teal hover:text-black hover:bg-accent-teal font-paragraph font-bold px-8 py-6 text-sm tracking-wider transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        INITIALIZE_PROJECTS <ChevronRight size={16} />
                      </span>
                    </Button>
                    
                    <Button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group relative overflow-hidden bg-transparent border border-muted-gray text-muted-gray hover:border-accent-magenta hover:text-accent-magenta font-paragraph font-bold px-8 py-6 text-sm tracking-wider transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        ESTABLISH_UPLINK <Mail size={16} />
                      </span>
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Visual Element / 3D Abstract */}
              <div className="lg:col-span-4 relative hidden lg:block h-[600px]">
                 <motion.div 
                   className="absolute inset-0 border border-accent-teal/20 rounded-full"
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 />
                 <motion.div 
                   className="absolute inset-12 border border-accent-magenta/20 rounded-full"
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-64 h-64 bg-gradient-to-br from-accent-teal/10 to-accent-magenta/10 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.2)]">
                      <Code2 size={64} className="text-white opacity-80" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-gray opacity-50"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-paragraph text-xs tracking-widest">SCROLL_TO_EXPLORE</span>
            <ArrowDown size={16} />
          </motion.div>
        </section>

        <SectionDivider />

        {/* --- Projects Section: The Data Grid --- */}
        <section id="projects" className="w-full px-6 py-24 relative">
          <div className="max-w-[100rem] mx-auto">
            
            {/* Sticky Header */}
            <div className="sticky top-24 z-30 mb-16 bg-background/80 backdrop-blur-xl py-4 border-b border-white/5">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
                    PROJECT_LOGS
                  </h2>
                  <p className="font-paragraph text-accent-teal mt-2 text-sm">
                    // DEPLOYED_SOLUTIONS
                  </p>
                </div>
                <div className="hidden md:block font-paragraph text-xs text-muted-gray">
                  TOTAL_ENTRIES: {projects.length.toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="min-h-[400px]">
              {isLoadingProjects ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[1,2,3].map(i => <div key={i} className="h-96 bg-card-background/50 animate-pulse rounded-xl" />)}
                </div>
              ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <Card className="h-full bg-card-background/40 border border-white/5 backdrop-blur-sm rounded-none overflow-hidden hover:border-accent-teal/50 transition-all duration-500 relative">
                        {/* Holographic Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-teal opacity-0 group-hover:opacity-100 transition-opacity" />

                        {project.projectImage && (
                          <div className="relative h-64 overflow-hidden">
                            <Image
                              src={project.projectImage}
                              alt={project.projectTitle || 'Project'}
                              width={600}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card-background via-transparent to-transparent opacity-90" />
                            
                            {/* Floating Badge */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 text-xs font-paragraph text-white">
                              v1.0.{index}
                            </div>
                          </div>
                        )}
                        
                        <div className="p-8 relative">
                          <h3 className="font-heading text-2xl font-bold mb-4 text-white group-hover:text-accent-teal transition-colors">
                            {project.projectTitle}
                          </h3>
                          
                          <p className="font-paragraph text-sm text-muted-gray mb-6 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                          
                          {project.techStack && (
                            <div className="flex flex-wrap gap-2 mb-8">
                              {project.techStack.split(',').map((tech, i) => (
                                <TechBadge key={i}>{tech.trim()}</TechBadge>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-gray hover:text-white transition-colors"
                                aria-label="GitHub"
                              >
                                <Github size={20} />
                              </a>
                            )}
                            {project.liveDemoUrl && (
                              <a 
                                href={project.liveDemoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-gray hover:text-accent-teal transition-colors flex items-center gap-2 font-paragraph text-xs"
                              >
                                <ExternalLink size={16} /> LIVE_DEMO
                              </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                  <p className="font-paragraph text-muted-gray">NO_DATA_FOUND_IN_SECTOR_7</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Skills Section: The Tech Constellation --- */}
        <section id="skills" className="w-full px-6 py-24 bg-black/20 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-magenta/5 to-transparent pointer-events-none" />

          <div className="max-w-[100rem] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-white">
                  <span className="text-accent-magenta">SKILL</span>_MATRIX
                </h2>
                <p className="font-paragraph text-muted-gray mt-2 max-w-md">
                  Core competencies and technical proficiencies loaded into memory.
                </p>
              </motion.div>
              
              <div className="h-px flex-grow bg-white/10 mx-8 hidden md:block" />
              
              <div className="font-paragraph text-xs text-accent-magenta/70">
                SYSTEM_STATUS: OPTIMIZED
              </div>
            </div>

            <div className="min-h-[300px]">
              {isLoadingSkills ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-32 bg-card-background/50 animate-pulse" />)}
                 </div>
              ) : skills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="group relative h-full bg-card-background/30 border border-white/5 hover:border-accent-magenta/50 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-card-background/60">
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-accent-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        
                        <div className="relative z-10 mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                          {skill.skillImage ? (
                            <Image
                              src={skill.skillImage}
                              alt={skill.skillName || 'Skill'}
                              width={48}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <Cpu className="w-12 h-12 text-muted-gray group-hover:text-accent-magenta" />
                          )}
                        </div>
                        
                        <h3 className="relative z-10 font-heading text-sm font-bold text-white mb-1">
                          {skill.skillName}
                        </h3>
                        
                        {skill.proficiencyLevel && (
                          <div className="relative z-10 w-full bg-white/5 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-magenta w-3/4" /> 
                            {/* Note: In a real app, map proficiency string to width % */}
                          </div>
                        )}
                        
                        <p className="relative z-10 font-paragraph text-[10px] text-muted-gray mt-2 uppercase tracking-wider">
                          {skill.yearsOfExperience ? `${skill.yearsOfExperience} YRS EXP` : 'MASTERY'}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="font-paragraph text-muted-gray">MODULES_OFFLINE</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Passions Section: The Mission Logs --- */}
        <section id="passion" className="w-full px-6 py-24 relative">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
                MISSION_<span className="text-accent-teal">OBJECTIVES</span>
              </h2>
              <p className="font-paragraph text-lg text-muted-gray">
                Exploring the frontiers of technology and human potential.
              </p>
            </motion.div>

            <div className="space-y-24">
              {isLoadingPassions ? (
                <div className="h-96 bg-card-background/50 animate-pulse rounded-xl" />
              ) : passions.length > 0 ? (
                passions.map((passion, index) => (
                  <motion.div
                    key={passion._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                  >
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative group">
                      <div className="absolute inset-0 bg-accent-teal/20 translate-x-4 translate-y-4 border border-accent-teal/30 z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                      <div className="relative z-10 overflow-hidden border border-white/10 bg-card-background">
                        {passion.topicImage ? (
                          <Image
                            src={passion.topicImage}
                            alt={passion.topicTitle || 'Passion'}
                            width={800}
                            className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-[400px] bg-card-background flex items-center justify-center">
                            <Rocket size={64} className="text-muted-gray" />
                          </div>
                        )}
                        {/* Overlay Scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="font-paragraph text-accent-teal text-xs">LOG_ENTRY_0{index + 1}</span>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                      
                      <h3 className="font-heading text-3xl md:text-5xl font-bold text-white">
                        {passion.topicTitle}
                      </h3>
                      
                      <p className="font-paragraph text-muted-gray leading-relaxed text-sm md:text-base border-l border-white/10 pl-6">
                        {passion.description}
                      </p>

                      {passion.inspirationalQuote && (
                        <div className="bg-accent-teal/5 border border-accent-teal/20 p-6 relative mt-8">
                          <Sparkles className="absolute -top-3 -left-3 text-accent-teal bg-background p-1" size={24} />
                          <p className="font-heading text-lg italic text-white mb-2">
                            "{passion.inspirationalQuote}"
                          </p>
                          {passion.quoteAuthor && (
                            <p className="font-paragraph text-xs text-accent-teal text-right">
                              — {passion.quoteAuthor}
                            </p>
                          )}
                        </div>
                      )}

                      {passion.relatedLink && (
                        <div className="pt-4">
                          <Button
                            asChild
                            variant="link"
                            className="text-white hover:text-accent-teal p-0 font-paragraph text-sm group"
                          >
                            <a href={passion.relatedLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              ACCESS_ARCHIVES <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center">
                  <p className="font-paragraph text-muted-gray">ARCHIVES_EMPTY</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* --- Contact Section: The Uplink --- */}
        <section id="contact" className="w-full px-6 py-24 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent-teal/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-[80rem] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div>
                  <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
                    INITIATE<br /><span className="text-accent-teal">CONTACT</span>
                  </h2>
                  <p className="font-paragraph text-muted-gray text-lg">
                    Ready to collaborate on the next generation of digital experiences.
                    Signal strength is strong.
                  </p>
                </div>

                <div className="space-y-6">
                  <a
                    href="mailto:psubhransubehera@gmail.com"
                    className="flex items-center gap-6 p-6 border border-white/5 bg-card-background/30 hover:bg-accent-teal/10 hover:border-accent-teal/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full group-hover:border-accent-teal group-hover:text-accent-teal transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-paragraph text-xs text-muted-gray mb-1">DIRECT_MAIL</p>
                      <p className="font-heading text-lg text-white">psubhransubehera@gmail.com</p>
                    </div>
                  </a>

                  <div className="grid grid-cols-2 gap-6">
                    <a
                      href="https://github.com/Priyabratasubhransubehera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-6 border border-white/5 bg-card-background/30 hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                    >
                      <Github size={24} className="text-muted-gray group-hover:text-white mb-4 transition-colors" />
                      <p className="font-paragraph text-xs text-muted-gray">REPOSITORY</p>
                      <p className="font-heading text-lg text-white">GitHub</p>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/priyabrata-subhransu-behera-a3992a369/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col p-6 border border-white/5 bg-card-background/30 hover:bg-accent-magenta/10 hover:border-accent-magenta/50 transition-all duration-300 group"
                    >
                      <Linkedin size={24} className="text-muted-gray group-hover:text-accent-magenta mb-4 transition-colors" />
                      <p className="font-paragraph text-xs text-muted-gray">NETWORK</p>
                      <p className="font-heading text-lg text-white">LinkedIn</p>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card-background/50 border border-white/10 backdrop-blur-md p-8 md:p-10 relative overflow-hidden">
                  {/* Decorative Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-teal to-accent-magenta" />
                  
                  <h3 className="font-heading text-2xl font-bold text-white mb-8">TRANSMISSION_FORM</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-paragraph text-xs text-accent-teal uppercase tracking-wider">
                        Identity
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-black/20 border-white/10 text-white font-paragraph focus:border-accent-teal focus:ring-1 focus:ring-accent-teal h-12"
                        placeholder="ENTER_NAME"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-paragraph text-xs text-accent-teal uppercase tracking-wider">
                        Return Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-black/20 border-white/10 text-white font-paragraph focus:border-accent-teal focus:ring-1 focus:ring-accent-teal h-12"
                        placeholder="ENTER_EMAIL"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-paragraph text-xs text-accent-teal uppercase tracking-wider">
                        Data Packet
                      </label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-black/20 border-white/10 text-white font-paragraph focus:border-accent-teal focus:ring-1 focus:ring-accent-teal min-h-[150px] resize-none"
                        placeholder="ENTER_MESSAGE_CONTENT..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-accent-teal text-black hover:bg-white hover:text-black font-heading font-bold py-6 text-lg transition-all duration-300 mt-4"
                    >
                      SEND_TRANSMISSION
                    </Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      
      {/* Custom Styles for specific effects */}
      <style>{`
        .writing-vertical-rl {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      `}</style>
    </div>
  );
}