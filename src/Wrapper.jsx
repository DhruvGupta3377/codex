import { useState, useEffect } from "react";
import View from "./View";
import TextCanvas from "./TextCanvas";
import { invoke } from "@tauri-apps/api/tauri";
import CommandPalette from "./CommandPalette";
import { StateContext } from "./StateContext";

const Wrapper = () => {
  const [inEditing, setInEditing] = useState(true);
  const [fileName, setFilename] = useState("temp");
  const [cpmodal, setCpmodal] = useState();

  // All possible Commands

  async function getfilename() {
    const re = await invoke("get_file_name");
    if (re != "") {
      setFilename(re);
    }
  }

  async function fileExpClickHandler() {
    await invoke("open_filemanager");
    getfilename();
    window.location.reload();
  }

  async function newFileHandler() {
    await invoke("new_file");
    getfilename();
    window.location.reload();
  }

  function changeToViewMode() {
    setInEditing(false);
  }

  function changeToEditMode() {
    setInEditing(true);
  }

  useEffect(() => {
    getfilename();

    // All Shortcut actions
    const khandleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        console.log("setting");
        setCpmodal(
          <CommandPalette
            noComPal={() => {
              setCpmodal("");
            }}
          />
        );
      }
    };
    window.addEventListener("keydown", khandleKeyDown);

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
      window.removeEventListener("keydown", khandleKeyDown);
      window.removeEventListener("keydown", ehandleKeyDown);
      window.removeEventListener("keydown", qhandleKeyDown);
      window.removeEventListener("keydown", nhandleKeyDown);
    };
  }, []);
  return (
    <>
      <StateContext.Provider
        value={{
          getfilename,
          fileExpClickHandler,
          newFileHandler,
          changeToViewMode,
          changeToEditMode,
        }}
      >
        <p
          style={{
            fontSize: 15,
            color: "pink",
            fontFamily: "hack",
            left: 5,
            padding: 0,
            textAlign: "Left",
            top: 0,
            position: "absolute",
          }}
        >
          Title : {fileName}
        </p>
        {inEditing ? <TextCanvas pfunc={setInEditing} /> : <View />}
        {cpmodal}
      </StateContext.Provider>
    </>
  );
};

export default Wrapper;
