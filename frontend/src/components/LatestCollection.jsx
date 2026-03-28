import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import '../style/LatestCollection.css'

const LatestCollection = () => {

  const [latestProducts, setLatestProducts] = useState([])
  const { products } = useContext(ShopContext)

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <div>
      <Title text1="LATEST" text2="COLLECTION" />
      <div className="product-grid">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            images={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
