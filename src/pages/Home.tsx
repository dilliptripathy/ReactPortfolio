import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Dillip Tripathy';

  return (
    <section className={styles.hero} aria-label="Introduction Hero">
      <div className={`${styles.container} container`}>
        {/* Content Details */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className={styles.greeting}>Welcome to my space</span>
          <h1 className={styles.title}>
            Hi, I'm <br />
            <span className={styles.gradientText}>{appTitle.split('|')[0].trim()}</span>
          </h1>
          <p className={styles.subtitle}>
            A Senior Software Engineer and Frontend Architect dedicated to building high-performance,
            scalable, and accessible web experiences with clean and maintainable React architecture.
          </p>

          <div className={styles.actions}>
            <Button onClick={() => navigate('/projects')} variant="primary" size="lg">
              View Work <ArrowRight size={18} />
            </Button>
            <Button onClick={() => navigate('/contact')} variant="outline" size="lg">
              Let's Talk
            </Button>
          </div>
        </motion.div>

        {/* Visual Graphic Representation */}
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.shape} aria-hidden="true" />
          <div className={styles.visualCard}>
            <div className={styles.visualAvatar} aria-hidden="true">
              DT
            </div>
            <div className={styles.visualDetails}>
              <h2 className={styles.visualName}>Dillip Tripathy</h2>
              <p className={styles.visualRole}>Senior Software Engineer</p>
            </div>
            <div className={styles.badgeContainer}>
              <span className={styles.techBadge}>React.js</span>
              <span className={styles.techBadge}>TypeScript</span>
              <span className={styles.techBadge}>Next.js</span>
              <span className={styles.techBadge}>CSS Modules</span>
              <span className={styles.techBadge}>Node.js</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Home;
