import { useEffect, useState, useRef } from "react";
import "./App.css";
import ImageSection from "./sections/ImageSection.jsx";
import OcrSection from "./sections/OcrSection";
import OutputSection from "./sections/OutputSection";
import ErrorModal from "./sections/ErrorModal";
import axios from "axios";
import Tesseract from "tesseract.js";
import { HiDownload } from "react-icons/hi";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  // const [data, setData] = useState({});
  const [code, setCode] = useState({});
  const [output, setOutput] = useState("");
  const ref = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [windowSize, setWindowSize] = useState();

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

  //Downloads the code as a txt file
  const downloadTxtFile = () => {
    if (code.ocr) {
      const element = document.createElement("a");
      const file = new Blob([code.ocr], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "code.txt";
      document.body.appendChild(element);
      element.click();
    } else {
      setModal(true);
      setModalText("There's no code to download.");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    }
  };

  //Fetches data
  // useEffect(() => {
  //   setWindowSize(window.innerWidth);
  // }, [window.innerWidth]);

  window.addEventListener("resize", () => {
    setWindowSize(window.innerWidth);
  });

  const onimgchangeHandler = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    // Perform OCR on the image using Tesseract
    const textData = await Tesseract.recognize(selectedImage, "eng", {
      logger: (m) => console.log(m),
    });

    // Check if the OCR output contains a substantial amount of text
    const minTextLength = 5;

    if (textData.data.text.length >= minTextLength) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      try {
        const response = await axios.post(
          "http://localhost:5000/image",
          formData
        );
        console.log(response.data);
        fetch("/ocr")
          .then((response) => response.json())
          .then((data) => {
            setCode(data);
          });
        //Handles the response from the backend if needed
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setModal(true);
      setModalText("Insert a valid document");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    }
  };

  const oninputChangeHandler = (e) => {
    setCode(e.target.value);
  };

  const handleRunClick = async () => {
    if (!code.ocr) {
      setModal(true);
      setModalText("There's no code to compile.");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 2000);
    } else {
      const payload = {
        code,
      };
      const outputData = await axios.post("http://localhost:4999/py", payload);
      console.log(outputData.data.output);
      setOutput(outputData.data.output);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="App">
        <ErrorModal modal={modal} modalText={modalText} />
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
          <div className="logo">
            <span className="primary-color">OCR</span>compiler
          </div>
          <div className="save-btn btn-primary" onClick={downloadTxtFile}>
            {windowSize >= 450 ? (
              "Download Code"
            ) : (
              <div>
                <HiDownload className="download-icon" />
              </div>
            )}
          </div>
          {/* <div className="user-img">.</div> */}
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
          <OutputSection output={output} ref={ref} />
        </div>
      </div>
    </div>
  );
}

export default App;
