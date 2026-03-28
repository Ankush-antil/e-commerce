import '../style/Policies.css';
import { assets } from '../assets/assets';

const ExchangePolicy = () => {
  return (
    <div className="policies-container">
      <div className="policy-header">
        <h1>Easy Exchange Policy</h1>
        <p>Swap your product quickly and effortlessly at zero extra cost</p>
      </div>

      <div className="policy-content">
        <div className="policy-card">
          <div className="card-icon">🔄</div>
          <h2>Hassle-Free Exchanges</h2>
          <p>
            Not happy with the color, size, or style? Exchange it for another product 
            absolutely free! We make it simple to get exactly what you want.
          </p>
        </div>

        <div className="policy-section">
          <h2>Exchange Eligibility</h2>
          <div className="section-content">
            <ul className="policy-list">
              <li>Product must be exchanged within 7 days of delivery</li>
              <li>Item should be in original, unworn condition with all tags attached</li>
              <li>No signs of wear, damage, washing, or alterations</li>
              <li>All original packaging and contents must be included</li>
              <li>Invoice/order confirmation must be provided</li>
              <li>Can exchange for same product in different size/color/design</li>
              <li>Can exchange for any other product of equal or greater value</li>
            </ul>
          </div>
        </div>

        <div className="policy-cards-row">
          <div className="small-card">
            <div className="card-icon">💰</div>
            <h3>Same Price Guarantee</h3>
            <p>Exchange for any product of the same or higher value</p>
          </div>

          <div className="small-card">
            <div className="card-icon">🚚</div>
            <h3>Free Shipping Both Ways</h3>
            <p>We handle pickup and delivery of your exchange at no cost</p>
          </div>

          <div className="small-card">
            <div className="card-icon">⚡</div>
            <h3>Fast Processing</h3>
            <p>Receive your exchanged item within 3-5 business days</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>How to Exchange</h2>
          <div className="section-content">
            <ol className="policy-steps">
              <li>
                <strong>Choose Product:</strong> Browse and select the product you want to exchange for
              </li>
              <li>
                <strong>Initiate Exchange:</strong> Go to your "Orders" and request exchange for the original item
              </li>
              <li>
                <strong>Free Pickup:</strong> We'll arrange free pickup of the original product from your location
              </li>
              <li>
                <strong>Quality Check:</strong> We inspect the returned item to ensure it meets exchange criteria
              </li>
              <li>
                <strong>Ship New Item:</strong> Once approved, your new product is dispatched immediately
              </li>
              <li>
                <strong>Delivery:</strong> Receive your new item with free shipping
              </li>
            </ol>
          </div>
        </div>

        <div className="policy-section">
          <h2>Size & Fit Exchange</h2>
          <div className="section-content">
            <p>
              Got the wrong size? No worries! We offer unlimited size exchanges to ensure 
              perfect fit. Our team can help you find the right size based on our fit guide 
              and customer reviews.
            </p>
            <div className="info-box">
              <strong>Quick Tip:</strong> Check our detailed size guide before ordering to get the perfect fit the first time!
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>Exchange for Different Product</h2>
          <div className="section-content">
            <p>
              Want to exchange your item for a completely different product? You can do that! 
              If the new product costs more, you'll only pay the difference. If it costs less, 
              the balance is yours to use as store credit.
            </p>
            <ul className="policy-list">
              <li>No shipping charges on either product</li>
              <li>Choose from our entire catalog</li>
              <li>Get instant store credit for price differences</li>
              <li>No expiration on store credit</li>
            </ul>
          </div>
        </div>

        <div className="policy-cards-row">
          <div className="small-card">
            <div className="card-icon">✨</div>
            <h3>Color Variants</h3>
            <p>Exchange for the same product in different colors</p>
          </div>

          <div className="small-card">
            <div className="card-icon">📏</div>
            <h3>Size Options</h3>
            <p>Get the perfect fit with free size exchanges</p>
          </div>

          <div className="small-card">
            <div className="card-icon">🎁</div>
            <h3>Different Products</h3>
            <p>Exchange for any other item in our store</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>What Cannot Be Exchanged</h2>
          <div className="section-content">
            <ul className="policy-list">
              <li>Items purchased on clearance or final sale</li>
              <li>Underwear and intimate apparel (for hygiene reasons)</li>
              <li>Items with visible wear, stains, or damage</li>
              <li>Swimwear if worn or tried on</li>
              <li>Items without original tags or packaging</li>
              <li>Products exchanged after 7 days from delivery</li>
              <li>Gift card purchases</li>
            </ul>
          </div>
        </div>

        <div className="policy-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>How long does the exchange process take?</h3>
            <p>Once we receive and inspect your item, we'll ship the new product within 1-2 business days. Total delivery time is 3-5 business days.</p>
          </div>
          <div className="faq-item">
            <h3>Can I exchange multiple items at once?</h3>
            <p>Absolutely! Process multiple exchanges together and receive all items in one convenient shipment.</p>
          </div>
          <div className="faq-item">
            <h3>What if the exchanged item is out of stock?</h3>
            <p>If your chosen product is out of stock, we'll notify you and help you select an alternative or process a refund.</p>
          </div>
          <div className="faq-item">
            <h3>Do I need to pay anything?</h3>
            <p>No! All exchanges are completely free including shipping, pickup, and delivery.</p>
          </div>
          <div className="faq-item">
            <h3>Can I exchange online and pick up in-store?</h3>
            <p>Yes! You can return the original item at any of our physical locations and pick up the exchanged item there.</p>
          </div>
        </div>

        <div className="policy-contact">
          <h2>Need Assistance?</h2>
          <p>Our exchange experts are ready to help you find the perfect product!</p>
          <div className="contact-options">
            <div className="contact-item">
              <strong>📧 Email:</strong> exchange@ecommerce.com
            </div>
            <div className="contact-item">
              <strong>📞 Phone:</strong> 1-800-123-4567
            </div>
            <div className="contact-item">
              <strong>💬 Chat:</strong> Available 24/7 on our website
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangePolicy;
