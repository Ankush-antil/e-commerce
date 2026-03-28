import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../style/OurPolicy.css'

const OurPolicy = () => {
  const navigate = useNavigate()

  return (
    <div className='policy-container'>
        <div className='policy-item' onClick={() => navigate('/returns-policy')}>
            <img src={assets.quality_icon}  className='policy-icon' alt='Return Policy'/>
            <p className='policy-title'>7 Days Return Policy</p>
            <p className='policy-desc'>We provide 7 days free return policy</p>
        </div>

        <div className='policy-item' onClick={() => navigate('/exchange-policy')}>
            <img src={assets.exchange_icon}  className='policy-icon' alt='Exchange Policy'/>
            <p className='policy-title'>Easy Exchange Policy</p>
            <p className='policy-desc'>We offer hassle free exchange policy</p>
        </div>

        <div className='policy-item' onClick={() => navigate('/support-policy')}>
            <img src={assets.support_img}  className='policy-icon' alt='Support Policy'/>
            <p className='policy-title'>24/7 Support</p>
            <p className='policy-desc'>We provide 24/7 customer support</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
