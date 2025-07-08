import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ArabicCarChat from './ArabicCarChat.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArabicCarChat />
  </StrictMode>,
)
