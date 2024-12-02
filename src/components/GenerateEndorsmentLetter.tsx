
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { Button } from '@mui/material';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const handleDownload = async () => {
  const storage = getStorage();
  const pathRef = ref(storage, 'EndorsmentLetter/Edorsment sample.pdf');
  try {
    const url = await getDownloadURL(pathRef);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Edorsment sample.pdf';
    document.body.appendChild(a);

    a.click()

    document.body.removeChild(a);
  } catch (error) {
    console.error("Something is wrong");
  }

}


const GenerateEndorsmentLetterr: React.FC = () => {
  return (

    <Button variant="contained" sx={styles.sideButton} onClick={handleDownload}>
      <DriveFileMoveIcon sx={styles.iconSpacing} /> Generate Endorsement Letter
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

export default GenerateEndorsmentLetterr;

