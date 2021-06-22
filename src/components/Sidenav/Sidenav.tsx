import React from "react";
import { Nav } from "react-bootstrap";
import { FiPlay, FiSettings } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import styled from "styled-components";
import { IconContext } from "react-icons/lib";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserCog } from "react-icons/fa";

const StyledSidenav = styled.div`
  height: 100%;
  width: 150px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: #32373c;
  overflow-x: hidden;
  padding-top: 20px;

  .nav-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .nav-item {
      width: 100%;
      color: white;
      flex: 1;
      flex-direction: column;
      height: 100%;
      max-height: 120px;
      gap: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba(0, 0, 0, 0.15);
      }

      &.active,
      &.active:hover {
        color: #fff;
        text-decoration: none;
        background-color: #007bff;
      }
    }
  }

  @media (max-width: 768px) {
    height: auto;
    width: 100%;
    bottom: 0;
    left: 0;
    top: unset;
    padding-top: 0;

    .nav-container {
      width: 100%;
      height: auto;
      flex-direction: row!important;

      .nav-item {
        padding: 15px 0;
        
        & > span {
          display: none;
        }

        & > svg {
          height: 22px;
          width: 22px;
        }
      }
    }
  }
`;

const Sidenav = () => {
  return (
    <StyledSidenav>
      <Nav className="nav-container flex-column">
        <LinkContainer to="/start-typing">
          <Nav.Link className="nav-item">
            <IconContext.Provider value={{ size: "2rem" }}>
              <FiPlay />
            </IconContext.Provider>
           <span>Start Typing</span>
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/custom-typing">
          <Nav.Link className="nav-item">
            <IconContext.Provider value={{ size: "2rem", color: "#fff" }}>
              <FaUserCog />
            </IconContext.Provider>
            <span>Custom Typing</span>
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/game-stats">
          <Nav.Link className="nav-item">
            <IconContext.Provider value={{ size: "1.8rem" }}>
              <BsGraphUp />
            </IconContext.Provider>
           <span>Game Stats</span> 
          </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/settings">
          <Nav.Link className="nav-item">
            <IconContext.Provider value={{ size: "2rem" }}>
              <FiSettings />
            </IconContext.Provider>
            <span>Settings</span>
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </StyledSidenav>
  );
};
export default Sidenav;
