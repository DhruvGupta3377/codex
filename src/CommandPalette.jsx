import {useContext } from "react";
import "./compal.css";
import { StateContext } from "./StateContext.jsx";

const CommandPalette = (props) => {
  const ctx = useContext(StateContext);

  const commands = [
    ctx.changeToViewMode,
    ctx.changeToEditMode(),
    console.log("work in progress"),
    () => ctx.fileExpClickHandler(),
    ctx.newFileHandler,
    console.log("work in progress")
  ]
  const menuoptions = [
    "View Mode",
    "Edit Mode",
    "Select Space",
    "Open Note",
    "Create Note",
    "Help",
  ];


  return (
    <div style={fullPageStyle} onClick={props.noComPal}>
      <div style={modalContainerStyle}>
        <center>
          <div style={modalContentStyle}>
            {menuoptions.map((option, index) => {
              return (
                <div
                  className="button"
                  onClick={commands[index]}
                  key={index}
                >
                  {option}
                </div>
              );
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
  backgroundColor: "#2e363e",
  borderRadius: "8px",
};

export default CommandPalette;
