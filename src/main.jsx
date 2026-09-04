import { render } from 'preact'
import { StrictMode } from 'preact/compat'
import './index.css'
import App from './App.jsx'

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
