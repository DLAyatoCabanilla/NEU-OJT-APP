import React from 'react';
import { Box, Typography } from '@mui/material';

const StudentSidePanel: React.FC = () => {
  return (
    <Box
      sx={{
        width: '250px',
        backgroundColor: '#2E3B55',
        color: 'white',
        padding: '20px',
        height: '100vh',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Student Panel
      </Typography>
      <Typography>Menu Item 1</Typography>
      <Typography>Menu Item 2</Typography>
      <Typography>Menu Item 3</Typography>
    </Box>
  );
};

export default StudentSidePanel;
