import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Typography, Box, Card, CardContent, CardActions, LinearProgress, Input } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { doc, setDoc } from 'firebase/firestore';


const StudentSidePanel = () => (
  <Box sx={styles.sidePanel}>
    <Typography variant="h5" sx={styles.sidePanelTitle}>
      Student Panel
    </Typography>
    {/* Add any navigation links or additional side panel content here */}
  </Box>
);

const UploadRequirements: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    parentConsent: false,
    medicalExam: false,
    psychExam: false,
    resume: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (requirement: string) => {
    if (!file) return;

    const storageRef = ref(storage, `requirements/${requirement}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
        setDownloadURL(downloadURL);

        try {
          const docRef = doc(db, 'requirements', requirement);
          await setDoc(docRef, {
            fileName: file.name,
            downloadURL: downloadURL,
            uploadedAt: new Date(),
          });
          console.log('Document successfully written to Firestore.');

          // Mark this requirement as uploaded
          setUploadedFiles((prev) => ({ ...prev, [requirement]: true }));
        } catch (err) {
          console.error('Error writing document: ', err);
        }
      }
    );
  };

  const renderCard = (title: string, requirementKey: string) => (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Input type="file" onChange={handleFileChange} sx={{ marginTop: '10px' }} />
        {uploadProgress !== null && (
          <Box sx={{ marginTop: '10px' }}>
            <Typography>Upload Progress: {Math.round(uploadProgress)}%</Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
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
          <CheckCircle color="success" sx={{ marginLeft: '10px' }} />
        ) : (
          <Cancel color="error" sx={{ marginLeft: '10px' }} />
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
          {renderCard('Parent Consent', 'parentConsent')}
          {renderCard('Medical Exam', 'medicalExam')}
          {renderCard('Psychology Exam', 'psychExam')}
          {renderCard('Resume', 'resume')}
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
  sidePanel: {
    width: '250px',
    backgroundColor: '#2E3B55',
    padding: '20px',
    color: '#fff',
  },
  sidePanelTitle: {
    fontWeight: 'bold',
    marginBottom: '20px',
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
