import React from "react";
import { assets } from "../assets/assets";
import "../style/Hero.css";

const Hero = () => {
  return (
  
    <div className="hero">
      <div className="hero-left">
        <div className="hero-text">
          <div className="hero-line">
            <span className="line"></span>
            <p>OUR BESTSELLERS</p>
          </div>

          <h1>Latest Arrivals</h1>

          <div className="hero-line">
            <p className="shop-now">SHOP NOW</p>
            <span className="line thin"></span>
          </div>
        </div>
      </div>

      <img className="hero-image" src={assets.hero_img} alt="Hero" />
    </div>
  );
};

export default Hero;