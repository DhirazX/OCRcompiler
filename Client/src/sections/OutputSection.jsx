import React from "react";
import { MdOutlineOutput } from "react-icons/md";

function OutputSection({ output }) {
  return (
    <div className="output-section">
      <div className="section-title">
        <div className="section-title-text">
          <MdOutlineOutput className="section-title-icon" />
          OUTPUT
        </div>
      </div>
      {/* <textarea rows={20} cols={100} value={output}></textarea> */}
      <div className="output-code">{output}</div>
    </div>
  );
}

export default OutputSection;
