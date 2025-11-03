import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './GameBoard.module.css';

const GameCell = ({ 
  value, 
  onClick, 
  disabled, 
  hidden, 
  opacity = 1, 
  isWinner = false,
  x, 
  y 
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(x, y);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick(x, y);
    }
  };

  return (
    <div
      className={clsx(styles.gameCell, {
        [styles.disabled]: disabled,
        [styles.hidden]: hidden,
        [styles.winner]: isWinner,
        [styles.fading]: opacity < 1
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ opacity }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Cell ${x}, ${y}${value ? `, contains ${value}` : ', empty'}`}
    >
      {!hidden && value}
    </div>
  );
};

GameCell.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  opacity: PropTypes.number,
  isWinner: PropTypes.bool,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default React.memo(GameCell);
