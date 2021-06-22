import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

function GameStatsTable(props: any) {
  return (
    <>
     <div className="table-responsive">
        <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th >#</th>
            <th >Accuracy</th>
            <th style={{minWidth: "100px"}}>WPM Net</th>
            <th style={{minWidth: "150px"}}>WPM Gross</th>
            <th style={{minWidth: "100px"}}>Total</th>
            <th style={{minWidth: "100px"}}>Seconds</th>
            <th style={{minWidth: "200px"}}>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item: any, index: number) => (
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
     </div>
    </>
  );
}

export default GameStatsTable;
