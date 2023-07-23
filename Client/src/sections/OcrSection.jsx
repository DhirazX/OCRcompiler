import React from "react";
import { AiOutlineScan } from "react-icons/ai";

function OcrSection() {
  return (
    <div className="ocr-section">
      <div className="section-title">
        <div className="section-title-text">
          <AiOutlineScan className="section-title-icon" />
          OCR
        </div>
      </div>
      <div className="code-editor">Code</div>
      <div className="ocr-btns">
        <div className="compile-btn btn-primary">Compile</div>
        <div className="prettify-btn btn-secondary">Prettify</div>
      </div>
    </div>
  );
}

export default OcrSection;
