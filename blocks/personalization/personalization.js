export default function decorate(block) {
  block.innerHTML = `
  <div>
    <h2>Debug</h2>
    <p>${JSON.stringify(block.dataset)}</p>
  </div>
  `;
}
