import { Carousel as Slider} from "react-responsive-carousel";
import classNames from 'classnames'
import { Image } from '@mantine/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousel({ images }) {
    return(<Slider 
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        >
        {images.map((item, i) => (
            <div key={i} >
                <Image
                    src={item}
                    layout='cover'
                    height={"400px"}
                />
            </div>
        ))}
    </Slider>);
}