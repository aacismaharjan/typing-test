import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidenav from "./components/Sidenav/Sidenav";
import Header from "./components/Header/Header";
import { Container } from "react-bootstrap";

const StyledContent = styled.div`
  margin-left: 150px;
`;

const StyledApp = styled.div`
  min-height: 100vh;
  background: rgba(52, 58, 64, 0.94);
`;

const text = `Days are not of equal value in one's life. Some bring happiness
            while others bring sadness. Sadness and happiness both are equally
            important to`;

const WordSpan = (props: any) => {
  const getClassName = () => {
    if (props.index === props.counter) {
      return "highlight";
    } else if (props.index < props.counter) {
      console.log(props.text, props.words, props.index);
      if (props.text[props.index] === props.words[props.index]) {
        console.log("BINGO");
        return "text-success";
      } else {
        return "text-danger";
      }
    }

    return "";
  };

  return (
    <React.Fragment>
      <span className={getClassName()}>{props.children}</span>{" "}
    </React.Fragment>
  );
};

const TypingTextWords = (props: any) => {
  return (
    <p className="lead p-3 bg-white text-secondary rounded">
      {props.text.split(/\s+/).map((word: string, index: number) => (
        <WordSpan
          key={index}
          index={index}
          words={props.words}
          text={props.text.split(/\s+/)}
          counter={props.counter}
          curWord={props.word}
        >
          {word}
        </WordSpan>
      ))}
    </p>
  );
};

const TypingTextInput = (props: any) => {
  const handleChange = (event: any) => {
    const word = event.target.value;

    if (word.indexOf(" ") > -1) {
      props.setValue(word);
      event.target.value = "";
    }
  };

  return (
    <div className="row no-gutters">
      <div className="col">
        <input
          type="text"
          className="form-control rounded-left py-1"
          id="word-input"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          style={{ fontSize: "1.25rem" }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

function App() {
  const [counter, setCounter] = useState(0);
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (word) {
      setCounter((couter) => couter + 1);
      setWords((words) => [...words, word.trim()]);
    }
  }, [word]);

  return (
    <StyledApp>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px" }}>
          <TypingTextWords
            text={text}
            counter={counter}
            word={word}
            words={words}
          />
          <TypingTextInput setValue={setWord} />
        </Container>
      </StyledContent>
    </StyledApp>
  );
}

export default App;
