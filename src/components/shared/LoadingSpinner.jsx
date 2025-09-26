import React from 'react';
import clsx from 'clsx';
import styles from './shared.module.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  className,
  showText = true 
}) => {
  const spinnerClasses = clsx(
    styles.loadingSpinner,
    {
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
    },
    className
  );

  if (!showText) {
    return <div className={spinnerClasses} />;
  }

  return (
    <div className={styles.loadingContainer}>
      <div className={spinnerClasses} />
      {text && <div className={styles.loadingText}>{text}</div>}
    </div>
  );
};

export default LoadingSpinner;
