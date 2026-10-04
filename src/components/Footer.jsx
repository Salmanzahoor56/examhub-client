import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="app-footer">
      <Container>
        <Row className="g-4 mb-4">
          <Col md={4}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="brand-mark" style={{ width: 36, height: 36, fontSize: '1rem' }}></span>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Poppins' }}>
                ExamHub
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>
              A modern online examination platform for students, teachers, and administrators.
              Take exams, get instant results, and track your progress.
            </p>
            <div className="d-flex gap-3" style={{ fontSize: '1.2rem' }}>
              <a href="#" title="GitHub">GitHub</a>
              <a href="#" title="Twitter">Twitter</a>
              <a href="#" title="LinkedIn">LinkedIn</a>
            </div>
          </Col>
          <Col md={2} xs={6}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Platform
            </h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/" style={{ fontSize: '0.9rem' }}>Home</Link>
              <Link to="/login" style={{ fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" style={{ fontSize: '0.9rem' }}>Register</Link>
              <Link to="/ranking" style={{ fontSize: '0.9rem' }}>Ranking</Link>
            </div>
          </Col>
          <Col md={2} xs={6}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Features
            </h6>
            <div className="d-flex flex-column gap-2">
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Online Exams</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Instant Results</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Analytics</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Leaderboard</span>
            </div>
          </Col>
          <Col md={4}>
            <h6 style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Contact
            </h6>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span>@</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>support@examhub.com</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
              Built with MERN Stack &middot; Open Source &middot; Made with ♥ in India
            </p>
          </Col>
        </Row>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '24px 0' }} />
        <div className="text-center" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
          &copy; {new Date().getFullYear()} ExamHub. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;