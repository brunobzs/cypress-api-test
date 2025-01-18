import { faker } from "@faker-js/faker";
import User from "../page_objects/User";

const user = new User()

describe('Product Test', () => {
  it('Should register a product, edit and delete a product', () => {
    let token, produtoID;
    const { email, password } = user.default // Default user
    const produto = {
      nome: faker.commerce.product(),
      preco: Math.round(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: 10
    }

    // Login with a valid user
    cy.request('POST', 'https://serverest.dev/login', { email, password }).then(loginResponse => {
      expect(loginResponse.status).to.eq(200)
      token = loginResponse.body.authorization;

      // Register a product
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: {
          'accept': 'application/json',
          Authorization: token,
          'Content-type': 'application/json'
        },
        body: produto
      }).then(produtoResponse => {
        console.log("Response: ", produtoResponse)
        if (produtoResponse.statusText === 'Created') {
          expect(produtoResponse.status).to.eq(201)
          expect(produtoResponse.body.message).to.eq('Cadastro realizado com sucesso')
        } else {
          expect(produtoResponse.body.message).to.eq('Já existe produto com esse nome')
        }
        produtoID = produtoResponse.body._id;

        // Check if the product was registered
        cy.request('GET', `https://serverest.dev/produtos/${produtoID}`).then(getProdutoResponse => {
          console.log(getProdutoResponse)
          const { nome, preco, descricao, quantidade } = getProdutoResponse.body;
          expect(nome).to.eq(produto.nome)
          expect(preco).to.eq(produto.preco)
          expect(descricao).to.eq(produto.descricao)
          expect(quantidade).to.eq(produto.quantidade)
        })
      });
    })
  });
});