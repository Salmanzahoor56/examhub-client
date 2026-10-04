import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoutHandler = () => dispatch(logout());

  return (
    <header className="app-header" style={{ boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.12)' : 'none' }}>
      <Navbar expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span className="brand-mark">EH</span>
              <span>ExamHub</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center" activeKey={location.pathname}>
              <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              {userInfo ? (
                <>
                  <LinkContainer to={userInfo.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                    <Nav.Link> Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/ranking">
                    <Nav.Link>Ranking</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={' ' + (userInfo.name ? userInfo.name.split(' ')[0] : 'User')}
                    id="username"
                    align="end"
                  >
                    <NavDropdown.Header>
                      <div className="fw-bold">{userInfo.name}</div>
                      <small className="text-muted">{userInfo.email}</small>
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
