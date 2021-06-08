import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const brandStyle = {
  fontSize: "28px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  fontWeight: 600,
};

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/" style={brandStyle}>
          <img
            alt=""
            src="https://react-bootstrap.netlify.app/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          WordBeater
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default Header;
