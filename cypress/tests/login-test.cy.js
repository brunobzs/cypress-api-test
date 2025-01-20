import Utilities from "../support/utilities";

const utilities = new Utilities()
const apiURL = require('../fixtures/urls.json')

describe('Login Tests', () => {
  it('Should log in successfully', () => {
    cy.request('GET', apiURL.usuarios).then( usuariosResponse => {
      const { email, password } = usuariosResponse.body.usuarios[0]

      cy.request('POST', apiURL.login, { email, password }).then(response => {
        // Verify successful authentication
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
    })
  })

  it('Should not log in with invalid credentials', () => {
    const { email, password } = utilities.newUser

    cy.request({
      method: 'POST',
      url: apiURL.login,
      body: {
        email, password
      },
      failOnStatusCode: false
    }).then(response => {
      // Verify unsuccessful authentication
      expect(response.status).to.equals( 401)
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  })
});

