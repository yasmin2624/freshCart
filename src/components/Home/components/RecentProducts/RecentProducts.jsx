import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'
import Loader from '../../../shared/Loader/Loader'
import { cartContext } from '../../../../context/cartContext'
import { toast } from 'react-toastify'

export default function RecentProducts() {

  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(cartContext);

  async function getProducts() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    
   {products.length != 0 &&  <div className='main-layout m-8'>
    
      {products.map(product =><ProductItem key={product.id} addProduct={addProduct} product={product} />)}

    </div>}
    {products.length == 0 && <Loader/>}
    </>
  )
}
