import { useState } from "react";

export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="image-carousel">
      <button
        className="image-carousel__button image-carousel__button--prev"
        onClick={() =>
          setCurrentImage(
            currentImage > 0 ? currentImage - 1 : images.length - 1,
          )
        }
        aria-label="Previous image"
      >
        ❮
      </button>
      <img
        className="image-carousel__image"
        alt={images[currentImage].alt}
        src={images[currentImage].src}
        width="100%"
      />
      <div className="image-carousel__pages">
        {images.map((image, index) => (
          <button
            className={`image-carousel__pages__button${index === currentImage ? " image-carousel__pages__button--active" : ""}`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Navigate to ${image.alt}`}
          ></button>
        ))}
      </div>
      <button
        className="image-carousel__button image-carousel__button--next"
        onClick={() =>
          setCurrentImage(
            currentImage < images.length - 1 ? currentImage + 1 : 0,
          )
        }
        aria-label="Next image"
      >
        ❯
      </button>
    </div>
  );
}
