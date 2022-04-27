import { mockData } from 'assets/mockData';
import storeImg from 'assets/jdc-stores-sample.png';
// import storeImg from 'assets/store-sample-img.png';
import { drawArrow } from 'modules/drawArrow';
import { selectSize } from 'modules/selectSize';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styles from './MovementStatistics.module.scss';

const MovementStatistics = () => {
  const stores = mockData.store;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [selectedStores, setSelectedStores] = useState<typeof stores>([]);

  const [lines, setLines] = useState<
    {
      startStore: string;
      endStore: string;
      path: { angle: number; translate: number[]; lineWidth: number; path: Path2D };
      movement: number;
    }[]
  >([]);
  const [renderData, setRenderData] = useState({
    startStore: '',
    endStore: '',
    movement: 0,
    x: 0,
    y: 0,
  });
  const [displayMovement, setDisplayMovement] = useState(false);

  const setSelectedStoresHandler: MouseEventHandler<HTMLLIElement> = (e) => {
    const { id } = e.currentTarget;

    const matchStore = stores.find((store) => store.name === id);
    if (!(id && matchStore)) return;
    if (selectedStores.find((store) => store.name === matchStore.name)) {
      setSelectedStores(selectedStores.filter((store) => store.name !== matchStore.name));
    } else {
      setSelectedStores((pre) => (pre.length < 2 ? [...pre, matchStore] : [matchStore]));
    }
  };

  const selectedStoresResetHandler: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedStores([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();

    img.onload = () => {
      // ctx.translate(100, 100);
      const maxSize = Math.max(...stores.map((v) => Object.values(v.movement)).flat());
      ctx.clearRect(0, 0, canvasSize.width + 30, canvasSize.height + 130);
      const { width, height } = img;
      setCanvasSize({ width, height });
      ctx.drawImage(img, 0, 100);
      setLines([]);

      if (selectedStores.length === 1) {
        stores.forEach((store, i) => {
          if (store.name === selectedStores[0].name) return;
          const [selectedStore] = selectedStores;

          const leave = selectedStore.movement[store.name as keyof typeof selectedStore.movement];
          const come = store.movement[selectedStore.name as keyof typeof store.movement];

          const leavePath = drawArrow(
            canvas,
            ctx,
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            store.coodinate[0],
            store.coodinate[1],
            selectSize(leave!, maxSize)
          );
          const comePath = drawArrow(
            canvas,
            ctx,
            store.coodinate[0],
            store.coodinate[1],
            selectedStores[0].coodinate[0],
            selectedStores[0].coodinate[1],
            selectSize(come!, maxSize),
            false
          );

          setLines((pre) => [
            ...pre,
            {
              startStore: selectedStore.name,
              endStore: store.name,
              movement: leave!,
              path: leavePath!,
            },
          ]);
          setLines((pre) => [
            ...pre,
            {
              startStore: store.name,
              endStore: selectedStore.name,
              movement: come!,
              path: comePath!,
            },
          ]);
        });
      } else {
        const renderStores = selectedStores.length ? selectedStores : stores;
        renderStores.forEach((firstStore, i) => {
          renderStores.forEach((secondStore, j) => {
            if (i <= j) return;
            const leave = firstStore.movement[secondStore.name as keyof typeof firstStore.movement];
            const come = secondStore.movement[firstStore.name as keyof typeof secondStore.movement];

            const leavePath = drawArrow(
              canvas,
              ctx,
              firstStore.coodinate[0],
              firstStore.coodinate[1],
              secondStore.coodinate[0],
              secondStore.coodinate[1],
              selectSize(leave!, maxSize)
            );
            const comePath = drawArrow(
              canvas,
              ctx,
              secondStore.coodinate[0],
              secondStore.coodinate[1],
              firstStore.coodinate[0],
              firstStore.coodinate[1],
              selectSize(come!, maxSize),
              false
            );

            setLines((pre) => [
              ...pre,
              {
                startStore: firstStore.name,
                endStore: secondStore.name,
                movement: leave!,
                path: leavePath!,
              },
            ]);
            setLines((pre) => [
              ...pre,
              {
                startStore: secondStore.name,
                endStore: firstStore.name,
                movement: come!,
                path: comePath!,
              },
            ]);
          });
        });
      }
    };
    img.src = storeImg;
  }, [selectedStores, stores]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.onmousemove = ({ offsetX, offsetY }) => {
      for (let i = 0; i < lines.length; i++) {
        ctx.save();

        ctx.lineWidth = lines[i].path.lineWidth;
        ctx.translate(lines[i].path.translate[0], lines[i].path.translate[1]);
        ctx.rotate(lines[i].path.angle);

        if (ctx.isPointInStroke(lines[i].path.path, offsetX, offsetY)) {
          const { startStore, endStore, movement } = lines[i];
          setRenderData({ startStore, endStore, movement, x: offsetX, y: offsetY });
          setDisplayMovement(true);
          return ctx.restore();
        } else {
          setDisplayMovement(false);
        }

        ctx.restore();
      }
    };
  }, [lines]);

  return (
    <div className={styles.canvasWrapper}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={canvasSize.width + 30} // 화살표가 밖으로 나가서 임시로 값 추가
        height={canvasSize.height + 130} // 화살표가 밖으로 나가서 임시로 값 추가
      ></canvas>
      <ul>
        {stores.map((store, i) => {
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
              style={{
                left: `${store.coodinate[0] - 50}px`,
                top: `${store.coodinate[1] - 50}px`,
              }}
            >
              {store.name}
            </li>
          );
        })}
      </ul>
      <button onClick={selectedStoresResetHandler}>RESET</button>
      <div
        style={{
          position: 'absolute',
          top: renderData.y + 10 + 'px',
          left: renderData.x + 10 + 'px',
          backgroundColor: 'black',
          color: 'white',
          display: displayMovement ? 'block' : 'none',
        }}
      >
        {renderData.startStore + ' / ' + renderData.endStore + '/' + renderData.movement}
      </div>
    </div>
  );
};

export default MovementStatistics;
