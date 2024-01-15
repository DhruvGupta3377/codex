import { useState, useRef,useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./textcanvas.css";
import { useHotkeys } from "react-hotkeys-hook";

const TextCanvas = () => {
  const [data, setData] = useState();
  const [formattedData, setFormattedData] = useState();

  const inputRef = useRef(null);

  useEffect(()=>{
    inputRef.current.focus();
  })

  async function parse(input) {
    setFormattedData(await invoke("parse", { data: input }));
    console.log(formattedData);
  }
  
  const textInputHandler = () => {
    const input = event.target.value;
    setData(input);
    parse(input);
  };
  
  return (
    <>
    <textarea
    className="textarea" 
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
