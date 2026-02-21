import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // This ensures cookies are sent automatically
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful - cookie is stored automatically
        // Redirect to userdashboard
        navigate('/userdashboard');
      } else {
        // Login failed - show error message
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>KodBank</h1>
          <p style={styles.subtitle}>Welcome back! Please login to continue.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Enter your username"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? <a href="/register" style={styles.link}>Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientBG 15s ease infinite',
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    margin: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#f9fafb',
  },
  button: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
    boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
  },
  buttonDisabled: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    opacity: 0.7,
    marginTop: '8px',
  },
  errorBox: {
    padding: '14px 16px',
    borderRadius: '12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: '500',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: '14px',
    margin: 0,
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

// Add keyframe animation via style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
    background-color: white !important;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px 0 rgba(102, 126, 234, 0.39) !important;
  }
  
  a:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(styleSheet);

export default Login;
