
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore';
const provider = new GoogleAuthProvider();

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("[d] user = " + user)

    if (isInstEmail(user.email)) {
      const userRef = doc(db, 'users', user.uid);
      const docSnapshot = await getDoc(userRef);

      const isExistUser = docSnapshot.exists();
      console.log("[d] isExisting user = " + isExistUser)

      if (!isExistUser) {
        
        // DISABLED FOR DEBUGGING
        /*
        await setDoc(userRef, {
          displayName: user.displayName,
          institutional_email: user.email,
          photoUrl: user.photoURL,
          createdAt: new Date(),
          role: 'Student'
        })
        */

        
      } 
      console.log("this line triggered [ln27]")
      return user;

    } else {
      console.log("Not Inst Email")
      return null;
    }

  } catch (error) {
    console.error("Error during sign-in", error);
    return null;
  }
};
function isInstEmail(email: string | null): boolean {
  if (email === null) {
    return false;
  }

  const univDomain = /@neu\.edu\.ph$/;
  return univDomain.test(email);
}
