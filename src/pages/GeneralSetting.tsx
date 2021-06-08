import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import Sidenav from "../components/Sidenav/Sidenav";

const StyledContent = styled.div`
  margin-left: 150px;
`;

export const initialSettings: SettingsTypeI = {
  mode: "1",
  time: "1",
};

export interface SettingsTypeI {
  mode: string;
  time: string;
}

function GeneralSetting() {
  const history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;

    const settings: SettingsTypeI = {
      mode: form.elements["select-mode"].value,
      time: form.elements["select-time"].value,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
    history.push("/start-typing");
  };

  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px" }}>
          <Form
            style={{ background: "white" }}
            className="p-4 rounded"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Mode</Form.Label>
              <Form.Control
                as="select"
                name="select-mode"
                defaultValue={
                  JSON.parse(localStorage.getItem("settings") || "[]")["mode"]
                }
              >
                <option value="1">Easy</option>
                <option value="2">Normal</option>
                <option value="3">Hard</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Time</Form.Label>
              <Form.Control
                as="select"
                name="select-time"
                defaultValue={
                  JSON.parse(localStorage.getItem("settings") || "[]")["time"]
                }
              >
                <option value="1">Short</option>
                <option value="2">Normal</option>
                <option value="3">Long</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </StyledContent>
    </>
  );
}

export default GeneralSetting;
