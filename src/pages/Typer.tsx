import React, { useEffect, useRef, useState } from "react";
import { getTimer } from "./../utils/date";
import { initialSettings, SettingsTypeI } from "./GeneralSetting";
import TypingTextInput from "../components/TypingTextInput";
import TypingTextWords from "../components/TypingTextWords";
import useGameStats from "../useHook/useGameStats";
import GameStatModal from "../components/GameStatModal";

interface TyperPropsI {
  text: string;
  settings: SettingsTypeI;
}

function Typer(props: TyperPropsI) {
  const [DISPLAY_COUNT] = useState(32);
  const [counter, setCounter] = useState(0);
  const [curCounter, setCurCounter] = useState(0);
  const [paraIndex, setParaIndex] = useState(0);
  const [word, setWord] = useState("");
  const [words, setWords] = useState<string[]>([]);
  const [typingTime, setTypingTime] = useState(parseInt(initialSettings.time));
  const [curWords, setCurWords] = useState<string[]>([]);
  const [para, setPara] = useState<string>("");
  const [paras, setParas] = useState<string>("");
  const [settings, setSettings] = useState<SettingsTypeI>(initialSettings);

  useEffect(() => {
    if (props.settings) {
      setSettings(props.settings);
    } else {
      setSettings(initialSettings);
    }
  }, [props.settings]);

  useEffect(() => {
    const paragraph = props.text;
    setParas(paragraph);
  }, [props.text, settings]);

  useEffect(() => {
    setPara(
      paras
        .split(" ")
        .slice(paraIndex, paraIndex + DISPLAY_COUNT)
        .join(" ")
    );
  }, [paras, paraIndex, DISPLAY_COUNT]);

  useEffect(() => {
    setTypingTime(parseInt(settings.time) * 1000 * 60 * 15);
  }, [settings]);

  useEffect(() => {
    time.current = typingTime;
  }, [typingTime]);

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  let time = useRef(typingTime);
  const [timer, setTimer] = useState(getTimer(typingTime));
  let timerInterval = useRef<any>();
  let gameInterval = useRef<any>();
  const inputRef = useRef<any>();
  const paragraphRef = useRef<any>();

  const { score, total, wpmNet, wpmGross, accuracy } = useGameStats(
    startTime,
    paras,
    counter,
    words,
    timerInterval,
    isGameOver
  );

  useEffect(() => {
    if (startTime) {
      setTimer(getTimer(typingTime));

      clearInterval(timerInterval.current);

      timerInterval.current = setInterval(() => {
        time.current -= 1000 * 60;
        if (time.current < 0) {
          clearInterval(timerInterval.current);
          clearInterval(gameInterval.current);
          setIsGameOver(true);
        } else {
          setTimer(getTimer(time.current));
        }
      }, 1000);
    }
  }, [startTime, typingTime]);

  useEffect(() => {
    if (word) {
      setCounter((couter) => couter + 1);
      setCurCounter((couter) => couter + 1);
      setWords((words) => [...words, word.trim()]);
      setCurWords((words) => [...words, word.trim()]);
    }
  }, [word]);

  useEffect(() => {
    if (curWords.length >= para.split(" ").length) {
      setCurWords([]);
      setCurCounter(0);
      setParaIndex((index) => index + DISPLAY_COUNT);
    }
  }, [curWords, para, DISPLAY_COUNT]);

  useEffect(() => {
    setTimer(getTimer(typingTime));
  }, [typingTime]);

  const handleReset = () => {
    time.current = typingTime;

    setIsGameOver(false);
    setWord("");
    setWords([]);
    setCurWords([]);
    setPara(
      paras
        .split(" ")
        .slice(paraIndex, paraIndex + DISPLAY_COUNT)
        .join(" ")
    );
    setCounter(0);
    setCurCounter(0);
    setStartTime(null);
    clearInterval(gameInterval.current);

    clearInterval(timerInterval.current);

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const handleChange = () => {
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  return (
    <React.Fragment>
      <TypingTextWords
        text={para}
        counter={curCounter}
        word={word}
        words={curWords}
        paragraphRef={paragraphRef}
      />

      <TypingTextInput
        setValue={setWord}
        disabled={isGameOver}
        autoFocus
        time={timer}
        onInput={handleChange}
        reset={handleReset}
        childRef={inputRef}
      />

      <GameStatModal
        open={isGameOver}
        accuracy={accuracy}
        wpmNet={wpmNet}
        wpmGross={wpmGross}
        total={total}
        score={score}
      />
    </React.Fragment>
  );
}

export default Typer;
