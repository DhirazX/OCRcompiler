import React from "react";
import { AiOutlineScan } from "react-icons/ai";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";

function OcrSection() {
  return (
    <div className="ocr-section">
      <div className="section-title">
        <div className="section-title-text">
          <AiOutlineScan className="section-title-icon" />
          OCR
        </div>
      </div>
      <div className="code-editor">
        <CodeMirror
          value="console.log('hello world!');
          #include<iostream.h>
          int a,b;
          for(i=0;i<12;i++){}"
          height="100%"
          theme={dracula}
          extensions={[cpp({ cpp: true })]}
          className="codemirror-wrapper"
        />
      </div>
      <div className="ocr-btns">
        <div className="compile-btn btn-primary">Compile</div>
        <div className="prettify-btn btn-secondary">Prettify</div>
      </div>
    </div>
  );
}

export default OcrSection;
