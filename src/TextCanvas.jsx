import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./textcanvas.css";
import Preview from "./Preview";

const TextCanvas = () => {
  const [data, setData] = useState();
  const [formattedData, setFormattedData] = useState();
  const inputRef = useRef(null);
  async function parse() {
    setFormattedData(await invoke("parse", { data: data }));
    console.log(formattedData);
  }
  const textInputHandler = () => {
    const input = event.target.value;
    console.log(input);
    setData(input);
    const lastChar = input.slice(-1);
    if (lastChar === "(") {
      setData(input + ")");
    }
    parse();
  };

  return (
    <>
      <textarea
        ref={inputRef}
        value={data}
        onChange={textInputHandler}
        id="fullscreen-textarea"
        placeholder="Type something...."
      ></textarea>
    </>
  );
};

export default TextCanvas;
