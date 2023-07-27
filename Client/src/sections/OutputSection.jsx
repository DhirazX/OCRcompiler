import React from "react";
import { MdOutlineOutput } from "react-icons/md";

function OutputSection() {
  return (
    <div className="output-section">
      <div className="section-title">
        <div className="section-title-text">
          <MdOutlineOutput className="section-title-icon" />
        </div>
      </div>
      <textarea
        rows={20}
        cols={100}
      ></textarea>
    </div>
  );
}

export default OutputSection;
