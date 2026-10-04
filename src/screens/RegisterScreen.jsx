import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [college, setCollege] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      toast.success('Account created! Welcome, ' + userInfo.name);
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage('Passwords do not match');
    else {
      setMessage(null);
      dispatch(register(name, email, password, gender, college, mobile));
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card" style={{ maxWidth: 620 }}>
        <div className="text-center mb-4">
          <div style={{
            width: 68, height: 68,
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 12px 32px rgba(16,185,129,0.4)'
          }}>*</div>
          <h1>Create your account</h1>
          <p className="subtitle">Join ExamHub to take exams online</p>
        </div>

        {message && <Alert variant="danger" className="rounded-3">{message}</Alert>}
        {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

        <Form onSubmit={submitHandler}>
          <Row className="g-3">
            <Col md={12}>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </Col>
            <Col md={12}>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </Col>
            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="tel" placeholder="9876543210" value={mobile}
                onChange={(e) => setMobile(e.target.value)} required />
            </Col>
            <Col md={12}>
              <Form.Label>College / Institute</Form.Label>
              <Form.Control type="text" placeholder="Your college name" value={college}
                onChange={(e) => setCollege(e.target.value)} required />
            </Col>
            <Col md={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Min 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </Col>
            <Col md={6}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required />
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="w-100 mt-4" disabled={loading} size="lg">
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Create Account'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="fw-semibold" style={{ color: 'var(--primary)' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;