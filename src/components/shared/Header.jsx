import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './shared.module.css';
import { ROUTES } from '../../utils/constants';
import logoImage from '../../assets/images/good_logo_1-removebg-preview.png';

const Header = () => {
  const location = useLocation();
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Trigger title animation on mount
    const timer = setTimeout(() => {
      setTitleVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.MODES, label: 'Modes' },
    { path: ROUTES.STATS, label: 'Stats' },
    { path: ROUTES.SETTINGS, label: 'Settings' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerTitleContainer}>
        <img src={logoImage} alt="Tic-Tac-Toe Logo" className={styles.headerLogo} />
        <div className={styles.typewriterContainer}>
          <h1 className={styles.headerTitle}>
            <Link to={ROUTES.HOME} className={styles.headerTitleLink} aria-label="Home page">
              <span className={titleVisible ? styles.typewriterText : ''}>
                TIC-TAC-TOE VARIANTS
              </span>
            </Link>
          </h1>
        </div>
      </div>
      
      <nav className={styles.headerNav} aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(styles.headerNavLink, {
              [styles.active]: location.pathname === item.path
            })}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
