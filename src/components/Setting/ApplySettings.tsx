import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { chapters as chaptersDb } from "../../db/chapters";

function ApplySettings(props: any) {
  const [chapters] = useState(chaptersDb);
  const [chapter, setChapter] = useState(chapters[0]);

  useEffect(() => {
    props.setParas(chapter.description);
  }, [chapter, props]);

  return (
    <Form className="p-3 mt-3 bg-white rounded" style={{ fontSize: "1rem" }}>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          as="select"
          onChange={(event: any) => props.setDuration(+event.target.value)}
          defaultValue={props.duration}
        >
          <option value="3">3 sec</option>
          <option value="5">5 sec</option>
          <option value="15">15 sec</option>
          <option value="30">30 sec</option>
          <option value="60">1 min</option>
          <option value="180">3 min</option>
          <option value="300">5 min</option>
          <option value="600">10 min</option>
          <option value="900">15 min</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Select Paragraph Title</Form.Label>
        <Form.Control
          as="select"
          onChange={(event: any) =>
            setChapter(
              chapters.find((chapter) => chapter.id === +event.target.value) ||
                chapters[0]
            )
          }
          defaultValue={1}
        >
          {chapters &&
            chapters.length > 0 &&
            chapters.map((chapter, index) => (
              <option value={chapter.id}>{chapter.title}</option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Custom Paragraph</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={chapter.description}
          onChange={(event: any) => props.setParas(event.target.value)}
          style={{ fontSize: "1.1rem" }}
        />
      </Form.Group>

      <Button variant="primary" onClick={() => props.setOpen(false)}>
        Apply Settings
      </Button>
    </Form>
  );
}
export default ApplySettings;
