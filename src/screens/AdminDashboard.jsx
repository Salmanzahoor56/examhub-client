import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Row, Col, Alert, Container, Modal, Form, Badge } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
      const [s, u, e] = await Promise.all([
        axios.get('/api/admin/stats', config),
        axios.get('/api/admin/users', config),
        axios.get('/api/admin/exams', config),
      ]);
      setStats(s.data); setUsers(u.data); setExams(e.data);
      setLoading(false);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm('Delete user "' + name + '"?')) {
      try {
        const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
        await axios.delete('/api/admin/users/' + id, config);
        toast.success('User deleted');
        fetchData();
      } catch (err) {
        toast.error(err.response && err.response.data.message ? err.response.data.message : err.message);
      }
    }
  };

  const handleEditOpen = (user) => { setEditUser({ ...user }); setShowModal(true); };

  const handleEditSave = async () => {
    try {
      const config = { headers: { Authorization: 'Bearer ' + userInfo.token } };
      await axios.put('/api/admin/users/' + editUser._id, editUser, config);
      toast.success('User updated');
      setShowModal(false);
      fetchData();
    } catch (err) {
      toast.error(err.response && err.response.data.message ? err.response.data.message : err.message);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Container fluid className="py-5" style={{ maxWidth: 1200 }}>
        <Row className="g-3 mb-5">
          {[1,2,3,4].map(i => (
            <Col xs={6} lg={3} key={i}>
              <div className="skeleton" style={{ height: 110 }}></div>
            </Col>
          ))}
        </Row>
        <div className="skeleton" style={{ height: 400 }}></div>
      </Container>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="fade-up" style={{ maxWidth: 1200 }}>
      <div className="mb-4">
        <h1 className="mb-1">Admin Dashboard</h1>
        <p className="text-muted mb-0">Manage users, exams, and monitor system activity</p>
      </div>

      <Row className="g-3 mb-5">
        <Col xs={6} lg={3}>
          <div className="stat-card grad-indigo">
            <div className="label">Total Users</div>
            <h2>{stats.totalUsers || 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card grad-cyan">
            <div className="label">Students</div>
            <h2>{stats.totalStudents || 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card grad-amber">
            <div className="label">Exams</div>
            <h2>{stats.totalExams || 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
        <Col xs={6} lg={3}>
          <div className="stat-card grad-green">
            <div className="label">Results</div>
            <h2>{stats.totalResults || 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
      </Row>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
        <h3 className="mb-0">User Management</h3>
        <Form.Control
          placeholder="🔍 Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 320, borderRadius: 12, border: '2px solid #e2e8f0' }}
        />
      </div>

      <div className="table-card mb-5">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th>Role</th>
              <th className="d-none d-md-table-cell">College</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.78rem', flexShrink: 0
                    }}>
                      {u.name ? u.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <span className="fw-semibold">{u.name}</span>
                  </div>
                </td>
                <td className="d-none d-md-table-cell text-muted small">{u.email}</td>
                <td>
                  <span className={'badge-soft ' + (u.role === 'admin' ? 'danger' : u.role === 'teacher' ? 'warn' : 'info')}>
                    {u.role}
                  </span>
                </td>
                <td className="d-none d-md-table-cell text-muted small">{u.college}</td>
                <td>
                  <span className={'badge-soft ' + (u.isActive ? 'success' : 'danger')}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="text-end">
                  <Button variant="outline-primary" size="sm" className="me-1"
                    onClick={() => handleEditOpen(u)} title="Edit">Edit</Button>
                  <Button variant="outline-danger" size="sm"
                    onClick={() => handleDelete(u._id, u.name)} title="Delete">Del</Button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <h3 className="mb-3">All Exams</h3>
      <div className="table-card">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tag</th>
              <th className="d-none d-md-table-cell">Questions</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e._id}>
                <td className="fw-semibold">{e.title}</td>
                <td><span className="badge-soft purple">{e.tag}</span></td>
                <td className="d-none d-md-table-cell">{e.totalQuestions}</td>
                <td><span className="badge-soft info">{e.timeLimit}m</span></td>
                <td>
                  <span className={'badge-soft ' + (e.isActive ? 'success' : 'danger')}>
                    {e.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
        <Modal.Body>
          {editUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="switch" label="Active"
                  checked={editUser.isActive}
                  onChange={(e) => setEditUser({ ...editUser, isActive: e.target.checked })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
