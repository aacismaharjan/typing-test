import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { Container, Form } from "react-bootstrap";
import Sidenav from "../components/Sidenav/Sidenav";
import GameChart from "../components/Stats/BarChart";
import GameStatsTable from "../components/Stats/Table";
import GameLineChart from "../components/Stats/LineChart";

const StyledContent = styled.div`
  margin-left: 150px;

  .table {
    background-color: white;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

function GameStats() {
  const [items, setItems] = useState<any>([]);
  const [type, setType] = useState(1);
  const [nRecords, seNRecords] = useState(10);

  useEffect(() => {
    let records: any = localStorage.getItem("records");
    records = records ? JSON.parse(records) : [];
    setItems(
      records
        .reverse()
        .filter((item: any) => item.seconds > 30)
        .slice(0, nRecords)
    );
  }, [nRecords]);

  const getGameStatByType = (type: number, items: any) => {
    if (type === 1) {
      return <GameStatsTable items={items} />;
    } else if (type === 2) {
      return <GameChart items={items} />;
    } else {
      return <GameLineChart items={items} />;
    }
  };

  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px", paddingBottom: "20px" }}>
          <Form className="p-3 pb-2 rounded mb-3 bg-white">
            <div className="row">
              <div className="col-6 col-md-3 ">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    name="select-stat-type"
                    onChange={(event) => setType(+event.target.value)}
                  >
                    <option value="1">Table</option>
                    <option value="2">Bar Graph</option>
                    <option value="3">Line Graph</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div className="col-6 col-md-3 ">
                <Form.Group className="mb-0" controlId="formBasicEmail">
                  <Form.Control
                    as="select"
                    name="select-stat-type"
                    onChange={(event) => seNRecords(+event.target.value)}
                  >
                    <option value="10">10 Records</option>
                    <option value="20">20 Records</option>
                    <option value="30">30 Records</option>
                    <option value="50">50 Records</option>
                    <option value="100">100 Records</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </Form>

          {getGameStatByType(type, items)}
        </Container>
      </StyledContent>
    </>
  );
}

export default GameStats;
