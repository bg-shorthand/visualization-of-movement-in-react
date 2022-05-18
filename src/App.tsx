import Admin from 'page/admin/Admin';
import { useState } from 'react';
import MovementStatistics from 'page/movementStatistics/MovementStatistics';
import { mockData } from 'assets/mockData';
import { Stores } from 'const/type';

const IMAGE_URL = 'http://3.36.33.116/assets/jdc-stores-sample.png';
const stores = mockData.store as unknown as Stores;

function App() {
  const [page, setPage] = useState<'admin' | 'user'>('admin');

  return (
    <>
      <div>
        <button onClick={() => setPage('admin')}>ADMIN</button>
        <button onClick={() => setPage('user')}>USER</button>
      </div>
      {page === 'admin' ? <Admin /> : <MovementStatistics stores={stores} IMAGE_URL={IMAGE_URL} />}
    </>
  );
}

export default App;
