import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import '../style/ProductItem.css'

const ProductItem = ({ id, images , name, price }) => {

  const { currency } = useContext(ShopContext)
  
  
  return (

    

    <Link
      className="product-item"
      to={`/product/${id}`}
    >
  
      <div className="product-img-wrapper">
        <img
          className="product-img"
          src={images[0].url} 
          alt={name}
        />
      </div>
       
      <p className="product-name">{name}</p>
      <p className="product-price">
        {currency}{price}
      </p>
    </Link>
  )
}

export default ProductItem