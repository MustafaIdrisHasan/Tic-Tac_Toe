import React from 'react';
import clsx from 'clsx';
import styles from './shared.module.css';

const PixelButton = ({
  children,
  onClick,
  disabled = false,
  variant = 'default',
  size = 'medium',
  className,
  type = 'button',
  ...props
}) => {
  const buttonClasses = clsx(
    styles.pixelButton,
    {
      [styles.primary]: variant === 'primary',
      [styles.secondary]: variant === 'secondary',
      [styles.danger]: variant === 'danger',
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
    },
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
