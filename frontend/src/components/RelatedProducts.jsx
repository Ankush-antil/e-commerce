import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'
import '../style//RelatedProducts.css';

const RelatedProducts = ({ category, subCategory, productId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = [...products];
      productsCopy = productsCopy.filter((item) => item._id !== productId);

      productsCopy = productsCopy.filter((item) => item.category === category);

      productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="related-container">
      <div className="related-title">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="related-grid">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            images={item.images}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;