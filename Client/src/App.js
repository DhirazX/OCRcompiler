import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({});

  // const onchangeHandler = (e) => {
  //   setSelectedImage(e.target.files[0]);
  // };

  // const convertImageToText = async () => {
  //   if (!selectedImage) return;
  //   Tesseract.recognize(selectedImage, "eng", {
  //     logger: (m) => console.log(m),
  //   }).then(({ data: { text } }) => {
  //     setData(text);
  //   });
  // };

  // useEffect(() => {
  //   convertImageToText();
  // }, [selectedImage]);

  //Fetches data
  useEffect(() => {
    fetch("/ocr")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="App">
      {/* <div className="input-section">
        <input type="file" accept="image/*" onChange={onchangeHandler}></input>
      </div> */}

      {/* <div className="image-view">
        {selectedImage && (
          <img src={URL.createObjectURL(selectedImage)} id="inputImg"></img>
        )}
      </div> */}

      {data.ocr}

      <div className="navbar">
        <div className="project-name">Untitled</div>
        <div className="save-btn btn-primary">Save</div>
        <div className="user-img">.</div>
      </div>

      <div className="sections">
        <div className="image-section">
          <div className="section-title">
            <div className="section-title-text">IMAGE</div>
          </div>
          Image
        </div>
        <div className="ocr-section">
          <div className="section-title">
            <div className="section-title-text">OCR</div>
          </div>
          <div className="code-editor">Code</div>
          <div className="ocr-btns">
            <div className="compile-btn btn-primary">Compile</div>
            <div className="prettify-btn btn-secondary">Prettify</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
