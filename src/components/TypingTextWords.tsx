import React from "react";

const WordSpan = (props: any) => {
  const getClassName = () => {
    if (props.index === props.counter) {
      return "highlight";
    } else if (props.index < props.counter) {
      const word = props.text[props.index];
      const userWord = props.words[props.index];
      return word === userWord ? "text-success" : "text-danger";
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
    <p
      className="lead p-3 bg-white text-secondary rounded"
      style={{
        fontSize: "1.5rem",
        wordSpacing: "0.04rem",
        letterSpacing: "0.02rem",
      }}
      ref={props.paragraphRef}
    >
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

export default TypingTextWords;
