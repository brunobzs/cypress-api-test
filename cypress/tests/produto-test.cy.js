import { faker } from "@faker-js/faker";

let authToken;

describe('Product', () => {
  before(() => {
    // Search for an admin user
    cy.request('GET', '/usuarios').then(usuarioResponse => {
      const { usuarios } = usuarioResponse.body;
      const admins = usuarios.filter(usuario => usuario.administrador === "true");
      const { email, password } = admins[0];

      // Login with a valid admin user
      cy.request('POST', '/login', { email, password }).then(loginResponse => {
        expect(loginResponse.status).to.eq(200)
        authToken = loginResponse.body.authorization;
      });
    });
  })

  it('Should register a product, edit and delete a product', () => {
    const produto = {
      nome: faker.commerce.product(),
      preco: Math.round(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 1000) + 1
    };

    // Register a product
    cy.request({
      method: 'POST',
      url: '/produtos',
      headers: {
        Authorization: authToken
      },
      body: produto,
      failOnStatusCode: false
    }).then(produtoResponse => {
      if (produtoResponse.statusText === 'Created') {
        expect(produtoResponse.status).to.eq(201)
        expect(produtoResponse.body.message).to.eq('Cadastro realizado com sucesso')
      } else {
        expect(produtoResponse.body.message).to.eq('Já existe produto com esse nome')
      }
      const { _id } = produtoResponse.body;

      // Check if the product was registered
      cy.request({
        method: 'GET',
        url: `/produtos/${_id}`,
        headers: {
          Authorization: authToken
        }
      }).then(getProdutoResponse => {
        const { nome, preco, descricao, quantidade } = getProdutoResponse.body;

        expect(nome).to.eq(produto.nome)
        expect(preco).to.eq(produto.preco)
        expect(descricao).to.eq(produto.descricao)
        expect(quantidade).to.eq(produto.quantidade)
      })

      // Edit the product
      cy.request({
        method: 'PUT',
        url: `/produtos/${_id}`,
        headers: {
          Authorization: authToken
        },
        body: {
          nome: faker.commerce.productName(),
          preco: Math.round(faker.commerce.price()),
          descricao: faker.commerce.productDescription(),
          quantidade: 100
        }
      }).then(editProdutoResponse => {
        expect(editProdutoResponse.status).to.eq(200)
        expect(editProdutoResponse.body.message).to.eq('Registro alterado com sucesso')
      })

      // Delete the product
      cy.request({
        method: 'DELETE',
        url: `/produtos/${_id}`,
        headers: {
          Authorization: authToken
        }
      }).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200)
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
      })
    });
  });
});