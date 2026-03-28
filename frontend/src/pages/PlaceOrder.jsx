import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import '../style/PlaceOrder.css'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, checkoutItems, setCartItems, getCartAmount, delivery_fee } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })



  async function onSubmitHandler(e){
    e.preventDefault()
    if(!token){
      toast.error("Please login to place order")
      navigate('/login')
      return
    }
if(checkoutItems.length === 0){
  toast.error("No product selected")
  return
}
   

    if(method === 'cod'){
      if(!formData.email || !formData.street || !formData.city || !formData.state || !formData.zipcode || !formData.country || !formData.phone){
        toast.error("Please fill all the fields")
        return
      }

    try{
      const address = `${formData.street}, ${formData.city}, ${formData.state} - ${formData.zipcode}, ${formData.country}`
    const response = await axios.post(`${backendUrl}/placeOrderCOD`, {
    userId: localStorage.getItem("userId"),
    address,
    items: checkoutItems,
    amount: getCartAmount() + delivery_fee
  },{
    headers:{
      "Content-Type":"application/json",
      Authorization: token
    }
  })

  const result = response.data

  if(response.status === 200){
    toast.success("Order placed successfully")
    setCartItems([])
    navigate('/orders')
  }
  else{
    toast.error(result.message)
  }

}
catch(error){
  toast.error("Error placing order")
}}
  else if(method === 'razorpay'){
      toast.error("Razorpay payment method is currently unavailable. Please choose Cash on Delivery.")
  }

}

  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      <div className="left">
        <div className='heading'>
        <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <input name="email" placeholder="Email" value={formData.email} onChange={(e)=>{setFormData({...formData, email: e.target.value})}} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={(e)=>{setFormData({...formData, phone: e.target.value})}} />
        <input name="street" placeholder="Street" value={formData.street} onChange={(e)=>{setFormData({...formData, street: e.target.value})}} />

        <div className="row">
          <input name="city" placeholder="City" value={formData.city} onChange={(e)=>{setFormData({...formData, city: e.target.value})}} />
          <input name="state" placeholder="State" value={formData.state} onChange={(e)=>{setFormData({...formData, state: e.target.value})} } />
        </div>

        <div className="row">
          <input name="zipcode" placeholder="Zipcode" value={formData.zipcode} onChange={(e)=>{setFormData({...formData, zipcode: e.target.value})}} />
          <input name="country" placeholder="Country" value={formData.country} onChange={(e)=>{setFormData({...formData, country: e.target.value})}} />
        </div>

       </div>

      {/* RIGHT */}
      <div className="right">
        <CartTotal />

         <div className='heading-2'>
        <Title text1="PAYMENT" text2="METHOD" />
        </div>

        <div className="payment-methods">
          <div onClick={() => setMethod('razorpay')} className="payment-box">
            <span className={method === 'razorpay' ? 'active' : ''}></span>
            <img src={assets.razorpay_logo} alt="" />
          </div>

          <div onClick={() => setMethod('cod')} className="payment-box">
            <span className={method === 'cod' ? 'active' : ''}></span>
            <p>CASH ON DELIVERY</p>
          </div>
        </div>
         <div className="order-btn-container">
           <button className="order-btn">PLACE ORDER</button> 
         </div>
      </div>
    </form>
  )
}

export default PlaceOrder
