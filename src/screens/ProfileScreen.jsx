import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card, Alert, Spinner, Tab, Tabs } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { updateProfile, changePassword } from '../actions/userActions';

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [college, setCollege] = useState('');
  const [mobile, setMobile] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setGender(userInfo.gender || '');
      setCollege(userInfo.college || '');
      setMobile(userInfo.mobile || '');
    }
  }, [userInfo]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updateProfile(name, email, gender, college, mobile));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err);
    }
    setSaving(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setChanging(true);
    try {
      await dispatch(changePassword(currentPassword, newPassword));
      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err);
    }
    setChanging(false);
  };

  const initial = userInfo && userInfo.name ? userInfo.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="fade-up" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="text-center mb-4">
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem', fontWeight: 800,
          margin: '0 auto 16px',
          boxShadow: '0 12px 32px rgba(99,102,241,0.4)',
        }}>{initial}</div>
        <h2 className="mb-1">{userInfo && userInfo.name}</h2>
        <p className="text-muted mb-0">{userInfo && userInfo.email}</p>
        <span className="badge-soft info mt-2 d-inline-block">{userInfo && userInfo.role}</span>
      </div>

      <Card>
        <Card.Body>
          <Tabs defaultActiveKey="profile" className="mb-4">
            <Tab eventKey="profile" title="Profile Details">
              <Form onSubmit={handleProfileSave}>
                <Row className="g-3">
                  <Col md={12}>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={name}
                      onChange={(e) => setName(e.target.value)} required />
                  </Col>
                  <Col md={12}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email}
                      onChange={(e) => setEmail(e.target.value)} required />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>
                  <Col md={6}>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="tel" value={mobile}
                      onChange={(e) => setMobile(e.target.value)} />
                  </Col>
                  <Col md={12}>
                    <Form.Label>College / Institute</Form.Label>
                    <Form.Control type="text" value={college}
                      onChange={(e) => setCollege(e.target.value)} />
                  </Col>
                  <Col md={12} className="text-end">
                    <Button type="submit" variant="primary" disabled={saving}>
                      {saving ? <Spinner as="span" animation="border" size="sm" /> : 'Save Changes'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Tab>

            <Tab eventKey="password" title="Change Password">
              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit" variant="primary" disabled={changing}>
                  {changing ? <Spinner as="span" animation="border" size="sm" /> : 'Change Password'}
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileScreen;