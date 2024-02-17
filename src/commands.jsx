import { invoke } from "@tauri-apps/api/tauri";


export async function fileExpClickHandler() {
  await invoke("open_filemanager");
  window.location.reload();
}

export async function getfilename(){
  const re = await invoke("get_file_name");
  return re
}

export async function newFileHandler(){
  await invoke("new_file");
  getfilename();
  window.location.reload()
} 
