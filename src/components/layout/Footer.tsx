import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const githubUrl = import.meta.env.VITE_APP_GITHUB || 'https://github.com';
  const linkedinUrl = import.meta.env.VITE_APP_LINKEDIN || 'https://linkedin.com';
  const email = import.meta.env.VITE_APP_EMAIL || 'contact@example.com';

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Footer Brand Logo */}
        <div className={styles.logo}>Dillip Tripathy</div>

        {/* Social Icons Links */}
        <div className={styles.socials}>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="GitHub Profile"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={20} />
          </a>
          <a href={`mailto:${email}`} className={styles.socialIcon} aria-label="Email Contact">
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright info */}
        <p className={styles.copyright}>
          &copy; {currentYear} Dillip Tripathy. Built with React & Vite. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
