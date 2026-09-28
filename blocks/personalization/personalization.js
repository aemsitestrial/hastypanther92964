export default function decorate(block) {
  block.innerHTML = `
    <h2>Personalization Block Loaded</h2>
    <p>This content is coming from personalization.js</p>
  `;
}
