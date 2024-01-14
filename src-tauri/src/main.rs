#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/*
#heading#
!red!
-list item
$green$
*/

static mut PARSED_TEXT : String = String::new();

#[tauri::command]
fn greet(data: &str) -> String {
    format!("got this from app {}", data)
}


#[tauri::command]
fn parse(data: &str) -> String{
    let text = data;
    let mut formatted_text: String = String::new();


    // flags for parsing
    let mut header_flag: bool  = false;
    let mut red_font_flag: bool = false;
    let mut list_flag: bool = false;
    let mut bold_flag: bool= false;
    let mut green_font_flag: bool = false;
    // formatted_text.push_str("<html><body>");
    
    for c in text.chars(){
        match c{
            '#' => {
                if !header_flag {
                    formatted_text.push_str("<h2>");
                    header_flag = true;
                }
                else{
                    formatted_text.push_str("</h2>");
                    header_flag = false;
                }
            }
            '!' => {
                if !red_font_flag {
                    formatted_text.push_str("<FONT COLOR='RED'>");
                    red_font_flag = true;
                }
                else{
                    formatted_text.push_str("</FONT>");
                    red_font_flag = false;
                }
            }
            '-' => {
                formatted_text.push_str("<li>");
                list_flag = false;
            }
            '\n'=>{
                if !list_flag{
                    formatted_text.push_str("</li><br/>")
                }
                else{
                    formatted_text.push_str("<br/>")
                }
            }
            '*'=>{
                if !bold_flag{
                    formatted_text.push_str("<b>");
                    bold_flag = true;
                }
                else{
                    formatted_text.push_str("</b>");
                    bold_flag = false;
                    
                }
            }
            '$' =>{
                if !green_font_flag{
                    formatted_text.push_str("<FONT COLOR='GREEN'>");
                    green_font_flag = true;
                }
                else{
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
    // std::fs::write("asd.html", formatted_text).expect("Failed to write HTML file");
    unsafe{
        PARSED_TEXT = formatted_text.clone();
    }
    formatted_text
}


#[tauri::command]
fn get_parsed_text()-> &'static str{
    unsafe{
        println!("{:?}", PARSED_TEXT);
        &PARSED_TEXT
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,parse,get_parsed_text])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
