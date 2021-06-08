import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";

function ApplySettings() {
  return (
    <>
      <Accordion defaultActiveKey="0" className="mb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Open Settings
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default ApplySettings;
