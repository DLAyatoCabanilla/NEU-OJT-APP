import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { Button, Grid, Typography, Box, Avatar, Paper, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import GenerateEndorsmentLetterr from './GenerateEndorsmentLetter';
import EditCompany from './EditCompany';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const userCheck = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {

      const userRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(userRef);
      const role = snapshot.get('role');
      return role
    }

  } catch (error) {
    console.error('something is wrong', error)
    return null;
  }
}

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await userCheck();
      setRole(userRole);
    };
    fetchRole();
  },

    []);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out.');
      navigate('/'); // Navigate to Login page (Login.tsx)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign out error:', error.message);
      }
    }
  };

  const handelUploadRequirments = () => {
    console.log('User Will Upload.');
    navigate('/uploadRequirements');
  };

  return (
    <Box sx={styles.container}>
      <Grid container>
        {/* Side Panel */}
        <Grid item xs={2} sx={styles.sidePanel}>
          {/* Profile Picture */}
          <Avatar src={currentUser?.photoURL || ''} sx={styles.avatarLarge} />
          <Typography variant="h6" sx={styles.userName}>
            STUDENT
          </Typography>
          <Box sx={styles.sideButtonContainer}>
            <>
              <Button
                variant="contained"
                onClick={handelUploadRequirments}
                sx={styles.sideButton}
              >
                <UploadFileIcon sx={styles.iconSpacing} /> Upload Requirements
              </Button>
              <GenerateEndorsmentLetterr />
              {role === 'Admin' && <EditCompany />}
            </>



          </Box>
          {/* Logout Button */}
          <Box sx={styles.logoutContainer}>
            <Button
              variant="contained"
              onClick={handleSignOut}
              sx={styles.logoutButton}
            >
              <LogoutIcon sx={styles.iconSpacing} /> Logout
            </Button>
          </Box>
        </Grid>

        {/* Main Dashboard */}
        <Grid item xs={10} sx={styles.mainContent}>
          <Grid container spacing={2}>
            {/* Header */}
            <Grid item xs={12} sx={styles.header}>
              <Typography variant="h4" sx={styles.dashboardTitle}>
                Dashboard
              </Typography>
              <Avatar src={currentUser?.photoURL || ''} sx={styles.avatar} />
            </Grid>

            {/* Welcome Section */}
            <Grid item xs={12}>
              <Typography variant="h5">Welcome, {currentUser?.displayName || 'User'}</Typography>
            </Grid>

            {/* Tracker Progress */}
            <Grid item xs={12}>
              <Paper sx={styles.trackerProgress}>
                <Typography variant="h6">Tracker Progress</Typography>
                <CircularProgress
                  variant="determinate"
                  value={38.6}
                  size={100}
                  thickness={5}
                  sx={styles.progressCircle}
                />
                <Box sx={styles.trackerLabels}>
                  <Typography>Requirements: 38.6%</Typography>
                  <Typography>Student Info: 22.5%</Typography>
                  <Typography>Other: 30.8%</Typography>
                  <Typography>Other: 8.1%</Typography>
                </Box>
              </Paper>
            </Grid>

            {/* To-Do List */}
            <Grid item xs={12}>
              <Paper sx={styles.toDo}>
                <Typography variant="h6">To Do:</Typography>
                <Typography component="div">
                  <ul style={styles.toDoList}>
                    <li>
                      <a href="#">Upload Requirements</a>
                    </li>
                    <li>
                      <a href="#">Edit Student Information</a>
                    </li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    height: '100vh',
  },
  sidePanel: {
    backgroundColor: '#6DBCE1', // Light blue for the sidebar
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'space-between', // Space between buttons and logout
  },
  avatarLarge: {
    width: 80,
    height: 80,
    marginBottom: '20px',
    backgroundColor: '#f8f8f8',
  },
  userName: {
    marginTop: '10px',
    marginBottom: '30px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  sideButtonContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    width: '100%',
  },
  sideButton: {
    width: '100%',
    backgroundColor: '#FFF',
    color: '#6DBCE1',
    textTransform: 'none' as const,
    padding: '10px 15px',
    borderRadius: '20px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e0f4ff',
    },
  },
  logoutContainer: {
    marginTop: 'auto', // Push logout button to the bottom
    width: '100%',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FFF',
    color: '#FF5E5B', // Red for logout button
    textTransform: 'none' as const,
    padding: '10px 15px',
    borderRadius: '20px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#FFECEC',
    },
  },
  iconSpacing: {
    marginRight: '10px',
  },
  mainContent: {
    padding: '20px',
    backgroundColor: '#FFDD44', // Yellow for the main section
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '10px 20px',
  },
  dashboardTitle: {
    fontWeight: 500,
    color: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  trackerProgress: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  trackerLabels: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  progressCircle: {
    color: '#FF5E5B', // Red for the circular progress
  },
  toDo: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  toDoList: {
    paddingLeft: '20px',
  },
};

export default Dashboard;
