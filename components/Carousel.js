import { Carousel as Slider} from "react-responsive-carousel";
import Image from 'next/image'
import classNames from 'classnames'
import { useState } from 'react'
import styles from "@styles/components/Carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousel({ images }) {
    const [loaded, setLoaded] = useState(false);
    return(<Slider 
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        >
        {images.map((item, i) => (
            <div key={i} >
                <div className={classNames(styles.placeholder, { [`${styles.loaded}`]: loaded })}></div>
                <Image
                    src={item}
                    layout='fill'
                    onLoad={() => setLoaded(true)}
                />
            </div>
        ))}
    </Slider>);
}