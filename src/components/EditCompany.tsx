
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';




const EditCompany: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    console.log("Transfering to the CompanyTab");
    navigate('/companyPage');

  }
  return (

    <Button variant="contained" sx={styles.sideButton} onClick={onClick}>
      <DriveFileMoveIcon sx={styles.iconSpacing} /> Edit Company
    </Button>
  )

}

const styles = {
  sideButton: {
    width: '101%',
    backgroundColor: '#FFF',
    color: '#7DBCE1',
    textTransform: 'none' as const,
    padding: '10px 15px',
    borderRadius: '20px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#e0f4ff',
    },
  }, iconSpacing: {
    marginRight: '10px',
  },


}

export default EditCompany;

