export default function decorate(block) {
  const segment = block.dataset.segment || "guest";

  const guestTitle = block.dataset.guestTitle || "Welcome Guest";

  const premiumTitle = block.dataset.premiumTitle || "Exclusive Premium Benefits";

 // const content = segment === "premium" ? premiumTitle : guestTitle;

  block.innerHTML = `
  <div>
    <h2>Debug</h2>
    <p>${JSON.stringify(block.dataset)}</p>
  </div>
  `;
}
