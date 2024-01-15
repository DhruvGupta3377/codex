// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;
use tauri::api::dialog::FileDialogBuilder;


/*
#heading#
!red!
-list item
$green$
*/

static mut PARSED_TEXT: String = String::new();

#[tauri::command]
fn parse(data: &str) -> String {
    let text = data;
    let mut formatted_text: String = String::new();
    std::fs::write("..//..//asd.txt", data).expect("Failed to write txt file");

    // flags for parsing
    let mut header_flag: bool = false;
    let mut red_font_flag: bool = false;
    let mut list_flag: bool = false;
    let mut bold_flag: bool = false;
    let mut green_font_flag: bool = false;
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

            _ => {
                formatted_text.push(c);
            }
        }
    }
    // formatted_text.push_str("</html></body>");
    // println!("{:?}", formatted_text);
    unsafe {
        PARSED_TEXT = formatted_text.clone();
    }
    std::fs::write("..//..//asd.html", formatted_text.clone()).expect("Failed to write HTML file");
    formatted_text
}

#[tauri::command]
fn get_parsed_text() -> &'static str {
    unsafe {
        println!("{:?}", PARSED_TEXT);
        &PARSED_TEXT
    }
}

#[tauri::command]
fn open_filemanager()  {
    FileDialogBuilder::new().set_directory("D:\\LessHolyText").pick_file(|file_path| {
        println!("got some file path {:?}", file_path.clone().unwrap());
        let content = fs::read_to_string(file_path.clone().unwrap()).expect("Failed to read file");
        println!("{:?}", content);
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            parse,
            get_parsed_text,
            open_filemanager
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


