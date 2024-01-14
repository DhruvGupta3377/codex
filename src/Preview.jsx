import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

const Preview = () => {
  const [text, setText] = useState();
  async function clickHandler () {
    setText(await invoke("get_parsed_text"))
  }

  async function fileExpClickHandler(){
    await invoke("open_filemanager")
  }

  return (
    <>
    <button onClick={clickHandler}>Preview</button>
    <div dangerouslySetInnerHTML={{ __html: text }} />
    <button onClick={fileExpClickHandler}>FileEXP</button>
    </>
  )
}

export default Preview