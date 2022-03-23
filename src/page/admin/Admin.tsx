import BackgroundUploader from 'components/admin/BackgroundUploader';
import Store from 'components/admin/Store';
import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import style from './Admin.module.scss';

const Admin = () => {
  const ref = useRef(null);
  const [storeName, setStoreName] = useState('');
  const [src, setSrc] = useState('');
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [stores, setStores] = useState<{ [propName: string]: number[] | undefined }>({});
  const [isChangingStore, setIsChangingStore] = useState('');

  const preventDefaultHandler = (e: React.SyntheticEvent) => e.preventDefault();

  const setStoreNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setStoreName(e.currentTarget.value);

  const setStoreHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!storeName.length) return alert('매장 이름을 입력해주세요.');
    else if (stores[storeName]) return alert('이미 등록된 매장입니다.');
    else setStores((pre) => ({ ...pre, [storeName]: [0, 0] }));
  };

  const setCoodinateHandler: MouseEventHandler = ({ nativeEvent: { offsetX, offsetY } }) => {
    setStores((pre) => ({ ...pre, [isChangingStore]: [offsetX - 50, offsetY - 50] }));
  };

  return (
    <>
      <BackgroundUploader setBackgroundSrc={setSrc} setBackgroundSize={setImgSize} />
      {src && (
        <>
          <input type="text" value={storeName} onChange={setStoreNameHandler} />
          <button onClick={setStoreHandler}>매장 추가</button>
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
              onDragOver={preventDefaultHandler}
              onDrop={setCoodinateHandler}
            />
            {Object.keys(stores).length
              ? Object.keys(stores).map((store) => {
                  if (!stores[store]) return null;
                  return (
                    <Store
                      stores={stores}
                      setStores={setStores}
                      storeName={storeName}
                      setIsChangingStore={setIsChangingStore}
                      key={store}
                    />
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
