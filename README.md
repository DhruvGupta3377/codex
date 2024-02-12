# Codex

This is a markdown inspired note taking application with shortcuts to openfile, change modes, create newfiles, it has a set of rules like markdown and a parser written in rust is used to convert txt to html using those set of rules the frontend is written in react with solarized used as a theme.

Tauri for backend.

ReactJS for frontend.

# Screenshots

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/35b51792-a6f8-40ea-8f82-aec3672f28d0)

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/defc5a63-d7c3-44b2-a1da-c88daf417f4a)

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/f35748d9-7318-43fb-8b37-3e869f142da5)

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/9ec8a3c7-9ac1-491d-8784-40b0c3e68a12)

![image](https://github.com/DhruvGupta3377/codex/assets/90503781/012277f8-ac10-4b31-99ef-497827b1bc44)


# Shortcuts

- Ctrl + q => open space to select file.
- Ctrl + n => open space and create a new file. 
- Ctrl + e => enter *edit* mode. 
- Ctrl + p => enter *view* mode. (in edit mode)
- Ctrl + p => print PDF (in view mode)


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

# Improvements

- [x] Add solarized dark as a theme
- [x] Add a way to distinguish between Edit and View mode
- [ ] Add white mode
- [x] Add open file name in title bar

# Maybe

- [ ] Rewrite frontend in vanilla Javascript because React feels like an overkill.
