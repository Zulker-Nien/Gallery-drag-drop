import React, { Suspense, useState } from "react";
import { ImageProps } from "../types/types";

const Gallery = (props: ImageProps) => {
  const { setImageData, setCheckedItems, imageData, checkedItems } = props;
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [clickedItemIndex, setClickedItemIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    const draggedItem = e.currentTarget;
    e.dataTransfer.setDragImage(draggedItem, 100, 100);

    e.dataTransfer.setData("index", index.toString());

    e.dataTransfer.setData("itemData", JSON.stringify(imageData[index]));
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedImageData = [...imageData];
      const draggedItem = updatedImageData[draggedIndex];
      updatedImageData.splice(draggedIndex, 1);
      updatedImageData.splice(index, 0, draggedItem);
      setImageData(updatedImageData);
      const updatedCheckedItems = [...checkedItems];
      const draggedCheckedItem = updatedCheckedItems[draggedIndex];
      updatedCheckedItems.splice(draggedIndex, 1);
      updatedCheckedItems.splice(index, 0, draggedCheckedItem);
      setCheckedItems(updatedCheckedItems);

      setDraggedIndex(index);
      const prevTargetPosition = document.querySelector(".target-position");
      if (prevTargetPosition) {
        prevTargetPosition.classList.remove("target-position");
      }

      const currentTargetPosition = e.target as HTMLElement;
      currentTargetPosition.classList.add("target-position");
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);

    const draggedItem = document.querySelector(".dragging");
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
    }

    const prevTargetPosition = document.querySelector(".target-position");
    if (prevTargetPosition) {
      prevTargetPosition.classList.remove("target-position");
    }
  };

  const handleMouseEnter = (index: number) => {
    if (clickedItemIndex !== null && clickedItemIndex === index) {
      return;
    } else {
      setHoveredItemIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItemIndex(null);
  };

  const toggleCheckbox = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
    setClickedItemIndex(index);
  };
  return (
    <>
      {imageData?.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => toggleCheckbox(index)}
          className={`item ${draggedIndex === index ? "dragged" : ""} ${
            hoveredItemIndex === index ? "hovered" : ""
          } ${clickedItemIndex === index ? "clicked" : ""}`}
        >
          <div className="item-content">
            {checkedItems[index] || hoveredItemIndex === index ? (
              <input
                type="checkbox"
                className="checkbox"
                checked={checkedItems[index]}
                onChange={() => toggleCheckbox(index)}
              />
            ) : null}
            <Suspense fallback={<div>Loading...</div>}>
              <img src={item.image} alt={item.alt} />
            </Suspense>
          </div>
        </div>
      ))}
    </>
  );
};

export default Gallery;
