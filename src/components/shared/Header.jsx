import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './shared.module.css';
import { ROUTES } from '../../utils/constants';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.MODES, label: 'Modes' },
    { path: ROUTES.STATS, label: 'Stats' },
    { path: ROUTES.SETTINGS, label: 'Settings' },
  ];

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        <Link to={ROUTES.HOME} className={styles.headerNavLink} aria-label="Home page">
          TIC-TAC-TOE VARIANTS
        </Link>
      </h1>
      
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
