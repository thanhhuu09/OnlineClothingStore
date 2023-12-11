import Slider from "react-slick";
import Image from "next/image";
import { useState, useEffect } from "react";
import ImageModal from "./ImageModal";

export default function ProductSlider({ images }: { images: string[] }) {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  console.log(activeSlide);

  const mainSettings = {
    dot: false,
    infinite: true,
    slidesToShow: 1,
    swipeToSlide: true,
    slidesToScroll: 1,
  };
  const navSettings = {
    dot: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    afterChange: (current: number) => setActiveSlide(current), // This is the key to update the active slide
  };
  const [navSlider, setNavSlider] = useState<Slider | any>();
  const [mainSlider, setMainSlider] = useState<Slider | any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  // Handle open modal
  const handleOnClick = () => {
    setIsModalOpen(true);
    console.log("open", isModalOpen);
  };

  // Handle close modal;
  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  // Handle update selected image
  useEffect(() => {
    setSelectedImage(images[activeSlide]);
  }, [activeSlide, images]);
  return (
    <>
      {/* Navigation Slider */}
      <div className="w-[170px]">
        <Slider
          {...navSettings}
          className="w-full"
          asNavFor={mainSlider}
          focusOnSelect={true}
          ref={(slider1) => setNavSlider(slider1)}
        >
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <Image
                width={150}
                height={150}
                src={image}
                alt="product image"
                className={` ${
                  index === activeSlide ? "opacity-100" : "opacity-50"
                } rounded-md cursor-pointer active:scale-95 transition transform duration-200 ease-in-out`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Slider */}
      <div className="w-[590px] border-none">
        <Slider
          {...mainSettings}
          asNavFor={navSlider}
          ref={(slider2) => setMainSlider(slider2)}
        >
          {images.map((image, index) => (
            <div
              onClick={handleOnClick}
              key={index}
              className="bg-primary-800  max-w-full rounded-md flex justify-center items-center overflow-hidden cursor-pointer"
            >
              <Image
                layout="responsive"
                width={100}
                height={100}
                objectFit="contain"
                src={image}
                alt="product image"
              />
            </div>
          ))}
        </Slider>
        {/* Modal image use MUI */}
        <ImageModal
          image={selectedImage}
          isModalOpen={isModalOpen}
          onClose={handleOnClose}
        />
      </div>
    </>
  );
}
