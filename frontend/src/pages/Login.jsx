import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // useNavigate can be used, but since we modify localStorage without a global Context,
  // we can use window.location.href to hard-reload so the Navbar catches the token immediately.
  const navigate = useNavigate();

  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    window.location.href = '/'; 
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      handleAuthSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const googleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/google', {
        idToken: credentialResponse.credential,
      });
      handleAuthSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Google Sign-In backend verification failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign In</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={submitHandler} style={styles.form}>
        <input 
          type="email" 
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>Login</button>
      </form>

      <div style={styles.divider}>OR</div>

      <div style={styles.googleWrap}>
        <GoogleLogin
          onSuccess={googleSuccess}
          onError={() => setError('Google Sign-In widget failed')}
        />
      </div>

      <p style={{ marginTop: '2rem' }}>
        New Customer? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' },
  btn: { padding: '0.8rem', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
  error: { color: 'white', backgroundColor: '#dc3545', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px' },
  divider: { margin: '1.5rem 0', fontWeight: 'bold', color: '#666' },
  googleWrap: { display: 'flex', justifyContent: 'center' }
};

export default Login;
