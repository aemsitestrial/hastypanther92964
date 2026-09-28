export default function decorate(block) {
  const segment = block.dataset.segment || 'guest';

  const guestTitle = block.dataset.guestTitle || 'Welcome Guest';

  const premiumTitle = block.dataset.premiumTitle || 'Exclusive Premium Benefits';

  const content = segment === 'premium' ? premiumTitle : guestTitle;

  block.innerHTML = `
    <div class="personalization-container">
      <h2>${content}</h2>
      <p>Current Segment: ${segment}</p>
    </div>
  `;
}
