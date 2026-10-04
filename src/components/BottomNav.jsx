import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BottomNav = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  if (!userInfo) return null;

  const items = [
    { path: '/', label: 'Home', icon: 'H' },
    { path: userInfo.role === 'admin' ? '/admin/dashboard' : '/dashboard', label: 'Dash', icon: 'D' },
    { path: '/ranking', label: 'Rank', icon: 'R' },
    { path: '/profile', label: 'Me', icon: 'M' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((it) => {
        const active = location.pathname === it.path;
        return (
          <Link key={it.path} to={it.path} className={'bottom-nav-item' + (active ? ' active' : '')}>
            <span className="bottom-nav-icon">{it.icon}</span>
            <span className="bottom-nav-label">{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;