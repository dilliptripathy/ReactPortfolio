import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../components/common/Icons';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  category: 'frontend' | 'fullstack';
  shortDesc: string;
  longDesc: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Admin Dashboard',
    category: 'frontend',
    shortDesc: 'A high-performance dashboards tracking sales data, inventory management, and charts analysis.',
    longDesc:
      'This application features modular UI grids, customized dark/light mode sync, interactive chart representations (Recharts), and strict compliance with WCAG accessibility patterns. Responsive design optimized for tablet and desktop viewports.',
    tags: ['React.js', 'TypeScript', 'Recharts', 'CSS Modules'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 2,
    title: 'Collaborative Workspace Platform',
    category: 'fullstack',
    shortDesc: 'A real-time workspace for task assignments, team chats, and progress timelines.',
    longDesc:
      'Designed and engineered the full-stack architecture for a collaborative task board. Implemented web sockets for real-time chat updates and robust database state sync. Integrates custom hooks for managing connection statuses.',
    tags: ['Next.js', 'Node.js', 'WebSockets', 'MongoDB'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Accessible Music Player App',
    category: 'frontend',
    shortDesc: 'Highly accessible digital audio player featuring voice guidelines and visual equalizers.',
    longDesc:
      'A digital music player built with severe focus on web accessibility (a11y). Complete keyboard focus index bindings, customizable font resizing, contrast modifiers, and integrated visual equalizer animations using Framer Motion.',
    tags: ['React.js', 'Web Audio API', 'Framer Motion', 'a11y'],
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal when pressing Escape key (a11y accessibility best practice)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = projectsData.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section className={styles.projects} aria-label="Projects Showcase">
      <div className="container">
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          My <span className={styles.titleGradient}>Projects</span>
        </motion.h1>

        {/* Filter Navigation Tabs */}
        <div className={styles.filters} role="tablist" aria-label="Filter projects">
          {(['all', 'frontend', 'fullstack'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilterBtn : ''}`}
              role="tab"
              aria-selected={filter === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  interactive
                  onClick={() => setSelectedProject(project)}
                  className={styles.cardContent}
                >
                  <div className={styles.imageWrapper}>
                    <span className={styles.imagePlaceholder}>{project.title.substring(0, 2)}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.shortDesc}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      {project.tags.slice(0, 2).map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className={styles.moreLink}>
                      Details <ArrowRight size={14} />
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Overlay Detail View */}
        <AnimatePresence>
          {selectedProject && (
            <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
              <motion.div
                className={styles.modalContent}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-project-title"
              >
                <button
                  className={styles.closeBtn}
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close details dialog"
                >
                  <X size={18} />
                </button>

                <div className={styles.modalImage}>
                  <span className={styles.imagePlaceholder}>{selectedProject.title.substring(0, 2)}</span>
                </div>

                <div className={styles.modalBody}>
                  <h2 id="modal-project-title" className={styles.modalTitle}>
                    {selectedProject.title}
                  </h2>
                  <div className={styles.modalMeta}>
                    {selectedProject.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className={styles.modalDesc}>{selectedProject.longDesc}</p>

                  <div className={styles.modalFooter}>
                    <Button
                      onClick={() => window.open(selectedProject.demoUrl, '_blank')}
                      variant="primary"
                    >
                      Live Demo <ExternalLink size={16} />
                    </Button>
                    <Button
                      onClick={() => window.open(selectedProject.repoUrl, '_blank')}
                      variant="outline"
                    >
                      GitHub Repo <GithubIcon size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Projects;
