import '../style/Policies.css';
import { assets } from '../assets/assets';

const SupportPolicy = () => {
  return (
    <div className="policies-container">
      <div className="policy-header">
        <h1>24/7 Customer Support</h1>
        <p>We're here to help you anytime, anywhere. Your satisfaction is our priority.</p>
      </div>

      <div className="policy-content">
        <div className="policy-card">
          <div className="card-icon">🎯</div>
          <h2>Always Available for You</h2>
          <p>
            Our dedicated customer service team is available round-the-clock to assist you 
            with any questions, concerns, or issues. We're committed to providing exceptional 
            support whenever you need us.
          </p>
        </div>

        <div className="policy-cards-row">
          <div className="small-card">
            <div className="card-icon">⚡</div>
            <h3>Quick Response</h3>
            <p>Get responses to your queries within 30 minutes</p>
          </div>

          <div className="small-card">
            <div className="card-icon">🌐</div>
            <h3>Multiple Channels</h3>
            <p>Chat, email, phone, and social media support</p>
          </div>

          <div className="small-card">
            <div className="card-icon">🎓</div>
            <h3>Expert Assistance</h3>
            <p>Trained professionals ready to solve any issue</p>
          </div>
        </div>

        <div className="policy-section">
          <h2>Contact Us Anytime</h2>
          <div className="section-content">
            <div className="contact-methods">
              <div className="contact-box">
                <div className="contact-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Instant messaging available 24/7</p>
                <p className="contact-detail">Response time: Immediate</p>
              </div>

              <div className="contact-box">
                <div className="contact-icon">📧</div>
                <h3>Email Support</h3>
                <p>support@ecommerce.com</p>
                <p className="contact-detail">Response time: Within 2 hours</p>
              </div>

              <div className="contact-box">
                <div className="contact-icon">📞</div>
                <h3>Phone Support</h3>
                <p>1-800-123-4567</p>
                <p className="contact-detail">Available 24/7 - Toll Free</p>
              </div>

              <div className="contact-box">
                <div className="contact-icon">📱</div>
                <h3>WhatsApp</h3>
                <p>+1-800-123-4567</p>
                <p className="contact-detail">Text anytime for quick replies</p>
              </div>

              <div className="contact-box">
                <div className="contact-icon">🐦</div>
                <h3>Social Media</h3>
                <p>@EcommerceSupport</p>
                <p className="contact-detail">Available on all platforms</p>
              </div>

              <div className="contact-box">
                <div className="contact-icon">🏪</div>
                <h3>In-Store Support</h3>
                <p>Visit any of our locations</p>
                <p className="contact-detail">Get face-to-face assistance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>How We Support You</h2>
          <div className="section-content">
            <ol className="policy-steps">
              <li>
                <strong>Order Tracking:</strong> Real-time updates on your order status and delivery
              </li>
              <li>
                <strong>Product Information:</strong> Detailed descriptions, sizing guides, and recommendations
              </li>
              <li>
                <strong>Payment Help:</strong> Assistance with payment methods and billing issues
              </li>
              <li>
                <strong>Returns & Exchanges:</strong> Dedicated support for all return and exchange needs
              </li>
              <li>
                <strong>Technical Support:</strong> Help with website navigation and account issues
              </li>
              <li>
                <strong>Complaints Resolution:</strong> Quick and fair resolution of any issues
              </li>
            </ol>
          </div>
        </div>

        <div className="policy-section">
          <h2>Support Features</h2>
          <div className="section-content">
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>Video Chat Support</h3>
                  <p>Visual assistance for complex issues - see our team walk you through solutions</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>AI-Powered Chatbot</h3>
                  <p>Instant answers to common questions - available instantly 24/7</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>Knowledge Base</h3>
                  <p>Self-service articles, guides, and FAQs to solve problems instantly</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>Community Forum</h3>
                  <p>Connect with other customers, share tips, and get community support</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>Priority Support</h3>
                  <p>VIP members get priority queues and faster response times</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h3>Callback Service</h3>
                  <p>Request a callback instead of waiting on hold</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>Multilingual Support</h2>
          <div className="section-content">
            <p>
              We provide support in multiple languages to serve our diverse customer base. 
              Our support team can assist you in:
            </p>
            <div className="languages-grid">
              <div className="language-item">🇺🇸 English</div>
              <div className="language-item">🇪🇸 Spanish</div>
              <div className="language-item">🇫🇷 French</div>
              <div className="language-item">🇩🇪 German</div>
              <div className="language-item">🇮🇹 Italian</div>
              <div className="language-item">🇯🇵 Japanese</div>
              <div className="language-item">🇨🇳 Chinese</div>
              <div className="language-item">🇮🇳 Hindi</div>
            </div>
          </div>
        </div>

        <div className="policy-section">
          <h2>Support Quality Guarantee</h2>
          <div className="section-content">
            <ul className="policy-list">
              <li>Response time within 30 minutes for all inquiries</li>
              <li>Professional, courteous, and knowledgeable support team</li>
              <li>Issue resolution within 24-48 hours whenever possible</li>
              <li>First-contact resolution for 90% of issues</li>
              <li>Confidentiality and security of your personal information</li>
              <li>Follow-up to ensure your satisfaction</li>
              <li>Feedback mechanism to continuously improve our service</li>
            </ul>
          </div>
        </div>

        <div className="policy-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>What are your support hours?</h3>
            <p>Our support team is available 24/7 via all channels. Chat responds instantly, email within 2 hours, and phone lines are available anytime.</p>
          </div>
          <div className="faq-item">
            <h3>How quickly will I get a response?</h3>
            <p>Live chat: Immediate | Email: Within 2 hours | Phone: Instant | Average response across all channels: Under 30 minutes</p>
          </div>
          <div className="faq-item">
            <h3>Is there a cost to contact support?</h3>
            <p>No! All support channels are completely free. Our phone line is toll-free, and other channels incur no charges.</p>
          </div>
          <div className="faq-item">
            <h3>What languages do you support?</h3>
            <p>We support 8 major languages including English, Spanish, French, German, Italian, Japanese, Chinese, and Hindi.</p>
          </div>
          <div className="faq-item">
            <h3>Can I schedule a callback?</h3>
            <p>Yes! If you prefer not to wait, simply request a callback through our website or app and we'll call you at your preferred time.</p>
          </div>
          <div className="faq-item">
            <h3>Do you have physical store support?</h3>
            <p>Absolutely! Visit any of our stores for in-person support and assistance. Our staff can help with product selection, complaints, and more.</p>
          </div>
        </div>

        <div className="support-cta">
          <h2>Experience Our Support</h2>
          <p>We're ready to help! Choose your preferred contact method and reach out to us today.</p>
          <div className="cta-buttons">
            <button className="cta-btn chat-btn">Start Live Chat</button>
            <button className="cta-btn email-btn">Send Email</button>
            <button className="cta-btn phone-btn">Call Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPolicy;
