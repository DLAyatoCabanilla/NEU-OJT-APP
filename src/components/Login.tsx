import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";

import LOGO_neu from "./../assets/logo_neu.svg";
import Login_bg from "./../assets/login_bg.jpg";

import { Container, Button, Image } from "react-bootstrap";
import { Google } from "react-bootstrap-icons";

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    try {
      const result: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      console.log(result.user); // Handle the signed-in user info here
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during sign-in:", error.message);
      }
    }
  };

  const loginDiv = {
    backgroundImage: "url(" + Login_bg + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={loginDiv}>
      <Container fluid>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <div className="text-center bg-white p-5 rounded-4 shadow-lg">
            <div className="pt-2" />
            <Image src={LOGO_neu} style={{ width: "83%", height: "83%" }} />
            <h1 className="mt-4">
              <strong>NEU OJT APP</strong>
              <hr />
            </h1>
            <p>Sign in with Institution Account</p>
            <Button variant="dark" onClick={signInWithGoogle}>
              <Google /> &nbsp;&nbsp;Continue with Google
            </Button>{" "}
            <div className="pb-2" />
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Login;
