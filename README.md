# Chess game

## Description

This chess game web application is written with "pure" HTML, CSS and JavaScript (with no frameworks or external libraries). It is only front-end code so everything happens on the client side (no server). The game is played with the standard rules, according to [wikipedia](https://en.wikipedia.org/wiki/Rules_of_chess). The game can only be played locally and there is no computer (random moves or AI) playing against you - you have to make moves for both colors. For more information about the project, see the section [Project details](#project-details).

## Running

First, you need to clone (download) the project repository. In the terminal write:

```bash
git clone https://github.com/polemaster/chess.git
```

Now you need to start a local web server to run the application on:

1. Change your directory to the cloned repo: `cd chess`
1. There are several ways to run a local web server. Here are 2 of them:
   - Start live web server with python: `python -m http.server 8080`
   - Install [live-server](https://github.com/tapio/live-server): `npm install -g live-server` and then run it: `live-server`
1. Open the link displayed in the terminal (e.g. http://0.0.0.0:8080/ for python http server)

## Project details

Example screen from the game:  
![image](https://github.com/user-attachments/assets/9af9de3f-123a-4573-86d5-9f326fbee246)


Images of the chess pieces were taken from [here](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces).

Implemented game features:

- Chess game logic:
  - All pieces' standard moves (piece movement)
  - Capturing pieces
  - Checks
  - Castling
  - En passant
  - Pawn promotion
  - Checkmate
  - Checking legality of moves
  - No draws (only checkmate ends the game)
- Graphical User Interface
  - Moving pieces by both dragging and clicking.
  - Displaying all possible moves when a piece is clicked.
- Session storage - game persists upon refreshing the site
