import React, { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { Button, Grid, Typography, Box, Avatar, Paper, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sign out error:', error.message);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        {/* Side Panel */}
        <Grid item xs={2} sx={styles.sidePanel}>
          <Avatar sx={styles.avatarLarge} />
          <Typography variant="h6" sx={styles.userName}>
            STUDENT
          </Typography>
          <Box sx={styles.sideButtonContainer}>
            <Button variant="contained" sx={styles.sideButton}>
              <UploadFileIcon /> Upload Requirements
            </Button>
            <Button variant="contained" sx={styles.sideButton}>
              <DriveFileMoveIcon /> Generate Endorsement Letter
            </Button>
          </Box>
        </Grid>

        {/* Main Dashboard */}
        <Grid item xs={10}>
          <Grid container spacing={2}>
            {/* Header */}
            <Grid item xs={12} sx={styles.header}>
              <Typography variant="h4">Dashboard</Typography>
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
                <CircularProgress variant="determinate" value={100} size={100} thickness={5} />
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
                <Typography>
                  <ul>
                    <li><a href="#">Upload Requirements</a></li>
                    <li><a href="#">Edit Student Information</a></li>
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
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    marginBottom: '20px',
  },
  sidePanel: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  userName: {
    marginTop: '10px',
    marginBottom: '30px',
  },
  sideButtonContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  sideButton: {
    width: '100%',
  },
  trackerProgress: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  trackerLabels: {
    marginLeft: '20px',
  },
  toDo: {
    padding: '20px',
  },
};

export default Dashboard;

