import { useContext, useState, useEffect, createContext } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartId, setCartId] = useState('');
  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(tokenContext);
  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers: { token } });
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        await getCart();
      }
      return data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  async function getCart() {
    try {
      const { data } = await axios.get(API_URL, { headers: { token } });
      console.log("Data from API (cart):", data);
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
      }
      setCartId(data.cartId);
      setCartDetails(data);
      
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function RemoveProduct(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`, { headers: { token } });
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        await getCart();
      }
      setCartDetails(data);
      return data;
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  }

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, { count }, { headers: { token } });
      if (data.status === "success") {
        setCartCount(data.numOfCartItems);
        await getCart();
      }
      setCartDetails(data);
      return data;
    } catch (error) {
      console.error("Error updating cart item count:", error);
    }
  }

  async function cashOnDelievry(shippingAddress) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, { shippingAddress }, { headers: { token } });
      if (data.status === "success") {
        await getCart();
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function onLinePayment(shippingAddress) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://fresh-cart-ten-pearl.vercel.app/`, { shippingAddress }, { headers: { token } });
      if (data.status === "success") {
        await getCart();
      }
      return data;
    } catch (error) {
      console.error("Error placing order:", error);
    }
  } 

  async function getUserOrders() {
    try {
      if (!token) {
        console.error("Token is missing!");
        return;
      }
  
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/orders", {
        headers: {
          token: token,
        },
      });
  
      console.log("Orders fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
    }
  }
  
  
async function clearCart() {
  try {
    setIsLoading(true);
    const { data } = await axios.delete(API_URL, { headers: { token } });

    if (data.message === "success") {
      setCartCount(0);   
      setCartDetails({ data: { products: [] } }); 
      toast.success("Cart cleared successfully!");
    }
    return data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    toast.error("Failed to clear cart. Please try again.");
  } finally {
    setIsLoading(false); 
}}






useEffect(() => {
  console.log("Token in CartContext:", token);
  if (token) {
    getCart();
  }
}, [token]);



  return (
    <cartContext.Provider value={{
      cartCount,
      setCartCount,
      addToCart,
      getCart,
      cartDetails,
      setCartDetails,
      RemoveProduct,
      cashOnDelievry,
      updateCount,
      clearCart,
      isLoading,
      onLinePayment,
      getUserOrders
    }}>
      {children}
    </cartContext.Provider>
  );
}
