import Usuario from "./Usuario";

const user = new Usuario()

class Produto {
  produtosAPI({ method, _id, token, body }) {
    return  cy.request({
      method,
      url: `https://serverest.dev/produtos/${_id ? _id : ''}`,
      headers: {
        'accept': 'application/json',
        Authorization: token,
        'Content-type': 'application/json'
      },
      body,
      failOnStatusCode: false
    })
  }

  /**
   * Apaga a lista de produtos
   */
  apagarListaDeProdutos() {
    const { email, password } = user.default // Default user

    cy.request('POST', 'https://serverest.dev/login', { email, password }).then(loginResponse => {
      expect(loginResponse.status).to.eq(200)
      const token = loginResponse.body.authorization;

      this.produtosAPI({
        method: 'GET',
        token
      }).then(getProdutosResponse => {
        const { produtos } = getProdutosResponse.body

        produtos.forEach(produto => {
          const { _id } = produto

          this.produtosAPI({
            method: 'GET',
            _id,
            token
          }).then(deleteResponse => {
            expect(deleteResponse.status).to.eq(200)
            expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
          })
        })
      })
    })
  }
}

export default Produto;