import React, { useState, useEffect } from 'react';
import styles from './PopularCategory.module.css'
import axios from 'axios';
import Slider from 'react-slick';

export default function PopularCategory() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true, 
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />, 
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  

  async function getCategories() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='py-20 mx-12'>
<h2 className='mb-3 text-lg sm:text-xl md:text-2xl font-semibold text-center text-color dark:text-white'>Shop Popular Categories</h2>
<Slider {...settings} >
    {categories.map(category => <div key={category._id} className='px-1'>
      <img src={category.image} className={styles.categoryImage} /> 
      <h4 className='font-bold text-center'>{category.name}</h4>
    </div>)}
      
    </Slider>

    </div>
  );
}

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-40px] left-2/4  transform -translate-x-1/2 bg-gray-400 w-8 h-2 rounded"
    ></button>
  );
};


const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-40px] right-2/4 mx-9 transform translate-x-1/2 bg-gray-400 w-8 h-2 rounded"
    ></button>
  );
};