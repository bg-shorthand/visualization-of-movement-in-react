import Admin from 'page/admin/Admin';
import { useState } from 'react';
import MovementStatistics from 'page/movementStatistics/MovementStatistics';

function App() {
  const [page, setPage] = useState<'admin' | 'user'>('admin');

  return (
    <>
      <div>
        <button onClick={() => setPage('admin')}>ADMIN</button>
        <button onClick={() => setPage('user')}>USER</button>
      </div>
      {page === 'admin' ? <Admin /> : <MovementStatistics />}
    </>
  );
}

export default App;
