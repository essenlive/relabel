import { Carousel as Slider} from "react-responsive-carousel";
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Carousel({images}) {
    return(<Slider 
    autoPlay
    infiniteLoop
     >
        {images.map((item, i) => (
            <div key={i} >
                <Image
                    src={item.thumbnails.large.url}
                    layout='fill'
                />
            </div>
        ))}
    </Slider>);
}