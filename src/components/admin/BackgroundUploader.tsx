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
      accept="image/*"
      onInput={(e) => {
        const images = e.currentTarget.files;

        if (!images || !images[0]) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          const image = new Image();
          image.src = reader.result as string;
          image.onload = () => {
            const { width, height } = image;
            if (!(width === 1300 && height === 600))
              return alert('이미지 크기는 1300px * 600px 이어야 합니다.');
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
