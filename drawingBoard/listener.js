export function attachListeners(canvas, printPath) {
  let path = [];
  let isPrinting = false;
  let startPath = { x: 0, y: 0 };

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
    const x = event.clientX;
    const y = event.clientY;
    path.push({ x, y });
  });

  canvas.addEventListener("mousedown", function (event) {
    isPrinting = true;
    startPath = { x: event.clientX, y: event.clientY };
    path = [];
  });

  canvas.addEventListener("mousemove", function (event) {
    if (!isPrinting) return;
    const x = event.clientX;
    const y = event.clientY;
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
      startPath = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
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
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
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
