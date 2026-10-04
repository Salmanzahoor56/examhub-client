import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Alert, Card, Container } from 'react-bootstrap';
import { getRanking } from '../actions/resultActions';

const RankingScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, ranking } = useSelector((state) => state.ranking);

  useEffect(() => { dispatch(getRanking()); }, [dispatch]);

  if (loading) {
    return (
      <Container className="py-5" style={{ maxWidth: 1000 }}>
        <div className="skeleton" style={{ height: 60, marginBottom: 20 }}></div>
        <div className="skeleton" style={{ height: 400 }}></div>
      </Container>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;

  const top3 = ranking ? ranking.slice(0, 3) : [];
  const rest = ranking ? ranking.slice(3) : [];

  return (
    <Container className="fade-up" style={{ maxWidth: 1000 }}>
      <div className="text-center mb-5">
        <div style={{ fontSize: '4rem', color: '#f59e0b' }}></div>
        <h1 className="mt-2">Leaderboard</h1>
        <p className="text-muted">Top performing students across all exams</p>
      </div>

      {!ranking || ranking.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <div style={{ fontSize: '3.5rem', marginBottom: 12 }}></div>
            <h5>No rankings yet</h5>
            <p className="text-muted mb-0">Complete an exam to appear on the leaderboard.</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          {top3.length > 0 && (
            <div className="d-flex justify-content-center align-items-end gap-3 mb-5 flex-wrap">
              {[1, 0, 2].map((idx) => {
                const s = top3[idx];
                if (!s) return null;
                const colors = {
                  0: { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', h: 200, medal: '1st' },
                  1: { bg: 'linear-gradient(135deg, #cbd5e1, #94a3b8)', h: 170, medal: '2nd' },
                  2: { bg: 'linear-gradient(135deg, #fb923c, #ea580c)', h: 150, medal: '3rd' }
                };
                const cfg = colors[idx];
                return (
                  <div key={s._id} className="text-center" style={{ width: 160 }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{cfg.medal}</div>
                    <div style={{
                      width: 70, height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem', fontWeight: 800,
                      margin: '0 auto 12px',
                      boxShadow: '0 8px 24px rgba(99,102,241,0.35)'
                    }}>
                      {s.name ? s.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className="fw-bold">{s.name}</div>
                    <div className="text-muted small mb-2">{s.college}</div>
                    <div style={{
                      background: cfg.bg,
                      color: '#fff',
                      padding: '12px 8px',
                      borderRadius: 12,
                      height: cfg.h,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      paddingTop: 16,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 900 }}>
                        {s.totalScore}
                      </div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Score
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {rest.length > 0 && (
            <div className="table-card">
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Rank</th>
                    <th>Student</th>
                    <th className="d-none d-md-table-cell">College</th>
                    <th className="text-center">Exams</th>
                    <th className="text-center">Score</th>
                    <th className="text-center">Avg %</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((s, i) => (
                    <tr key={s._id}>
                      <td className="fw-bold text-muted">#{i + 4}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                            color: '#fff', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '0.85rem'
                          }}>
                            {s.name ? s.name.charAt(0).toUpperCase() : '?'}
                          </div>
                          <div>
                            <div className="fw-semibold">{s.name}</div>
                            <div className="text-muted small d-md-none">{s.college}</div>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell text-muted small">{s.college}</td>
                      <td className="text-center">{s.examsAttempted}</td>
                      <td className="text-center fw-bold" style={{ color: 'var(--primary)' }}>{s.totalScore}</td>
                      <td className="text-center">
                        <span className={'badge-soft ' + (s.totalPercentage >= 60 ? 'success' : s.totalPercentage >= 40 ? 'warn' : 'danger')}>
                          {s.totalPercentage.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default RankingScreen;
