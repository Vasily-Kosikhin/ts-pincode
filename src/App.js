import React, { useState } from 'react';
import PinInput from './components/PinInput';
import './styles/App.css';
import SavePinButton from './components/SavePinButton';

function App() {
  const pinCodeLenght = [1, 2, 3, 4, 5, 6];
  // почему то new Array(6) не подходит
  const [headText, setHeadText] = useState('Введите пин-код');
  const [button, setButtons] = useState({
    text: 'Сохранить пин-код',
    listener: 'savePin'
  });

  const changeHeaderText = (text) => {
    setHeadText(text);
  };
  const changeButtonType = (type) => {
    setButtons(type);
  };

  return (
    <div className="App">
      <h1>{headText}</h1>
      <div className="pinBody">
        {pinCodeLenght.map((value, index) => (
          <PinInput key={index} />
        ))}
      </div>
      <SavePinButton
        type={button}
        changeHeaderText={changeHeaderText}
        changeButton={changeButtonType}
      />
    </div>
  );
}

export default App;
