import { attachListeners } from "./listener.js";

const drawingBoard = document.getElementById("drawing-board");
function initCanvasSize() {
  drawingBoard.width = window.innerWidth * 0.85;
  drawingBoard.height = window.innerHeight;
}

function initCanvasBackground() {
  if (!drawingBoard.getContext) return;
  const ctx = drawingBoard.getContext("2d");
  ctx.fillStyle = "white";

  ctx.fillRect(0, 0, drawingBoard.width, drawingBoard.height);
}

initCanvasSize();
initCanvasBackground();
attachListeners(drawingBoard);
