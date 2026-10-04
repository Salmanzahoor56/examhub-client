import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { listExams } from '../actions/examActions';
import { listMyResults } from '../actions/resultActions';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingExams, error: errorExams, exams } = useSelector((state) => state.examList);
  const { loading: loadingResults, results } = useSelector((state) => state.resultList);

  useEffect(() => {
    dispatch(listExams());
    dispatch(listMyResults());
  }, [dispatch]);

  useEffect(() => {
    if (errorExams) toast.error(errorExams);
  }, [errorExams]);

  const hasAttempted = (examId) => results && results.some((r) => r.exam && r.exam._id === examId);
  const avgScore = results && results.length > 0
    ? (results.reduce((a, r) => a + r.percentage, 0) / results.length).toFixed(1)
    : 0;

  return (
    <div className="fade-up">
      <div className="mb-4">
        <h1 className="mb-1">Welcome back, {userInfo && userInfo.name ? userInfo.name.split(' ')[0] : 'Student'} </h1>
        <p className="text-muted mb-0">Here's your exam activity overview</p>
      </div>

      <Row className="g-3 mb-5">
        <Col xs={6} lg={4}>
          <div className="stat-card grad-indigo">
            <div className="label">Available Exams</div>
            <h2>{exams ? exams.length : 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
        <Col xs={6} lg={4}>
          <div className="stat-card grad-cyan">
            <div className="label">Exams Attempted</div>
            <h2>{results ? results.length : 0}</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="stat-card grad-green">
            <div className="label">Average Score</div>
            <h2>{avgScore}%</h2>
            <span className="stat-icon"></span>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Available Exams</h3>
        <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">
          {exams ? exams.length : 0} total
        </Badge>
      </div>

      {loadingExams ? (
        <div className="table-card mb-5 p-4">
          <div className="skeleton" style={{ height: 40, marginBottom: 12 }}></div>
          <div className="skeleton" style={{ height: 40, marginBottom: 12 }}></div>
          <div className="skeleton" style={{ height: 40 }}></div>
        </div>
      ) : (
        <div className="table-card mb-5">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Exam Title</th>
                <th className="d-none d-md-table-cell">Questions</th>
                <th className="d-none d-md-table-cell">Marks</th>
                <th>Duration</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {exams && exams.map((exam, i) => (
                <tr key={exam._id}>
                  <td className="text-muted fw-semibold">{i + 1}</td>
                  <td>
                    <div className="fw-semibold">{exam.title}</div>
                    <div className="text-muted small">{exam.tag}</div>
                  </td>
                  <td className="d-none d-md-table-cell">{exam.totalQuestions}</td>
                  <td className="d-none d-md-table-cell">{exam.totalQuestions * exam.marksPerQuestion}</td>
                  <td>
                    <Badge bg="light" text="dark" className="rounded-pill">
                      {exam.timeLimit}m
                    </Badge>
                  </td>
                  <td className="text-end">
                    {hasAttempted(exam._id) ? (
                      <span className="badge-soft success">Done</span>
                    ) : (
                      <Link to={'/exam/' + exam._id}>
                        <Button variant="success" size="sm">Start</Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">My Results</h3>
        <Link to="/ranking" className="text-decoration-none small fw-semibold">
          View Ranking
        </Link>
      </div>

      {loadingResults ? (
        <div className="table-card p-4">
          <div className="skeleton" style={{ height: 40, marginBottom: 12 }}></div>
          <div className="skeleton" style={{ height: 40 }}></div>
        </div>
      ) : !results || results.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}></div>
            <h5>No results yet</h5>
            <p className="text-muted mb-0">Take your first exam to see your results here.</p>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-card">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Exam</th>
                <th className="text-center">Score</th>
                <th className="d-none d-md-table-cell">Progress</th>
                <th className="text-center">Grade</th>
                <th className="d-none d-md-table-cell">Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r._id}>
                  <td className="fw-semibold">{r.exam ? r.exam.title : 'Deleted Exam'}</td>
                  <td className="text-center fw-bold">{r.score}</td>
                  <td className="d-none d-md-table-cell">
                    <div className="d-flex align-items-center gap-2">
                      <div style={{
                        width: 80, height: 6, borderRadius: 3,
                        background: '#e2e8f0', overflow: 'hidden'
                      }}>
                        <div style={{
                          width: r.percentage + '%',
                          height: '100%',
                          background: r.percentage >= 60 ? 'var(--success)'
                            : r.percentage >= 40 ? 'var(--warning)'
                            : 'var(--danger)',
                          transition: 'width 0.6s ease'
                        }}></div>
                      </div>
                      <span className="small">{r.percentage.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={'badge-soft ' + (r.grade === 'F' ? 'danger' : r.grade === 'A+' ? 'success' : 'info')}>
                      {r.grade}
                    </span>
                  </td>
                  <td className="d-none d-md-table-cell text-muted small">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-end">
                    <Link to={'/result/' + r._id}>
                      <Button variant="outline-primary" size="sm"> View</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
