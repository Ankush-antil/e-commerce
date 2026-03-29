import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../config'
import { toast } from 'react-toastify'
import '../style/List.css'
import axios from 'axios'

const List = ({ token }) => {
  const [list, setList] = useState([])

  async function fetchProduct(){
     try {
      const response = await axios.get(
        `${backendUrl}/list-product`,
       
        {  headers: {
              "Content-Type": "application/json"
            }}

      )
        // const responses = await fetch(`${backendUrl}/api/v1/list-products`,
        //     {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        // })
        const result = response.data
        if(response.status===200){
           console.log(result)
           setList(result.data)
        }
        else {
            toast.error(result.message)
        }
    }
    catch(error){
            console.log(error)
        }
  }


  async function removeProduct(productId){
    try{
      const response = await axios.delete(`${backendUrl}/delete-product/${productId}`,
        {headers:{Authorization:`Bearer ${token}`}}
      )
    
      const result = response.data
      if(response.status===200){
        
        let listCopy = [...list]
        listCopy = listCopy.filter(item => item._id !== productId)
        setList(listCopy)
        toast.success(result.message)
      }
      else{
        toast.error(result.message)
      }     
  }
    catch(error){
      console.log(error)
    }
  }

  useEffect(function(){
    // eslint-disable-next-line react-hooks/set-state-in-effect
     fetchProduct()
  },[])


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
          <img className="product-img" src={item.images?.[0]?.url || item.images?.[0] || '/placeholder-image.png'} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p>{item.reviews?.length || 0}</p>
            <p
              className="remove-btn"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List