import '../style/Policies.css';
import { assets } from '../assets/assets';

const ReturnsPolicy = () => {
  return (
    <div className="policies-container">
      <div className="policy-header">
        <h1>7 Days Returns Policy</h1>
        <p>We stand behind our products and want you to be completely satisfied</p>
      </div>

      <div className="policy-content">
        <div className="policy-card">
          <div className="card-icon">📦</div>
          <h2>Easy Returns Process</h2>
          <p>
            We offer hassle-free returns for all products within 7 days of purchase. 
            If you're not completely satisfied with your purchase, simply initiate a return 
            and we'll handle the rest.
          </p>
        </div>

        <div className="policy-section">
          <h2>Return Eligibility</h2>
          <div className="section-content">
            <ul className="policy-list">
              <li>Product must be returned within 7 days of delivery</li>
              <li>Item should be in original, unworn condition with all tags attached</li>
              <li>Complete packaging and all original contents must be included</li>
              <li>Invoice/receipt must be provided with the return</li>
              <li>No signs of wear, damage, or alterations</li>
              <li>Personalized or customized items cannot be returned</li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>How to Return an Item</h2>
          <div className="section-content">
            <ol className="policy-steps">
              <li>
                <strong>Initiate Return:</strong> Log into your account and go to "Orders" section
              </li>
              <li>
                <strong>Select Item:</strong> Choose the item you wish to return and reason for return
              </li>
              <li>
                <strong>Get Pickup:</strong> We'll arrange free pickup from your home/office
              </li>
              <li>
                <strong>Track Status:</strong> Monitor your return status in real-time
              </li>
              <li>
                <strong>Receive Refund:</strong> Get refund within 5-7 days of return receipt
              </li>
            </ol>
          </div>
        </div>

        <div className="policy-cards-row">
          <div className="small-card">
            <div className="card-icon">✓</div>
            <h3>Free Return Shipping</h3>
            <p>We provide free pickup and return shipping for all eligible returns</p>
          </div>

          <div className="small-card">
            <div className="card-icon">⏰</div>
            <h3>Quick Process</h3>
            <p>Your refund will be processed within 5-7 business days of receiving the item</p>
          </div>

          <div className="small-card">
            <div className="card-icon">🔄</div>
            <h3>Multiple Returns</h3>
            <p>Need to return multiple items? No problem, process them all together</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>Non-Returnable Items</h2>
          <div className="section-content">
            <p>The following items cannot be returned:</p>
            <ul className="policy-list">
              <li>Underwear and innerwear (for hygiene reasons)</li>
              <li>Items purchased on clearance/final sale</li>
              <li>Items damaged due to misuse or neglect</li>
              <li>Swimwear if tried on or worn</li>
              <li>Items without original tags or packaging</li>
              <li>Items returned after 7 days from delivery</li>
            </ul>
          </div>
        </div>

        <div className="policy-section">
          <h2>Refund Information</h2>
          <div className="section-content">
            <p>
              Once we receive your return, we'll inspect the item and process your refund. 
              Refunds are issued to the original payment method used during purchase. 
              Shipping charges are non-refundable unless the return is due to our error.
            </p>
            <div className="info-box">
              <strong>Processing Time:</strong> 5-7 business days after receipt
            </div>
          </div>
        </div>

        <div className="policy-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>Can I return an item without a receipt?</h3>
            <p>We recommend keeping your receipt, but you can still return items if you have your order number or account information.</p>
          </div>
          <div className="faq-item">
            <h3>What if the product is damaged?</h3>
            <p>If you receive a damaged product, contact us immediately. We'll arrange a replacement or refund without any charges.</p>
          </div>
          <div className="faq-item">
            <h3>Can I return in-store?</h3>
            <p>Yes! You can return items at any of our physical store locations within 7 days with your receipt.</p>
          </div>
          <div className="faq-item">
            <h3>Do I pay for return shipping?</h3>
            <p>No! We provide free pickup from your address for all returns. You don't need to pay anything.</p>
          </div>
        </div>

        <div className="policy-contact">
          <h2>Need Help?</h2>
          <p>If you have any questions about our returns policy, our customer service team is here to help!</p>
          <div className="contact-options">
            <div className="contact-item">
              <strong>📧 Email:</strong> support@ecommerce.com
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

export default ReturnsPolicy;
