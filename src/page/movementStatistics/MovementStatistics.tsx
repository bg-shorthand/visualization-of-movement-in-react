import { mockData } from 'assets/mockData';
// import storeImg from 'assets/jdc-stores-sample.png';
import storeImg from 'assets/store-sample-img.png';
import { Stores } from 'const/type';
import { drawArrow } from 'modules/drawArrow';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from './MovementStatistics.module.scss';

const MovementStatistics = () => {
  const stores = mockData.store as Stores;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [selectedStores, setSelectedStores] = useState<Stores>([]);

  const setSelectedStoresHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    const { id } = e.currentTarget;
    const matchStore = stores.find((store) => store.name === id);
    if (!(id && matchStore)) return;
    if (selectedStores.includes(matchStore)) {
      setSelectedStores(selectedStores.filter((store) => store !== matchStore));
    } else {
      setSelectedStores((pre) => (pre.length < 2 ? [...pre, matchStore] : [matchStore]));
    }
  };

  const selectedStoresResetHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedStores([]);
  };

  useEffect(() => {
    console.log(mockData);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      setCanvasSize({ width, height });
      ctx.drawImage(img, 0, 0);
      // ctx.drawImage(img, 0, 0, 1300, 600);
      if (selectedStores.length === 1) {
        stores.forEach((store) => {
          if (store.name === selectedStores[0].name) return;
          drawArrow(
            ctx,
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            store.coodinate[0],
            store.coodinate[1],
            'm'
          );
          drawArrow(
            ctx,
            store.coodinate[0],
            store.coodinate[1],
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            'xs',
            false
          );
        });
      } else {
        const renderStores = selectedStores.length <= 0 ? stores : selectedStores;
        renderStores.forEach((firstStore, i) => {
          renderStores.forEach((secondStore, j) => {
            if (i <= j) return;
            drawArrow(
              ctx,
              firstStore.coodinate[0],
              firstStore.coodinate[1],
              secondStore.coodinate[0],
              secondStore.coodinate[1],
              'xs'
            );
            drawArrow(
              ctx,
              secondStore.coodinate[0],
              secondStore.coodinate[1],
              firstStore.coodinate[0],
              firstStore.coodinate[1],
              'l',
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
        {stores.map((store) => {
          return (
            <li
              id={store.name}
              className={
                styles.storeList +
                ' ' +
                (selectedStores.find((v) => v.name === store.name) ? styles.active : '')
              }
              key={store.name}
              onClick={setSelectedStoresHandler}
              style={{ left: `${store.coodinate[0] - 50}px`, top: `${store.coodinate[1] - 50}px` }}
            >
              {store.name}
            </li>
          );
        })}
      </ul>
      <button onClick={selectedStoresResetHandler}>RESET</button>
    </div>
  );
};

export default MovementStatistics;
