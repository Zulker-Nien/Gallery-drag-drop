import { ImageProps, ImageItem } from "../types/types";

const AddImage = (props: ImageProps) => {
  const { setImageData, setCheckedItems, imageData, checkedItems } = props;
  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: Event) => {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;

          const newImage: ImageItem = {
            image: imageUrl,
            alt: `Image ${imageData.length}`,
          };

          setImageData([...imageData, newImage]);
          setCheckedItems([...checkedItems, false]);
        };

        reader.readAsDataURL(file);
      }
    };

    input.click();
  };
  return (
    <div className=" add-more">
      <button onClick={handleAddImage}>Add Images</button>
    </div>
  );
};

export default AddImage;
