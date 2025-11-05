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
  isDropping = false,
  dropDistance = 1,
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

  const dropStyle = isDropping
    ? {
        '--drop-distance': `${dropDistance}`,
        '--drop-duration': `${Math.min(0.3 + dropDistance * 0.08, 1.25).toFixed(2)}s`
      }
    : undefined;

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
      {!hidden && value !== null && (
        <span
          className={clsx(styles.cellValue, {
            [styles.dropAnimating]: isDropping
          })}
          style={dropStyle}
        >
          {value}
        </span>
      )}
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
  isDropping: PropTypes.bool,
  dropDistance: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default React.memo(GameCell);
