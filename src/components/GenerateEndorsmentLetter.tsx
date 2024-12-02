
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { Button } from '@mui/material';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const onClickDownload = async () => {
  try {
    const storage = getStorage();
    const path = ref(storage, 'EndorsmentLetter/Endorsment sample.pdf')

    const downloadURL = await getDownloadURL(path);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download
    link.click();


  } catch {
    console.error("Error dowload");
  }

}

const trysome = () => {

  console.log("working dowload");
}
const GenerateEndorsmentLetterr: React.FC = () => {
  return (

    <Button variant="contained" sx={styles.sideButton} onClick={trysome}>
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

