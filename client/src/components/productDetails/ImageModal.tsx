// Import ImageModal component
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useState } from "react";

interface mousePosition {
  x: number;
  y: number;
}
export default function ImageModal({
  image,
  isModalOpen,
  onClose,
}: {
  image: string;
  isModalOpen: boolean;
  onClose: () => void;
}) {
  const [mousePosition, setMousePosition] = useState<mousePosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseMove = (e: any) => {
    setIsHovering(true);
    // Get position of image
    const { left, top, width, height } = e.target.getBoundingClientRect();
    // Calculate mouse position in percentage
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div
          className="w-[600px] h-[600px] relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundSize: "200%", // Adjust zoom level
            cursor: "zoom-in",
            transition: "background-position 0.1s ease", // Smooth transition for background position
          }}
        >
          <Image
            className={isHovering ? "invisible" : ""}
            layout="fill"
            src={image}
            alt="image modal"
            style={{ objectFit: "contain" }}
          />
        </div>
      </Modal>
    </div>
  );
}
