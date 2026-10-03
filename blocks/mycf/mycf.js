import { getAEMAuthor, getAEMPublish } from '../../scripts/endpointconfig.js';

export default async function decorate(block) {
  try {
    const path = block.textContent.trim();

    if (!path) {
      block.innerHTML = '<p>No Content Fragment selected.</p>';
      return;
    }

    const persistedQuery =
      '/graphql/execute.json/aem-boilerplate-frescopa/MyCFByPath';

    const authorUrl = getAEMAuthor();
    const publishUrl = getAEMPublish();

    const baseUrl = window.location.hostname.includes('author')
      ? authorUrl
      : publishUrl;

    const url =
      `${baseUrl}${persistedQuery};path=${encodeURIComponent(path)};ts=${Date.now()}`;

    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(JSON.stringify(result.errors));
    }

    const cf = result?.data?.mycfmodelByPath?.item;

    if (!cf) {
      block.innerHTML = '<p>Content Fragment data not found.</p>';
      return;
    }

    block.innerHTML = `
      <div class="mycf-card">
        <h2>${cf.name?.[0] || ''}</h2>
        <p><strong>Date of Birth:</strong> ${cf.dateOfBirth || ''}</p>
        <p><strong>Mobile Number:</strong> ${cf.mobileNumber || ''}</p>
        <p>${cf.address?.plaintext || ''}</p>
        <p>
          <strong>Terms Accepted:</strong>
          ${cf.termsAndConditions ? 'Yes' : 'No'}
        </p>
      </div>
    `;
  } catch (e) {
    block.innerHTML = `
      <div style="
        color: red;
        border: 1px solid red;
        padding: 12px;
        margin: 12px 0;
        background: #fff5f5;
      ">
        <strong>MyCF Error</strong><br>
        ${e.message}
      </div>
    `;
  }
}
