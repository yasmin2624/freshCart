import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { cartContext } from "../../context/cartContext";
import { tokenContext } from "../../context/tokenContext";
import { jwtDecode } from "jwt-decode";
import { Modal } from 'flowbite';

export default function Order() {
  let { getUserOrders } = useContext(cartContext);
  let { token } = useContext(tokenContext);
  const [orders, setOrders] = useState([]);
  const [selectedItems, setselectedItems] = useState([]);


  // set the modal menu element
  const $targetEl = document.getElementById('modalEl');
  const instanceOptions = {
    id: 'modalEl',
    override: true
  };
  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
};
  const modal = new Modal($targetEl, options, instanceOptions);

  function openModel(items){
    setselectedItems(items)
    console.log(items);
    modal.show()
  }
  function hideModal(){
    modal.hide()
   }

  function getId() {
    try {
      let decoded = jwtDecode(token);
      console.log(decoded, "token from order");
      getOrders(decoded.id);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  async function getOrders(id) {
    let data = await getUserOrders(id);
    console.log(data.data);
    setOrders(data.data);
  }

  useEffect(() => {
    token && getId();
  }, [token]);

  return (
    <div className="container my-4 px-4 sm:px-10 md:px-20">
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 sm:px-6 md:px-12 py-3">Order ID</th>
            <th scope="col" className="px-4 sm:px-6 md:px-12 py-3">isPaid</th>
            <th scope="col" className="px-4 sm:px-6 md:px-12 py-3">payment Method Type</th>
            <th scope="col" className="px-4 sm:px-6 md:px-12 py-3">totalOrderPrice</th>
            <th scope="col" className="px-4 sm:px-6 md:px-12 py-3">View Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-4 sm:px-6 md:px-12 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.id}
                </th>
                <td className="px-4 sm:px-6 md:px-12 py-4">{order.isPaid ? "Paid" : "Not Paid"}</td>
                <td className="px-4 sm:px-6 md:px-12 py-4">{order.paymentMethodType}</td>
                <td className="px-4 sm:px-6 md:px-12 py-4">${order.totalOrderPrice}</td>
                <td className="px-4 sm:px-6 md:px-12 py-4">
                  <button
                    onClick={() => openModel(order.cartItems)}
                    className="block text-white bg-main hover:opacity-70 focus:ring-4 focus:outline-none focus:ring-green-100 font-medium rounded-lg text-sm px-3 py-2 text-center"
                    type="button"
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  
    {/* Main modal */}
    <div
  id="modalEl"
  tabIndex={-1}
  aria-hidden="true"
  className="hidden fixed top-0 left-0  items-center justify-center w-full h-full bg-black bg-opacity-50"
>
  <div className="relative p-4 w-full max-w-lg sm:max-w-2xl max-h-screen overflow-y-auto">
    {/* Modal content */}
    <div className="relative bg-slate-200 rounded-lg shadow-sm dark:bg-gray-700">
      {/* Modal header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          More Details
        </h3>
        <button
          onClick={hideModal}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      {/* Modal body */}
      <div className="p-4 md:p-5 space-y-4 bg-slate-200 overflow-y-auto max-h-[70vh]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((product) => (
              <tr
                key={product.product.id}
                className="bg-slate-100 border dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-12 sm:w-16 md:w-24 lg:w-32 max-w-full max-h-full"
                    alt="Product"
                  />
                </td>
                <td className="px-4 sm:px-6 md:px-12 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-4 sm:px-6 md:px-12 py-4 font-semibold text-gray-900 dark:text-white">
                  <span>{product.count}</span>
                </td>
                <td className="px-4 sm:px-6 md:px-12 py-4 font-semibold text-gray-900 dark:text-white">
                  ${product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  </div>
  
  );
}
