import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      console.log(result.user); // Handle the signed-in user info here
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during sign-in:", error.message);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>OJT Website Login</h2>
      <button onClick={signInWithGoogle} style={styles.button}>
        Sign in with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '100px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default Login;
