import React from "react";
import "../App.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

function imageInput({ onchangeHandler, selectedImage }) {
  return (
    <div className="image-section">
      <div className="section-title">
        <div className="section-title-text">IMAGE</div>
      </div>
      <div className="image-input-wrapper">
        <form
          action=""
          onClick={() => document.querySelector(".imgInputBox").click()}
          className="image-input"
        >
          <div className="image-input-text">
            <AiOutlineCloudUpload className="upload-icon" />
            <p>Click to Upload</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="imgInputBox"
            onChange={onchangeHandler}
            hidden
          ></input>
          <div className="image-view">
            .
            {selectedImage && (
              <img src={URL.createObjectURL(selectedImage)} id="inputImg"></img>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default imageInput;
