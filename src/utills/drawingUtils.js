export const drawRectangle = (ctx, x, y, width, height) => {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    ctx.stroke();
  };