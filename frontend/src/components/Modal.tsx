import { useEffect, useRef } from 'react';

interface ModalProps {
  message: string;
  openModal: boolean;
  onConfirm?: () => void;
  onCloseModal: () => void;
}
const Modal = ({ message, openModal, onConfirm, onCloseModal }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (openModal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [openModal]);
  return (
    <dialog ref={dialogRef} id="modal" open className="border bg-gray-300 p-10">
      <div className="flex flex-col gap-6">
        <p>{message}</p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12"
          >
            Confirm
          </button>
          <button
            onClick={onCloseModal}
            className="cursor-pointer focus:outline-none text-black bg-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12 border"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
export default Modal;
