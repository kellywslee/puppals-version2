import { createPortal } from 'react-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Modal = ({ title, children, onClose }) => {
  return createPortal(
    <div className="w-dvh fixed left-0 right-0 top-0 z-40 h-dvh bg-slate-950 bg-opacity-80">
      <div className="h-11/12 absolute left-1/2 top-1/2 max-h-96 w-11/12 -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-lg bg-slate-50 p-5 lg:w-1/2">
        {title && <h3 className="mb-4">{title}</h3>}
        <IoIosCloseCircleOutline
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl font-bold"
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
