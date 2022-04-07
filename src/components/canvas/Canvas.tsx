import { mockData } from 'assets/mockData';
import storeImg from 'assets/store-sample-img.png';
import { drawArrow } from 'modules/drawArrow';
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from './Canvas.module.scss';

interface Store {
  name: string;
  coodinate: number[];
}
type Stores = Store[];

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stores = mockData.store as Stores;

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [selectedStores, setSelectedStores] = useState<Stores>([]);

  const storeSelectedClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const { id } = e.currentTarget;
    setSelectedStores((pre) => [...pre, stores.find((store) => store.name === id)!]);
  };

  useEffect(() => {
    console.log(selectedStores);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      setCanvasSize({ width, height });
      ctx.drawImage(img, 0, 0);

      if (selectedStores.length === 1) {
        stores.forEach((v) => {
          if (v.name === selectedStores[0].name) return;
          drawArrow(
            ctx,
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            v.coodinate[0],
            v.coodinate[1],
            7,
            10,
            2,
            true
          );
          drawArrow(
            ctx,
            v.coodinate[0],
            v.coodinate[1],
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            7,
            10,
            2,
            false
          );
        });
      } else {
        stores.forEach((v, i) => {
          stores.forEach((w, j) => {
            if (i <= j) return;
            drawArrow(
              ctx,
              v.coodinate[0],
              v.coodinate[1],
              w.coodinate[0],
              w.coodinate[1],
              7,
              10,
              2,
              true
            );
            drawArrow(
              ctx,
              w.coodinate[0],
              w.coodinate[1],
              v.coodinate[0],
              v.coodinate[1],
              7,
              10,
              2,
              false
            );
          });
        });
      }
    };
    img.src = storeImg;
  }, [selectedStores, stores]);

  return (
    <div className={styles.canvasWrapper}>
      <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height}></canvas>
      <ul>
        {stores.map((item) => {
          return (
            <li
              id={item.name}
              className={styles.storeList}
              key={item.coodinate[0]}
              onClick={storeSelectedClick}
              style={{ left: `${item.coodinate[0] - 50}px`, top: `${item.coodinate[1] - 50}px` }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Canvas;
