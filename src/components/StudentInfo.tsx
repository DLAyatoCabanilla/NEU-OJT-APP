import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Alert,
  Nav,
  Form,
  Tab,
  Tabs,
  FloatingLabel,
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

function SettingsNavbar() {
  return (
    <Nav variant="underline" defaultActiveKey="link-1">
      <Nav.Item>
        <Nav.Link eventKey="link-1">User Details</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Accounts</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
function SettingsMyOtherAccounts() {
  return (
    <>
      <FloatingLabel
        controlId="txt_github"
        label="Github username"
        className="mb-3"
      >
        <Form.Control defaultValue="nngel" />
      </FloatingLabel>
      <FloatingLabel
        controlId="txt_linkedin"
        label="Linkedin username"
        className="mb-3"
      >
        <Form.Control defaultValue="loricaedwrd" />
      </FloatingLabel>
    </>
  );
}
function SettingsPersonalAccount() {
  return (
    <>
      <Row>
        <Col>
          <FloatingLabel
            controlId="txt_Firstname"
            label="First Name"
            className="mb-3"
          >
            <Form.Control defaultValue="Edward Angel" />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            controlId="txt_Middlename"
            label="Middle Name"
            className="mb-3"
          >
            <Form.Control defaultValue="Rivera" />
          </FloatingLabel>
        </Col>

        <Col>
          <FloatingLabel
            controlId="txt_Lastname"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control defaultValue="Lorica" />
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel
        controlId="txt_Phonenum"
        label="Phone Number"
        className="mb-3"
      >
        <Form.Control defaultValue="+63 976 543 2190" />
      </FloatingLabel>

      <FloatingLabel
        controlId="txt_email"
        label="Institutional Email"
        className="mb-3"
      >
        <Form.Control
          type="email"
          defaultValue="edwardangel.lorica@neu.edu.ph"
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="txt_emailmain"
        label="Main Email"
        className="mb-3"
      >
        <Form.Control type="email" defaultValue="edwardangellorica@gmail.com" />
      </FloatingLabel>
    </>
  );
}

const Profile: React.FC = () => {
  return (
    <div className="Profile-body bg-light" style={{ minHeight: "100vh" }}>
      <NavbarObject />
      <Container className="mt-3">
        <Row>
          <Col className="bg-white rounded-3 shadow-sm m-1 p-3">
            <Container fluid>
              <Tabs
                variant="underline"
                defaultActiveKey="tab_user"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="tab_user" title="User Details">
                  <SettingsPersonalAccount />
                </Tab>
                <Tab eventKey="tab_acc" title="Accounts">
                  <SettingsMyOtherAccounts />
                </Tab>
              </Tabs>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
