import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenuHandler = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close when clicking outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLinkClass = ({ isActive }) => isActive ? styles.active : '';

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenuHandler}>
        {menuOpen ? '✖' : '☰'}
      </div>

      {/* Backdrop */}
      {menuOpen && <div className={styles.backdrop} onClick={closeMenu}></div>}

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
        ref={menuRef}
      >
        <li>
            <NavLink to="/all-todos" className={getLinkClass} onClick={closeMenu}>📝 All Todos</NavLink>
        </li>
        <li>
            <NavLink to="/add-todo" className={getLinkClass} onClick={closeMenu}>➕ Add Todo</NavLink>
        </li>
        <li>
            <NavLink to="/completed" className={getLinkClass} onClick={closeMenu}>✅ Completed</NavLink>
        </li>
        <li>
            <NavLink to="/pending" className={getLinkClass} onClick={closeMenu}>⏳ Pending</NavLink>
        </li>
        <li>
            <NavLink to="/stats" className={getLinkClass} onClick={closeMenu}>📊 Stats</NavLink>
        </li>
        <li>
            <NavLink to="/about" className={getLinkClass} onClick={closeMenu}>ℹ️ About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
