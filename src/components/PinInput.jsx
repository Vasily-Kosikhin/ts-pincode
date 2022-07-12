import React from 'react';
import '../styles/PinInput.css';
import PinCode from './PinCode.jsx';

function PinInput() {
  const reg = /[0-9]/g;
  let pinLength;

  function inputFocus(e) {
    const inputs = document.querySelectorAll('#pinInput');
    if (PinCode.flag) {
      pinLength = PinCode.oldPinCode.length;
    } else {
      pinLength = PinCode.newPinCode.length;
    }

    if (pinLength < 6) {
      inputs[pinLength].focus();
    } else {
      inputs[pinLength - 1].focus();
    }
  }

  function changePin(e) {
    e.target.value = e.target.value.substr(0, 1);
    if (PinCode.flag) {
      pinLength = PinCode.oldPinCode.length;
    } else {
      pinLength = PinCode.newPinCode.length;
    }
    if (pinLength === 6) {
      return;
    }

    if (e.target.value.match(reg)) {
      if (PinCode.flag) {
        PinCode.oldPinCode.push(e.target.value);
      } else {
        PinCode.newPinCode.push(e.target.value);
      }
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    } else {
      e.target.value = '';
    }
  }

  function backspaceHadnler(e) {
    if (e.key !== 'Backspace') {
      return;
    }
    if (PinCode.flag) {
      pinLength = PinCode.oldPinCode.length;
    } else {
      pinLength = PinCode.newPinCode.length;
    }

    if (e.target.value) {
      if (PinCode.flag) {
        PinCode.oldPinCode.pop(e.target.value);
      } else {
        PinCode.newPinCode.pop(e.target.value);
      }
      // console.log(`Old Pin`, PinCode.oldPinCode)
      // console.log(`New Pin`, PinCode.newPinCode)
    } else if (e.target.previousSibling) {
      if (PinCode.flag) {
        PinCode.oldPinCode.pop(e.target.previousSibling.value);
      } else {
        PinCode.newPinCode.pop(e.target.previousSibling.value);
      }
      e.target.previousSibling.value = '';
      e.target.previousSibling.focus();
    }
  }
  return (
    <input
      onFocus={(e) => inputFocus(e)}
      onInput={(e) => changePin(e)}
      onKeyDown={(e) => backspaceHadnler(e)}
      id="pinInput"
    ></input>
  );
}
export default PinInput;
