import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidenav from "./../components/Sidenav/Sidenav";
import Header from "./../components/Header/Header";
import { Container } from "react-bootstrap";
import { paragraphs } from "./../db/paragraph";
import { initialSettings, SettingsTypeI } from "./GeneralSetting";
import Typer from "../components/Typing/Typer";

const StyledContent = styled.div`
  margin-left: 150px;
`;

function StartTyping() {
  const [paras, setParas] = useState<string>("");
  const [settings, setSettings] = useState<SettingsTypeI>(initialSettings);

  useEffect(() => {
    const settings = localStorage.getItem("settings");
    if (settings) {
      setSettings(JSON.parse(settings!));
    } else {
      setSettings(initialSettings);
    }
  }, []);

  useEffect(() => {
    const paragraph = paragraphs.getParagraph(settings.mode);
    setParas(paragraph);
  }, [settings]);

  return (
    <>
      <Sidenav />

      <StyledContent>
        <Header />

        <Container style={{ paddingTop: "30px", paddingBottom: "20px" }}>
          <Typer text={paras} settings={settings} />
        </Container>
      </StyledContent>
    </>
  );
}

export default StartTyping;
