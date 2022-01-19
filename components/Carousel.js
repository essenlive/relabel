import { Carousel as Slider} from "react-responsive-carousel";
import styles from "@styles/components/Carousel.module.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousel({ images }) {
    return(
    <>
    <Slider 
        className={styles.slider}
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        >
        {images && images.map((item, i) => (
                <img
                key={i}
                src={item}
                alt={`illustration ${i}`}
                />
                ))}
    </Slider>
    {!images.length && (<div className={styles.empty}>Pas d'illustration
    </div>)}
    </>
    );
}