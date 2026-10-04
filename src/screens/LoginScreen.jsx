import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { login } from '../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  const redirect = location.search ? location.search.split('=')[1] : '/dashboard';

  useEffect(() => {
    if (userInfo) {
      toast.success('Welcome back, ' + userInfo.name + '!');
      navigate(userInfo.role === 'admin' ? '/admin/dashboard' : redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="text-center mb-4">
          <div style={{
            width: 68, height: 68,
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 12px 32px rgba(99,102,241,0.4)'
          }}></div>
          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to continue to ExamHub</p>
        </div>

        {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={loading} size="lg">
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Sign In ->'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-muted">New here? </span>
          <Link to="/register" className="fw-semibold" style={{ color: 'var(--primary)' }}>
            Create an account
          </Link>
        </div>

        <div className="mt-4 p-3 rounded-3" style={{ background: '#f8fafc', fontSize: '0.85rem', border: '1px dashed #cbd5e1' }}>
          <div className="fw-bold mb-2 text-muted text-uppercase small">Demo Accounts</div>
          <div className="mb-1"><strong>Admin:</strong> <code>admin@exam.com</code> / <code>admin123</code></div>
          <div><strong>Student:</strong> <code>alice@exam.com</code> / <code>student123</code></div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;