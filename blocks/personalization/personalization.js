export default async function decorate(block) {
  const segment = block.textContent.trim().toLowerCase().includes('premium')
    ? 'premium'
    : 'guest';

  const title = segment === 'premium'
    ? 'Exclusive Banking Offers'
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
      'https://fake.jsonmockapi.com/products?length=10',
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

  <p class="product-category">
    ${product.category}
  </p>

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
