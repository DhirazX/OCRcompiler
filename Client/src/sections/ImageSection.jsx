import React from "react";
import "../App.css";

function imageInput() {
  return (
    <div className="image-section">
      <div className="section-title">
        <div className="section-title-text">IMAGE</div>
      </div>
      <div className="image-input">
        <input type="file" accept="image/*"></input>
      </div>
    </div>
  );
}

export default imageInput;
