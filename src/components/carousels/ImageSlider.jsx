import { Carousel } from "react-bootstrap";
import styles from "./styles.module.css";
import clsx from "clsx";

const ImageSlider = ({ images = [] }) => {
  return (
    <Carousel interval={null}>
      {images.map((item, index) => (
        <Carousel.Item key={item?.id || index}>
          <div
            className={clsx("d-block w-100", styles.carousel_image_container)}
          >
            <img
              className={styles.carousel_image}
              src={item?.imageUrl || item}
              alt={`Slide ${index}`}
              loading="lazy"
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
