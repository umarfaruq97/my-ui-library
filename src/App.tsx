import { useState } from 'react';
import InputSearch from './components/InputSearch';
import BaseButton from './components/BaseButton';

function App() {
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="bg-slate-50 p-4 w-screen">
        <InputSearch
          label="Test Input Search"
          value={search}
          onChange={(e) => setSearch(e)}
        />
        <BaseButton
          label="Hello World Button"
          className="bg-red-50 text-critical"
        />
      </div>
    </>
  );
}

export default App;
