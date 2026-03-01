import { getCanvasCoordinates } from "./utils.js";
export function attachListeners(canvas, printPath) {
  let path = [];
  let isPrinting = false;
  let startPath = { x: 0, y: 0 };
  // bounding rect will be recalculated on each event to handle layout changes

  function printPath() {
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        const from = i === 0 ? startPath : path[i - 1];
        const to = path[i];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = to.force ? to.force * 10 : 1; // todo 可以设置笔画大小
        ctx.stroke();
      }
    }
  }

  canvas.addEventListener("mousemove", function (event) {
    if (!isPrinting) return;
    const { x, y } = getCanvasCoordinates(canvas, event);
    path.push({ x, y });
  });

  canvas.addEventListener("mousedown", function (event) {
    isPrinting = true;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    startPath = {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
    path = [];
  });

  // duplicate mousemove handler used for drawing; ensure coordinates are corrected
  canvas.addEventListener("mousemove", function (event) {
    if (!isPrinting) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    path.push({ x, y });
    printPath();
  });

  canvas.addEventListener("mouseup", function (event) {
    isPrinting = false;
  });

  canvas.addEventListener(
    "touchstart",
    function (event) {
      isPrinting = true;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      startPath = {
        x: (event.touches[0].clientX - rect.left) * scaleX,
        y: (event.touches[0].clientY - rect.top) * scaleY,
      };
      path = [];
    },
    { passive: false },
  );

  canvas.addEventListener(
    "touchmove",
    function (event) {
      // console.log("touchmove");
      // console.log(event);
      // console.log(event.touches[0].force);
      if (!isPrinting) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.touches[0].clientX - rect.left) * scaleX;
      const y = (event.touches[0].clientY - rect.top) * scaleY;
      const force = event.touches[0].force;
      path.push({ x, y, force });
      printPath();
    },
    { passive: false },
  );

  canvas.addEventListener("touchend", function (event) {
    isPrinting = false;
  });
}
