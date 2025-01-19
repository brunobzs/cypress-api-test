import Carrinho from "../page_objects/Carrinho";
import Login from "../page_objects/Login";
import Usuario from "../page_objects/Usuario";

const { carrinhoAPI } = new Carrinho();
const { loginAPI } = new Login();
const usuarioPage = new Usuario();

describe('Shopping Cart Tests', () => {
  let authToken;
  const novoUsuario = usuarioPage.newUser;

  before(() => {
    // Check if the default user exists and delete it if found
    // cy.request('GET', `https://serverest.dev/usuarios?email=${loginPage.user.default.email}`)
    usuarioPage.usuariosAPI({
      method: 'GET',
      url: `https://serverest.dev/usuarios?email=${novoUsuario.email}`
    }).then((response) => {
      console.log(response) ;
      if (response.body.quantidade > 0) {
        cy.request('DELETE', `https://serverest.dev/usuarios/${response.body.usuarios[0]._id}`);
      }
    });

    // Step 1: Create the default user
    usuarioPage.usuariosAPI({
      method: 'POST',
      body: novoUsuario
    }).then(usuarioResponse => {
      console.log(usuarioResponse.body);

      // Step 2: Authenticate and obtain the token
      loginAPI({
        email: novoUsuario.email,
        password: novoUsuario.password
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

    carrinhoAPI({
      method: 'POST',
      authToken,
      body: produtos
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    });
  });

  it('Delete the cart', () => {
    carrinhoAPI({
      method: 'DELETE',
      url: 'https://serverest.dev/carrinhos/concluir-compra',
      authToken
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
      expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');
    });
  })
});