# Codex

![Square71x71Logo](https://github.com/DhruvGupta3377/codex/assets/90503781/64b58349-d5b4-4b39-a97b-aee0ba03cf90)



This is a markdown inspired note taking application with shortcuts to openfile, change modes, create newfiles, it has a set of rules like markdown and a parser written in rust is used to convert txt to html using those set of rules the frontend is written in react with solarized used as a theme.

Tauri for backend.

ReactJS for frontend.

# Screenshots

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/0d41a05d-51b6-44eb-bb11-b16ef4e275a0)

-----

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/4a63c615-7f4d-483d-ba69-30f86f5d255d)

-----

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/bd8b26f3-30ea-4256-8268-fce4b34b21d9)

-----

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/c806a7d0-4dc7-4fa5-b66d-fdaa81c23763)



# Shortcuts

- Ctrl + q => open space to select file.
- Ctrl + n => open space and create a new file. 
- Ctrl + e => enter *edit* mode. 
- Ctrl + p => enter *view* mode. (in edit mode)
- Ctrl + p => print PDF (in view mode)
- Ctrl + k => open Command Palette


# How to Run

1. Clone this repo by typing `git clone https://github.com/DhruvGupta3377/codex.git` in terminal.
2. Add your default path in the `main.rs` file or leave empty. Leaving empty will open the root directory everytime you try to open or create a file.
3. To run the program use `npm run tauri build`
4. To build the command use `npm run tauri build`. For more info check https://tauri.app/v1/guides/building/
5. Run on the installer to install Codex.


# Future Features

- [ ] Functionality to add links
- [ ] Code Blocks
- [ ] Add your own font colours
- [x] Command Palette
- [ ] Space Select

# Improvements

- [x] Add solarized dark as a theme
- [x] Add a way to distinguish between Edit and View mode
- [ ] Add white mode
- [x] Add open file name in title bar
- [ ] Navigate Command Palette with arrow keys
- [ ] Help Button

# Maybe

- [ ] Rewrite frontend in vanilla Javascript because React feels like an overkill.
