export function drawArrow(
  storeImg: string,
  ctx: CanvasRenderingContext2D,
  x0: number, // 시작점 x
  y0: number, // 시작점 y
  x1: number, // 끝점 x
  y1: number, // 끝점 y
  aWidth: number, // 화살촉이 선에서 수직으로 연장되는 거리
  aLength: number, // 화살 날개의 길이
  arrowStart: boolean, // 시작점에 화살촉 유무 결정
  arrowEnd: boolean, // 끝점에 화살촉 유무 결정
  lineWidth: number, // 선의 전체 굵기
  secondary: boolean
) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);
  const length = Math.sqrt(dx * dx + dy * dy);
  const arrowWholeLength = 30;
  const arcLength = 50;

  if (ctx) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    ctx.translate(x0, y0); // 원점에서 다른 점으로 이동
    ctx.rotate(angle); // canvas를 현재의 원점 둘레도 회전

    ctx.beginPath(); // 하위 경로 초기화, 새로 그리기
    // ctx.moveTo(0, 0); // 시작점, 뒷부분 길이 줄일 때
    // ctx.lineTo(length - 30, 0); // 시작점과 moveTo의 원점을 연결하여 선 생성 -> 결국 length가 선의 길이 결정, 앞부분 길이 줄일 때
    if (!secondary) {
      ctx.moveTo(arrowWholeLength, 0);
      // ctx.lineTo(length - arrowWholeLength, 0); // 직선
      ctx.bezierCurveTo(
        arrowWholeLength,
        arcLength,
        length - arrowWholeLength,
        arcLength,
        length - arrowWholeLength,
        0
      ); // 커브
      if (arrowEnd) {
        ctx.moveTo(length - arrowWholeLength - aLength + 10, -aWidth + 10);
        ctx.lineTo(length - arrowWholeLength, 0);
        ctx.lineTo(length - arrowWholeLength - aLength + 2, aWidth);
        ctx.closePath();
      }
    } else {
      ctx.strokeStyle = 'white';
      ctx.moveTo(arrowWholeLength, 0);
      // ctx.lineTo(length - arrowWholeLength, 10); // 직선
      ctx.bezierCurveTo(
        arrowWholeLength,
        arcLength,
        length - arrowWholeLength,
        arcLength,
        length - arrowWholeLength,
        0
      ); // 커브

      if (arrowEnd) {
        ctx.moveTo(length - arrowWholeLength - aLength + 10, -aWidth + 10);
        ctx.lineTo(length - arrowWholeLength, 0);
        ctx.lineTo(length - arrowWholeLength - aLength + 2, aWidth);
        ctx.closePath();
      }
    }

    // if (arrowStart) {
    //   ctx.moveTo(aLength, -aWidth);
    //   ctx.lineTo(0, 0);
    //   ctx.lineTo(aLength, aWidth);
    // }

    // if (arrowEnd) {
    //   ctx.moveTo(length - arrowWholeLength - aLength, -aWidth);
    //   ctx.lineTo(length - arrowWholeLength, 0);
    //   ctx.lineTo(length - arrowWholeLength - aLength, aWidth);
    // }

    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
