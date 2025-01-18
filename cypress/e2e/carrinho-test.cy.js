import User from "../page_objects/User";

const user = new User();

describe('Shopping Cart Tests', () => {
  let authToken;
  const serveRestURL = 'https://serverest.dev';
  const usuariosURL = `${serveRestURL}/usuarios`
  const carrinhosURL = `${serveRestURL}/carrinhos`;

  before(() => {
    cy.request('GET', `${usuariosURL}?email=${user.default.email}`).then((response) => {
      if (response.body.quantidade > 0) {
        cy.request('DELETE', `${usuariosURL}/${response.body.usuarios[0]._id}`);
      }
    });

    cy.request('POST', usuariosURL, user.default).then((response) => {
      expect(response.status).to.eq(201); // Check if the status code is 201 (Created)
      expect(response.body.message).to.eq('Cadastro realizado com sucesso'); // Check if the response message is correct

      // Step 2: Authenticate and obtain the token
      cy.request('POST', `${serveRestURL}/login`, {
        email: user.default.email,
        password: user.default.password
      }).then((response) => {
        expect(response.status).to.eq(200);
        authToken = response.body.authorization;
      });
    });
  });

  it('Should create a new cart for the user', () => {
    const produtos = {
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
    };

    cy.request({
      method: 'POST',
      url: carrinhosURL,
      headers: {
        Authorization: authToken
      },
      body: produtos
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    });
  });

  it('Delete the cart', () => {
    cy.request({
      method: 'DELETE',
      url: `${carrinhosURL}/concluir-compra`,
      headers: {
        authorization: authToken, // Ensure `authToken` contains the valid token string
      },
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
      expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');
    });
  })
});