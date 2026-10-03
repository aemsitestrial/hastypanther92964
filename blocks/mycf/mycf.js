export default async function decorate(block) {
  try {
    const path = block.textContent.trim();

    if (!path) {
      block.innerHTML = '<p>No Content Fragment path selected.</p>';
      return;
    }

    const query = `
      query ($path: String!) {
        mycfmodelByPath(_path: $path) {
          item {
            name
            dateOfBirth
            mobileNumber
            termsAndConditions
            address {
              plaintext
            }
          }
        }
      }
    `;

    const response = await fetch(
      '/content/cq:graphql/aem-boilerplate-frescopa/endpoint.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            path,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(JSON.stringify(result.errors));
    }

    const cf = result?.data?.mycfmodelByPath?.item;

    if (!cf) {
      block.innerHTML = '<p>CF data not found.</p>';
      return;
    }

    block.innerHTML = `
      <div class="mycf-card">
        <h2>${cf.name?.[0] || ''}</h2>
        <p><strong>DOB:</strong> ${cf.dateOfBirth || ''}</p>
        <p><strong>Mobile:</strong> ${cf.mobileNumber || ''}</p>
        <p>${cf.address?.plaintext || ''}</p>
        <p><strong>Terms Accepted:</strong> ${cf.termsAndConditions ? 'Yes' : 'No'}</p>
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
        white-space: pre-wrap;
      ">
        <strong>MyCF Error</strong><br>
        ${e.message}
      </div>
    `;
  }
}
