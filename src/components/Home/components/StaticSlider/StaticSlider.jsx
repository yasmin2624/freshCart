import React from 'react';
import Slider from 'react-slick';
import Slide1 from '../../../../assets/images/slide1.jpeg';
import Slide2 from '../../../../assets/images/slide2.jpeg';
import Slide3 from '../../../../assets/images/slide3.jpeg';
import Static1 from '../../../../assets/images/static1.png';
import Static2 from '../../../../assets/images/static2.png';

export default function StaticSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
  
    <div className="flex justify-center mx-4 md:mx-20">
    <div className="w-9/12 sm:w-9/12 px-2">
      <Slider {...settings} className="w-full">
        <div className="flex justify-center">
          <img src={Slide1} className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Slide2} className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Slide3} className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded" alt="" />
        </div>
      </Slider>
    </div>
    <div className="w-3/12 sm:w-3/12 flex flex-col">
      <img src={Static1} className="w-full h-[100px] sm:h-[120px] md:h-[160px] lg:h-[200px] object-cover rounded pb-1.5" alt="" />
      <img src={Static2} className="w-full h-[100px] sm:h-[120px] md:h-[160px] lg:h-[200px] object-cover rounded pt-2" alt="" />
    </div>
  </div>
  
  );
}
