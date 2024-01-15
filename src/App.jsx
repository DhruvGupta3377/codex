import { useState, useEffect } from "react";
import View from "./View";
import TextCanvas from "./TextCanvas";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [inEditing, setInEditing] = useState(true);
  async function fileExpClickHandler() {
    await invoke("open_filemanager");
  }
  useEffect(() => {
    const phandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        setInEditing(false);
      }
    };
    window.addEventListener("keydown", phandleKeyDown);

    const ehandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        setInEditing(true);
      }
    };
    window.addEventListener("keydown", ehandleKeyDown);


    const qhandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "q") {
        event.preventDefault();
        fileExpClickHandler();
      }
    };
    window.addEventListener("keydown", qhandleKeyDown);


    return () => {
      window.removeEventListener("keydown", phandleKeyDown);
      window.removeEventListener("keydown", ehandleKeyDown);
      window.removeEventListener("keydown", qhandleKeyDown);
    };
  }, []);

  return <>
  {inEditing ? <TextCanvas /> : <View />}
  </>;
}

export default App;
