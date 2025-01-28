import {faker} from "@faker-js/faker";

describe('User', () => {
  it('Should create a new user and delete it successfully', () => {
    // Step 1: Create a new user
    cy.request('POST', '/usuarios', {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    }).then(createResponse => {
      // Step 2: Store the user ID
      expect(createResponse.status).to.eq(201);
      const { _id } = createResponse.body;

      // Step 3: Delete the user
      cy.request('DELETE', `/usuarios/${_id}`).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');

        // Step 4: Verify deletion
        cy.request({
          method: 'GET',
          url: `/usuarios/${_id}`,
          failOnStatusCode: false
        }).then(getResponse => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body.message).to.eq('Usuário não encontrado');
        });
      });
    });
  });
});
