import React from 'react';
import PropTypes from 'prop-types';
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

PixelButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  type: PropTypes.string
};

export default React.memo(PixelButton);
