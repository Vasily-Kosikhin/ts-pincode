import React from 'react';
import PinCode from './PinCode';
import '../styles/SavePinButton.css';

function SavePinButton({ type, changeHeaderText, changeButton }) {
  function savePin() {
    if (PinCode.oldPinCode.length === 6) {
      changeHeaderText('Пин-код сохранен');
      const inputs = document.querySelectorAll('#pinInput');
      for (const input of inputs) {
        input.value = '';
      }
      PinCode.flag = false;
      changeButton({ text: 'Проверить пин-код', listener: 'checkPin' });
    } else {
      changeHeaderText('Заполните все поля!');
      const inputs = document.querySelectorAll('#pinInput');
      inputs[PinCode.oldPinCode.length].focus();
    }
  }

  function checkPin() {
    if (PinCode.newPinCode.length === 6) {
      const inputs = document.querySelectorAll('#pinInput');
      let sum = 0;

      for (let i = 0; i < PinCode.oldPinCode.length; i++) {
        if (PinCode.oldPinCode[i] === PinCode.newPinCode[i]) {
          sum += 1;
        }
      }
      if (sum === PinCode.oldPinCode.length) {
        changeHeaderText('Доступ разрешен!');
        PinCode.newPinCode.length = 0;
        PinCode.oldPinCode.length = 0;
        changeButton({ text: 'Попробовать снова', listener: 'anotherRun' });
        for (const input of inputs) {
          input.value = 'X';
          input.disabled = true;
        }
      } else {
        for (const input of inputs) {
          changeHeaderText('Неверный пин-код! Попробуйте снова');
          PinCode.newPinCode.length = 0;
          input.value = '';
        }
        inputs[0].focus();
      }

      // changeButton({ text: 'Проверить пин код', listener: 'checkPin' })
    } else {
      changeHeaderText('Заполните все поля!');
      const inputs = document.querySelectorAll('#pinInput');
      inputs[PinCode.newPinCode.length].focus();
    }
  }

  function anotherRun() {
    const inputs = document.querySelectorAll('#pinInput');
    for (const input of inputs) {
      changeHeaderText('Введите пин-код');
      changeButton({ text: 'Сохранить пин-код', listener: 'savePin' });
      PinCode.newPinCode.length = 0;
      PinCode.flag = true;
      input.value = '';
      input.disabled = false;
    }
  }

  if (type.listener === 'savePin') {
    return (
      <button className="savePin" onClick={(e) => savePin()}>
        Сохранить пин код
      </button>
    );
  } else if (type.listener === 'checkPin') {
    return (
      <button className="savePin" onClick={(e) => checkPin()}>
        Проверить пин код
      </button>
    );
  } else if (type.listener === 'anotherRun') {
    return (
      <button className="savePin" onClick={(e) => anotherRun()}>
        Придумать новый пин код
      </button>
    );
  }
}
export default SavePinButton;
