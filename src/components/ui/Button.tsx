import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type CombinedProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>> &
  Omit<HTMLMotionProps<'button'>, 'children'>;

interface ButtonProps extends CombinedProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const buttonClass = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading ? styles.loading : '',
    disabled || isLoading ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={buttonClass}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {isLoading && <span className={styles.loadingSpinner} aria-hidden="true" />}
      {children}
    </motion.button>
  );
};
export default Button;
