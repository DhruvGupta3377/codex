import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

const Preview = () => {
  const [text, setText] = useState();
  async function clickHandler () {
    setText(await invoke("get_parsed_text"))
  }

  return (
    <>
    <button onClick={clickHandler}>Preview</button>
    <div dangerouslySetInnerHTML={{ __html: text }} />
    </>
  )
}

export default Preview