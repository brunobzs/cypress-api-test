import {faker} from "@faker-js/faker";

describe('Login', () => {
  it('Should log in successfully', () => {
    cy.request('GET', '/usuarios').then( usuariosResponse => {
      const { email, password } = usuariosResponse.body.usuarios[0]

      cy.request('POST', '/login', { email, password }).then(response => {
        // Verify successful authentication
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
    })
  })

  it('Should not log in with invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      failOnStatusCode: false
    }).then(response => {
      // Verify unsuccessful authentication
      expect(response.status).to.equals( 401)
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  })
});

