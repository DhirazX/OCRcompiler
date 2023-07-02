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
  useEffect(()=>{
    fetch("/ocr")
    .then(
      response=>response.json()
    )
    .then(data=>{
        setData(data)
      }
    )
  },[])
  return (
    <div className="App">
      {/* <div className="input-section">
        <input type="file" accept="image/*" onChange={onchangeHandler}></input>
      </div> */}
      <div className="output-section">
        {/* <div className="image-view">
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} id="inputImg"></img>
          )}
        </div> */}
        <div className="result">
          {data.ocr}
        </div>
      </div>
    </div>
  );
}

export default App;
