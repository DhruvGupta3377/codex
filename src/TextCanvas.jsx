import { useState, useRef,useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./textcanvas.css";

const TextCanvas = () => {
  const [txtRecived, setTxtRecieved] = useState("");
  const inputRef = useRef(null);

  useEffect(()=>{
    async function getFileTxt() {
      const t = await invoke("read_curr_file")
      inputRef.current.value = t;
      setTxtRecieved(t);
      parse(t);
    }
    // console.log("fetching")
    getFileTxt()
    inputRef.current.focus();
  },[])

  async function parse(input) {
    await invoke("parse", { data: input});
    // console.log(formattedData);
  }
  
  const textInputHandler = () => {
    const input = event.target.value;
    parse(input)
    // console.log(parse(input));

  };
  
  return (
    <>
    <textarea
    className="textarea" 
    ref={inputRef}
    onChange={textInputHandler}
    id="fullscreen-textarea"
    placeholder="Type something...."
    // onLoad={alert("edit")}
    ></textarea>
    </>
  );
};

export default TextCanvas;
