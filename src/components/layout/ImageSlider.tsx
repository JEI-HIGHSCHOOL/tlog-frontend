import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SliderCss from '@/styles/slider.module.css';

const MainSlider: React.FC<Slider> = ({ images }) => {
  SwiperCore.use([Navigation, Scrollbar]);

  return (
    <Swiper
      effect={'slide'}
      grabCursor={true}
      autoplay
      className='imageSlider p-1'
      navigation
    >
      {images.map((url) => (
        <SwiperSlide
          className={SliderCss.img}
          style={{ backgroundImage: `url(${url})` }}
        ></SwiperSlide>
      ))}
    </Swiper>
  );
};

interface Slider {
  images: string[];
}

export default MainSlider;
