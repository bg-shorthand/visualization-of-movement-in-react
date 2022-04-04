import { mockData } from 'assets/mockData';
import storeImg from 'assets/store-sample-img.png';
import { drawArrow } from 'modules/drawArrow';
import { useEffect, useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const store = mockData.store;

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
      store.forEach((v, i) => {
        store.forEach((w, j) => {
          if (i <= j) return;
          drawArrow(
            storeImg,
            ctx,
            v.coodinate[0],
            v.coodinate[1],
            w.coodinate[0],
            w.coodinate[1],
            4,
            8,
            false,
            true,
            2,
            true
          );
          drawArrow(
            storeImg,
            ctx,
            w.coodinate[0],
            w.coodinate[1],
            v.coodinate[0],
            v.coodinate[1],
            4,
            8,
            false,
            true,
            2,
            false
          );
        });
      });
      // drawArrow(storeImg, ctx, 797, 152, 1147, 132, 4, 8, false, true, 2, false); // test
      // drawArrow(storeImg, ctx, 1147, 332, 597, 352, 4, 8, false, true, 2, false);
    };
    img.src = storeImg;
  }, [store]);

  return (
    <>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}></canvas>
    </>
  );
};

export default Canvas;
