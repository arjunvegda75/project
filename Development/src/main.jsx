import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddUser from './AddUser.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <AddUser/> */}
  </StrictMode>,
)