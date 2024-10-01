import React from 'react';
import { Paper, Typography } from '@mui/material';

const Report: React.FC = () => {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">Progress Tracker</Typography>
      <Typography>Hours Completed: X / Y</Typography>
      {/* More details can be added here */}
    </Paper>
  );
};




export default Report;
