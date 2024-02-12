import { useState, useEffect } from "react";
import View from "./View";
import TextCanvas from "./TextCanvas";
import { invoke } from "@tauri-apps/api/tauri";

function App() {
  const [inEditing, setInEditing] = useState(true);
  const [fileName, setFilename] = useState("temp");

  async function getfilename(){
    const re = await invoke("get_file_name");
    if (re != ""){
      setFilename(re);
    }
  }

  async function fileExpClickHandler() {
    await invoke("open_filemanager");
    getfilename();
    window.location.reload()
  }
  
  async function newFileHandler(){
    await invoke("new_file");
    getfilename();
    window.location.reload()
  }

  useEffect(() => {
    // const phandleKeyDown = (event) => {
    //   if (event.ctrlKey && event.key === "p") {
    //     event.preventDefault();
    //     setInEditing(false);
    //   }
    // };
    // window.addEventListener("keydown", phandleKeyDown);
    getfilename()

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
        setInEditing(true);
      }
    };
    window.addEventListener("keydown", qhandleKeyDown);

    const nhandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "n") {
        event.preventDefault();
        newFileHandler();
        setInEditing(true);
      }
    };
    window.addEventListener("keydown", nhandleKeyDown);


    return () => {
      // window.removeEventListener("keydown", phandleKeyDown);
      window.removeEventListener("keydown", ehandleKeyDown);
      window.removeEventListener("keydown", qhandleKeyDown);
      window.removeEventListener("keydown", nhandleKeyDown);
    };
  }, []);

  return <>
  <p style={{ fontSize: 15 , color: "pink",  fontFamily:"hack" , left: 5 , padding: 0, textAlign: 'Left', top: 0, position :"absolute"}}>Title : {fileName}</p>
  {inEditing ? <TextCanvas pfunc = {setInEditing}/> : <View />}
  </>;
}

export default App;
