import { invoke } from "@tauri-apps/api/tauri";
import { listen } from '@tauri-apps/api/event';


import React, { useEffect } from 'react'


const Trash = () => {
  useEffect(()=>{
    listen(("download") ,
    ()=> {
      console.log('Received my-event');
    })
    })
  return (
    <div>Trash</div>
  )
}

export default Trash