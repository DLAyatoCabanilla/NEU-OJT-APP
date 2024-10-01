import React, { useContext } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { Button, Grid, Typography, Box, Avatar, Paper } from '@mui/material';
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
      console.log("User signed out.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign out error:", error.message);
      }
    }
  };

  return (
    <Box sx={styles.container}>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12} sx={styles.header}>
          <Typography variant="h4">Dashboard</Typography>
          <Avatar src={currentUser?.photoURL || ''} sx={styles.avatar} />
        </Grid>

        {/* Welcome */}
        <Grid item xs={12}>
          <Typography variant="h5">
            Welcome, {currentUser?.displayName || "User"}
          </Typography>
        </Grid>

        {/* Tracker Progress */}
        <Grid item xs={12} md={8}>
          <Paper sx={styles.trackerProgress}>
            <Typography variant="h6">Tracker Progress</Typography>
            {/* Placeholder for progress tracking logic */}
          </Paper>
        </Grid>

        {/* Right Side Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={styles.actionItem}>
            <Typography variant="h6">Requirement Progress</Typography>
            <Button variant="contained" sx={styles.uploadButton}>
              <UploadFileIcon /> Upload Requirements
            </Button>
          </Paper>

          <Paper sx={styles.actionItem}>
            <Typography variant="h6">Generate Endorsement Letter</Typography>
            <Button variant="contained" sx={styles.uploadButton}>
              <DriveFileMoveIcon /> Generate Letter
            </Button>
          </Paper>
        </Grid>

        {/* To-do List */}
        <Grid item xs={12} md={8}>
          <Paper sx={styles.toDo}>
            <Typography variant="h6">To do:</Typography>
            <Typography>
              <ul>
                <li>Edit Student Info</li>
                <li>Update Company</li>
                <li>Upload Requirements</li>
              </ul>
            </Typography>
          </Paper>
        </Grid>

        {/* Sign Out Button */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="error" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  trackerProgress: {
    padding: '20px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionItem: {
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  uploadButton: {
    marginTop: '10px',
    width: '100%',
  },
  toDo: {
    padding: '20px',
    height: '150px',
  },
};

export default Dashboard;
