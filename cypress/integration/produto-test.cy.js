import { faker } from "@faker-js/faker";
import Login from "../page_objects/Login";
import Produto from "../page_objects/Produto";
import Usuario from "../page_objects/Usuario";

const { loginAPI } = new Login()
const { produtosAPI } = new Produto()
const { usuariosAPI } = new Usuario()

describe('Product Test', () => {
  it('Should register a product, edit and delete a product', () => {
    const produto = {
      nome: faker.commerce.product(),
      preco: Math.round(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: 10
    }

    usuariosAPI({ method: 'GET' }).then(usuarioResponse => {
      const { usuarios } = usuarioResponse.body;
      const admins = usuarios.filter(usuario => usuario.administrador === "true");
      const { email, password } = admins[0];

      // Login with a valid user
        loginAPI({ email, password }).then(loginResponse => {
        expect(loginResponse.status).to.eq(200)
        const Authorization = loginResponse.body.authorization;

        // Register a product
        produtosAPI({
          method: 'POST',
          token: Authorization,
          body: produto
        }).then(produtoResponse => {
          if (produtoResponse.statusText === 'Created') {
            expect(produtoResponse.status).to.eq(201)
            expect(produtoResponse.body.message).to.eq('Cadastro realizado com sucesso')
          } else {
            expect(produtoResponse.body.message).to.eq('Já existe produto com esse nome')
          }
          const { _id } = produtoResponse.body;

          // Check if the product was registered
          produtosAPI({
            method: 'GET',
            _id,
            token: Authorization,
          }).then(getProdutoResponse => {
            const { nome, preco, descricao, quantidade } = getProdutoResponse.body;
            expect(nome).to.eq(produto.nome)
            expect(preco).to.eq(produto.preco)
            expect(descricao).to.eq(produto.descricao)
            expect(quantidade).to.eq(produto.quantidade)
          })

          // Edit the product
          produtosAPI({
            method: 'PUT',
            _id,
            token: Authorization,
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
          produtosAPI({
            method: 'DELETE',
            _id,
            token: Authorization
          }).then(deleteResponse => {
            expect(deleteResponse.status).to.eq(200)
            expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
          })
        });
      })
    })
  });
});