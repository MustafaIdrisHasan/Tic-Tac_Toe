import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from '../shared/PixelButton';
import styles from './LandingPage.module.css';
import { ROUTES } from '../../utils/constants';

const LandingPage = () => {
  const navigate = useNavigate();
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Trigger title animation on mount
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterGame = () => {
    navigate(ROUTES.MODES);
  };

  const features = [
    {
      icon: '⚡',
      title: 'Three Unique Modes',
      description: 'Experience classic tic-tac-toe with exciting twists: Fading Marks, Fog of War, and Gravity Drop.'
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
          <h1 className={`${styles.mainTitle} ${titleVisible ? styles.typewriterText : ''}`}>
            TIC-TAC-TOE VARIANTS
          </h1>
        </div>
        <p className={styles.subtitle}>Choose Your Challenge</p>
      </div>

      <PixelButton
        variant="primary"
        size="large"
        className={styles.enterButton}
        onClick={handleEnterGame}
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
