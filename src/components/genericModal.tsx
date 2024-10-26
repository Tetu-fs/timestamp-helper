import { XMarkIcon } from "@heroicons/react/24/outline"
import { useModal } from "../contexts/modal"

export const GenericModal = () => {
  const { title, isOpen, modalContent, closeModal } = useModal()
  console.log(isOpen)
  return (
    <div className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 ${isOpen ? "" : "hidden"}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-50 rounded-md p-4 m-4 h-3/4">
        <div className="overflow-auto h-full">
          <div className="bg-neutral-50 sticky top-0 pb-2 flex items-center justify-between">
            <div className="text-2xl font-bold">{title}</div>
            <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
          </div>
          {modalContent}
        </div>
      </div>
    </div>
  )
}