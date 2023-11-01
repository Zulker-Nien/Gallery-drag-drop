export type ImageItem = {
  image: string;
  alt: string;
};

export type IMAGESType = ImageItem[];

export type ImageProps = {
  setImageData: React.Dispatch<React.SetStateAction<IMAGESType>>;
  setCheckedItems: React.Dispatch<React.SetStateAction<boolean[]>>;
  checkedItems: boolean[];
  imageData: IMAGESType;
};

export type DeleteProps = {
  setImageData: React.Dispatch<React.SetStateAction<IMAGESType>>;
  setCheckedItems: React.Dispatch<React.SetStateAction<boolean[]>>;
  setTotalSelected: React.Dispatch<React.SetStateAction<number>>;
  checkedItems: boolean[];
  imageData: IMAGESType;
  totalSelected: number;
};
