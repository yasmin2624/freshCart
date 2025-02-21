import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { cartContext } from "../../context/cartContext";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Loader from "../shared/Loader/Loader";
import FullLoader from "../shared/FullLOader/FullLOader";

export default function Cart() {
  const { cartDetails, RemoveProduct, updateCount, clearCart, isLoading } =
    useContext(cartContext);
  const [loading, setLoading] = useState({});

  async function deleteProduct(id) {
    setLoading((items) => ({ ...items, [id]: true }));
    let data = await RemoveProduct(id);
    console.log(data, "cart cart cart");
    setLoading((items) => ({ ...items, [id]: false }));
  }

  async function UpdateItems(id, count) {
    let data = await updateCount(id, count);
    console.log(data, "cart cart cart");
  }

  useEffect(() => {
    console.log(cartDetails);
  }, [cartDetails]);

  return (
    <>
      {cartDetails ? (
        cartDetails?.data?.products?.length == 0 ? (
          <div className="flex justify-center py-8 flex-col items-center h-96">
            <h2 className="text-3xl text-gray-600 my-4">Empty Cart</h2>
            <Link
              to={"/products"}
              className="bg-main p-2 rounded-md text-white my-3"
            >
              {" "}
              Shopping Now
            </Link>
          </div>
        ) : (
          <div className="px-4 sm:px-8 md:px-16 lg:px-32 pt-8 bg-[#F8F9FA]">
          <div className="flex flex-row justify-between items-center gap-3 sm:gap-6 p-3 mb-3">
            <h2 className="text-sm sm:text-lg md:text-xl text-color">
              Total Products: 
              <span className="text-main font-semibold"> {cartDetails.numOfCartItems} </span>
            </h2>
            <h2 className="text-sm sm:text-lg md:text-xl text-color">
              Total Price:
              <span className="text-main font-semibold"> {cartDetails.data.totalCartPrice} EGP</span>
            </h2>
            <Link to={"/checkout"} className="bg-main text-white rounded-md px-2 py-1 text-xs sm:text-sm md:text-base text-center">
              Check Out
            </Link>
          </div>
        
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 sm:px-6 py-3">Image</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Product</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Qty</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Price</th>
                  <th scope="col" className="px-4 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.data.products.map((product) => (
                  <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                    <td className="p-2 sm:p-4">
                      <img src={product.product.imageCover} className="w-12 sm:w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                      <button
                  onClick={() => UpdateItems(product.product._id, product.count - 1)}
                  className="p-1 text-xs sm:text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <input
                  
                  className="w-10 sm:w-14 bg-gray-50 border text-gray-900 text-xs sm:text-sm rounded-lg px-2.5 py-1"
                  placeholder={product.count}
                />
                <button
                  onClick={() => UpdateItems(product.product._id, product.count + 1)}
                  className="p-1 text-xs sm:text-sm h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>
                      </div>
                    </td>
                    <td className="px-1 sm:px-3 py-2 font-semibold text-gray-900 dark:text-white">
                      EGP {product.price}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <a onClick={() => deleteProduct(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                        {loading[product.product._id] ? <BeatLoader size={6} /> : <i className="fa-solid fa-trash text-lg sm:text-xl px-2 sm:px-4"></i>}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
          <div className="flex justify-center py-6">
            {isLoading ? (
              <FullLoader />
            ) : (
              <button onClick={async () => await clearCart()} className="bg-main text-white rounded-md p-2 px-8 sm:px-12 text-lg sm:text-2xl hover:text-black">
                Clear All
              </button>
            )}
          </div>
        </div>
        
        
        )
      ) : (
        <Loader />
      )}
    </>
  );
}
