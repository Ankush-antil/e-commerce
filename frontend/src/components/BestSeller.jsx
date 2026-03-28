import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

import '../style/BestSeller.css'

const BestSeller = () => {

 const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
 
 useEffect(() => {
  const bestProduct = products.filter((item) => item.bestSeller)
  setBestSeller(bestProduct.slice(0, 5))
}, [products])

  return (
    <div className="bestSeller-container">
       <Title text1='BEST' text2='SELLERS' />
      <div className="bestSeller-grid">
        {
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              images={item.images}
              price={item.price}
            />
           
          ))
        }
        
      </div>
    </div>
  )

}
export default BestSeller;