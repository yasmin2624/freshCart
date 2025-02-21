import React, { useContext } from "react";
import { useState } from "react";
import { WishlistContext } from "../../context/wishListContext";
import { toast } from "react-toastify";
import { cartContext } from "../../context/cartContext";
import { BeatLoader } from "react-spinners";
import Loader from "../shared/Loader/Loader";
import { Link } from "react-router-dom";


export default function WishList() {
  const { wishlist, RemoveProduct,isLoading } = useContext(WishlistContext);
  const { addToCart } = useContext(cartContext);
  const [loadingAdd, setLoadingAdd] = useState({});
  const [loadingRemove, setLoadingRemove] = useState({});

  async function addProduct(id) {
    try {
      const data = await addToCart(id);
      if (data && data.status === "success") {
        toast.success("Product added to cart successfully!");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  }
  if (isLoading) return <Loader />;
  return (
    <>
   
   {wishlist.length > 0 ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 sm:px-10 md:px-14">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-gray-800 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 sm:px-10 md:px-16 py-3">Image</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Product</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Price</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Add to cart</th>
              <th scope="col" className="px-4 sm:px-6 py-3">Remove</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product) => (
              <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.imageCover} className="w-12 sm:w-16 md:w-32" alt={product.title} />
                </td>
                <td className="px-4 sm:px-6 py-4 ">{product.title}</td>
                <td className="px-4 sm:px-6 py-4 ">EGP {product.price}</td>
                <td className="px-4 sm:px-6 py-4">
                  <button
                    onClick={async () => {
                      setLoadingAdd((prev) => ({ ...prev, [product._id]: true }));
                      await addToCart(product._id);
                      setLoadingAdd((prev) => ({ ...prev, [product._id]: false }));
                    }}
                    className="text-main rounded-md p-2 border"
                  >
                    {loadingAdd[product._id] ? <span>Loading...</span> : <span>Add to cart</span>}
                  </button>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <button
                    className="text-center text-red-700 rounded-md px-3"
                    onClick={async () => {
                      setLoadingRemove((prev) => ({ ...prev, [product._id]: true }));
                      await RemoveProduct(product._id);
                      setLoadingRemove((prev) => ({ ...prev, [product._id]: false }));
                    }}
                  >
                    {loadingRemove[product._id] ? (
                      <BeatLoader size={8} color="#6d7882" />
                    ) : (
                      <i className="fa-solid fa-trash p-2"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="container mx-auto py-8 px-4 sm:px-10 md:px-14">
        <div className="flex justify-center py-8 flex-col items-center h-72">
          <h2 className="text-3xl text-gray-600 my-4">Empty List</h2>
          <Link to={"/home"} className="bg-main p-2 rounded-md text-white my-3">
            Go to Home
          </Link>
        </div>
      </div>
    )}

    </>
  )
  }