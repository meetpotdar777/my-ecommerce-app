import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// --- Internal CSS for Custom Styles ---
const customStyles = `
  :root {
    --primary-gradient-start: #ff7e5f; /* Coral */
    --primary-gradient-end: #feb47b;   /* Peach */
    --secondary-gradient-start: #6a82fb; /* Strong Blue */
    --secondary-gradient-end: #fc5c7d;   /* Hot Pink */
    --card-bg-gradient-start: #f8f9fa;
    --card-bg-end: #ffffff;
    --text-dark-heading: #3a1c71; /* Deep purple */
    --text-muted-sub: #6c757d;
    --accent-pink: #e91e63;
    --accent-blue: #007bff;
    --main-bg-start: #e0f2f7; /* Light Blue */
    --main-bg-end: #fceabb; /* Soft Yellow */
    --main-title-glow: #ffcc00; /* Yellowish glow for title */
    --added-btn-bg: #28a745; /* Standard green for 'Added' */
    --added-btn-shadow: 0 4px 8px rgba(40, 167, 69, 0.3); /* Green shadow */
    --favorite-color: #ff4500; /* Orange-red for favorites */
    --toast-bg-success: #d4edda;
    --toast-border-success: #28a745;
    --toast-text-success: #155724;
    --toast-bg-info: #d1ecf1;
    --toast-border-info: #17a2b8;
    --toast-text-info: #0c5460;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, var(--main-bg-start), var(--main-bg-end));
  }

  h1 {
    font-family: 'Playfair Display', serif;
    color: var(--text-dark-heading);
    font-size: 3.8rem;
    text-shadow: 0 0 10px rgba(255,204,0,0.4), 0 0 20px rgba(255,204,0,0.2);
    animation: pulseGlow 2s infinite alternate;
  }

  @keyframes pulseGlow {
    from {
      text-shadow: 0 0 10px rgba(255,204,0,0.4), 0 0 20px rgba(255,204,0,0.2);
      transform: scale(1);
    }
    to {
      text-shadow: 0 0 12px rgba(255,204,0,0.5), 0 0 25px rgba(255,204,0,0.3);
      transform: scale(1.01);
    }
  }

  h2 {
    font-family: 'Playfair Display', serif;
    color: var(--text-dark-heading);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
  }

  .custom-card-img-bg {
    background: linear-gradient(45deg, #f0f4f8, #e0e9f3);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem 1.25rem 0 0;
    overflow: hidden;
  }

  .custom-card-img-bg img {
    transition: transform 0.3s ease-in-out;
  }

  .card:hover .custom-card-img-bg img {
    transform: scale(1.05);
  }

  .btn-gradient-primary {
    background: linear-gradient(45deg, var(--primary-gradient-start), var(--primary-gradient-end));
    color: white;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: scale(1);
  }

  .btn-gradient-primary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    filter: brightness(1.05);
  }

  .btn-gradient-secondary {
    background: linear-gradient(45deg, #6c757d, #adb5bd);
    color: white;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: scale(1);
  }

  .btn-gradient-secondary:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    filter: brightness(1.05);
  }

  .btn-added {
    background-color: var(--added-btn-bg) !important;
    box-shadow: var(--added-btn-shadow) !important;
    cursor: default;
  }

  .btn-added:hover {
    transform: none !important;
    filter: none !important;
  }

  .card {
    border-radius: 1.25rem !important;
    border: none;
    box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
    background: linear-gradient(135deg, var(--card-bg-gradient-start), var(--card-bg-end));
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
  }

  .card-header-gradient {
    background: linear-gradient(90deg, #e0f7fa, #fce4ec);
    padding: 1.5rem;
    border-radius: 1.25rem 1.25rem 0 0;
    margin-bottom: 0;
  }

  .badge-interaction {
    background-color: #d6b8ff;
    color: var(--text-dark-heading);
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .badge-interaction:hover {
    transform: scale(1.05);
    background-color: #c09fff;
  }

  .card-title {
    color: var(--text-dark-heading);
  }

  .product-price {
    color: var(--accent-pink);
    font-weight: bold;
    font-family: 'Playfair Display', serif;
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
  }

  /* Skeleton Loader Styles */
  .skeleton-card {
    background-color: #f0f0f0;
    border-radius: 1.25rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    animation: pulse-skeleton 1.5s infinite ease-in-out;
  }

  .skeleton-card-img {
    height: 150px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 1.25rem 1.25rem 0 0;
    animation: loading-gradient 1.5s infinite ease-in-out;
  }

  .skeleton-card-body {
    padding: 1rem;
  }

  .skeleton-line {
    height: 15px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    border-radius: 4px;
    margin-bottom: 8px;
    animation: loading-gradient 1.5s infinite ease-in-out;
  }

  .skeleton-line.short {
    width: 60%;
  }

  .skeleton-line.medium {
    width: 80%;
  }

  @keyframes pulse-skeleton {
    0% { opacity: 1; }
    50% { opacity: 0.8; }
    100% { opacity: 1; }
  }

  @keyframes loading-gradient {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Solid black with 70% opacity */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
    opacity: 0;
    visibility: hidden; /* Start hidden */
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  .modal-backdrop.show {
    opacity: 1;
    visibility: visible; /* Make visible */
  }

  .modal-content-custom {
    background-color: #FFF0F5; /* Very Light Pink for modal content */
    border-radius: 1rem;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
    transform: translateY(-50px);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  .modal-backdrop.show .modal-content-custom {
    transform: translateY(0);
    opacity: 1;
  }

  /* Favorite Icon */
  .favorite-icon {
    cursor: pointer;
    color: #ccc; /* Default grey */
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
    font-size: 1.5rem; /* Larger icon */
  }

  .favorite-icon.active {
    color: var(--favorite-color); /* Active red/orange */
    transform: scale(1.1);
  }

  .favorite-icon:hover {
    transform: scale(1.2);
    color: var(--favorite-color);
  }

  /* Custom Toast Notifications */
  .toast-container-custom {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1060;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast-custom {
    background-color: var(--toast-bg-info);
    border: 1px solid var(--toast-border-info);
    color: var(--toast-text-info);
    padding: 15px 20px;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInOutToast 4s forwards;
  }

  .toast-custom.success {
    background-color: var(--toast-bg-success);
    border: 1px solid var(--toast-border-success);
    color: var(--toast-text-success);
  }

  @keyframes fadeInOutToast {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
  }
`;

// --- 1. Simulated Data (Frontend) ---
const productsData = [
  // Elegant & Feminine Products
  { id: 1, name: 'Elegant Laptop Pro', category: 'Electronics', description: 'Sleek, lightweight laptop for modern creatives, designed for peak performance and style. Features a vibrant retina display and long-lasting battery.', price: 1200, rating: 4.8, numReviews: 250, imageUrl: 'https://placehold.co/150x150/f9e7f5/5a2d6b?text=Laptop' },
  { id: 2, name: 'Crystal Clear Smartphone', category: 'Electronics', description: 'Capture life\'s moments with stunning clarity and vibrant colors using this advanced smartphone. Equipped with a triple-lens camera and AI enhancements.', price: 800, rating: 4.5, numReviews: 320, imageUrl: 'https://placehold.co/150x150/e0f2f7/2a617e?text=Phone' },
  { id: 3, name: 'Rose Gold Health Watch', category: 'Wearables', description: 'Monitor your health and stay connected with this stylish rose gold smartwatch. Includes heart rate, sleep tracking, and NFC payments.', price: 250, rating: 4.2, numReviews: 180, imageUrl: 'https://placehold.co/150x150/ffe6f0/d63384?text=Smartwatch' },
  { id: 4, name: 'Blush Wireless Earbuds', category: 'Audio', description: 'Immerse yourself in high-fidelity sound with comfortable, elegantly designed earbuds. Features active noise cancellation and 24-hour battery life.', price: 150, rating: 4.6, numReviews: 400, imageUrl: 'https://placehold.co/150x150/fef2f2/ef4444?text=Earbuds' },
  { id: 5, name: 'Pastel Ergonomic Mouse', category: 'Peripherals', description: 'A precision mouse in soft pastel hues, designed for comfort and extended use. Features programmable buttons and silent clicks.', price: 75, rating: 4.7, numReviews: 210, imageUrl: 'https://placehold.co/150x150/f3e8ff/8a2be2?text=Mouse' },
  { id: 6, name: 'Silent Touch Keyboard', category: 'Peripherals', description: 'Experience quiet and comfortable typing with this soft-touch mechanical keyboard. Ideal for late-night work sessions.', price: 120, rating: 4.4, numReviews: 150, imageUrl: 'https://placehold.co/150x150/e6fffa/008080?text=Keyboard' },
  { id: 9, name: 'Velvet Noise-Cancelling Headphones', category: 'Audio', description: 'Indulge in pure audio bliss with luxurious, noise-cancelling over-ear headphones. Perfect for travel or focused work.', price: 200, rating: 4.7, numReviews: 280, imageUrl: 'https://placehold.co/150x150/fff0f5/c2185b?text=Headphones' },
  { id: 10, name: 'Portable Aura Speaker', category: 'Audio', description: 'Bring your music to life with vibrant sound and a captivating LED light display. Bluetooth enabled with long battery life.', price: 90, rating: 4.3, numReviews: 190, imageUrl: 'https://placehold.co/150x150/f8f8f8/4a148c?text=Speaker' },

  // Bold & Masculine / Neutral Products
  { id: 7, name: 'Titan Stealth SSD', category: 'Storage', description: 'Secure your data with this ultra-fast, rugged external SSD, built for durability. Shockproof and water-resistant.', price: 100, rating: 4.9, numReviews: 90, imageUrl: 'https://placehold.co/150x150/2f4f4f/A9A9A9?text=SSD+Pro' },
  { id: 8, name: 'Commander USB-C Hub', category: 'Accessories', description: 'Expand your connectivity with this robust and versatile multi-port USB-C hub. Features HDMI, USB 3.0, and SD card slots.', price: 40, rating: 4.0, numReviews: 130, imageUrl: 'https://placehold.co/150x150/191970/ADD8E6?text=USB+Hub' },
  { id: 11, name: 'Navigator Smartwatch', category: 'Wearables', description: 'Explore new frontiers with a durable smartwatch, featuring advanced GPS and biometric tracking. Built for adventurers.', price: 300, rating: 4.6, numReviews: 170, imageUrl: 'https://placehold.co/150x150/4682b4/FFF8DC?text=Navigator+Watch' },
  { id: 12, name: 'Apex Gaming Rig', category: 'Electronics', description: 'Experience unparalleled gaming performance with this liquid-cooled, custom-built PC. VR-ready and customizable RGB lighting.', price: 2500, rating: 4.9, numReviews: 300, imageUrl: 'https://placehold.co/150x150/36454F/D3D3D3?text=Gaming+PC' },
  { id: 13, name: 'Quantum Gaming Headset', category: 'Audio', description: 'Achieve competitive dominance with spatial audio and crystal-clear voice comms. Ergonomic design for long gaming sessions.', price: 180, rating: 4.7, numReviews: 220, imageUrl: 'https://placehold.co/150x150/000080/c0d9e6?text=Headset' },
  { id: 14, name: 'Aero Explorer Drone', category: 'Drones', description: 'Capture cinematic views and explore from above with this high-precision, long-range drone. Features 4K camera and intelligent flight modes.', price: 500, rating: 4.5, numReviews: 95, imageUrl: 'https://placehold.co/150x150/2E8B57/F0FFFF?text=Explorer+Drone' },
  { id: 15, name: 'Pro-Shoot Camera', category: 'Photography', description: 'Unleash your inner artist with this professional-grade DSLR, perfect for stunning stills and video. Full-frame sensor and rapid autofocus.', price: 1100, rating: 4.8, numReviews: 140, imageUrl: 'https://placehold.co/150x150/696969/FFE4B5?text=Pro+Camera' },
  { id: 16, name: 'Sentinel Smart Hub', category: 'Smart Home', description: 'Secure and automate your home with this central smart hub, integrating all your devices. Compatible with major smart home ecosystems.', price: 100, rating: 4.3, numReviews: 110, imageUrl: 'https://placehold.co/150x150/483D8B/E0FFFF?text=Smart+Hub' },
  { id: 17, name: 'Barista Brew Machine', category: 'Home Appliances', description: 'Master the art of coffee with an advanced espresso machine, delivering perfect brews every time. Integrated grinder and milk frother.', price: 450, rating: 4.7, numReviews: 80, imageUrl: 'https://placehold.co/150x150/8B4513/F5DEB3?text=Brew+Machine' },
  { id: 18, name: 'Echo Noise-Cancelling Earbuds', category: 'Audio', description: 'Block out distractions and enjoy pure sound with these compact, powerful earbuds. Perfect for commutes and workouts.', price: 220, rating: 4.8, numReviews: 160, imageUrl: 'https://placehold.co/150x150/708090/D8BFD8?text=Echo+Earbuds' },
  { id: 19, name: 'Expedition Backpack', category: 'Bags', description: 'Conquer any journey with this rugged, high-capacity backpack designed for extreme comfort and utility. Water-resistant and many compartments.', price: 90, rating: 4.4, numReviews: 105, imageUrl: 'https://placehold.co/150x150/2F4F4F/A9A9A9?text=Backpack' },
  { id: 20, name: 'Cinema Portable Projector', category: 'Electronics', description: 'Transform any space into a cinematic experience with this compact, high-definition projector. Supports 1080p and various inputs.', price: 350, rating: 4.2, numReviews: 75, imageUrl: 'https://placehold.co/150x150/4169E1/F0F8FF?text=Projector' },
];

// --- Global Stop Words (Moved out of _preprocess for robustness) ---
const globalStopWords = new Set([
  'a', 'an', 'the', 'is', 'and', 'or', 'for', 'with', 'to', 'of', 'in', 'on', 'at',
  'high', 'fidelity', 'latest', 'advanced', 'tracking', 'durable', 'fast', 'reliable',
  'compact', 'powerful', 'immersive', 'these', 'your', 'all', 'sleek', 'vibrant',
  'fashionable', 'comfortable', 'elegant', 'quiet', 'delightful', 'ultra', 'slim',
  'precious', 'versatile', 'modern', 'minimalist', 'rich', 'beauties', 'captivating',
  'ultimate', 'heavy', 'pinpoint', 'accurate', 'stunning', 'barista', 'quality',
  'ease', 'style', 'commute', 'workout', 'movies', 'backyard', 'new', 'explore',
  'pure', 'unleash', 'peak', 'capture', 'life', 'moments', 'master', 'art', 'delivering',
  'perfect', 'every', 'time', 'block', 'out', 'distractions', 'enjoy', 'transform',
  'any', 'space', 'cinematic', 'experience', 'this', 'rugged', 'spacious', 'custom',
  'built', 'true', 'inner', 'artist', 'perfect', 'stills', 'video', 'master', 'art',
  'coffee', 'home', 'ease', 'style', 'monitor', 'health', 'stay',
  'connected', 'using', 'this', // Added common words
  'designed', 'peak', 'performance', 'capture', 'stunning', 'vibrant', 'clear',
  'monitor', 'stay', 'connected', 'immerse', 'sound', 'comfortable', 'extended',
  'use', 'experience', 'typing', 'secure', 'data', 'durability', 'expand', 'connectivity',
  'robust', 'explorer', 'from', 'above', 'high', 'range', 'inner', 'artist',
  'grade', 'stills', 'video', 'automate', 'integrating', 'delivering', 'every',
  'time', 'block', 'distractions', 'enjoy', 'transform', 'any', 'space', 'cinematic',
  'conquer', 'journey', 'capacity', 'utility'
]);

// --- 2. Core Recommendation Logic (JavaScript Implementation) ---

// Helper to calculate dot product of two vectors
const dotProduct = (vecA, vecB) => {
  let product = 0;
  const keysA = Object.keys(vecA);
  const keysB = Object.keys(vecB);
  const commonKeys = new Set(keysA.filter(key => keysB.includes(key)));

  for (const term of commonKeys) {
    product += vecA[term] * vecB[term];
  }
  return product;
};

// Helper to calculate magnitude of a vector
const magnitude = (vec) => {
  let sumOfSquares = 0;
  for (const term in vec) {
    sumOfSquares += vec[term] * vec[term];
  }
  return Math.sqrt(sumOfSquares);
};

// Cosine Similarity function
const cosineSimilarity = (vecA, vecB) => {
  const numerator = dotProduct(vecA, vecB);
  const denominator = magnitude(vecA) * magnitude(vecB);
  if (denominator === 0) return 0;
  return numerator / denominator;
};

class TfidfVectorizerJS {
  constructor() {
    this.vocabulary = new Map();
    this.idf = new Map();
    this.documents = [];
  }

  fit(documents) {
    this.documents = documents.map(doc => this._preprocess(doc));
    const allWords = new Set();

    this.documents.forEach(terms => {
      terms.forEach(term => allWords.add(term));
    });

    let index = 0;
    allWords.forEach(word => {
      this.vocabulary.set(word, index++);
    });

    const numDocuments = this.documents.length;
    this.vocabulary.forEach((_, word) => {
      let docCount = 0;
      this.documents.forEach(terms => {
        if (terms.includes(word)) {
          docCount++;
        }
      });
      this.idf.set(word, Math.log(numDocuments / (docCount + 1)) + 1);
    });
  }

  _preprocess(text) {
    // Use the globalStopWords constant
    return text.toLowerCase()
               .replace(/[.,!?;:"']/g, '')
               .split(/\s+/)
               .filter(word => word.length > 1 && !globalStopWords.has(word));
  }

  transform(documents) {
    const tfidfMatrix = [];
    documents.forEach(docText => {
      const terms = this._preprocess(docText);
      const tf = new Map();
      terms.forEach(term => {
        tf.set(term, (tf.get(term) || 0) + 1);
      });

      const tfidfVector = {};
      tf.forEach((count, term) => {
        if (this.vocabulary.has(term)) {
          const tfValue = count / terms.length;
          const idfValue = this.idf.get(term);
          tfidfVector[this.vocabulary.get(term)] = tfValue * idfValue;
        }
      });
      tfidfMatrix.push(tfidfVector);
    });
    return tfidfMatrix;
  }
}

// Product Recommender Class for the frontend
class ProductRecommenderJS {
  constructor(products) {
    this.products = products;
    this.tfidfMatrix = [];
    this.vectorizer = new TfidfVectorizerJS();
    this._prepareData();
  }

  _prepareData() {
    const combinedFeatures = this.products.map(p =>
      `${p.category} ${p.description} ${p.name} rating_${p.rating.toFixed(1).replace('.', '')} reviews_${p.numReviews}`
    );
    this.vectorizer.fit(combinedFeatures);
    this.tfidfMatrix = this.vectorizer.transform(combinedFeatures);
  }

  getProductSimilarity(productId) {
    const productIndex = this.products.findIndex(p => p.id === productId);
    if (productIndex === -1) return [];

    const targetVector = this.tfidfMatrix[productIndex];
    const similarities = [];

    this.products.forEach((product, idx) => {
      if (idx !== productIndex) {
        const similarity = cosineSimilarity(targetVector, this.tfidfMatrix[idx]);
        similarities.push({ productId: product.id, similarity: similarity });
      }
    });
    return similarities.sort((a, b) => b.similarity - a.similarity);
  }

  recommendProductsForUser(userInteractedProductIds, numRecommendations = 5) {
    if (!userInteractedProductIds || userInteractedProductIds.length === 0) {
      return [...this.products]
        .sort((a, b) => (b.rating * b.numReviews) - (a.rating * a.numReviews))
        .slice(0, numRecommendations);
    }

    const allRecommendations = new Map();

    userInteractedProductIds.forEach(interactedProductId => {
      const similarProducts = this.getProductSimilarity(interactedProductId);
      similarProducts.forEach(rec => {
        // Exclude products already in the user's interacted list
        if (!userInteractedProductIds.includes(rec.productId)) {
          allRecommendations.set(
            rec.productId,
            (allRecommendations.get(rec.productId) || 0) + rec.similarity
          );
        }
      });
    });

    if (allRecommendations.size === 0) {
      // Fallback if no new recommendations found based on interactions
      return [...this.products]
        .sort((a, b) => (b.rating * b.numReviews) - (a.rating * a.numReviews))
        .slice(0, numRecommendations);
    }

    const sortedRecommendations = Array.from(allRecommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, numRecommendations)
      .map(([productId, totalSimilarity]) => ({
        ...this.products.find(p => p.id === productId),
        total_similarity: totalSimilarity
      }));

    return sortedRecommendations;
  }
}

// Skeleton Card Component for Loading States
const SkeletonCard = () => (
  <div className="card h-100 skeleton-card">
    <div className="skeleton-card-img"></div>
    <div className="card-body skeleton-card-body">
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="skeleton-line short" style={{width: '30%', height: '25px'}}></div>
        <div className="skeleton-line short" style={{width: '40%', height: '30px'}}></div>
      </div>
    </div>
  </div>
);

// Product Quick View Modal
const ProductQuickViewModal = ({ product, onClose, isFavorite, onToggleFavorite, onInteract, isInteracted, isModalOpen, showToast, recommender, interactedProductIds, onOpenQuickView }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const modalBackdropRef = useRef(null);
  const modalContentRef = useRef(null); // Ref for modal content for focus management

  // Calculate related products for the current product
  const relatedProducts = useMemo(() => {
    if (!product || !recommender) return [];
    // Temporarily add current product to interacted list to get recommendations based on it
    // This is a common pattern for "More Like This" where the current item acts as an interaction
    const tempInteracted = [...interactedProductIds, product.id];
    // Filter out the current product itself from recommendations
    return recommender.recommendProductsForUser(tempInteracted, 4) // Limit to 4 related products
                      .filter(rec => rec.id !== product.id)
                      .slice(0, 3); // Final slice to ensure max 3 if any were the same
  }, [product, recommender, interactedProductIds]);


  useEffect(() => {
    // Capture the current ref value for cleanup to avoid stale closures
    const currentBackdropRef = modalBackdropRef.current;

    // Add or remove 'show' class based on isModalOpen prop
    if (currentBackdropRef) {
      if (isModalOpen) {
        currentBackdropRef.classList.add('show');
        // Set focus to the modal content when it opens for accessibility
        if (modalContentRef.current) {
          modalContentRef.current.focus();
        }
      } else {
        // Allow time for fade-out animation before hiding completely
        currentBackdropRef.classList.remove('show');
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Reset cart state when modal closes
    if (!isModalOpen) {
        setIsAddedToCart(false);
    }

    // Cleanup: remove event listener
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, onClose]); // Re-run effect when modal open state or onClose handler changes

  if (!product && !isModalOpen) return null; // Only render if product is present or modal is in closing transition


  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    showToast(`${quantity} x ${product.name} added to cart!`, 'success');
    // You could also add logic here to update a global cart state or send to backend
    // onClose(); // Optionally close modal after adding to cart
  };

  // Only render modal content if product is available
  if (!product) return null;

  return (
    <div className={`modal-backdrop ${isModalOpen ? 'show' : ''}`} ref={modalBackdropRef} onClick={onClose}>
      <div
        className="modal-content-custom"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickViewModalTitle"
        tabIndex="-1" // Make it focusable
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h3 id="quickViewModalTitle" className="fw-bold" style={{fontFamily: 'Playfair Display, serif'}}>{product.name}</h3>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
        </div>
        <div className="row">
          <div className="col-md-5 mb-3 mb-md-0 d-flex justify-content-center align-items-center custom-card-img-bg" style={{minHeight: '250px'}}>
            <img src={product.imageUrl} alt={product.name} className="img-fluid p-3"
                 onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/250x250/cccccc/333333?text=${product.name.split(' ')[0]}`; }} />
          </div>
          <div className="col-md-7 d-flex flex-column">
            <p className="text-muted small mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>{product.category}</p>
            <p className="lead flex-grow-1" style={{fontFamily: 'Poppins, sans-serif'}}>{product.description}</p>
            <div className="d-flex align-items-center mb-2">
              <span className="text-warning me-1">★</span> {product.rating} ({product.numReviews} reviews)
            </div>
            <h4 className="product-price mb-3">${product.price}</h4>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="quantity" className="form-label mb-0 me-2">Quantity:</label>
              <div className="input-group" style={{width: '120px'}}>
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                <input type="text" className="form-control text-center" value={quantity} readOnly style={{width: '50px'}}/>
                <button className="btn btn-outline-secondary" type="button" onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
              <button
                onClick={() => onToggleFavorite(product.id, product.name)}
                className="btn btn-outline-danger d-flex align-items-center justify-content-center flex-fill"
                style={{ borderRadius: '1.5rem' }}
              >
                <i className={`fa-heart ${isFavorite ? 'fas' : 'far'} favorite-icon me-2`} style={{fontSize: '1rem', color: isFavorite ? 'var(--favorite-color)' : ''}}></i>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button
                onClick={() => onInteract(product.id, product.name)}
                className={`btn ${isInteracted ? 'btn-added' : 'btn-gradient-primary'} d-flex align-items-center justify-content-center flex-fill text-white`}
                style={{ borderRadius: '1.5rem'}}
              >
                {isInteracted ? 'Added to Interactions' : 'Add to Interactions'}
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`btn ${isAddedToCart ? 'btn-added' : 'btn-success'} btn-lg mt-3 w-100`}
              style={{ borderRadius: '1.5rem' }}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* More Like This Section (Related Products) */}
        {relatedProducts.length > 0 && (
          <div className="mt-5 pt-3 border-top">
            <h4 className="fw-bold mb-3" style={{fontFamily: 'Playfair Display, serif'}}>More Like This</h4>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {relatedProducts.map(relatedProduct => (
                <div className="col" key={`related-${relatedProduct.id}`}>
                  <ProductCard
                    product={relatedProduct}
                    onInteract={onInteract}
                    isInteracted={interactedProductIds.includes(relatedProduct.id)}
                    onOpenQuickView={(prod) => {
                      onClose(); // Close current modal
                      onOpenQuickView(prod); // Open new modal for related product
                    }}
                    isFavorite={isFavorite} // Pass down isFavorite logic if needed for related
                    onToggleFavorite={onToggleFavorite}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Product Card Component
const ProductCard = ({ product, onInteract, isInteracted, onOpenQuickView, isFavorite, onToggleFavorite }) => (
  <div className="card h-100 shadow-sm border-0">
    {/* Product Image with Custom Background Gradient */}
    <div className="custom-card-img-bg" style={{height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1.25rem 1.25rem 0 0'}}>
      <img
        src={product.imageUrl}
        className="img-fluid object-fit-contain p-3" // Bootstrap responsive image, p-3 for padding
        alt={product.name}
        style={{ maxHeight: '100%' }} // Ensure image fits within its container
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/cccccc/333333?text=${product.name.split(' ')[0]}`; }}
      />
    </div>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title fw-bold" style={{fontFamily: 'Playfair Display, serif'}}>{product.name}</h5>
      <p className="card-subtitle mb-2 text-muted small" style={{fontFamily: 'Poppins, sans-serif'}}>{product.category}</p>
      <div className="d-flex align-items-center mb-2">
        <span className="text-warning me-1">★</span> {product.rating} ({product.numReviews} reviews)
        <i
          className={`ms-auto fa-heart favorite-icon ${isFavorite ? 'fas active' : 'far'}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id, product.name); }}
        ></i>
      </div>
      <p className="card-text text-secondary small flex-grow-1" style={{fontFamily: 'Poppins, sans-serif'}}>{product.description}</p>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="h5 mb-0 product-price">${product.price}</span>
        <button
          onClick={() => onInteract(product.id, product.name)}
          className={`btn ${isInteracted ? 'btn-added' : 'btn-gradient-primary'} btn-sm text-white`}
          style={{fontFamily: '"Poppins", sans-serif', borderRadius: '1.5rem'}}
        >
          {isInteracted ? 'Added' : 'Add to Interactions'}
        </button>
      </div>
      <button
        onClick={() => onOpenQuickView(product)}
        className="btn btn-outline-info btn-sm mt-2"
        style={{fontFamily: '"Poppins", sans-serif', borderRadius: '1.5rem'}}
      >
        Quick View
      </button>
    </div>
  </div>
);

// Custom Toast Component
const Toast = ({ message, type, id }) => {
  return (
    <div className={`toast-custom ${type}`} role="alert" aria-live="assertive" aria-atomic="true">
      {message}
    </div>
  );
};


// Main App Component
const App = () => {
  const [interactedProductIds, setInteractedProductIds] = useState([]);
  const [favoriteProductIds, setFavoriteProductIds] = useState([]); // New state for favorites
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null); // State for which product to display
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false); // State to control modal visibility
  const [toasts, setToasts] = useState([]); // State for toasts

  // Simulate initial product loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingProducts(false);
    }, 1000);
  }, []);

  // Show a toast message
  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 4000); // Toast disappears after 4 seconds
  }, []);

  // Memoize the recommender instance
  const recommender = useMemo(() => new ProductRecommenderJS(productsData), []);

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    const allCategories = productsData.map(p => p.category);
    return ['All', ...new Set(allCategories)].sort();
  }, []);

  // Filtered products based on search term and selected category
  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return filtered;
  }, [searchTerm, selectedCategory]);

  // Handler for adding/removing product from user interactions
  const handleInteract = useCallback((productId, productName) => {
    setInteractedProductIds(prevIds => {
      if (prevIds.includes(productId)) {
        showToast(`${productName} removed from interactions.`, 'info');
        return prevIds.filter(id => id !== productId);
      } else {
        showToast(`${productName} added to interactions!`, 'success');
        return [...prevIds, productId];
      }
    });
  }, [showToast]);

  // Handler for toggling favorite status
  const handleToggleFavorite = useCallback((productId, productName) => {
    setFavoriteProductIds(prevIds => {
      if (prevIds.includes(productId)) {
        showToast(`${productName} removed from favorites.`, 'info');
        return prevIds.filter(id => id !== productId);
      } else {
        showToast(`${productName} added to favorites!`, 'success');
        return [...prevIds, productId];
      }
    });
  }, [showToast]);

  // Function to generate recommendations
  const generateRecommendations = useCallback(() => {
    setIsLoadingRecommendations(true);
    setTimeout(() => {
      const newRecommendations = recommender.recommendProductsForUser(interactedProductIds);
      setRecommendations(newRecommendations);
      setIsLoadingRecommendations(false);
      showToast('Recommendations updated!', 'info');
    }, 500);
  }, [interactedProductIds, recommender, showToast]);

  // Handler to reset interactions
  const handleResetInteractions = useCallback(() => {
    setInteractedProductIds([]);
    setFavoriteProductIds([]); // Also clear favorites on full reset
    setRecommendations([]);
    showToast('All interactions and favorites reset.', 'info');
  }, [showToast]);

  // Open Quick View Modal
  const openQuickView = useCallback((product) => {
    setQuickViewProduct(product);
    setIsQuickViewModalOpen(true); // Open the modal
  }, []);

  // Close Quick View Modal
  const closeQuickView = useCallback(() => {
    setIsQuickViewModalOpen(false); // Start closing animation
    // After the CSS transition completes, set quickViewProduct to null to unmount the modal
    setTimeout(() => {
      setQuickViewProduct(null);
    }, 300); // This duration should match the CSS transition duration
  }, []);


  return (
    <>
      {/* Font Awesome for Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" xintegrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      <div className="min-vh-100 py-4">
        <div className="container my-5">
          <h1 className="text-center mb-5 fw-bold">
            AKIKO
          </h1>

          {/* Interacted Products Section */}
          <div className="card shadow-lg mb-5">
            <div className="card-header-gradient">
              <h2 className="card-title h4 mb-0">Your Style Palette</h2>
            </div>
            <div className="card-body p-4">
              {interactedProductIds.length === 0 ? (
                <p className="text-muted fst-italic">Select items below to discover your perfect recommendations!</p>
              ) : (
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {interactedProductIds.map(id => {
                    const product = productsData.find(p => p.id === id);
                    return product ? (
                      <span key={id} className="badge badge-interaction d-flex align-items-center">
                        {product.name}
                        <button
                          onClick={() => handleInteract(product.id, product.name)}
                          className="btn-close ms-2"
                          aria-label="Remove from interactions"
                          style={{ filter: 'invert(1)' }}
                        ></button>
                      </span>
                    ) : null;
                  })}
                </div>
              )}
              <div className="d-flex flex-column flex-md-row gap-3 mt-3 justify-content-center">
                <button
                  onClick={generateRecommendations}
                  className="btn btn-gradient-primary btn-lg"
                  disabled={interactedProductIds.length === 0 || isLoadingRecommendations}
                >
                  {isLoadingRecommendations ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Finding Style...
                    </>
                  ) : (
                    'Find Your Style'
                  )}
                </button>
                <button
                  onClick={handleResetInteractions}
                  className="btn btn-gradient-secondary btn-lg"
                  disabled={interactedProductIds.length === 0 || isLoadingRecommendations}
                >
                  Reset Interactions
                </button>
              </div>
            </div>
          </div>

          {/* Favorite Products Section */}
          <div className="card shadow-lg mb-5">
            <div className="card-header-gradient">
              <h2 className="card-title h4 mb-0">Your Favorite Picks <i className="fas fa-heart" style={{color: 'var(--favorite-color)'}}></i></h2>
            </div>
            <div className="card-body p-4">
              {favoriteProductIds.length === 0 ? (
                <p className="text-muted fst-italic">Add products to your favorites by clicking the heart icon!</p>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {favoriteProductIds.map(id => {
                    const product = productsData.find(p => p.id === id);
                    return product ? (
                      <div className="col" key={`fav-${product.id}`}>
                        <ProductCard
                          product={product}
                          onInteract={handleInteract}
                          isInteracted={interactedProductIds.includes(product.id)}
                          onOpenQuickView={openQuickView}
                          isFavorite={true} // It's in favorites section, so always true
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </div>


          {/* All Products Section */}
          <div className="card shadow-lg mb-5">
            <div className="card-header-gradient">
              <h2 className="card-title h4 mb-0">Explore Our Collection</h2>
            </div>
            <div className="card-body p-4">
              {/* Search and Filter */}
              <div className="row mb-4 g-3 align-items-center">
                <div className="col-md-7 col-lg-8">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    placeholder="Search products by name, category, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-md-5 col-lg-4">
                  <select
                    className="form-select form-select-lg rounded-pill shadow-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isLoadingProducts ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {[...Array(8)].map((_, index) => (
                    <div className="col" key={index}>
                      <SkeletonCard />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {filteredProducts.length === 0 ? (
                    <div className="col-12 text-center text-muted fst-italic py-5">
                      No products found matching your criteria.
                    </div>
                  ) : (
                    filteredProducts.map(product => (
                      <div className="col" key={product.id}>
                        <ProductCard
                          product={product}
                          onInteract={handleInteract}
                          isInteracted={interactedProductIds.includes(product.id)}
                          onOpenQuickView={openQuickView}
                          isFavorite={favoriteProductIds.includes(product.id)}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="card shadow-lg p-4">
            <div className="card-header-gradient">
              <h2 className="card-title h4 mb-0">Your Personalized Picks</h2>
            </div>
            <div className="card-body p-4">
              {isLoadingRecommendations ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {[...Array(4)].map((_, index) => ( // Show 4 skeleton cards for recommendations
                    <div className="col" key={index}>
                      <SkeletonCard />
                    </div>
                  ))}
                </div>
              ) : recommendations.length === 0 && interactedProductIds.length > 0 ? (
                <p className="text-muted fst-italic">No new recommendations found based on your selections. Try adding more items to your style palette!</p>
              ) : recommendations.length === 0 ? (
                <p className="text-muted fst-italic">Curate your interactions to unlock personalized recommendations!</p>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                  {recommendations.map(product => (
                    <div className="col" key={`rec-${product.id}`}>
                      <ProductCard
                        product={product}
                        onInteract={handleInteract}
                        isInteracted={interactedProductIds.includes(product.id)}
                        onOpenQuickView={openQuickView}
                        isFavorite={favoriteProductIds.includes(product.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render Quick View Modal conditionally */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={closeQuickView}
          isFavorite={favoriteProductIds.includes(quickViewProduct.id)}
          onToggleFavorite={handleToggleFavorite}
          onInteract={handleInteract}
          isInteracted={interactedProductIds.includes(quickViewProduct.id)}
          isModalOpen={isQuickViewModalOpen} // Pass this state down
          showToast={showToast}
          recommender={recommender} // Pass recommender to modal
          interactedProductIds={interactedProductIds} // Pass interacted products to modal
          onOpenQuickView={openQuickView} // Pass this to allow opening new quick views from related products
        />
      )}

      {/* Toast Notifications Container */}
      <div className="toast-container-custom">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </>
  );
};

export default App;
