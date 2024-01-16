#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use std::path::PathBuf;
use tauri::api::dialog::FileDialogBuilder;
use std::path::Path;

/*
#heading#
!red!
-list item
$green$
*/
static mut PARSED_TEXT   :String = String::new();
static mut CURR_FILE_PATH:String = String::new();
static mut CURR_FILE_NAME:String = String::new();


fn set_curr_file(path : String){
    unsafe{
        CURR_FILE_PATH = path.clone();
        let path = Path::new(&CURR_FILE_PATH);
        if let Some(file_stem) = path.file_stem() {
            if let Some(file_stem_str) = file_stem.to_str() {
                CURR_FILE_NAME = file_stem_str.to_string();
                // println!("{:?}", CURR_FILE_NAME);
                CURR_FILE_NAME = String::from("nope");
            }
        }
    }
}

#[tauri::command]
fn parse(data: &str) -> String {
    let text = data;
    let mut formatted_text: String = String::new();
    unsafe{
        if CURR_FILE_PATH.is_empty(){
            CURR_FILE_PATH = String::from("D:\\LessHolyText\\zmeta\\temp.txt");
        }
        let path = PathBuf::from(CURR_FILE_PATH.clone());
        std::fs::write(&path, data).expect("Failed to write txt file");
    }

    // flags for parsing
    let mut header_flag: bool = false;
    let mut red_font_flag: bool = false;
    let mut list_flag: bool = false;
    let mut bold_flag: bool = false;
    let mut green_font_flag: bool = false;
    let mut italic_flag: bool = false;
    // formatted_text.push_str("<html><body>");

    for c in text.chars() {
        match c {
            '#' => {
                if !header_flag {
                    formatted_text.push_str("<h2>");
                    header_flag = true;
                } else {
                    formatted_text.push_str("</h2>");
                    header_flag = false;
                }
            }
            '!' => {
                if !red_font_flag {
                    formatted_text.push_str("<FONT COLOR='RED'>");
                    red_font_flag = true;
                } else {
                    formatted_text.push_str("</FONT>");
                    red_font_flag = false;
                }
            }
            '-' => {
                formatted_text.push_str("<li>");
                list_flag = false;
            }
            '\n' => {
                if list_flag {
                    formatted_text.push_str("</li><br/>")
                } else {
                    formatted_text.push_str("<br/>")
                }
            }
            '*' => {
                if !bold_flag {
                    formatted_text.push_str("<b>");
                    bold_flag = true;
                } else {
                    formatted_text.push_str("</b>");
                    bold_flag = false;
                }
            }
            '$' => {
                if !green_font_flag {
                    formatted_text.push_str("<FONT COLOR='GREEN'>");
                    green_font_flag = true;
                } else {
                    formatted_text.push_str("</FONT>");
                    green_font_flag = false;
                }
            }
            '/' => {
                if !italic_flag {
                    formatted_text.push_str("<i>");
                    italic_flag = true;
                } else {
                    formatted_text.push_str("</i>");
                    italic_flag = false;
                }
            }

            _ => {
                formatted_text.push(c);
            }
        }
    }
    // formatted_text.push_str("</html></body>");
    unsafe {
        PARSED_TEXT = formatted_text.clone();
        // let b = a.as_str();
        // println!("{:?}",a);
        // let mut view_path = PathBuf::from(format!("D:\\LessHolyText\\zmeta\\{:?}.html", CURR_FILE_NAME.trim()));
        // println!("{:?}", view_path);
    }
    std::fs::write("D:\\LessHolyText\\zmeta\\temp.html", formatted_text.clone()).expect("Failed to write HTML file");
    // println!("{:?}", formatted_text.clone());
    formatted_text
}

#[tauri::command]
fn read_curr_file()->String{
    unsafe{
        if CURR_FILE_PATH.is_empty(){
            CURR_FILE_PATH = String::from("D:\\LessHolyText\\zmeta\\temp.txt");
        }
        let path = PathBuf::from(CURR_FILE_PATH.clone());
        let content = fs::read_to_string(path).expect("Failed to read file");
        // println!("{:?}",content.clone());
        content
    }
}

#[tauri::command]
fn get_parsed_text() -> &'static str {
    unsafe {
        // println!("{:?}", PARSED_TEXT);
        &PARSED_TEXT
    }
}

#[tauri::command]
fn open_filemanager(){
    let result = FileDialogBuilder::new().set_directory("D:\\LessHolyText").pick_file(|file_path| {
        println!("got some file path {:?}", file_path.clone().unwrap());
        let content = fs::read_to_string(file_path.clone().unwrap()).expect("Failed to read file");
        println!("{:?}", content);
        set_curr_file(file_path.clone().unwrap().to_string_lossy().to_string());
    });
}


#[tauri::command]
fn new_file(){
    FileDialogBuilder::new().add_filter("Text documents(*.txt)", &["txt"]).set_directory("D:\\LessHolyText").save_file(|file_path| {
        println!("got some file path {:?}", file_path.clone().unwrap());
        std::fs::write(file_path.clone().unwrap(), "").expect("failed to create a newfile");
        set_curr_file(file_path.clone().unwrap().to_string_lossy().to_string());                                                                                                             
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            parse,
            get_parsed_text,
            open_filemanager,
            new_file,
            read_curr_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


