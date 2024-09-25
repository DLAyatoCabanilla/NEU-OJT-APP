import React, { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign out error:", error.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Welcome, {currentUser?.displayName}</h2>
      <img src={currentUser?.photoURL || ''} alt="Profile" style={styles.image} />
      <p>Email: {currentUser?.email}</p>
      <button onClick={handleSignOut} style={styles.button}>
        Sign Out
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px'
  },
  image: {
    borderRadius: '50%',
    width: '100px',
    height: '100px'
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Dashboard;
