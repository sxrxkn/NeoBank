import React from "react";

import "../styles/Modal.css";

interface Children {
  children: React.ReactNode;
}

function Modal({ children }: Children) {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default Modal;
