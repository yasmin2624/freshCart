import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../../../context/wishListContext';


export default function ProductItem(props) {
  const [loading, setLoading] = useState(false);
  const {wishlist, addToWishlist ,RemoveProduct ,getWishList} = useContext(WishlistContext); 
  const { imageCover, title, price, category, ratingsAverage, id } = props.product || {};

  const isInWishlist = wishlist.some((item) => item._id === id);
  const [redHeart, setRedHeart] = useState(isInWishlist);


  useEffect(() => {
    redHeart
    getWishList();
  }, []);

  return (
    <div className="container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-3 ">
      <div className="product p-4 rounded">
        <Link to={`/productDetails/${id}/${category?._id}`}>
          <img src={imageCover} alt="" className="rounded" />
          <span className="text-main">{category?.name}</span>
          <h2 className="mb-4 font-bold">{title?.split(" ").splice(0, 2).join(" ")}</h2>
          <div className="flex justify-between mb-4">
            <p>{price} EGP</p>
            <p>
              <i className="fa fa-star rating-color"></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>
        <div className="flex">
        <button
          onClick={async () => {
            if (!props.addProduct) return;
            setLoading(true);
            await props.addProduct(id);
            setLoading(false);
          }}
          className="btn bg-main w-full text-center text-white rounded-md px-2 "
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


        <span
  className="ms-2 cursor-pointer"
  onClick={async () => {
    if (!redHeart) {
      await addToWishlist(id);
      setRedHeart(true)
    } else {
      await RemoveProduct(id);
      setRedHeart(false)
    }
  }}
>
  {redHeart ? (
    <i className="fa-solid fa-heart text-2xl text-red-700"></i>
  ) : (
    <i className="fa-solid fa-heart text-2xl text-gray-800"></i>
  )}
</span>



        </div>
      </div>
    </div>
  );
}

 