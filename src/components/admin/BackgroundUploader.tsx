import { Dispatch } from 'react';

interface BackgroundUploaderProps {
  setBackgroundSrc: Dispatch<React.SetStateAction<string>>;
  setBackgroundSize: Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}

const BackgroundUploader = ({ setBackgroundSrc, setBackgroundSize }: BackgroundUploaderProps) => {
  return (
    <input
      type="file"
      onInput={(e) => {
        const images = e.currentTarget.files;

        if (!images || !images[0]) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const { width, height } = image;
            setBackgroundSize({ width, height });
            setBackgroundSrc(reader.result as string);
          };
        };
        reader.readAsDataURL(images[0]);
      }}
    />
  );
};

export default BackgroundUploader;
