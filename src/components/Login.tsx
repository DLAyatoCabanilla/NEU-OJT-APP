import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";

import { Container, Button, Row, Col } from "react-bootstrap";
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
      <Container fluid="md">
        <Row className="justify-content-md-center p-3">
          <Col className="mt-5" xs lg="auto">
            <h1>OJT Website Login</h1>
            <Button variant="dark" size="lg" onClick={signInWithGoogle}>
              <Google></Google>&nbsp;&nbsp;Login with Institutional Account
            </Button>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "100px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Login;
