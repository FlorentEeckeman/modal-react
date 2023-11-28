import React, { useState, useEffect, useRef } from "react";

const ModalContext = React.createContext({
  modals: [],
  openModal: (options) => {},
  closeModal: (options) => {},
  isActive: () => {},
  getCurrentModal: () => {},
});
const ESCAPE_KEY = 27;
export const ModalProvider = (props) => {
  const [modals, setModals] = React.useState([]);
  const [status, setStatus] = useState(false);
  const [currentModal, setCurrentModal] = useState();
  const modalRef = useRef(null);

  useEffect(() => {
    if (props.escapeClose) {
      document.addEventListener("keydown", handleEscape, false);
    }

    setStatus(true); /*
    console.log(modals.length - 1);
    console.log(modals);
    console.log(modals[modals.length - 1]);*/

    setCurrentModal(modals[modals.length - 1]);

    return () => {
      console.log(currentModal);

      if (props.escapeClose) {
        document.removeEventListener("keydown", handleEscape, false);
      }
      setStatus(false);
      //setCurrentModal(undefined);
    };
  }, [modals]);

  const handleEscape = (e) => {
    switch (e.keyCode) {
      case ESCAPE_KEY:
        closeModal();
        break;
      default:
        break;
    }
  };

  const openModal = (options) => {
    setModals([
      ...modals,
      {
        id: options.id,
        title: options.title,
        desc: options.desc,
        clickClose: options.clickClose,
        closeClass: options.closeClass,
      },
    ]);
  };

  const closeModal = (options) => {
    if (options === undefined) {
      setModals([]);
    }
    setModals([...modals.filter((modal) => modal.id !== options.id)]);
  };

  const isActive = () => {
    return status;
  };
  const getCurrentModal = () => {
    return currentModal;
  };
  const value = {
    modals: modals,
    openModal: openModal,
    closeModal: closeModal,
    isActive: isActive,
    getCurrentModal: getCurrentModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {props.children}

      {value.modals.map((modal, index) => (
        <div
          className="root-modal"
          ref={modalRef}
          key={index}
          onClick={(e) => {
            if (modal.clickClose) {
              closeModal({ id: modal.id });
            }
          }}
        >
          <div className="modal-content">
            <h2>{modal.title}</h2>
            <p>{modal.desc}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // closeModal({ id: modal.id });
              }}
              className={modal.closeClass}
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};

export function useModal() {
  return React.useContext(ModalContext);
}
