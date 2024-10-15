import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Alert,
  ThemeProvider,
} from "react-bootstrap";
import profilePic from "../assets/profile_placeholder.png";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import NavbarObject from "../context/NavbarObject";

import {
  usrLastName,
  usrFirstName,
  usrMiddleInitial,
  usrCourse,
  usrJobSite,
  userJobType,
  usrGithubLink,
  usrLinkedInLink,
  usrEmailAdd,
  usrPhoneNum,
} from "../context/Users";

const Profile: React.FC = () => {
  return (
    <div className="Profile-body bg-light" style={{ minHeight: "100vh" }}>
      <NavbarObject />

      <Container className="mt-3">
        <Row>
          <Col lg={3}>
            <Container fluid className="bg-white rounded-3 shadow-sm m-1 p-3">
              <Row>
                <Col xs={3} lg={12} className="mt-2 text-center">
                  <Image src={profilePic} roundedCircle fluid />
                </Col>

                <Col className="ml-0 mt-3">
                  <strong>
                    {usrLastName}, {usrFirstName}
                  </strong>
                  <br />
                  {usrCourse}
                </Col>
              </Row>

              <div className="mt-3">
                <div className="m-1">
                  <ApartmentRoundedIcon /> Works at {usrJobSite}
                </div>
                <div className="m-1">
                  <BusinessCenterRoundedIcon /> {userJobType}
                </div>
                <div className="m-1 mt-2">
                  <GitHubIcon /> {usrGithubLink}
                </div>
                <div className="m-1">
                  <LinkedInIcon /> {usrLinkedInLink}
                </div>
                <div className="m-1">
                  <EmailRoundedIcon /> {usrEmailAdd}
                </div>
                <div className="m-1">
                  <LocalPhoneRoundedIcon /> {usrPhoneNum}
                </div>
              </div>
            </Container>
          </Col>

          <Col className="bg-white rounded-3 shadow-sm m-1 p-3">
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
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
                "dark",
              ].map((variant) => (
                <Alert variant={variant}>Test Element Only</Alert>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
