export function drawArrow(
  storeImg: string,
  // canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  x0: number, // 시작점 x
  y0: number, // 시작점 y
  x1: number, // 끝점 x
  y1: number, // 끝점 y
  aWidth: number, // 화살촉이 선에서 수직으로 연장되는 거리
  aLength: number, // 화살 날개의 길이
  arrowStart: boolean, // 시작점에 화살촉 유무 결정
  arrowEnd: boolean, // 끝점에 화살촉 유무 결정
  lineWidth: number // 선의 전체 굵기
) {
  // const ctx = canvas.getContext('2d');
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);

  // const img = new Image();
  // img.src = storeImg;
  if (ctx)
    // img.onload = function () {
    // ctx.drawImage(img, 0, 0);
    ctx.translate(x0, y0);
  ctx.rotate(angle);

  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);

  if (arrowStart) {
    ctx.moveTo(aLength, -aWidth);
    ctx.lineTo(0, 0);
    ctx.lineTo(aLength, aWidth);
  }

  if (arrowEnd) {
    ctx.moveTo(length - aLength, -aWidth);
    ctx.lineTo(length, 0);
    ctx.lineTo(length - aLength, aWidth);
  }

  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
// }
