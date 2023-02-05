import './App.css';

import { useEffect, useState } from 'react';
import { BottomScrollListener } from 'react-bottom-scroll-listener';

import MainContainer from './components/MainContainer';
import { storeArtworkIDs } from './utils';

const App = () => {
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    (async () => {
      await storeArtworkIDs();
      setIndex(0);
    })();
  }, []);

  if (index === undefined) return null;
  return (
    <div>
      <MainContainer idx={index}></MainContainer>
      <BottomScrollListener onBottom={() => setIndex(index + 1)} />
    </div>
  );
};

export default App;
