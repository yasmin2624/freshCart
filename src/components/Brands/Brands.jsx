import React from 'react'
import { useState , useEffect } from 'react'
import styles from './Brands.module.css'
import axios from 'axios';
import Loader from '../shared/Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col mb-20 px-3 sm:px-5 md:px-10 lg:px-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-main my-5">All Brands</h1>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {brands.map((brand) => (
            <div 
              key={brand._id} 
              className="border product p-6 rounded flex flex-col items-center w-72 sm:w-80 md:w-64 lg:w-60 mx-auto cursor-pointer"
              onClick={() => setSelectedBrand(brand)} // ✅ يفتح المودال عند الضغط
            >
              <img src={brand.image} alt={brand.name} className="w-32 sm:w-36 md:w-40 lg:w-48 h-auto" />
              <h2 className="text-center text-lg sm:text-xl mt-2">{brand.name}</h2>
            </div>
          ))}
        </div>
      )}

      {/* ✅ المودال */}
      {selectedBrand && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50 p-3 sm:p-5">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 max-w-sm sm:max-w-md md:max-w-lg w-full">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-main">{selectedBrand.name}</h3>
              <button onClick={() => setSelectedBrand(null)} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4">
              <p className="text-gray-500 text-sm sm:text-base">{selectedBrand.name.toLowerCase()}</p>
              <img src={selectedBrand.image} alt={selectedBrand.name} className="w-24 sm:w-32 md:w-40 h-auto mt-3 sm:mt-0" />
            </div>
            <div className="text-right">
              <button onClick={() => setSelectedBrand(null)} className="bg-main text-white px-3 py-1 sm:px-4 sm:py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
