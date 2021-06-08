import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Container, Table } from "react-bootstrap";
import moment from "moment";
import Sidenav from "../components/Sidenav/Sidenav";

const StyledContent = styled.div`
  margin-left: 150px;

  .container {
    padding-top: 30px;
  }

  .table {
    background-color: white;
  }
`;

function GameStats() {
  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container className="container">
          <Table striped bordered hover className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Accuracy</th>
                <th>WPM Net</th>
                <th>WPM Gross</th>
                <th>Total</th>
                <th>Seconds</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {localStorage.getItem("records") &&
                JSON.parse(localStorage.getItem("records") || "[]")
                  .reverse()
                  .slice(0, 10)
                  .map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.accuracy}%</td>
                      <td>{item.wpmNet} wpm</td>
                      <td>{item.wpmGross} wpm</td>
                      <td>{item.total} words</td>
                      <td>{item.seconds}s</td>
                      <td>{moment(item.startTime).fromNow()}s</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Container>
      </StyledContent>
    </>
  );
}

export default GameStats;
