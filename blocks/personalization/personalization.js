export default async function decorate(block) {
  const segment = block.textContent.trim().toLowerCase().includes('premium')
    ? 'premium'
    : 'guest';

  const title = segment === 'premium'
    ? 'Exclusive Electronic Offers'
    : 'Welcome Guest';

  block.innerHTML = `
    <div class="personalization-container">
      <h2>${title}</h2>
      <p>Current Segment: ${segment}</p>
      <div class="products-container"></div>
    </div>
  `;

  try {
    const response = await fetch(
      `https://38559-305pinkchicken-stage.adobeioruntime.net/api/v1/web/app/products?segment=${segment}`,
    );

    const data = await response.json();

    const products = data.products || data;

    const visibleProducts = segment === 'premium'
      ? products.slice(0, 10)
      : products.slice(0, 5);

    const productsContainer = block.querySelector(
      '.products-container',
    );

    productsContainer.innerHTML = visibleProducts
      .map((product, index) => `
        <div class="product-card ${
  segment === 'premium' && index >= 5
    ? 'premium-only'
    : ''
}">
  ${
  segment === 'premium' && index >= 5
    ? '<span class="premium-badge">PREMIUM</span>'
    : ''
}

  <h3>${product.productName}</h3>

  <p class="product-price">
    ₹${product.price}
  </p>

  <p class="product-description">
    ${product.description}
  </p>
</div>
      `)
      .join('');
  } catch (error) {
    block.querySelector('.products-container').innerHTML = `
      <p>Unable to load products.</p>
    `;
  }
}
