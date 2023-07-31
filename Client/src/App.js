import { useEffect, useState } from "react";
import "./App.css";
import ImageSection from "./sections/ImageSection.jsx";
import OcrSection from "./sections/OcrSection";
import OutputSection from "./sections/OutputSection";
import axios from "axios";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
 // const [data, setData] = useState({});
  const [code, setCode] = useState({});
  const [output, setOutput] = useState("");

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
        setCode(data);
      });
  }, []);

  const onimgchangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://localhost:5000/image",formData);
      console.log(response.data);
      //Handles the response from the backend if needed
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const oninputChangeHandler = (e) => {
    setCode(e.target.value);
  };

  const handleRunClick = async () => {
    const payload = {
      code,
    };
    const outputData = await axios.post("http://localhost:4999/py", payload);
    console.log(outputData.data.output);
    setOutput(outputData.data.output);
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

      {/* {data.ocr} */}

      <div className="navbar">
        <div className="project-name">Untitled</div>
        <div className="save-btn btn-primary">Save</div>
        <div className="user-img">.</div>
      </div>

      <div className="sections">
        <ImageSection
          onchangeHandler={onimgchangeHandler}
          selectedImage={selectedImage}
          handleImageUpload={handleImageUpload} // Pass the image upload handler
        />
        <OcrSection
          code={code}
          onchangeHandler={oninputChangeHandler}
          handleRunClick={handleRunClick}
        />
        <OutputSection output={output} />
      </div>
    </div>
  );
}

export default App;
