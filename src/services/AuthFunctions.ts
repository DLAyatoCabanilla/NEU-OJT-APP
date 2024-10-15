import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Sign out error:", error.message);
      }
    }
  };

export {handleSignOut};