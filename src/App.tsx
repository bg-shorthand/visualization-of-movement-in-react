import Admin from 'page/admin/Admin';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState<'admin' | 'user'>('admin');

  return (
    <>
      <div>
        <button onClick={() => setPage('admin')}>ADMIN</button>
        <button onClick={() => setPage('user')}>USER</button>
      </div>
      {page === 'admin' ? <Admin /> : null}
    </>
  );
}

export default App;
