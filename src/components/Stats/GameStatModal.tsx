import { useState, useEffect } from "react";
import { Card, Modal, Table } from "react-bootstrap";

function GameStatModal(props: any) {
  const [show, setShow] = useState(false);
  const { accuracy, wpmNet, wpmGross, total, score } = props;

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(props.open);
  }, [props.open]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Game Stats</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row justify-content-center">
          <div className="col">
            <Card style={{ width: "100%!important", marginTop: "16px" }}>
              <Card.Body>
                <Card.Title
                  className="text-center"
                  style={{ fontSize: "2rem" }}
                >
                  {wpmNet} WPM
                </Card.Title>
                <Card.Text>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Accuracy</td>
                        <td>{accuracy}%</td>
                      </tr>
                      <tr>
                        <td>Gross WPM </td>
                        <td>{wpmGross}</td>
                      </tr>
                      <tr>
                        <td>Incorrect Words </td>
                        <td>{total - score}</td>
                      </tr>
                      <tr>
                        <td>Highest Net WPM </td>
                        <td>{score}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GameStatModal;
