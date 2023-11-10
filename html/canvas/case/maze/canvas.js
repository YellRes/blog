import maze from "./maze";

let canvas = document.querySelector("#mazeDom");
let ctx = canvas.getContext("2d");

function drawMaze(maze) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {}
  }
}

drawMaze(maze);
