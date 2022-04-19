import { ARROW_SIZE } from 'const/const';

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x0: number, // 시작점 x
  y0: number, // 시작점 y
  x1: number, // 끝점 x
  y1: number, // 끝점 y
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  secondary = true
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);
  const arrowWholeLength = 45;
  const arrowGap = 35;
  const arcLength = arrowGap + 50;
  const curveAlgle = 30;

  const { aWidth, aLength, lineWidth } = ARROW_SIZE[size];
  // aWidth: number, // 화살촉이 선에서 수직으로 연장되는 거리
  // aLength: number, // 화살 날개의 길이
  // lineWidth: number, // 선의 전체 굵기

  if (ctx) {
    ctx.lineWidth = lineWidth;
    ctx.translate(x0, y0);
    ctx.rotate(angle);

    // Line
    ctx.beginPath();
    ctx.strokeStyle = secondary ? 'white' : 'blue';
    ctx.fillStyle = secondary ? 'white' : 'blue';
    ctx.moveTo(arrowWholeLength, arrowGap);
    ctx.bezierCurveTo(
      length / 2 - curveAlgle,
      arcLength,
      length / 2 + curveAlgle,
      arcLength,
      length - arrowWholeLength,
      arrowGap
    );

    // Arrow Header
    ctx.stroke();
    ctx.translate(length - arrowWholeLength + 3, -aWidth + arrowGap);
    ctx.rotate((Math.PI / 180) * 120);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(aLength, aWidth);
    ctx.lineTo(aLength, -aWidth);
    ctx.fill();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
