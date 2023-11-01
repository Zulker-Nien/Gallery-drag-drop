import { useState, useEffect } from "react";
import IMAGES from "./assets/images/images";
import "./App.scss";
import AddImage from "./components/Gallery/AddImage";
import { IMAGESType } from "./components/types/types";
import Gallery from "./components/Gallery/Gallery";
import DeleteImage from "./components/Gallery/DeleteImage";

const App = () => {
  const [imageData, setImageData] = useState<IMAGESType>(IMAGES);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(IMAGES.length).fill(false)
  );
  const [totalSelected, setTotalSelected] = useState<number>(0);

  useEffect(() => {
    const totalChecked = checkedItems.filter((isChecked) => isChecked).length;
    setTotalSelected(totalChecked);
  }, [checkedItems]);

  return (
    <div className="mainContainer">
      <div className="info-panel">
        <DeleteImage
          setImageData={setImageData}
          setCheckedItems={setCheckedItems}
          setTotalSelected={setTotalSelected}
          imageData={imageData}
          checkedItems={checkedItems}
          totalSelected={totalSelected}
        />
      </div>
      <div className="card">
        <Gallery
          setImageData={setImageData}
          setCheckedItems={setCheckedItems}
          imageData={imageData}
          checkedItems={checkedItems}
        />
        <AddImage
          setImageData={setImageData}
          setCheckedItems={setCheckedItems}
          imageData={imageData}
          checkedItems={checkedItems}
        />
      </div>
    </div>
  );
};

export default App;
