import React, { useContext } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import '../style/Contact.css';
import { ShopContext } from '../context/ShopContext';

const Contact = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <div className="contact-container">

      <div className="contact-title">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="contact-content">
        <img
          src={assets.contact_img}
          alt="Contact"
          className="contact-image"
        />

        <div className="contact-text">
          <p className="contact-heading">Our Store</p>

          <p className="contact-info">
            Ganaur <br />
            Haryana, India-132103
          </p>

          <p className="contact-info">
            Tel: +91 8168535428 <br />
            Email: Ankushantil@7036gmail.com
          </p>
           <div className='btn-container'>
          <button className="contact-btn" onClick={()=>{
            window.open("https://www.linkedin.com/in/ankush-antil-66b7a4398?utm")
          }}>
            Linkedin
          </button>
          <button className="contact-btn" onClick={()=>{
            window.open("https://github.com/Ankush-antil")
          }}>
            GitHub
          </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;