import React, { SyntheticEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { IS_INPUT_SUPPORTED } from './events'

function App() {
  const [value, setValue] = useState<string>('')

  function onInput(event: SyntheticEvent) {
    let inputEvent = event.nativeEvent as InputEvent
    console.log('onInput, args: ', inputEvent.inputType, inputEvent)
    if (inputEvent.inputType === 'insertText') {
      console.log('insertText', inputEvent.data)
      if (inputEvent.data) {
        setValue((val) => val + inputEvent.data)
      }
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Unidentified') {
      // Let the input event capture things
    } else if (event.key.match(/[0-9]/)) {
      if (!IS_INPUT_SUPPORTED) {
        setValue(event.key)
      }
    } else if (event.key === 'Backspace') {
      setValue(value.substring(0, value.length - 1))
    }
  }

  return (
    <div className="App">
      {JSON.stringify({IS_INPUT_SUPPORTED})}
      <input value={value} onKeyDown={onKeyDown} onInput={onInput} type="tel"/>
    </div>
  );
}

export default App;
