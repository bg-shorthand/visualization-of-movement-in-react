import BackgroundUploader from 'components/admin/BackgroundUploader';
import { STORE_SIZE } from 'const/const';
import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import style from './Admin.module.scss';

const Admin = () => {
  const ref = useRef(null);
  const [newStoreName, setNewStoreName] = useState('');
  const [src, setSrc] = useState('');
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [stores, setStores] = useState<{
    [propName: string]: { coodinate: number[]; size: 's' | 'm' | 'l' } | undefined;
  }>({});
  const [isChangingStore, setIsChangingStore] = useState('');
  const [startCoodinate, setStartCoodinate] = useState([0, 0]);

  const preventDefaultHandler = (e: React.SyntheticEvent) => e.preventDefault();

  const setStoreNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewStoreName(e.currentTarget.value);

  const setStoreHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!newStoreName.length) return alert('매장 이름을 입력해주세요.');
    else if (stores[newStoreName]) return alert('이미 등록된 매장입니다.');
    else setStores((pre) => ({ ...pre, [newStoreName]: { coodinate: [0, 0], size: 'm' } }));
  };

  const setCoodinateHandler: MouseEventHandler = (e) => {
    const { pageX, pageY } = e;
    setStores((pre) => ({
      ...pre,
      [isChangingStore]: {
        coodinate: [
          pre[isChangingStore]!.coodinate[0] + (pageX - startCoodinate[0]),
          pre[isChangingStore]!.coodinate[1] + (pageY - startCoodinate[1]),
        ],
        size: pre[isChangingStore]!.size,
      },
    }));
  };

  const setStartCoodinateHandler: MouseEventHandler = (e) => {
    const { pageX, pageY } = e;
    setStartCoodinate([pageX, pageY]);
  };

  return (
    <>
      <BackgroundUploader setBackgroundSrc={setSrc} setBackgroundSize={setImgSize} />
      {src && (
        <>
          <input type="text" value={newStoreName} onChange={setStoreNameHandler} />
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
              onDrop={(e) => {
                setCoodinateHandler(e);
              }}
            />
            {Object.keys(stores).length
              ? Object.keys(stores).map((store) => {
                  if (!stores[store]) return null;
                  return (
                    <div
                      draggable
                      className={style.store}
                      key={store}
                      style={{
                        width: STORE_SIZE[stores[store]!.size],
                        height: STORE_SIZE[stores[store]!.size],
                        left: stores[store]!.coodinate[0],
                        top: stores[store]!.coodinate[1],
                        backgroundColor: isChangingStore === store ? 'yellow' : 'transparent',
                      }}
                      onDragStart={(e) => {
                        setStartCoodinateHandler(e);
                        setIsChangingStore(store);
                      }}
                      onDragEnd={() => setIsChangingStore('')}
                      onDragOver={preventDefaultHandler}
                      onDrop={(e) => {
                        setCoodinateHandler(e);
                      }}
                    >
                      <div>
                        {store}
                        <button
                          onClick={() => setStores((pre) => ({ ...pre, [store]: undefined }))}
                        >
                          삭제
                        </button>
                        <select
                          defaultValue={'m'}
                          onChange={(e) => {
                            const { value } = e.currentTarget;
                            setStores((pre) => ({
                              ...pre,
                              [store]: {
                                coodinate: [...pre[store]!.coodinate],
                                size: value as 's' | 'm' | 'l',
                              },
                            }));
                          }}
                        >
                          <option value={'s'}>s</option>
                          <option value={'m'}>m</option>
                          <option value={'l'}>l</option>
                        </select>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </>
      )}
      <button
        onClick={() => {
          localStorage.setItem('stores', JSON.stringify(stores));
        }}
      >
        저장
      </button>
    </>
  );
};

export default Admin;
