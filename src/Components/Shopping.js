import React from 'react';
import './Shopping.css';

const products = [
  {
    id: 1,
    name: 'Organic Almond Milk',
    image: 'https://m.media-amazon.com/images/I/61WiT++oBTL._SX679_.jpg',
    price: 'Rs. 255',
    description: 'A healthy dairy alternative, perfect for smoothies and cereals.',
    link: 'https://www.amazon.in/So-Good-Unsweetened-Preservatives-Cholesterol/dp/B01CSLM7MC/ref=sr_1_4_sspa?dib=eyJ2IjoiMSJ9.sY0uuytAD0tXyx5ai_0Sp32mPzzKyvO5fwmIOdp47TBijNHJOlJcxl0MImagJzy_C93uu5H--jQHK0kuoZ6ylqK0qoUGPX9mZMueoVx-lm7bDdNkSrIxcT8kAgpdeLAkg-Y9qqJPuMADOA1nn2j2TcWmycmnkZVLAtYCx_HQw7zcepjm-KrJJA9jkQ4REZmtAO07ftoldxcXchcqzYnUNAOvxn8yvPoqO_S9lrFftUqiN7I_NryOEM05dXWcEjQpbFOx4SZ1A5WpF9rWXBr2hAUB4U8paYCaSz_7ZIVNG_c.Bc6_NAi5aN4XIHxatcrYY3rPfA0gO6vWM32dyP8etuI&dib_tag=se&keywords=organic%2Balmond%2Bmilk&qid=1751997046&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'
  },
  {
    id: 2,
    name: 'Gluten-Free Pasta',
    image: 'https://m.media-amazon.com/images/I/41Yzt3fM3KL._SX300_SY300_QL70_FMwebp_.jpg',
    price: 'Rs. 196',
    description: 'Delicious pasta made from rice flour, suitable for gluten-free diets.',
    link: 'https://www.amazon.in/Naturally-Yours-Gluten-Quinoa-Pasta/dp/B06XQ7C43Y/ref=sr_1_9?crid=2CBMB8LB6WNPT&dib=eyJ2IjoiMSJ9.zfSzswcjds4xbdyfe-YdY57icfEozcO5uiJcG5lxrLfjWpQJxLfcBH4Ra8C1RyB7PtdCDCTWBArwquMM7lGPs5UTSEuT4Hs8rZUglk0hUSXDJOfGTuILJeM1tXjYCj-fm3bch64e4N1i5gdd56CpScUkP9JHUftYIUekNqYasxjqpHdU74fklSUnYG5sL7vUqR5D9H1t7s2RvKqGLbv8I-JsBgISxMzzbJriSB293LcR9__j1Hohf_O860fbagNwAQyBSitxj9JldHW0d2hLBgdfxSZfLQ4YKOYDkZvuWDc.QNqHjjJTngG9oClXVGkX3_nVUeylfyHkVFA8l2EJKAs&dib_tag=se&keywords=Gluten-Free%2BPasta&qid=1751997168&sprefix=gluten-free%2Bpasta%2Caps%2C378&sr=8-9&th=1'
  },
  {
    id: 3,
    name: 'Vegan Protein Powder',
    image: 'https://m.media-amazon.com/images/I/41qx6-6TF3L._SX300_SY300_QL70_FMwebp_.jpg',
    price: 'Rs. 799',
    description: 'Plant-based protein powder for shakes and baking.',
    link: 'https://www.amazon.in/Sparkfusion-Plant-Protein-Essential-Lifestyle/dp/B0CGHK55ZN/ref=sr_1_5?crid=3UGEWKEBE24HK&dib=eyJ2IjoiMSJ9.jaJ5KgLBbZaw_-_dVAY3T_ljpwgSWcdx_lbrKqUkWGhP1xsB5VOu8HJBz1s6firxZ5VDu7bRWCMeSFWryX2dB553Ymj9mPK0ywsPBy3kDbctpSCY3Vcpip-Xrd2a3X-U2nYLhAsb4_bLLN-p8dX2I3pitfSBBTPbvgwV108Gm9T5tRRpYyyEDpM-ltelTfALtfu1o7RHpj-POLvY0AlLnp7-EMi_oDWgqNPDRsHrn6sUbByGgEK2-MCx5vz_sk9DHYQY-PZ9ckOg5TyCALMpWVeKh_SVwmzkcXU-VYKpP-k.giAzWFN38OavCN6L2ESOgbgrA9WIGlFi5Zn6Vf1Y1XQ&dib_tag=se&keywords=Vegan%2BProtein%2BPowder&qid=1751997319&sprefix=vegan%2Bprotein%2Bpowder%2Caps%2C301&sr=8-5&th=1'
  }
  
];

const Shopping = () => {
  return (
    <div className="shopping-container">
      <h2>Shopping - Affiliated Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-link">View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping; 