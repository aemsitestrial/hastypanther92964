export default async function decorate(block) {
  try {
    const path = block.textContent.trim();

    console.log('CF Path:', path);

    const query = `
      query($path:String!) {
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

    const response = await fetch(
      '/content/_cq_graphql/global/endpoint.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { path },
        }),
      },
    );

    const result = await response.json();

    console.log('GraphQL Result:', result);

    const cf = result?.data?.mycfmodelByPath?.item;

    if (!cf) {
      block.innerHTML = '<p>CF data not found</p>';
      return;
    }

    block.innerHTML = `
      <div class="mycf-card">
        <h2>${cf.name?.[0] ?? ''}</h2>
        <p>DOB: ${cf.dateOfBirth}</p>
        <p>Mobile: ${cf.mobileNumber}</p>
        <p>${cf.address?.plaintext ?? ''}</p>
        <p>Terms: ${cf.termsAndConditions}</p>
      </div>
    `;
  } catch (e) {
    console.error('MYCF ERROR', e);

    block.innerHTML = `
      <p style="color:red">
        Error loading content fragment
      </p>
    `;
  }
}
