import React from "react";
import { MdRefresh } from "react-icons/md";
import { BiCog } from "react-icons/bi";

const TypingTextInput = (props: any) => {
  const { setValue, reset, time, childRef, ...rest } = props;
  const handleChange = (event: any) => {
    const word = event.target.value;

    if (word.indexOf(" ") > -1) {
      setValue(word);
      event.target.value = "";
    }
  };

  return (
    <div className="row no-gutters justify-space-between">
      <div className="col">
        <input
          type="text"
          className="form-control rounded-left py-1"
          id="word-input"
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          style={{ fontSize: "1.5rem" }}
          onChange={handleChange}
          ref={childRef}
          {...rest}
        />
      </div>

      <div className="col col-auto pl-3">
        <button className="btn btn-primary" style={{ padding: "12px 14px" }}>
          {time}
        </button>
      </div>

      {props.handleSetting && (
        <div className="col col-auto pl-3">
          <button
            className="btn btn-primary"
            style={{ padding: "12px 14px" }}
            onClick={props.handleSetting}
          >
            <BiCog fontSize="22px" />
          </button>
        </div>
      )}

      <div className="col col-auto pl-3">
        <button
          className="btn btn-primary"
          style={{ padding: "12px 14px" }}
          onClick={() => reset()}
        >
          <MdRefresh fontSize="22px" />
        </button>
      </div>
    </div>
  );
};

export default TypingTextInput;
