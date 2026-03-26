const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>Welcome to MERN Shop</h1>
      {userInfo ? (
        <p>You are logged in as {userInfo.email}. Feel free to browse!</p>
      ) : (
        <p>Please login or register to continue.</p>
      )}
    </div>
  );
};

export default Home;
