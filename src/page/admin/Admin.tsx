import { useRef, useState } from 'react';
import style from './Admin.module.scss';

const Admin = () => {
  const ref = useRef(null);
  const [storeName, setStoreName] = useState('');
  const [src, setSrc] = useState('');
  const [imgSize, setImgSizeize] = useState({ width: 0, height: 0 });
  const [stores, setStores] = useState<{ [propName: string]: number[] }>({});
  const [isChangingStore, setIsChangingStore] = useState('');

  return (
    <>
      <input
        type="file"
        onInput={async (e) => {
          const images = e.currentTarget.files;

          if (!images || !images[0]) return;

          const reader = new FileReader();
          reader.onloadend = () => {
            const image = new Image();
            image.src = reader.result as string;
            image.onload = () => {
              const { width, height } = image;
              setImgSizeize({ width, height });
              setSrc(reader.result as string);
            };
          };
          reader.readAsDataURL(images[0]);
        }}
      />
      {src && (
        <>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.currentTarget.value)}
          />
          <button onClick={() => setStores((pre) => ({ ...pre, [storeName]: [0, 0] }))}>
            매장 추가
          </button>
          <div
            className={style.box}
            style={{ width: imgSize.width + 'px', height: imgSize.height + 'px' }}
          >
            <img
              draggable="false"
              className={style.img}
              src={src}
              alt="매장 구조도"
              ref={ref}
              onDragOver={(e) => e.preventDefault()}
              onDrop={({ nativeEvent }) => {
                const { offsetX, offsetY } = nativeEvent;
                setStores((pre) => ({ ...pre, [isChangingStore]: [offsetX - 50, offsetY - 50] }));
              }}
            />
            {Object.keys(stores).length
              ? Object.keys(stores).map((store) => {
                  return (
                    <div
                      draggable
                      className={style.store}
                      key={store}
                      style={{ left: stores[store][0], top: stores[store][1] }}
                      onDragStart={(e) => {
                        setIsChangingStore(store);
                      }}
                      onDragEnd={(e) => {
                        setIsChangingStore('');
                      }}
                      onMouseDown={({ nativeEvent }) => {
                        const { offsetX, offsetY } = nativeEvent;
                        setStores((pre) => ({
                          ...pre,
                          [store]: [pre[store][0] + offsetX - 50, pre[store][1] + offsetY - 50],
                        }));
                      }}
                    >
                      <div>
                        {store}
                        <button>삭제</button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </>
      )}
    </>
  );
};

export default Admin;
