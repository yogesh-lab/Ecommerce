import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.brand}>MERN Shop</Link>
      </div>
      <div style={styles.links}>
        {token ? (
          <>
            <span style={styles.userText}>Hello, {userInfo?.name}</span>
            <button onClick={logoutHandler} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
    alignItems: 'center'
  },
  brand: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  },
  userText: {
    marginRight: '1rem'
  },
  btn: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;
