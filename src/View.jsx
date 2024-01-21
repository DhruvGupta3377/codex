import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import "./view.css";

const View = () => {
  const [text, setText] = useState();
  async function fetchFile() {
    setText(await invoke("get_parsed_text"));
  }
  useEffect(() => {
    fetchFile();
  });
  
  // <p style={{ fontSize: 15,  fontFamily:"hack" , textAlign: 'right', padding: 5, color: "grey"}}>View </p>
  return (
    <>
    <div className="viewdiv" dangerouslySetInnerHTML={{ __html: text }} >
    </div>
    </>
  );
};

export default View;
