async function fetchCF(path) {
  const endpoint = '/content/_cq_graphql/global/endpoint.json';

  const query = `
    query($path:String!){
      mycfmodelByPath(_path:$path){
        item{
          name
          dateOfBirth
          mobileNumber
          termsAndConditions
          address{
            plaintext
          }
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { path },
    }),
  });

  const result = await response.json();

  return result.data.mycfmodelByPath.item;
}

export default async function decorate(block) {
  const path = block.textContent.trim();

  const cf = await fetchCF(path);

  block.innerHTML = `
    <div class="mycf-card">

      <h2>${cf.name?.[0] || ''}</h2>

      <p>
        <strong>DOB:</strong>
        ${cf.dateOfBirth}
      </p>

      <p>
        <strong>Mobile:</strong>
        ${cf.mobileNumber}
      </p>

      <p>
        ${cf.address?.plaintext || ''}
      </p>

      <p>
        Terms:
        ${cf.termsAndConditions ? 'Accepted' : 'Not Accepted'}
      </p>

    </div>
  `;
}
