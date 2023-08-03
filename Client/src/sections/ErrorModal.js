import React from "react";
import "./ErrorModal.css";

function errorModal({ modal , modalText }) {
  return (
    <div>
      {modal && <div className={`modal ${modal ? 'active' : ''}`}>{modalText}</div>}
    </div>
  );
}

export default errorModal;
