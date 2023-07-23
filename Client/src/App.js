import { useEffect, useState } from "react";
import "./App.css";
import ImageSection from "./sections/ImageSection.jsx";
import OcrSection from "./sections/OcrSection";
import OutputSection from "./sections/OutputSection";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState({});

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

  const onchangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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
        <ImageSection
          onchangeHandler={onchangeHandler}
          selectedImage={selectedImage}
        />
        <OcrSection />
        <OutputSection />
      </div>
    </div>
  );
}

export default App;
