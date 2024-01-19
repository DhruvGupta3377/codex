import { useState, useRef, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./textcanvas.css";

const TextCanvas = (props) => {
  const inputRef = useRef(null);

  useEffect(() => {
    async function getFileTxt() {
      const t = await invoke("read_curr_file");
      inputRef.current.value = t;
      parse(t);
    }
    getFileTxt();
    inputRef.current.focus();
    
    async function parse(input) {
      await invoke("parse", { data: input });
    }
    const phandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        parse(inputRef.current.value);
        console.log("parsed");
        props.pfunc(false);
      }
    };
    window.addEventListener("keydown", phandleKeyDown);

    return () => {
      window.removeEventListener("keydown", phandleKeyDown);
    };
  }, []);

  return (
    <>
      <textarea
        className="textarea"
        ref={inputRef}
        id="fullscreen-textarea"
        placeholder="Type something...."
      ></textarea>
    </>
  );
};

export default TextCanvas;
