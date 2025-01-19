class Carrinho {
  carrinhoAPI({ method, url, authToken, body }) {
    const apiURL = url || `https://serverest.dev/carrinhos`

    return cy.request({
      method,
      url: apiURL,
      headers: {
        Authorization: authToken
      },
      body
    })
  }
}

export default Carrinho;