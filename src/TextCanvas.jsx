import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./textcanvas.css";

const TextCanvas = () => {
  
  const [data, setData] = useState();
  const inputRef = useRef(null);
  async function greet(){
    console.log(await invoke("greet", {data : data}))
    console.log(await invoke("parse", {data : data}))
  }
  const textInputHandler = () => {
    const input = event.target.value;
    console.log(input);
    setData(input);
    const lastChar = input.slice(-1);
    if (lastChar === "(") {
      setData(input + ")"); 
    }
    greet()
  };

  return (
    <div>
      <textarea
        ref={inputRef}
        value={data}
        onChange={textInputHandler}
        id="fullscreen-textarea"
        placeholder="Type something...."
      ></textarea>
    </div>
  );
};

export default TextCanvas;
