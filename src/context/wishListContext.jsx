import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";



export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useContext(tokenContext);
  const [isLoading, setIsLoading] = useState(false);
  const URL = "https://ecommerce.routemisr.com/api/v1/wishlist";





  async function getWishList() {
    try {
      setIsLoading(true); 
      const { data } = await axios.get(URL, { headers: { token } });
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false); 
    }
  }

  async function addToWishlist(productId) {
    try {
        const { data } = await axios.post(URL, { productId }, { headers: { token } });
        if (data.status === "success") {
          getWishList()
          toast.success("Product added to wish List successfully!");
        }
        console.log(data.data);
        
        return data;
      } catch (error) {
        toast.error("Something went wrong, please try again.");
        console.error("Error adding product to wish list:", error);
      }
  
  }
 

  async function RemoveProduct(id) {
    try {
      const { data } = await axios.delete(`${URL}/${id}`, { headers: { token } });
      if (data.status === "success") {
        setWishlist((product) => product.filter((item) => item._id !== id)); 
        toast.success("Product removed from wishlist!");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  }

  useEffect(() => {
    if (token) {
      getWishList();
    }
  }, [token]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist,RemoveProduct,getWishList,isLoading}}>
      {children}
    </WishlistContext.Provider>
  );
}