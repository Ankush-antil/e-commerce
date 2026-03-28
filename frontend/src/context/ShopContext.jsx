import { createContext } from 'react'
import { useEffect } from 'react';
export const ShopContext = createContext()
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
//import { products } from '../assets/assets';
import axios from 'axios';
 const backendUrl = import.meta.env.VITE_BACKEND_URL

export default function ShopContextProvider({ children }) {
  const userId = localStorage.getItem("userId") || ""
    const [ products, setProducts ] = useState([])
    const [checkoutItems, setCheckoutItems] = useState([])
    const currency = "₹";
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const [ showSearch, setShowSearch ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]) 
    const [ token, setToken ] = useState(localStorage.getItem("token") || "")
   
       async function addToCart(productId, size){
         if(!token || !userId){
            navigate("/login")
            return
        }
        
        if(!size){
            toast.error("Product size is not selected")
            return
        }

       let cartData = Array.isArray(cartItems) ? [...cartItems] : []
        const index = cartData.findIndex(item => item.productId === productId && item.size === size)
        
        if(index !== -1){
            cartData[index] = { ...cartData[index], quantity: cartData[index].quantity + 1}
        }
        else {
            cartData.push({productId, size, quantity: 1})
        }
        setCartItems(cartData) 

        const response = await axios.post(
        `${backendUrl}/add-to-cart`,
        { userId, productId, size },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
     if (response.status === 200){
        toast.success("product added to cart")
     } else{
        toast.error("not added to cart")
     }

    }


    function getCartCount(){
        let totalCount = 0

        for (let i = 0; i < cartItems.length; i++) {
        totalCount += cartItems[i].quantity
        }

        return totalCount
    }


   async function updateQuantity(productId, size, quantity){
        if(quantity < 0){
            return
        }

        let cartCopy = [...cartItems]
        const index = cartCopy.findIndex(item => item.productId === productId && item.size === size)

        if(index !== -1){
            if(quantity > 0) {
              cartCopy[index] = { ...cartCopy[index], quantity: quantity }
            } 
            else cartCopy.splice(index, 1)
        }

        setCartItems(cartCopy)

        const response = await axios.post(
        `${backendUrl}/update-cart`,
        { userId, productId, size, quantity },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }
    );
      if (response.status === 200){
        toast.success("product update to cart")
     } else{
        toast.error("not update to cart")
     }


    }


    function getCartAmount() {
        let totalAmount = 0

        cartItems.forEach((cartItem) => {
        const product = products.find((p) => p._id === cartItem.productId)

        if (product) {
            totalAmount += product.price * cartItem.quantity
        }
        })

        return totalAmount
    }

      async function fetchProducts(){
         try {
            const response = await axios.get(`${backendUrl}/list-product`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
            })
            const result = response.data
            if(response.status===200){
               console.log(result)
               setProducts(result.data) 
            }
            else {
               toast.error(result.message)
            }
        }
        catch(error){
                console.log(error)
            }
      }

    async function getUserCart() {
        try {
            const response = await axios.post(
                `${backendUrl}/get-cart`,
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                }
            );

            if (response.data && response.data.cart) {
                setCartItems(response.data.cart);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

  

    useEffect(()=>{
      fetchProducts()
    },[])

    const value = { 
        currency, delivery_fee, products, navigate, 
        search, showSearch, setSearch, setShowSearch, 
        addToCart, getCartCount, cartItems, 
        updateQuantity, getCartAmount , token , setToken, backendUrl ,setCartItems,checkoutItems,
setCheckoutItems, userId
    };

    return(
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}