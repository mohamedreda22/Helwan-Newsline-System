/* import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
 */
import React from "react";
import "./Modal.css";

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">This is a test modal</div>
      </div>
    </div>
  );
};

export default Modal;
