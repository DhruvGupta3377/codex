import React, { useState } from "react";
import { useRef, useEffect } from "react";
import "./compal.css";
import {fileExpClickHandler} from "./commands.jsx";

const CommandPalette = (props) => {

  const divRef = useRef(null);
  // const [currOption, setCurrOption] = useState(0)

  function clickHandler (key){
    console.log(key);
    fileExpClickHandler();
  }

  useEffect(() => {
    divRef.current.focus();

    // const dahandleKeyDown = (event) => {
    //   if (event.key === "ArrowDown") {
    //     event.preventDefault();
    //     console.log("ArrowDown");
    //     setCurrOption(currOption + 1)
    //     console.log(currOption)
    //     if (currOption < 6){
    //     }
    //   }
    // }
    // window.addEventListener("keydown", dahandleKeyDown);

    // const uahandleKeyDown = (event) => {
    //   if (event.key === "ArrowUp") {
    //     event.preventDefault();
    //     console.log("ArrowUp");
    //     setCurrOption(currOption - 1)
    //     console.log(currOption)
    //     if (currOption >= 0){
    //     }
    //   }
    // }
    // window.addEventListener("keydown", uahandleKeyDown);

    // return() => {
    //   window.removeEventListener("keydown", dahandleKeyDown);
    //   window.removeEventListener("keydown", uahandleKeyDown);
    // }

  }, []);

  const menuoptions = ["View Mode", "Edit Mode", "Select Space", "Open Note", "Create Note", "Help"]; 

  return (
    <div style={fullPageStyle} onClick={props.noComPal}>
      <div style={modalContainerStyle}>
      <center>
      <div ref={divRef} style={modalContentStyle}>
      {menuoptions.map((option, index) => {
        return <div className="button" onClick={() => clickHandler(index)} key = {index}>{option}</div>
      })}
      </div>
      </center>
      </div>
    </div>
  );
};

const fullPageStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const modalContainerStyle = {
  marginTop: 90,
  position: "fixed",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
};

const modalContentStyle = {
  width: "500px",
  padding: "10px",
  backgroundColor:"#2e363e",
  borderRadius: "8px",
};

export default CommandPalette;
