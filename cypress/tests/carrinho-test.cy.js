import {faker} from "@faker-js/faker";

describe('Shopping Cart', () => {
  let authToken;
  const novoUsuario = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: "true"
  };

  before(() => {
    // Step 1: Check if the default user exists and delete it if found
    cy.request({ method: 'GET', url: `/usuarios?email=${novoUsuario.email}`}).then(response => {
      if (response.body.quantidade > 0) {
        const { _id } = response.body.usuarios[0];
        cy.request('DELETE', `/usuarios/${_id}`);
      }

      // Step 2: Create the default user
      cy.request('POST', '/usuarios', novoUsuario).then(usuarioResponse => {
        expect(usuarioResponse.status).to.eq(201); // Verify the user creation status is 201
        expect(usuarioResponse.body.message).to.eq('Cadastro realizado com sucesso'); // Confirm success message

        // Step 3: Authenticate and obtain the token
        const { email, password } = novoUsuario;
        cy.request('POST', '/login', { email, password }).then(loginResponse => {
          expect(loginResponse.status).to.eq(200); // Verify successful authentication
          authToken = loginResponse.body.authorization; // Store the authentication token
        });
      });
    });
  });

  it('Should create a new cart for the user', () => {
    // Create a cart with specified products
    cy.request({
      method: 'POST',
      url: '/carrinhos',
      headers: {
        Authorization: authToken
      },
      body: {
        produtos: [
          {
            "idProduto": "BeeJh5lz3k6kSIzA",
            "quantidade": 1
          },
          {
            "idProduto": "K6leHdftCeOJj8BJ",
            "quantidade": 3
          }
        ]
      }
    }).then(response => {
      expect(response.status).to.eq(201); // Verify cart creation status is 201
      expect(response.body.message).to.eq('Cadastro realizado com sucesso'); // Confirm success message
    });
  });

  it('Delete the cart', () => {
    cy.request({
      method: 'DELETE',
      url: `/carrinhos/concluir-compra`,
      headers: {
        Authorization: authToken
      }
    }).then(deleteResponse => {
      expect(deleteResponse.status).to.eq(200); // Verify successful deletion
      expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso'); // Confirm success message
    });
  })
});
