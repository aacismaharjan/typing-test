import React from "react";
import styled from "styled-components";
import Sidenav from "../components/Sidenav/Sidenav";
import Header from "../components/Header/Header";
import { Container } from "react-bootstrap";
import Typer from "./Typer";
import ApplySettings from "./ApplySettings";

const StyledContent = styled.div`
  margin-left: 150px;
`;

function CustomTyping() {
  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px" }}>
          <ApplySettings />

          <Typer
            text={
              "Scolding is something common in student life. Being a naughty boy, I am always scolded by my parents. But one day I was severely scolded by my English teacher. She infect teaches well. But that day, I could not resist the temptation that an adventure of Nancy Drew offered. While she was teaching, I was completely engrossed in reading that book. Nancy Drew was caught in the trap laid by some smugglers and it was then when I felt a light tap on my bent head. The teacher had caught me red handed. She scolded me then and there and insulted me in front of the whole class. I was embarrassed. My cheeks burned being guilty conscious. When the class was over, I went to the teacher to apologize. When she saw that I had realized my mistake, she cooled down and then told me in a very kind manner how disheartening it was when she found any student not paying attention. I was genuinely sorry and promised to myself never to commit such a mistake again."
            }
            settings={{ time: "1", mode: "0" }}
          />
        </Container>
      </StyledContent>
    </>
  );
}

export default CustomTyping;
