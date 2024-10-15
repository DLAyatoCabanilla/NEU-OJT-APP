import React, { useState } from "react";

import { googleSignIn } from "../services/GoogleAuth";
/*
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";
// edward-mergeCfvBranchTest*/

import LOGO_neu from "./../assets/logo_neu.svg";
import LoginBG from "./../assets/login_bg.jpg";
import LoginErrorModal from "./../context/Login/Obj-LoginErrorModal";

import { Container, Button, Image } from "react-bootstrap";
import { Google } from "react-bootstrap-icons";

import { handleSignOut } from "../services/AuthFunctions";

const Login: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [rejected, setRejected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    setRejected(false);
    try {
      const userData = await googleSignIn();
      console.log("[d] user: " + userData?.email);

      if (!(userData?.email === undefined)) {
        console.log("[d] setuser triggered");
        setUser(userData);
      } else {
        console.log("[d] setuser NOT triggered | else statement");
        setRejected(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      console.log("[d] finally triggered");
      setLoading(false);
    }
  };

  const loginDiv = {
    backgroundImage: "url(" + LoginBG + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  /*       
//CfvBranch
              <div>
                <hr />
                <p>Sign in with Institution Account</p>
                <Button variant="dark" onClick={handleGoogleLogin}>
                  <Google />
                  &nbsp;&nbsp;Continue with Google
                </Button>{" "}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {rejected && (
                  <p style={{ color: 'red' }}>
                    You need to log-in using Institutional Email.
                  </p>
                )}

              </div>
            </div>
*/
  return (
    <div style={loginDiv}>
      <Container fluid>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center bg-white p-5 rounded-4 shadow-lg">
            <div className="pt-2" />
            <Image src={LOGO_neu} style={{ width: "83%", height: "83%" }} />
            <h1 className="mt-4">
              <strong>OJT-APP</strong>
              <hr />
            </h1>
            <p>Sign in with Institution Account</p>
            <Button variant="dark" onClick={handleGoogleLogin}>
              <Google /> &nbsp;&nbsp;Continue with Google
            </Button>{" "}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {rejected && <LoginErrorModal />}
            <div className="pb-2" />
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Login;
