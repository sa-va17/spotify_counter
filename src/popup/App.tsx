import { useEffect, useState } from 'react'
import './styles.css';

const App = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    chrome.storage.local.get(['songCount'], (result) => {
      setCount(result.songCount || 0);
    })
  }, [])

  const resetCount = () => {
    chrome.storage.local.set({ songCount: 0 }, () => {
      setCount(0);
    });
  }

  return (
    <div className='popup-container'>
      <h2>Songs Played</h2>
      <p className='counter'>{count}</p>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
}

export default App;
