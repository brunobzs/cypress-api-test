import Utilities from "./utils/Utilities";

const utilities = new Utilities()
const apiURL = require('../fixtures/urls.json');

describe('User API Test', () => {
  it('Should create a new user and delete it successfully', () => {
    const { newUser } = utilities;

    // Step 1: Create a new user
    cy.request('POST', apiURL.usuarios, newUser).then(createResponse => {
      // Step 2: Store the user ID
      expect(createResponse.status).to.eq(201);
      const { _id } = createResponse.body;

      // Step 3: Delete the user
      cy.request('DELETE', `${apiURL.usuarios}/${_id}`).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');

        // Step 4: Verify deletion
        cy.request({
          method: 'GET',
          url: `${apiURL.usuarios}/${_id}`,
          failOnStatusCode: false
        }).then(getResponse => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body.message).to.eq('Usuário não encontrado');
        });
      });
    });
  });
});
