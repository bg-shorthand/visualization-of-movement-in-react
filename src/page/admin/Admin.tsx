import BackgroundUploader from 'components/admin/BackgroundUploader';
import { Stores } from 'const/type';
import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import style from './Admin.module.scss';

const Admin = () => {
  const [newStoreName, setNewStoreName] = useState('');
  const [src, setSrc] = useState('');
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [stores, setStores] = useState<Stores>([]);
  const [isChangingStore, setIsChangingStore] = useState('');
  const [startCoodinate, setStartCoodinate] = useState([0, 0]);

  const preventDefaultHandler = (e: React.SyntheticEvent) => e.preventDefault();

  const setStoreNameHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewStoreName(e.currentTarget.value);

  const setStoreHandler: MouseEventHandler<HTMLButtonElement> = () => {
    if (!newStoreName.length) return alert('매장 이름을 입력해주세요.');
    else if (stores.find((store) => store.name === newStoreName))
      return alert('이미 등록된 매장입니다.');
    else setStores((pre) => [...pre, { name: newStoreName, coodinate: [0, 0], movement: {} }]);
  };

  const setCoodinateHandler: MouseEventHandler = (e) => {
    const { pageX, pageY } = e;
    setStores((pre) =>
      pre.map(({ name, coodinate }) =>
        name === isChangingStore
          ? {
              name,
              coodinate: [
                coodinate[0] + (pageX - startCoodinate[0]),
                coodinate[1] + (pageY - startCoodinate[1]),
              ],
              movement: {},
            }
          : { name, coodinate, movement: {} }
      )
    );
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
              onDragOver={preventDefaultHandler}
              onDrop={(e) => {
                setCoodinateHandler(e);
              }}
            />
            {stores.length
              ? stores.map(({ name, coodinate }) => {
                  return (
                    <div
                      draggable
                      className={style.store}
                      key={name}
                      style={{
                        width: '100px',
                        height: '100px',
                        left: coodinate[0],
                        top: coodinate[1],
                        backgroundColor: name === isChangingStore ? 'yellow' : 'transparent',
                      }}
                      onDragStart={(e) => {
                        setStartCoodinateHandler(e);
                        setIsChangingStore(name);
                      }}
                      onDragEnd={() => setIsChangingStore('')}
                      onDragOver={preventDefaultHandler}
                      onDrop={(e) => {
                        setCoodinateHandler(e);
                      }}
                    >
                      <div>
                        {name}
                        <button
                          onClick={() =>
                            setStores((pre) => pre.filter((store) => store.name !== name))
                          }
                        >
                          삭제
                        </button>
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
