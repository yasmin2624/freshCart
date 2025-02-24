import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProducts from './components/RelatedProducts/RelatedProducts'
import Slider from 'react-slick'
import Loader from '../shared/Loader/Loader'
import { cartContext } from '../../context/cartContext'
import { toast } from 'react-toastify'

export default function ProductDetails() {

  const [count,setCount] = useState(0)
  const [details,setDetails] =useState(null)
  const [loading, setLoading] = useState(false);
  let {addToCart} = useContext(cartContext) 


  const {id,categoryId} = useParams()
  console.log(id);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


 async function getProductDetails() {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setDetails(data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }



 async function addProduct(id) {
     try {
       const data = await addToCart(id);
       if (data && data.status === "success") {
         toast.success("Product added to cart successfully!");
       } else {
         toast.error("Failed to add product to cart.");
       }
     } catch (error) {
       console.error("Error adding product:", error);
       toast.error("Something went wrong, please try again.");
     }
   }


  useEffect(() =>{
    getProductDetails()
  },[id])

  return (
   <>
     
     {details && (
  <div className="container max-w-screen-lg py-16 flex flex-col md:flex-row items-center gap-10">
    <div className="w-full md:w-4/12 px-4 md:px-10">
      <Slider {...settings}>
        {details?.images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[350px] object-contain rounded bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </Slider>
    </div>

    <div className="w-full md:w-8/12 px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-6 text-color dark:text-white">
        {details?.title}
      </h1>
      <p className="text-[#212529c3] dark:text-gray-300">{details?.description}</p>
      <span className="text-[#212529c3] dark:text-gray-400 block mb-4">
        {details?.category?.name}
      </span>

      <div className="flex justify-between items-center mb-8">
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          {details?.price} EGP
        </p>
        <p className="flex items-center text-gray-800 dark:text-yellow-400">
          <i className="fa fa-star rating-color mr-1"></i>
          {details?.ratingsAverage}
        </p>
      </div>

      <button
        onClick={async () => {
          setLoading(true);
          await addProduct(details.id);
          setLoading(false);
        }}
        className="bg-main w-full text-center text-white dark:bg-green-600 rounded-md p-2"
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>
            <i className="fa-solid fa-plus p-2" style={{ color: "#ffffff" }} />
            Add to cart
          </span>
        )}
      </button>
    </div>
  </div>
)}

{!details && <Loader />}

<h2 className="container px-4 sm:px-8 md:px-12 text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-color dark:text-white">
  Related Products
</h2>

<RelatedProducts categoryId={categoryId} />

   </>
  )
}
