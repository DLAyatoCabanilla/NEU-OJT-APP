import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";

import LOGO_neu from "./../assets/logo_neu.jsx";

import { Container, Button, Row, Col, Image } from "react-bootstrap";
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

  return (
    <>
      <div style={{ backgroundColor: "#FAF9F6" }}>
        <Container fluid="md">
          <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center ">
            <div className="m-5 p-5 rounded-4 shadow-lg bg-body text-center">
              <div className="h-25 d-inline-block">
                <LOGO_neu />
              </div>

              <h1 className="h1 m-3">
                <b>OJT APP</b>
              </h1>

              <div>
                <hr />
                <p>Sign in with Institution Account</p>
                <Button variant="dark" onClick={signInWithGoogle}>
                  <Google />
                  &nbsp;&nbsp;Continue with Google
                </Button>{" "}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
