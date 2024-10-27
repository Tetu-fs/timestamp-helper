import { XMarkIcon } from "@heroicons/react/24/outline"
import { useModal } from "../contexts/modal"

export const GenericModal = () => {
  const { title, isOpen, modalContent, closeModal } = useModal()

  const onClickOutSide = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  return (
    <div className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`} onClick={onClickOutSide} onKeyUp={onKeyUp}>
      <div className="container fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-50 rounded-md p-4 h-4/5 overflow-hidden sm:m-4 ">
        <div className="bg-neutral-50 h-10 pb-2 inline-flex items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          <button type="button" className="hover:opacity-50" onClick={closeModal}>
            <XMarkIcon className="size-8" />
          </button>
        </div>
        <div className="overflow-auto h-full">
          {modalContent}
        </div>
      </div>
    </div>
  )
}