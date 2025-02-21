import React, { useContext } from 'react'
import { useState , useEffect } from 'react'
import styles from './RelatedProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../shared/ProductItem/ProductItem'
import { cartContext } from '../../../../context/cartContext'
import { toast } from 'react-toastify'

export default function RelatedProducts(props) {

  const [count,setCount] = useState(0)

  const [RelatedProducts,setRelatedProducts] = useState([])
   const { addToCart } = useContext(cartContext);

  let {categoryId} = props

  console.log(categoryId, "categoryId");
  
  function getProducts (){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=> {
      //  console.log(data.data); 
      let res = data.data.filter(product => product.category._id == categoryId);
      console.log(res);
      setRelatedProducts(res)
       
      })
      .catch(err => {
       console.log(err);
       
      })
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
    getProducts()
  },[])

  return (
    <div className="container px-9">
          <div className='main-layout mb-8 w-full'>
          {RelatedProducts.map(product =><ProductItem key={product.id} addProduct={addProduct} product={product} />)}
      
          
        </div>
        </div>
  )
}
