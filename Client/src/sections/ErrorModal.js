import React from "react";

function errorModal({ modal }) {
  return (
    <div>
      {modal && (
        <div
          className="modal"
          style={{
            backgroundColor: "#e2e3e357",
            padding: "5px 15px",
            borderRadius: "15px",
            color: "white",
            position: "fixed",
            top: "85%",
            left: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            opacity: modal ? 1 : 0,
            transition: "opacity 2s ease-out",
          }}
        >
          Theres no code to download.
        </div>
      )}
    </div>
  );
}

export default errorModal;
