import maze from "./maze.js";
import { getAllPoint } from "./util.js";

let canvas = document.querySelector("#mazeDom");
let ctx = canvas.getContext("2d");

function drawMaze(maze) {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      console.log(getAllPoint(maze[i][j], { width: 60 }), i, j, "getAllPoint");
    }
  }
}

drawMaze(maze);
