import { useState, useRef } from "react";
import "./textcanvas.css";

const TextCanvas = () => {
  const [data, setData] = useState();
  const inputRef = useRef(null);
  const textInputHandler = () => {
    const input = event.target.value;
    console.log(input);
    setData(input);
    const lastChar = input.slice(-1);
    if (lastChar === "(") {
      setData(input + ")");
    }
  };

  return (
    <div>
      <textarea
        ref={inputRef}
        value={data}
        onChange={textInputHandler}
        id="fullscreen-textarea"
        placeholder="Type something..."
      ></textarea>
    </div>
  );
};

export default TextCanvas;
