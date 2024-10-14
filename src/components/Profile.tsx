import React from "react";
import { Container, Row, Col, Button, Image, Alert } from "react-bootstrap";
import profilePic from "../assets/profile_placeholder.png";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import NavbarObject from "../context/NavbarObject";

const Profile: React.FC = () => {
  return (
    <div className="Profile-body bg-light" style={{ minHeight: "100vh" }}>
      <NavbarObject />

      <Container className="mt-3">
        <Row>
          <Col md={3} className="bg-white rounded-3 shadow-sm m-1 p-3">
            <Container fluid>
              <Row>
                <Col xs={3} md={12} className="mt-2">
                  <Image src={profilePic} roundedCircle fluid />
                </Col>

                <Col className="m-1 mt-3">
                  <strong>LastName, Fist Name</strong>
                  <br />
                  BS Computer Science
                </Col>
              </Row>

              <div className="mt-3">
                <div className="m-1">
                  <ApartmentRoundedIcon /> Works at Google
                </div>
                <div className="m-1">
                  <BusinessCenterRoundedIcon /> Intern
                </div>
                <div className="m-1">
                  <GitHubIcon /> userNamegit
                </div>
                <div className="m-1">
                  <LinkedInIcon /> lastFirstname
                </div>
                <div className="m-1">
                  <EmailRoundedIcon /> last.first@neu.edu.ph
                </div>
                <div className="m-1">
                  <LocalPhoneRoundedIcon /> (+63) 976 432 1123
                </div>
              </div>
            </Container>
          </Col>

          <Col md={8} className="bg-white rounded-3 shadow-sm m-1 p-3">
            <Container fluid>
              {[
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
              ].map((variant) => (
                <Alert key={variant} variant={variant}>
                  Test Element Only
                </Alert>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
