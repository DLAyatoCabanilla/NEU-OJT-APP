import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Typography, Box, Card, CardContent, CardActions, LinearProgress, Input } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import StudentSidePanel from './StudentSidePanel';


const UploadRequirements: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number | null }>({
    parentConsent: null,
    medicalExam: null,
    psychExam: null,
    resume: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    parentConsent: false,
    medicalExam: false,
    psychExam: false,
    resume: false,
  });

  const updateDashboardProgress = async () => {
    const uploadedCount = Object.values(uploadedFiles).filter((uploaded) => uploaded).length;
    const progress = (uploadedCount / 4) * 100; // Calculate percentage.
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const progressRef = doc(db, 'requirementsProgress', user.uid);
      await updateDoc(progressRef, { progress }); // Update progress in Firestore.
    } else {
      console.error('User is not logged in.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (requirement: string) => {
    if (!file) return;
  
    const storageRef = ref(storage, `requirements/${requirement}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prev) => ({ ...prev, [requirement]: progress }));
        console.log(`Upload progress for ${requirement}: ${progress}%`);
      },
      (error) => console.error('Upload failed:', error),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File uploaded successfully:', downloadURL);
  
          const docRef = doc(db, 'requirements', requirement);
          await setDoc(docRef, {
            fileName: file.name,
            downloadURL,
            uploadedAt: new Date(),
          });
  
          setUploadedFiles((prev) => ({ ...prev, [requirement]: true }));
          console.log(`${requirement} marked as uploaded.`);
          await updateDashboardProgress(); // Update dashboard progress after upload.
        } catch (error) {
          console.error('Error saving file data or updating progress:', error);
        }
      }
    );
  };

  const renderCard = (title: string, requirementKey: string) => (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Input type="file" onChange={handleFileChange} sx={{ marginTop: "10px" }} />
        {uploadProgress[requirementKey] !== null && (
          <Box sx={{ marginTop: "10px" }}>
            <Typography>
              Upload Progress: {Math.round(uploadProgress[requirementKey]!)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress[requirementKey]!}
            />
          </Box>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() => handleUpload(requirementKey)}
          sx={styles.uploadButton}
        >
          Upload File
        </Button>
        {uploadedFiles[requirementKey] ? (
          <CheckCircle color="success" sx={{ marginLeft: "10px" }} />
        ) : (
          <Cancel color="error" sx={{ marginLeft: "10px" }} />
        )}
      </CardActions>
    </Card>
  );

  return (
    <Box sx={styles.layout}>
      {/* Student Side Panel */}
      <StudentSidePanel />

      {/* Main Content */}
      <Box sx={styles.container}>
        <Typography variant="h4" sx={styles.heading}>
          REQUIREMENTS
        </Typography>
        <Typography variant="h6" sx={styles.subHeading}>
          Please upload the following requirements:
        </Typography>

        <Box sx={styles.cardContainer}>
          {renderCard("Parent Consent", "parentConsent")}
          {renderCard("Medical Exam", "medicalExam")}
          {renderCard("Psychology Exam", "psychExam")}
          {renderCard("Resume", "resume")}
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
  },
  container: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#FFDD44', // Matches the main Dashboard background color
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  subHeading: {
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  uploadButton: {
    backgroundColor: '#6DBCE1',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#5aa3d1',
    },
  },
};

export default UploadRequirements;
