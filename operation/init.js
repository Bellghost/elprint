import { attachListeners } from "../drawingBoard/listener.js";

const saveBtn = document.getElementById("save-btn");
const drawingBoard = document.getElementById("drawing-board");

saveBtn.addEventListener("click", () => {
  drawingBoard.toBlob(
    (blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "drawing.png";
      a.click();
      URL.revokeObjectURL(url);
    },
    "image/png",
    1,
  );
});

attachListeners(drawingBoard);
