import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound} role="alert">
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.desc}>
        The page you are looking for does not exist, has been removed, or has had its name changed.
      </p>
      <Button onClick={() => navigate('/')}>
        <Home size={16} /> Back to Home
      </Button>
    </div>
  );
};
export default NotFound;
