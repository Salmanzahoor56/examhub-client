import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Alert, ProgressBar, Container, Modal, Badge } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { takeExam, submitExam } from '../actions/examActions';

const ExamScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, exam, questions } = useSelector((state) => state.examTake);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [violations, setViolations] = useState(0);
  const [showViolationWarning, setShowViolationWarning] = useState(false);
  const [lastViolationType, setLastViolationType] = useState('');
  const [examActive, setExamActive] = useState(false);

  const violationsRef = useRef(0);
  const examActiveRef = useRef(false);

  useEffect(() => { dispatch(takeExam(id)); }, [dispatch, id]);

  useEffect(() => {
    if (exam && exam.timeLimit) {
      setTimeLeft(exam.timeLimit * 60);
      setStartedAt(new Date());
      setExamActive(true);
      examActiveRef.current = true;
    }
  }, [exam]);

  // Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0 && startedAt) {
      doSubmit(true);
    }
    // eslint-disable-next-line
  }, [timeLeft, startedAt]);

  // Anti-cheat: tab switch / blur
  useEffect(() => {
    if (!examActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden && examActiveRef.current) {
        recordViolation('tab-switch');
      }
    };

    const handleBlur = () => {
      if (examActiveRef.current) {
        recordViolation('window-blur');
      }
    };

    const handleCopy = (e) => {
      e.preventDefault();
      recordViolation('copy');
    };

    const handlePaste = (e) => {
      e.preventDefault();
      recordViolation('paste');
    };

    const handleCut = (e) => {
      e.preventDefault();
      recordViolation('cut');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.error('Right-click is disabled during the exam');
    };

    const handleKeyDown = (e) => {
      // Block F12, Ctrl+Shift+I, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U'))
      ) {
        e.preventDefault();
        toast.error('This action is disabled during the exam');
      }
      // Block Ctrl+C, Ctrl+V, Ctrl+X
      if (e.ctrlKey && ['c', 'v', 'x', 'C', 'V', 'X'].includes(e.key)) {
        e.preventDefault();
        recordViolation(e.key.toLowerCase());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [examActive]);

  const recordViolation = (type) => {
    if (!examActiveRef.current) return;
    violationsRef.current += 1;
    setViolations(violationsRef.current);
    setLastViolationType(type);
    setShowViolationWarning(true);

    if (violationsRef.current >= 3) {
      toast.error('Too many violations. Auto-submitting...');
      setTimeout(() => doSubmit(true), 1500);
    }
  };

  const doSubmit = async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    examActiveRef.current = false;
    setExamActive(false);
    const formatted = Object.keys(answers).map((qid) => ({
      questionId: qid,
      selectedOption: answers[qid],
    }));
    try {
      const result = await dispatch(submitExam(id, formatted, startedAt));
      if (auto) toast.success('Exam submitted');
      else toast.success('Exam submitted successfully!');
      navigate('/result/' + result._id);
    } catch (err) {
      toast.error(err);
      setSubmitting(false);
    }
  };

  const fmt = (s) => Math.floor(s / 60) + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ maxWidth: 900 }}>
        <div className="skeleton" style={{ height: 60, marginBottom: 20 }}></div>
        <div className="skeleton" style={{ height: 300 }}></div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ maxWidth: 700 }}>
        <Alert variant="danger" className="mt-4">
          <h5>Cannot start exam</h5>
          <p className="mb-3">{error}</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Alert>
      </Container>
    );
  }

  if (!exam || !questions || questions.length === 0) {
    return (
      <Container style={{ maxWidth: 700 }}>
        <Alert variant="warning" className="mt-4">
          <h5>No questions available</h5>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Alert>
      </Container>
    );
  }

  const q = questions[currentQuestion];
  if (!q) return <Alert variant="warning">Question data missing.</Alert>;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <Container className="fade-up" style={{ maxWidth: 900 }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">{exam.title}</h2>
          <div className="text-muted small">
            {questions.length} questions &middot; {exam.marksPerQuestion} marks each
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {violations > 0 && (
            <Badge bg="danger" className="rounded-pill px-3 py-2">
              Violations: {violations}/3
            </Badge>
          )}
          <div className="timer-badge">Time: {fmt(timeLeft)}</div>
        </div>
      </div>

      <ProgressBar
        now={progress}
        label={Math.round(progress) + '%'}
        className="mb-2"
        style={{ height: 8, borderRadius: 4 }}
      />
      <div className="d-flex justify-content-between text-muted small mb-4">
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>{answeredCount} answered</span>
      </div>

      <Card className="question-card mb-4">
        <Card.Body className="p-4" style={{ userSelect: 'none' }}>
          <div className="text-muted small text-uppercase fw-bold mb-2" style={{ letterSpacing: '0.08em' }}>
            Question {currentQuestion + 1}
          </div>
          <h4 className="mb-4" style={{ lineHeight: 1.5 }}>{q.questionText}</h4>

          <div>
            {(q.options || []).map((opt, idx) => {
              const letters = ['A', 'B', 'C', 'D'];
              const isSelected = answers[q._id] === opt._id;
              return (
                <label
                  key={opt._id}
                  className={'option-item d-flex align-items-center gap-3' + (isSelected ? ' selected' : '')}
                >
                  <input
                    type="radio"
                    name={'q-' + q._id}
                    checked={isSelected}
                    onChange={() => setAnswers({ ...answers, [q._id]: opt._id })}
                    style={{ display: 'none' }}
                  />
                  <span
                    className="d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: 34, height: 34, borderRadius: 9,
                      background: isSelected ? 'var(--primary)' : '#f1f5f9',
                      color: isSelected ? '#fff' : 'var(--gray-700)',
                      flexShrink: 0,
                      transition: 'all 0.2s'
                    }}
                  >
                    {letters[idx] || idx + 1}
                  </span>
                  <span style={{ fontSize: '1.02rem' }}>{opt.text}</span>
                  {isSelected && <span className="ms-auto" style={{ color: 'var(--primary)' }}>Selected</span>}
                </label>
              );
            })}
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mb-4">
        <Button
          variant="outline-secondary"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="px-4"
        >
          Previous
        </Button>

        {currentQuestion === questions.length - 1 ? (
          <Button
            variant="success"
            onClick={() => setShowConfirm(true)}
            disabled={submitting}
            className="px-4"
          >
            {submitting ? 'Submitting...' : 'Submit Exam'}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="px-4"
          >
            Next
          </Button>
        )}
      </div>

      <Card className="mb-4">
        <Card.Body>
          <div className="fw-semibold mb-3 text-muted small text-uppercase" style={{ letterSpacing: '0.08em' }}>
            Question Navigator
          </div>
          <div className="d-flex flex-wrap">
            {questions.map((qq, i) => {
              let cls = 'nav-btn';
              if (i === currentQuestion) cls += ' current';
              else if (answers[qq._id]) cls += ' answered';
              return (
                <button key={qq._id} className={cls} onClick={() => setCurrentQuestion(i)}>
                  {i + 1}
                </button>
              );
            })}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <h4 className="mt-3 mb-2">Submit Exam?</h4>
          <p className="text-muted mb-4">
            You have answered {answeredCount} of {questions.length} questions.
            {answeredCount < questions.length && ' Unanswered questions will be marked as wrong.'}
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Button variant="outline-secondary" onClick={() => setShowConfirm(false)} className="px-4">
              Cancel
            </Button>
            <Button variant="success" onClick={() => { setShowConfirm(false); doSubmit(false); }} className="px-4" disabled={submitting}>
              Yes, Submit
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showViolationWarning} onHide={() => setShowViolationWarning(false)} centered>
        <Modal.Body className="text-center p-4">
          <div style={{ fontSize: '3rem' }}>Warning</div>
          <h4 className="mt-3 mb-2">Violation Detected</h4>
          <p className="text-muted mb-3">
            You triggered a rule violation:
            <br />
            <strong>{lastViolationType}</strong>
          </p>
          <p className="text-danger fw-bold mb-4">
            {violationsRef.current}/3 violations
          </p>
          <p className="small text-muted">
            After 3 violations, your exam will be auto-submitted.
          </p>
          <Button variant="primary" onClick={() => setShowViolationWarning(false)} className="px-4">
            I Understand
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ExamScreen;