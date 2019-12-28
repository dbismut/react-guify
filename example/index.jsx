import React from 'react'
import ReactDOM from 'react-dom'
import {
  GuiPanel,
  GuiButton,
  GuiCheckbox,
  GuiRange,
  GuiFolder,
  GuiColor,
  GuiSelect,
  GuiInterval,
  GuiText,
  GuiTitle,
  GuiDisplay,
  GuiFile,
} from '../src'

const initialState = {
  checked: true,
  bounds: 34,
  color: 'red',
  movement: 'movement',
  interval: [30, 50],
  name: 'David',
  file: null,
}

const options = ['movement', 'offset']

function App() {
  const [state, setState] = React.useState(initialState)
  const gui = React.useRef()
  return (
    <div className="App">
      <GuiPanel
        ref={gui}
        data={state}
        setData={setState}
        barMode="above"
        align="right"
        theme="light"
      >
        <GuiButton
          label="Toast"
          action={() => {
            gui.current.Toast('Current date: ' + Date.now())
          }}
        />
        <GuiText property="name" />
        <GuiTitle label="Options" />
        <GuiFile label="Select File" property="file" />
        <GuiDisplay property="name" />
        <GuiCheckbox property="checked" />
        <GuiColor property="color" />
        <GuiFolder label="Bounds Folder" open={true}>
          <GuiRange
            label="bounds"
            property="bounds"
            scale="log"
            onChange={value => console.log({ value })}
          />
          <GuiSelect property="movement" options={options} />
          <GuiInterval property="interval" min={5} max={70} />
        </GuiFolder>
      </GuiPanel>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
