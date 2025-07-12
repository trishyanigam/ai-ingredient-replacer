import React from 'react';
import '../styles/Shopping.css';

/**
 * Product list with id, name, image, price, description, and purchase link.
 * These are affiliate links to external sites like Amazon.
 */
const products = [
  {
    id: 1,
    name: 'Organic Almond Milk',
    image: 'https://m.media-amazon.com/images/I/61WiT++oBTL._SX679_.jpg',
    price: 'Rs. 255',
    description: 'A healthy dairy alternative, perfect for smoothies and cereals.',
    link: 'https://www.amazon.in/So-Good-Unsweetened-Preservatives-Cholesterol/dp/B01CSLM7MC/...'
  },
  {
    id: 2,
    name: 'Gluten-Free Pasta',
    image: 'https://m.media-amazon.com/images/I/41Yzt3fM3KL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 'Rs. 196',
    description: 'Delicious pasta made from rice flour, suitable for gluten-free diets.',
    link: 'https://www.amazon.in/Naturally-Yours-Gluten-Quinoa-Pasta/dp/B06XQ7C43Y/...'
  },
  {
    id: 3,
    name: 'Vegan Protein Powder',
    image: 'https://m.media-amazon.com/images/I/41qx6-6TF3L._SX300_SY300_QL70_FMwebp_.jpg',
    price: 'Rs. 799',
    description: 'Plant-based protein powder for shakes and baking.',
    link: 'https://www.amazon.in/Sparkfusion-Plant-Protein-Essential-Lifestyle/dp/B0CGHK55ZN/...'
  }
];

/**
 * Shopping
 * Displays a grid of healthy, diet-friendly affiliate products.
 * Each product has an image, description, and link to buy externally.
 */
const Shopping = () => {
  return (
    <div className="shopping-container">
      {/* Section Title */}
      <h2>Affiliated Products</h2>

      {/* Product Cards */}
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            {/* Product Details */}
            <h3>{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>

            {/* Affiliate Link */}
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="product-link"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
