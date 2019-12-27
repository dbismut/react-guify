import React from 'react'
import ReactDOM from 'react-dom'
import GUI, {
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
  limits: true,
  bounds: 34,
  color: 'red',
  select2: 'movement',
  interval: [30, 50],
  text2: 'string',
  file: null,
}

const options = ['movement', 'offset']

function App() {
  const [state, setState] = React.useState(initialState)
  const gui = React.useRef()
  return (
    <div className="App">
      <GUI
        ref={gui}
        state={state}
        setState={setState}
        open={true}
        theme="dark"
        align="right"
        barMode="above"
        width={300}
      >
        <GuiButton
          label="yo"
          action={() => {
            gui.current.Toast('hello')
          }}
        />
        <GuiText path="text2" />
        <GuiTitle label="title3" />
        <GuiFile label="FILE" path="file" />
        <GuiDisplay label="display" path="text2" />
        <GuiCheckbox label="limits" path="limits" />
        <GuiColor path="color" />
        <GuiFolder label="Bounds Folder" open={true}>
          <GuiRange
            label="bounds"
            path="bounds"
            scale="log"
            onChange={hex => console.log({ hex })}
          />
          <GuiSelect path="select2" options={options} />
          <GuiInterval path="interval" min={5} max={70} />
        </GuiFolder>
      </GUI>
      <p>{JSON.stringify(state)}</p>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
