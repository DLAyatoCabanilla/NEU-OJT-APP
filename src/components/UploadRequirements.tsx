import React, { useState } from 'react';
import { storage } from '../firebase'; //Bakit hindi kita mapagana????
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Input, LinearProgress, Typography } from '@mui/material';

const UploadRequirements: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `requirements/${file.name}`); // Upload to 'requirements' folder
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setDownloadURL(downloadURL); // Set the download URL
        });
      }
    );
  };

  return (
    <div>
      <Typography variant="h6">Upload Requirements</Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} variant="contained" sx={{ marginTop: '10px' }}>
        Upload File
      </Button>

      {uploadProgress !== null && (
        <div style={{ marginTop: '20px' }}>
          <Typography>Upload Progress: {Math.round(uploadProgress)}%</Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </div>
      )}

      {downloadURL && (
        <Typography style={{ marginTop: '20px' }}>
          File uploaded! You can access it <a href={downloadURL}>here</a>.
        </Typography>
      )}
    </div>
  );
};




export default UploadRequirements;
