import React, { useState } from "react";
import styled from "styled-components";
import Sidenav from "../components/Sidenav/Sidenav";
import Header from "../components/Header/Header";
import { Container } from "react-bootstrap";
import Typer from "../components/Typer";
import ApplySettings from "../components/ApplySettings";

const StyledContent = styled.div`
  margin-left: 150px;
`;

function CustomTyping() {
  const [open, setOpen] = useState(true);
  const [duration, setDuration] = useState(60);
  const [paras, setParas] = useState(
    "The quick brown fox jumps over the lazy dog"
  );

  const handleSetting = () => {
    setOpen((open) => !open);
  };

  console.log({ duration, paras });

  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px" }}>
          <Typer
            text={paras.replace(/(\r\n|\r|\n){2,}/g, "$1\n")}
            settings={{ time: `${duration / 15}`, mode: "0" }}
            handleSetting={handleSetting}
          />

          {open && (
            <ApplySettings
              setOpen={setOpen}
              duration={duration}
              setDuration={setDuration}
              paras={paras}
              setParas={setParas}
            />
          )}
        </Container>
      </StyledContent>
    </>
  );
}

export default CustomTyping;
