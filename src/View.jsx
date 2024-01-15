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

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </>
  );
};

export default View;
