import storeImg from 'assets/store-sample-img.png';
import { drawArrow } from 'modules/drawArrow';
import { useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      setCanvasSize({ width, height });
      ctx.drawImage(img, 0, 0);
      drawArrow(storeImg, ctx, 587, 372, 1247, 352, 4, 8, false, true, 10);
      drawArrow(storeImg, ctx, 577, 362, 1147, 342, 4, 8, true, false, 10);
    };
    img.src = storeImg;
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}></canvas>
    </>
  );
};

export default Canvas;
