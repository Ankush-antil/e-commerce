import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'
import '../style/List.css'
import axios from 'axios'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editId, setEditId] = useState(null)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false)

  const [image0, setImage0] = useState(null)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `${backendUrl}/list-product`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const result = response.data
      if (response.status === 200) {
        setList(result.data)
      }
      else {
        toast.error(result.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async function removeProduct(productId) {
    try {
      const response = await axios.delete(`${backendUrl}/delete-product/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const result = response.data
      if (response.status === 200) {
        let listCopy = [...list]
        listCopy = listCopy.filter(item => item._id !== productId)
        setList(listCopy)
        toast.success(result.message)
      }
      else {
        toast.error(result.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  function resetEditForm() {
    setEditId(null)
    setName('')
    setPrice('')
    setDescription('')
    setCategory('')
    setSubCategory('')
    setSizes([])
    setBestSeller(false)
    setImage0(null)
    setImage1(null)
    setImage2(null)
    setImage3(null)
  }

  useEffect(function () {
    fetchProduct()
  }, [])

  const handleEdit = (item) => {
    setEditId(item._id)
    setName(item.name || '')
    setPrice(item.price || '')
    setDescription(item.description || '')
    setCategory(item.category || '')
    setSubCategory(item.subCategory || '')
    setSizes(item.sizes || [])
    setBestSeller(item.bestSeller || false)
    setImage0(null)
    setImage1(null)
    setImage2(null)
    setImage3(null)
  }

  const updateProduct = async () => {
    try {
      const formData = new FormData()

      const fields = {
        name,
        price,
        description,
        category,
        subCategory,
        bestSeller
      }

      Object.keys(fields).forEach((key) => {
        if (fields[key] !== '' && fields[key] !== null) {
          formData.append(key, fields[key])
        }
      })

      if (sizes && sizes.length > 0) {
        formData.append('sizes', JSON.stringify(sizes.map((item) => item.trim()).filter(Boolean)))
      }

      const images = [image0, image1, image2, image3]

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image_${index}`, img)
        }
      })

      const response = await axios.patch(
        `${backendUrl}/products/${editId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response.status === 200) {
        toast.success(response.data.message || 'Product updated successfully')
        fetchProduct()
        resetEditForm()
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Update failed')
    }
  }

  return (
    <>
      <p className="list-title">All Products List</p>

      <div className="list-wrapper">
        <div className="list-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Reviews</b>
          <b className="center">Action</b>
        </div>

        {list?.length === 0 && (
          <p className='not-found'>
            No products found!
          </p>
        )}

        {list.map((item, index) => (
          <div className="list-row" key={index}>
            <img className="product-img" src={item.images?.[0]?.url || item.images?.[0] || '/placeholder-image.png'} alt={item.name} />
            <p className="product-name-cell">{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p>{item.reviews?.length || 0}</p>
            <div className="list-actions">
              <button className="edit-btn" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeProduct(item._id)}
              >
                X
              </button>
            </div>
          </div>
        ))}

      </div>
      {editId && (
        <>
          <div className="edit-overlay" onClick={resetEditForm}></div>

          <div className="edit-form">
            <div className="edit-form-header">
              <div>
                <p className="edit-form-label">Editing Product</p>
                <h2 title={name}>{name || 'Untitled Product'}</h2>
              </div>
              <button type="button" className="close-icon-btn" onClick={resetEditForm}>
                ×
              </button>
            </div>

            <div className="edit-form-body">
              <label className="edit-field">
                <span>Product Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" />
              </label>

              <div className="edit-grid-two">
                <label className="edit-field">
                  <span>Price</span>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                </label>

                <label className="edit-field checkbox-field">
                  <span>Best Seller</span>
                  <div className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={bestSeller}
                      onChange={(e) => setBestSeller(e.target.checked)}
                    />
                    <p>Mark as bestseller</p>
                  </div>
                </label>
              </div>

              <label className="edit-field">
                <span>Description</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" rows="4" />
              </label>

              <div className="edit-grid-two">
                <label className="edit-field">
                  <span>Category</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </label>

                <label className="edit-field">
                  <span>Sub Category</span>
                  <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </label>
              </div>

              <label className="edit-field">
                <span>Sizes</span>
                <input
                  value={sizes.join(', ')}
                  onChange={(e) => setSizes(e.target.value.split(','))}
                  placeholder="S, M, L, XL"
                />
              </label>

              <div className="edit-field">
                <span>Replace Images</span>
                <div className="image-upload-grid">
                  <label className="file-field">
                    <span>Image 1</span>
                    <input type="file" accept="image/*" onChange={(e) => setImage0(e.target.files[0])} />
                  </label>
                  <label className="file-field">
                    <span>Image 2</span>
                    <input type="file" accept="image/*" onChange={(e) => setImage1(e.target.files[0])} />
                  </label>
                  <label className="file-field">
                    <span>Image 3</span>
                    <input type="file" accept="image/*" onChange={(e) => setImage2(e.target.files[0])} />
                  </label>
                  <label className="file-field">
                    <span>Image 4</span>
                    <input type="file" accept="image/*" onChange={(e) => setImage3(e.target.files[0])} />
                  </label>
                </div>
              </div>
            </div>

            <div className="edit-buttons">
              <button className="close-btn" onClick={resetEditForm}>
                Cancel
              </button>
              <button className="update-btn" onClick={updateProduct}>
                Update Product
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default List