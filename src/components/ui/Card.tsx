import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import styles from './Card.module.css';

type CombinedProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>> &
  Omit<HTMLMotionProps<'div'>, 'children'>;

interface CardProps extends CombinedProps {
  children?: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  className = '',
  ...props
}) => {
  const cardClass = [
    styles.card,
    interactive ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={cardClass}
      whileHover={interactive ? { y: -6, transition: { duration: 0.2 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export default Card;
