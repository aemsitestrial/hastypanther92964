export default function decorate(block) {
  const text = block.textContent.trim().toLowerCase();

  const segment = text.includes('premium')
    ? 'premium'
    : 'guest';

  if (segment === 'premium') {
    block.innerHTML = `
      <div class="personalization-container">
        <h2>Exclusive Banking Offers</h2>
        <p>Premium User Experience</p>
      </div>
    `;
  } else {
    block.innerHTML = `
      <div class="personalization-container">
        <h2>Welcome Guest</h2>
        <p>Guest User Experience</p>
      </div>
    `;
  }
}
