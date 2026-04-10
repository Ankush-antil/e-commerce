import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import '../style/ProductItem.css'

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext)
  const imageUrl = images && images.length > 0 ? images[0].url : ''

  return (
    <Link
      className="product-item"
      to={`/product/${id}`}
    >
      <div className="product-img-wrapper">
        <img
          className="product-img"
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="product-item-content">
        <p className="product-name">{name}</p>
        <p className="product-price">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem