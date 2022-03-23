import { Dispatch } from 'react';
import style from './Store.module.scss';

interface StoresProps {
  stores: { [propName: string]: number[] | undefined };
  setStores: Dispatch<
    React.SetStateAction<{
      [propName: string]: number[] | undefined;
    }>
  >;
  storeName: string;
  setIsChangingStore: Dispatch<React.SetStateAction<string>>;
}

const Store = ({ stores, setStores, storeName, setIsChangingStore }: StoresProps) => {
  return (
    <div
      draggable
      className={style.store}
      key={storeName}
      style={{ left: stores[storeName]![0], top: stores[storeName]![1] }}
      onDragStart={(e) => {
        setIsChangingStore(storeName);
      }}
      onDragEnd={(e) => {
        setIsChangingStore('');
      }}
      onMouseDown={({ nativeEvent }) => {
        const target = nativeEvent.target as HTMLElement;
        if (target.matches('button')) return;

        const { offsetX, offsetY } = nativeEvent;
        setStores((pre) => ({
          ...pre,
          [storeName]: [pre[storeName]![0] + offsetX - 50, pre[storeName]![1] + offsetY - 50],
        }));
      }}
    >
      <div>
        {storeName}
        <button onClick={() => setStores((pre) => ({ ...pre, [storeName]: undefined }))}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Store;
