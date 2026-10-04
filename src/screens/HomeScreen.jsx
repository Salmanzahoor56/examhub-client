import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge"> Built with the MERN Stack</div>

          <h1>Modern Online<br />Examination Platform</h1>

          <p>
            Create, take, and evaluate exams seamlessly. Instant results,
            automatic grading, and detailed analytics — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn btn-hero-primary">Get Started</Link>
            <Link to="/register" className="btn btn-hero-secondary">Create Free Account</Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="num">500+</div>
              <div className="lbl">Exams Taken</div>
            </div>
            <div className="hero-stat">
              <div className="num">1200+</div>
              <div className="lbl">Students</div>
            </div>
            <div className="hero-stat">
              <div className="num">99.9%</div>
              <div className="lbl">Accuracy</div>
            </div>
            <div className="hero-stat">
              <div className="num">24/7</div>
              <div className="lbl">Available</div>
            </div>
          </div>
        </div>
      </div>

      <Container>
        <h2 className="section-title">Everything you need to run exams</h2>
        <p className="section-subtitle">Built for students, teachers, and administrators alike</p>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon indigo">S</div>
                <Card.Title>For Students</Card.Title>
                <Card.Text className="text-muted">Register instantly, take exams from any device, and receive results within seconds.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon cyan">T</div>
                <Card.Title>For Teachers</Card.Title>
                <Card.Text className="text-muted">Create exams, add multiple-choice and true/false questions, and schedule tests easily.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <div className="feature-icon green">A</div>
                <Card.Title>For Administrators</Card.Title>
                <Card.Text className="text-muted">Manage users, monitor exam activity, and generate detailed reports with one click.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mb-5" style={{ marginTop: 80 }}>
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
          <Row className="g-4">
            <Col md={4}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '36px 24px', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', position: 'relative', height: '100%', border: '1px solid #f1f5f9' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '3rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>01</div>
                <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.6rem', marginBottom: 20 }}></div>
                <h4 style={{ marginBottom: 12 }}>Create Account</h4>
                <p style={{ color: '#64748b', marginBottom: 0 }}>Sign up in seconds with your email.</p>
              </div>
            </Col>
            <Col md={4}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '36px 24px', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', position: 'relative', height: '100%', border: '1px solid #f1f5f9' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '3rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>02</div>
                <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #06b6d4, #0891b2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.6rem', marginBottom: 20 }}></div>
                <h4 style={{ marginBottom: 12 }}>Take the Exam</h4>
                <p style={{ color: '#64748b', marginBottom: 0 }}>Answer questions with our live timer.</p>
              </div>
            </Col>
            <Col md={4}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '36px 24px', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', position: 'relative', height: '100%', border: '1px solid #f1f5f9' }}>
                <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '3rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1 }}>03</div>
                <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.6rem', marginBottom: 20 }}></div>
                <h4 style={{ marginBottom: 12 }}>Get Instant Results</h4>
                <p style={{ color: '#64748b', marginBottom: 0 }}>See your score, grade, and rank instantly.</p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="text-center mb-5" style={{ marginTop: 80 }}>
          <h2 className="section-title">Why students love ExamHub</h2>
          <p className="section-subtitle">Powerful features packed in a beautiful interface</p>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}></div>
                <h5 style={{ marginBottom: 8, fontSize: '1rem' }}>Lightning Fast</h5>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: 0 }}>Results in milliseconds</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}></div>
                <h5 style={{ marginBottom: 8, fontSize: '1rem' }}>Secure</h5>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: 0 }}>JWT-based authentication</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}></div>
                <h5 style={{ marginBottom: 8, fontSize: '1rem' }}>Mobile Ready</h5>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: 0 }}>Perfect on any device</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ background: '#fff', borderRadius: 16, padding: '28px 20px', textAlign: 'center', boxShadow: '0 4px 20px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}></div>
                <h5 style={{ marginBottom: 8, fontSize: '1rem' }}>Analytics</h5>
                <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: 0 }}>Detailed performance insights</p>
              </div>
            </Col>
          </Row>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: 24, padding: '60px 40px', textAlign: 'center', marginTop: 80, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', borderRadius: '50%' }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ color: '#fff', fontSize: '2.2rem', marginBottom: 14, fontWeight: 800 }}>Ready to ace your next exam?</h2>
            <p style={{ opacity: 0.85, maxWidth: 520, margin: '0 auto 32px', fontSize: '1.05rem' }}>Join thousands of students already using ExamHub for their online assessments.</p>
            <Link to="/register" className="btn btn-hero-primary">Create Free Account</Link>
          </div>
        </div>

        <div style={{ height: 60 }} />
      </Container>
    </div>
  );
};

export default HomeScreen;
