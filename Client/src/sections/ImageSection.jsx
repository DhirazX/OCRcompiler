import React from "react";
import "../App.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";

function imageInput({ onchangeHandler, selectedImage, handleImageUpload }) {
  return (
    <div className="image-section">
      <div className="section-title">
        <div className="section-title-text">
          <BsCardImage className="section-title-icon" />
          IMAGE
        </div>
      </div>
      <form action="" className="image-input">
        <div className="image-input-hero">
          {selectedImage ? (
            <div className="image-display">
              <img
                src={URL.createObjectURL(selectedImage)}
                id="inputImg"
                alt="document"
              ></img>
              {/* <button onClick={handleImageUpload}>Upload Image</button> */}
            </div>
          ) : (
            <div
              className="image-input-text"
              onClick={() => document.querySelector(".imgInputBox").click()}
            >
              <AiOutlineCloudUpload className="upload-icon" />
              <p>Click to Upload</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="imgInputBox"
          onChange={onchangeHandler}
          hidden
        ></input>
      </form>
    </div>
  );
}

export default imageInput;
