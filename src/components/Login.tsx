import React, { useState } from "react";
import { googleSignIn } from '../services/GoogleAuth';

import LOGO_neu from "./../assets/logo_neu.jsx";

import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { Google } from "react-bootstrap-icons";

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
      if (userData) {
        setUser(userData);
      } else {
        setRejected(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
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
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
