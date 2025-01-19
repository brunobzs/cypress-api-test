import Usuario from "./Usuario";

const user = new Usuario()

class Login {
  /**
   * Login API
   *
   * @param {object} params
   * @param {string} params.email
   * @param {string} params.password
   * @returns {Cypress.Chainable<Cypress.Response<any>>}
   */
  loginAPI({ email, password } = {}) {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: { email, password },
      failOnStatusCode: false
    })
  }
}

export default Login;