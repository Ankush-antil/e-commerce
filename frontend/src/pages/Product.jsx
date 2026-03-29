import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import ShareModal from "../components/ShareModal";
import "../style/Product.css";
import  {toast}  from "react-toastify";
  const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart , navigate, setCheckoutItems, cartItems, token, userId, userName, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [mainImage, setMainImage] = useState("");
  const [size, setSize] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Check if product is already in cart
  useEffect(() => {
    if (productData && cartItems) {
      const isInCart = cartItems.some(
        item => item.productId === productData._id
      );
      setIsAddedToCart(isInCart);
    }
  }, [cartItems, productData]);
  
  // Load reviews from backend API
  useEffect(() => {
    async function fetchReviews() {
      if (!productId) return;
      try {
        const response = await axios.get(`${backendUrl}/product/${productId}/reviews`);
        if (response.status === 200 && response.data?.data) {
          const fetchedReviews = response.data.data;
          setReviews(fetchedReviews);
          if (fetchedReviews.length > 0) {
            const avg = fetchedReviews.reduce((sum, review) => sum + review.rating, 0) / fetchedReviews.length;
            setAverageRating(avg);
          } else {
            setAverageRating(0);
          }
        }
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    }

    fetchReviews();
  }, [productId]);

const handleBuyNow = () => {

  if(!size){
   toast.error("Product size is not selected")
    return
  }

  const item = [{
    productId: productData._id,
    size: size,
    quantity: 1
  }]

  setCheckoutItems(item)

  navigate("/place-order")
}

const handleAddToCart = () => {
  if(!size){
    toast.error("Product size is not selected")
    return
  }

  if(isAddedToCart){
    navigate("/cart")
    return
  }

  addToCart(productData._id, size)
  setIsAddedToCart(true)
  toast.success("Added to cart!")
}

const handleReviewClick = (rating) => {
  if (!token || !userId) {
    navigate("/login");
    return;
  }
  setUserRating(rating);
  setShowReviewForm(true);
}

const handleSubmitReview = async () => {
  if (!token || !userId) {
    navigate("/login");
    return;
  }

  if (userRating === 0) {
    toast.error("Please select a rating");
    return;
  }

  if (reviewText.trim() === "") {
    toast.error("Please write a review");
    return;
  }

  try {
    const response = await axios.post(
      `${backendUrl}/product/${productId}/add-review`,
      { rating: userRating, text: reviewText },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );

    if (response.status === 200) {
      const updatedReviews = response.data.data;
      setReviews(updatedReviews);
      const avg = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
      setAverageRating(avg);
      setUserRating(0);
      setReviewText("");
      setShowReviewForm(false);
      toast.success("Review submitted successfully!");
    } else {
      toast.error(response.data.message || "Failed to submit review");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to submit review");
  }

}

const handleDeleteReview = async (reviewId) => {
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const response = await axios.delete(
      `${backendUrl}/product/${productId}/review/${reviewId}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    if (response.status === 200) {
      const updatedReviews = response.data.data;
      setReviews(updatedReviews);
      const avg = updatedReviews.length
        ? updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length
        : 0;
      setAverageRating(avg);
      toast.success("Review deleted successfully");
    } else {
      toast.error(response.data.message || "Failed to delete review");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete review");
  }
};

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setMainImage(product.images[0].url);
    }
    // Ensure description tab is active when navigating to a new product
    setActiveTab("description");
  }, [productId, products]);

  if (!productData) return <div className="product-hidden">No product found</div>;

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="product-images">
          <div className="thumbnail-list">
            {productData?.images?.map((item, index) => (
              <img
                key={index}
                src={item?.url || item}
                alt=""
                className="thumbnail"
                onClick={() => setMainImage(item?.url || item)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImage} alt="" />
          </div>
        </div>

        <div className="product-info">
          <h1>{productData.name}</h1>

          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <img 
                key={star}
                src={star <= Math.floor(averageRating) ? assets.star_icon : assets.star_dull_icon} 
                alt="" 
              />
            ))}
            <span>({reviews.length})</span>
          </div>

          <p className="price">
            {currency}
            {productData.price}
          </p>

          <p className="description">{productData.description}</p>

          <div className="size-section">
            <p>Select Size</p>
            <div className="sizes">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`size-btn ${item === size ? "active" : ""}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

         <div className="product-buttons">
            <button
              className="product-btn add-cart-btn"
              onClick={handleAddToCart}
            >
              {isAddedToCart ? "GO TO CART" : "ADD TO CART"}
            </button>

            <button
              className="product-btn buy-now-btn"
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>

            <button
              className="product-btn share-btn"
              onClick={() => setShowShareModal(true)}
              title="Share this product"
            >
              SHARE
            </button>
          </div>

          <hr />

          <div className="policy-text">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>


      <div className="product-desc-section">
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {activeTab === "description" && (
          <div className="desc-box">
            <p>{productData.description}</p>
            {productData.description && (
              <p>
                {productData.description} is a versatile product that combines quality with affordability. 
                It is designed for comfort and durability, making it an excellent choice for everyday use.
              </p>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <div className="reviews-header">
              <div className="rating-summary">
                <div className="average-rating">
                  <div className="rating-value">
                    <h3>{averageRating.toFixed(1)}</h3>
                    <span className="rating-label">out of 5</span>
                  </div>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className="star"
                        onClick={() => handleReviewClick(star)}
                        title={`Click to rate ${star} stars`}
                      >
                        {star <= Math.floor(averageRating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <p className="review-count">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} total</p>
                </div>
              </div>
            </div>

            {!showReviewForm && (
              <button 
                className="write-review-btn"
                onClick={() => {
                  if (!token || !userId) {
                    navigate("/login");
                    return;
                  }
                  setShowReviewForm(true);
                }}
              >
                Write a Review
              </button>
            )}

            {showReviewForm && (
              <div className="review-form">
                <h4>Share your experience</h4>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star-input ${star <= (hoverRating || userRating) ? 'active' : ''}`}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea
                    placeholder="Share your thoughts about this product..."
                    rows="5"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <div className="form-buttons">
                  <button className="submit-btn" onClick={handleSubmitReview}>
                    Submit Review
                  </button>
                  <button className="cancel-btn" onClick={() => setShowReviewForm(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.slice(0, visibleReviews).map((review) => {
                  const reviewOwner = review.userId?.toString() || "";
                  const currentUser = userId?.toString() || "";
                  const isAdmin = localStorage.getItem("isAdmin") === "true";
                  const canDelete = isAdmin || (reviewOwner && currentUser && reviewOwner === currentUser);
                     
                  return (
                    
                    <div key={review._id || review.id} className="review-item">
                      <div className="review-header">
                        <div>
                          <h5>{review.userName || "Unknown"}</h5>
                          <div className="review-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} className={star <= review.rating ? 'filled' : ''}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="review-date">{new Date(review.date).toLocaleString()}</span>
                      </div>
                      <p className="review-text">{review.text}</p>
                      {canDelete && (
                        <button
                          className="delete-review-btn"
                          onClick={() => handleDeleteReview(review._id || review.id)}
                        >
                          ✕
                        </button>
                      )}

                    </div>
                    
                  )
                })
                
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
              )}
              {visibleReviews < reviews.length && (
                         <button
                        className="see-more-btn"
                          onClick={() => setVisibleReviews(prev => prev + 5)}
                                 >
                            See More
                            </button>
                                   )}
            </div>
          </div>
        )}
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        productId={productData._id}
      />

      {showShareModal && (
        <ShareModal 
          productName={productData.name}
          productId={productData._id}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Product;