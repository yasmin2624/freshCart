import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import Loader from '../shared/Loader/Loader';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col mb-20 mx-6 md:mx-12">
    <h1 className="text-3xl md:text-4xl font-bold text-main my-5">All Categories</h1>
    {loading ? (
      <Loader/>
    ) : (
      <div className="main-layout max-w-[1140px] mx-auto px-3 flex flex-wrap justify-center lg:justify-between gap-5">
        {categories.map((category) => (
          <div key={category._id} className="border product rounded w-full sm:w-[300px] md:w-[320px] lg:w-[30%] h-[400px] shadow-md">
            <div>
              <img src={category.image} alt={category.name} className="w-full h-60 sm:h-64 md:h-72 lg:h-80 object-cover object-center" />
            </div>
            <h2 className="text-center pt-5 font-bold text-xl md:text-2xl text-main">{category.name}</h2>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}