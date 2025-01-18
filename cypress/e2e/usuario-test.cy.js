import User from "../page_objects/User";

const user = new User()

describe('User API Test', () => {
  it('Should create a new user and delete it successfully', () => {
    const serveRestURL = 'https://serverest.dev/usuarios';

    // Step 1: Create a new user
    cy.request('POST', serveRestURL, user.new).then(response => {
      // Step 2: Store the user ID
      expect(response.status).to.eq(201);
      const userId = response.body._id;

      // Step 3: Delete the user
      cy.request('DELETE', `${serveRestURL}/${userId}`).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');

        // Step 4: Verify deletion
        cy.request({
          method: 'GET',
          url: `${serveRestURL}/${userId}`,
          failOnStatusCode: false
        }).then(getResponse => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body.message).to.eq('Usuário não encontrado');
        });
      });
    });
  });
});
