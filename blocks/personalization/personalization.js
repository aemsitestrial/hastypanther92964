export default function decorate(block) {
  console.log('BLOCK HTML:', block.outerHTML);

  block.innerHTML = `
    <h2>Debug Mode</h2>
    <pre>${block.outerHTML}</pre>
  `;
}
