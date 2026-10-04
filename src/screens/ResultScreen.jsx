import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Alert, Button, Row, Col, Container } from 'react-bootstrap';
import { getResultDetails } from '../actions/resultActions';

const ResultScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, result } = useSelector((state) => state.resultDetails);

  useEffect(() => { dispatch(getResultDetails(id)); }, [dispatch, id]);

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ maxWidth: 900 }}>
        <div className="skeleton" style={{ height: 60, width: 300, margin: '0 auto 20px' }}></div>
        <div className="skeleton" style={{ height: 400 }}></div>
      </Container>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!result) return null;

  const pct = typeof result.percentage === 'number' ? result.percentage : 0;
  const gradeClass =
    pct >= 80 ? 'excellent' :
    pct >= 60 ? 'good' :
    pct >= 40 ? 'fair' : 'poor';

  const message =
    pct >= 80 ? 'Outstanding! ðŸŽ‰' :
    pct >= 60 ? 'Great job! ðŸ‘' :
    pct >= 40 ? 'Good effort! ðŸ’ª' :
    'Keep practicing! ðŸ“š';

  return (
    <Container className="fade-up" style={{ maxWidth: 900 }}>
      <div className="text-center mb-4">
        <div className="text-muted text-uppercase fw-bold small mb-2" style={{ letterSpacing: '0.1em' }}>
          Exam Completed
        </div>
        <h1 className="mb-2">{result.exam ? result.exam.title : 'Exam'}</h1>
        <p className="text-muted fs-5 mb-0">{message}</p>
      </div>

      <Card className="mb-4">
        <Card.Body className="p-5 text-center">
          <div className="score-ring-wrap">
            <div className={'score-circle ' + gradeClass}>
              <div className="num">{result.score}</div>
              <div className="lbl">Total Score</div>
            </div>
          </div>

          <div className="mb-4">
            <span className={'badge-soft ' + (result.grade === 'F' ? 'danger' : 'success')}
              style={{ fontSize: '1rem', padding: '10px 24px' }}>
              ðŸ† Grade {result.grade}
            </span>
          </div>

          <Row className="g-3 text-center">
            <Col xs={6} md={3}>
              <div className="p-3 rounded-3" style={{ background: '#f8fafc' }}>
                <div className="text-muted small text-uppercase fw-bold">Questions</div>
                <div className="fs-3 fw-bold mt-1">{result.totalQuestions}</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded-3" style={{ background: '#f8fafc' }}>
                <div className="text-muted small text-uppercase fw-bold">Attempted</div>
                <div className="fs-3 fw-bold mt-1">{result.attemptedQuestions}</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded-3" style={{ background: '#d1fae5' }}>
                <div className="text-muted small text-uppercase fw-bold">Correct</div>
                <div className="fs-3 fw-bold mt-1" style={{ color: '#059669' }}>{result.correctAnswers}</div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="p-3 rounded-3" style={{ background: '#fee2e2' }}>
                <div className="text-muted small text-uppercase fw-bold">âŒ Wrong</div>
                <div className="fs-3 fw-bold mt-1" style={{ color: '#dc2626' }}>{result.wrongAnswers}</div>
              </div>
            </Col>
          </Row>

          <div className="mt-4 fs-5">
            You scored <strong style={{ color: 'var(--primary)', fontSize: '1.4rem' }}>
              {(typeof result.percentage === 'number' ? result.percentage : 0).toFixed(1)}%
            </strong> in this exam
          </div>
        </Card.Body>
      </Card>

      <div className="text-center d-flex gap-2 justify-content-center flex-wrap">
        <Link to="/dashboard">
          <Button variant="primary" className="px-4">ðŸ”„ Back to Dashboard</Button>
        </Link>
        <Link to="/ranking">
          <Button variant="outline-primary" className="px-4">ðŸ“ˆ View Ranking</Button>
        </Link>
      </div>
    </Container>
  );
};

export default ResultScreen;
