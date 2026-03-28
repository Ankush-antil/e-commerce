import { useState } from 'react';
import '../style/ShareModal.css';
import { toast } from 'react-toastify';

const ShareModal = ({ productName, productId, onClose }) => {
  
  const productUrl = `${window.location.origin}/product/${productId}`;

  const handleShareClick = (platform) => {
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(`Check out this amazing product: ${productName}`);

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedText}&body=${encodedUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(productUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share Product</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="share-content">
          <p className="share-text">Share "{productName}" with your friends</p>

          <div className="share-buttons">
            <button 
              className="share-btn whatsapp"
              onClick={() => handleShareClick('whatsapp')}
              title="Share on WhatsApp"
            >
              <span>🔗</span>
              <p>WhatsApp</p>
            </button>

            <button 
              className="share-btn facebook"
              onClick={() => handleShareClick('facebook')}
              title="Share on Facebook"
            >
              <span>f</span>
              <p>Facebook</p>
            </button>

            <button 
              className="share-btn twitter"
              onClick={() => handleShareClick('twitter')}
              title="Share on Twitter"
            >
              <span>𝕏</span>
              <p>Twitter</p>
            </button>

            <button 
              className="share-btn linkedin"
              onClick={() => handleShareClick('linkedin')}
              title="Share on LinkedIn"
            >
              <span>in</span>
              <p>LinkedIn</p>
            </button>

            <button 
              className="share-btn email"
              onClick={() => handleShareClick('email')}
              title="Share via Email"
            >
              <span>✉</span>
              <p>Email</p>
            </button>

            <button 
              className="share-btn copy"
              onClick={() => handleShareClick('copy')}
              title="Copy Link"
            >
              <span>📋</span>
              <p>Copy Link</p>
            </button>
          </div>

          <div className="share-link">
            <input 
              type="text" 
              value={productUrl} 
              readOnly 
              className="link-input"
            />
            <button 
              className="copy-link-btn"
              onClick={() => handleShareClick('copy')}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
