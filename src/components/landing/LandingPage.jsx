import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../shared/PixelButton';
import styles from './LandingPage.module.css';
import { ROUTES } from '../../utils/constants';

const LandingPage = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const text = 'TIC-TAC-TOE VARIANTS';

  useEffect(() => {
    let timeout;
    
    if (!isDeleting && displayedText === text) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Pause before typing again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else if (isDeleting) {
      // Delete character
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length - 1));
      }, 50);
    } else {
      // Type character
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text]);

  const handleEnterGame = () => {
    navigate(ROUTES.MODES);
  };

  const features = [
    {
      icon: '⚡',
      title: 'Four Unique Modes',
      description: 'Experience classic tic-tac-toe and exciting variants: Fading Marks, Fog of War, and Gravity Drop.'
    },
    {
      icon: '🤖',
      title: 'Smart AI Opponent',
      description: 'Challenge yourself against AI with multiple difficulty levels, from beginner to expert.'
    },
    {
      icon: '🎮',
      title: 'Retro Pixel Art',
      description: 'Enjoy a nostalgic gaming experience with authentic pixel-art graphics and animations.'
    }
  ];

  return (
    <div className={styles.landingPage}>
      <div className={styles.backgroundPattern} />
      
      <div className={styles.titleContainer}>
        <div className={styles.typewriterContainer}>
          <h1 className={styles.mainTitle}>
            <span className={styles.typewriterText}>
              {displayedText}
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
        </div>
        <p className={styles.tagline}>
          Classic Tic-Tac-Toe Reimagined with Four Exciting Game Modes - Fading Marks, Fog of War, Gravity Drop & More!
        </p>
        <p className={styles.subtitle}>Choose Your Challenge</p>
      </div>

      <PixelButton
        variant="primary"
        size="large"
        className={styles.enterButton}
        onClick={handleEnterGame}
        aria-label="Enter game and choose mode"
      >
        ENTER GAME
      </PixelButton>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
