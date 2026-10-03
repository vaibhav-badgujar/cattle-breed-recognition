import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const links = [
    { to: '/', label: 'Home' },
    { to: '/predict', label: 'Predict Breed' },
    { to: '/breeds', label: 'Breed Library' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar-shell">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)} aria-label="CattleAI home">
          <span className="brand-mark" aria-hidden="true"><span>⌁</span></span>
          <span className="brand-text">Cattle<span>AI</span></span>
        </NavLink>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
          <span /><span /><span />
        </button>
        <div className={`nav-actions ${open ? 'open' : ''}`}>
          <nav className="navbar-links" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav-link" onClick={() => setOpen(false)}>{link.label}</NavLink>
            ))}
          </nav>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '◐'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
