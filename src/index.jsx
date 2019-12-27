import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from 'react'

import guify from 'guify'

const GuiContext = React.createContext({
  state: {},
  setState: () => {},
  gui: null,
})

const FolderContext = React.createContext(null)

export default React.forwardRef(
  ({ children, state, setState, ...props }, guiRef) => {
    const [gui, setGui] = useState(null)
    const ref = useRef()

    useEffect(() => {
      if (!!gui) return
      const _gui = new guify({ ...props, root: ref.current })
      guiRef.current = _gui
      setGui(_gui)
    }, [props, gui, guiRef])

    const context = { gui, state, setState }

    return (
      <div ref={ref}>
        {gui && (
          <GuiContext.Provider value={context}>{children}</GuiContext.Provider>
        )}
      </div>
    )
  }
)

const useGui = ({ path, label, onChange, ...props }) => {
  const { gui, state, setState } = useContext(GuiContext)
  const folder = useContext(FolderContext)

  const _onChange = useCallback(
    value => {
      onChange && onChange(value)
      setState(s => ({ ...s, [path]: value }))
    },
    [path, setState, onChange]
  )

  const [el] = useState(() =>
    gui.Register({
      ...props,
      label: label || path.charAt(0).toUpperCase() + path.slice(1),
      object: state,
      property: path,
      onChange: _onChange,
      folder,
    })
  )

  useEffect(() => () => el.Remove(), [el])

  return el
}

export const GuiButton = props => {
  useGui({ type: 'button', ...props })
  return null
}

export const GuiCheckbox = props => {
  useGui({ type: 'checkbox', ...props })
  return null
}

export const GuiSelect = props => {
  useGui({ type: 'select', ...props })
  return null
}

export const GuiInterval = props => {
  useGui({ type: 'interval', ...props })
  return null
}

export const GuiRange = props => {
  useGui({ type: 'range', ...props })
  return null
}

export const GuiColor = props => {
  useGui({ type: 'color', ...props })
  return null
}

export const GuiText = props => {
  useGui({ type: 'text', ...props })
  return null
}

export const GuiTitle = props => {
  useGui({ type: 'title', ...props })
  return null
}

export const GuiDisplay = props => {
  useGui({ type: 'display', ...props })
  return null
}

export const GuiFile = props => {
  useGui({ type: 'file', ...props })
  return null
}

export const GuiFolder = ({ label, children, ...props }) => {
  useGui({ type: 'folder', label, ...props })

  return (
    <FolderContext.Provider value={label}>{children}</FolderContext.Provider>
  )
}
