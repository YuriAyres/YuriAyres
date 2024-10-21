import React, { useState } from 'react';
import Loading from './components/Loading';
import Loading2 from './components/Loading2';
import Menu from './components/Menu';


const App = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <>
      <Loading buttonClicked={buttonClicked} />
      <Loading2 updateButtonClicked={setButtonClicked} />
      <Menu buttonClicked={buttonClicked}/>
    </>

  );
};

export default App;