import React, { useContext } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";

import { handleSignOut } from "../services/AuthFunctions";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import NavbarObject from "../context/NavbarObject";
import { Container } from "react-bootstrap";

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { currentUser } = authContext;

  console.log("user: " + currentUser?.email);

  return (
    <div>
      <NavbarObject />

      <Box sx={styles.container}>
        <Grid container>
          {/* Side Panel */}
          <Grid item xs={2} sx={styles.sidePanel}>
            <Avatar src={currentUser?.photoURL || ""} sx={styles.avatarLarge} />
            <Typography variant="h6" sx={styles.userName}>
              STUDENT
            </Typography>
            <Box sx={styles.sideButtonContainer}>
              <Button variant="contained" sx={styles.sideButton}>
                <UploadFileIcon sx={styles.iconSpacing} /> Upload Requirements
              </Button>
              <Button variant="contained" sx={styles.sideButton}>
                <DriveFileMoveIcon sx={styles.iconSpacing} /> Generate
                Endorsement Letter
              </Button>
              <Button variant="contained" color="error" onClick={handleSignOut}>
                Sign Out
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
                <Avatar src={currentUser?.photoURL || ""} sx={styles.avatar} />
              </Grid>

              {/* Welcome Section */}
              <Grid item xs={12}>
                <Typography variant="h5">
                  Welcome, {currentUser?.displayName || "User"}
                </Typography>
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
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as const,
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px 20px",
  },
  dashboardTitle: {
    fontWeight: 500,
    color: "#333",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    marginBottom: "20px",
    backgroundColor: "#ddd",
  },
  sidePanel: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    borderRight: "1px solid #e0e0e0",
  },
  userName: {
    marginTop: "10px",
    marginBottom: "30px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  sideButtonContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
    width: "100%",
  },
  sideButton: {
    width: "100%",
    backgroundColor: "#1976d2",
    color: "#fff",
    textTransform: "none" as const,
    padding: "10px 15px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  iconSpacing: {
    marginRight: "10px",
  },
  mainContent: {
    padding: "20px",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  trackerProgress: {
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  trackerLabels: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },
  progressCircle: {
    color: "#1976d2",
  },
  toDo: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
  },
  toDoList: {
    paddingLeft: "20px",
  },
};

export default Dashboard;
