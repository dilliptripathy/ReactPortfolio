import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: 'easeIn' as const,
    },
  },
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <motion.main
        id="main-content"
        className={styles.main}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
};
export default PageLayout;
