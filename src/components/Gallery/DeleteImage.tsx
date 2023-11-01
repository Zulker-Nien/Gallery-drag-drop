import { toast } from "react-toastify";
import { DeleteProps } from "../types/types";

const DeleteImage = (props: DeleteProps) => {
  const notify = () =>
    toast.success("Successfully Deleted!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const {
    setImageData,
    setCheckedItems,
    imageData,
    checkedItems,
    setTotalSelected,
    totalSelected,
  } = props;

  const handleDeleteSelected = () => {
    const updatedImageData = imageData.filter(
      (_, index) => !checkedItems[index]
    );
    setImageData(updatedImageData);

    const updatedCheckedItems = checkedItems.filter(
      (_, index) => !checkedItems[index]
    );
    setCheckedItems(updatedCheckedItems);

    setTotalSelected(0);
    notify();
  };
  return (
    <>
      {totalSelected > 0 ? (
        <>
          <h3>{totalSelected} items selected</h3>
          {totalSelected === 1 ? (
            <button onClick={handleDeleteSelected}>Delete File</button>
          ) : (
            <button onClick={handleDeleteSelected}>Delete Files</button>
          )}
        </>
      ) : (
        <h2>Gallery</h2>
      )}
    </>
  );
};

export default DeleteImage;
