import React, { useState } from 'react';
import Confetti from 'react-confetti';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState('');

  const checkBalance = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/user/balance', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBalance(data.balance);
        setShowConfetti(true);
        
        // Stop confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      } else {
        setError(data.error || 'Failed to fetch balance');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching balance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} gravity={0.2} />}
      
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>Kodbank</h1>
          <p style={styles.subtitle}>Your Trusted Banking Partner</p>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.content}>
          <h2 style={styles.welcome}>Welcome Back!</h2>
          
          {error && <p style={styles.error}>{error}</p>}

          {balance !== null ? (
            <div style={styles.balanceContainer}>
              <p style={styles.balanceLabel}>Your balance is:</p>
              <p style={styles.balanceAmount}>₹{balance.toLocaleString('en-IN')}</p>
            </div>
          ) : (
            <p style={styles.prompt}>Click the button below to check your account balance</p>
          )}

          <button 
            onClick={checkBalance} 
            disabled={loading}
            style={styles.button}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            {loading ? 'Loading...' : 'Check Balance'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '20px',
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '5px',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
    margin: '20px 0',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  welcome: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
  },
  prompt: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.95rem',
  },
  balanceContainer: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    margin: '10px 0',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    margin: 0,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '10px 0 0 0',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  error: {
    color: '#ff6b6b',
    background: 'rgba(255, 107, 107, 0.2)',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    marginTop: '10px',
  },
};

export default Dashboard;
