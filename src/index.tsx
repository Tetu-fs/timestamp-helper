import { createRoot } from 'react-dom/client'
import Main from './main'
import './index.css'
import { ModalProvider } from './contexts/modal'


const container = document.querySelector('#root')
if (container) {
  const root = createRoot(container)
  root.render(
    <ModalProvider>
      <Main />
    </ModalProvider>)
} else {
  console.error('Root container not found')
}
