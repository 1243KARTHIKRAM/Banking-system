import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [formData, setFormData] = useState({
    uid: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    role: 'Customer'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
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
          <h1 style={styles.title}>Create Account</h1>
          <p style={styles.subtitle}>Join KodBank today. Fill in your details below.</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorBox}>
              {error}
            </div>
          )}

          {success && (
            <div style={styles.successBox}>
              {success}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="uid">User ID</label>
            <input
              type="text"
              id="uid"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your unique ID"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Choose a username"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Create a password"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="Customer">Customer</option>
            </select>
          </div>

          <button
            type="submit"
            style={loading ? styles.buttonDisabled : styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account? <a href="/login" style={styles.link}>Login here</a>
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
    padding: '20px 0',
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
    animation: 'cardFadeIn 0.6s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  title: {
    fontSize: '32px',
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
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#f9fafb',
  },
  select: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
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
    animation: 'shake 0.5s ease-in-out',
  },
  successBox: {
    padding: '14px 16px',
    borderRadius: '12px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#16a34a',
    fontSize: '14px',
    fontWeight: '500',
    animation: 'fadeIn 0.5s ease-in-out',
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

// Add keyframe animations via style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes cardFadeIn {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  input:focus, select:focus {
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

export default Registration;
