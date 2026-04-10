import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import '../style/Reviews.css'

const Reviews = ({ token }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showReviewsModal, setShowReviewsModal] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/list-product`)
      if (response.status === 200) {
        setProducts(response.data.data || [])
      } else {
        toast.error(response.data.message || 'Failed to fetch products')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const seedReviews = async (productId) => {
    if (!token) {
      toast.error('Admin token missing')
      return
    }
    try {
      const response = await axios.post(
        `${backendUrl}/product/${productId}/seed-reviews`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 200) {
        toast.success('20 demo reviews added for product')
        fetchProducts()
      } else {
        toast.error(response.data.message || 'Failed to seed reviews')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error('Seed error:', error)
    }
  }

  const deleteReview = async (productId, reviewId) => {
    if (!token) {
      toast.error('Admin token missing')
      return
    }
    try {
      const response = await axios.delete(
        `${backendUrl}/product/${productId}/review/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 200) {
        toast.success('Review deleted successfully')
        fetchProducts()
      } else {
        toast.error(response.data.message || 'Failed to delete review')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error('Delete error:', error)
    }
  }

  const seedAllProductsReviews = async () => {
    if (!token) {
      toast.error('Admin token missing')
      return
    }
    try {
      const response = await axios.post(
        `${backendUrl}/seed-all-reviews`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.status === 200) {
        toast.success(response.data.message || 'Demo reviews seeded for all products')
        fetchProducts()
      } else {
        toast.error(response.data.message || 'Failed to seed all reviews')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error('Seed all error:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0)
    return (total / reviews.length).toFixed(1)
  }

  if (loading) return <p>Loading reviews...</p>

  return (
    <div className="reviews">
      <div className="reviews-container">
        <div className="reviews-header">
          <p className="reviews-title">Product Reviews Management</p>
          <button className="submit-btn seed-all-btn" onClick={seedAllProductsReviews}>
            Seed All Products
          </button>
        </div>

        {products.length === 0 && <p>No products found</p>}

        <div className="reviews-list-container">
          <div className="reviews-table-header">
            <span>Image</span>
            <span>Product</span>
            <span>Category</span>
            <span>Reviews</span>
            <span>Avg Rating</span>
            <span>Actions</span>
          </div>
          {products.map((product) => (
            <div key={product._id} className="reviews-table-row">
              <img
                src={product.images?.[0]?.url || product.images?.[0]}
                alt={product.name}
                className="review-img"
              />
              <span className="review-product-name" data-label="Product">{product.name}</span>
              <span data-label="Category">{product.category}</span>
              <span className="review-stat" data-label="Reviews">{product.reviews?.length || 0}</span>
              <span className="review-stat" data-label="Avg Rating">{getAverageRating(product.reviews)}</span>
              <div className="actions">
                <button
                  className="submit-btn"
                  onClick={() => seedReviews(product._id)}
                >
                  Seed 20
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setSelectedProduct(product)
                    setShowReviewsModal(true)
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Modal */}
      {showReviewsModal && selectedProduct && (
        <div className="reviews-modal-overlay">
          <div className="reviews-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Reviews for {selectedProduct.name}</h3>
              <button 
                onClick={() => setShowReviewsModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: 0 }}
              >
                ✕
              </button>
            </div>

            {selectedProduct.reviews && selectedProduct.reviews.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedProduct.reviews.map((review, idx) => (
                  <div key={idx} className="review-item">
                    <button
                      onClick={() => {
                        deleteReview(selectedProduct._id, review._id)
                        setSelectedProduct(prev => ({
                          ...prev,
                          reviews: prev.reviews.filter((_, i) => i !== idx)
                        }))
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        fontSize: '18px',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Delete review"
                    >
                      ✕
                    </button>
                    <div className="review-header-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingRight: '24px' }}>
                      <span style={{ fontWeight: 600 }}>{review.userName}</span>
                      <span style={{ color: '#666', fontSize: '12px' }}>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ color: '#ff9800', fontSize: '14px' }}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                      <span style={{ marginLeft: '8px', color: '#666' }}>({review.rating}/5)</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '24px' }}>No reviews yet</p>
            )}

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button 
                onClick={() => setShowReviewsModal(false)}
                className="cancel-btn"
                style={{ padding: '8px 16px' }}
              >
                Close
              </button>
              <button 
                onClick={() => {
                  seedReviews(selectedProduct._id)
                  setShowReviewsModal(false)
                }}
                className="submit-btn"
                style={{ padding: '8px 16px' }}
              >
                Seed 20
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reviews
