import { type ReactNode, createContext, useContext, useState } from "react"

type ModalOpenOptions = {
  content: ReactNode
  title: string
}

type ModalContextType = {
  title: string,
  isOpen: boolean,
  openModal: ({ content, title }: ModalOpenOptions) => void,
  closeModal: () => void,
  modalContent: ReactNode | null,
}

const defaultValue = {
  title: "",
  isOpen: false,
  openModal: () => { },
  closeModal: () => { },
  modalContent: null,
} as ModalContextType

const ModalContext = createContext(defaultValue)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const openModal = ({
    content,
    title,
  }: ModalOpenOptions) => {
    setModalContent(content)
    setTitle(title)
    setIsOpen(true)
  }
  const closeModal = () => {
    setModalContent(null)
    setTitle("")
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ title, isOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)