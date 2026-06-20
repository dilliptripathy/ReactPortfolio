import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface TimelineItem {
  role: string;
  company: string;
  date: string;
  description: string;
}

const skillsData: SkillCategory[] = [
  {
    title: 'Core Development & Languages',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3/SCSS', 'SQL', 'GraphQL'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React.js', 'Next.js', 'Redux Toolkit', 'Framer Motion', 'TailwindCSS', 'Express.js'],
  },
  {
    title: 'Developer Tools & Workflows',
    skills: ['Git & GitHub', 'Vite', 'Webpack', 'ESLint & Prettier', 'Jest', 'Docker'],
  },
];

const timelineData: TimelineItem[] = [
  {
    role: 'Senior Software Engineer & Architect',
    company: 'Tech Solutions Corp',
    date: '2023 - Present',
    description:
      'Led a team of developers in migrating legacy frontend architectures to Next.js and React 18/19. Optimized website performance, improving Core Web Vitals scores by 35%. Defined reusable component libraries and styling guidelines.',
  },
  {
    role: 'Frontend Developer',
    company: 'Innovate Web Labs',
    date: '2020 - 2023',
    description:
      'Developed responsive, accessible, and high-performance client applications. Collaborated closely with designers to implement state-of-the-art UI/UX patterns and micro-interactions.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'StartUp Studio',
    date: '2019 - 2020',
    description:
      'Assisted in building responsive web widgets and integrations. Refactored utility scripts and maintained unit tests using Jest.',
  },
];

export const About: React.FC = () => {
  return (
    <section className={styles.about} aria-label="About Me Section">
      <div className="container">
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          About <span className={styles.titleGradient}>Me</span>
        </motion.h1>

        {/* Bio and Skills Section */}
        <div className={styles.bioSection}>
          <motion.div
            className={styles.bioContent}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className={styles.highlightText}>
              I build scalable, modern, and user-centric web applications with strict adherence to
              clean code and solid architectural patterns.
            </p>
            <p>
              With over half a decade of engineering experience, I specialize in the React ecosystem,
              focusing on performance optimization, component reusability, and standard-compliant web
              accessibility.
            </p>
            <p>
              I believe in writing code that is not only functional but readable, maintainable, and
              scalable for future enhancements.
            </p>
          </motion.div>

          <motion.div
            className={styles.skillsContainer}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skillsData.map((category, idx) => (
              <div key={idx} className={styles.skillsCategory}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.skillsGrid}>
                  {category.skills.map((skill) => (
                    <span key={skill} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience Timeline Section */}
        <div className={styles.timelineSection}>
          <h2 className={styles.timelineTitle}>My Professional Journey</h2>
          <div className={styles.timeline}>
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={styles.timelineItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={styles.timelineDot} aria-hidden="true" />
                <div className={styles.timelineHeader}>
                  <div>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <span className={styles.company}>{item.company}</span>
                  </div>
                  <span className={styles.timelineDate}>{item.date}</span>
                </div>
                <p className={styles.timelineBody}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
