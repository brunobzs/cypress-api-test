import {faker} from '@faker-js/faker';

class Usuario {
  get newUser() {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    }
  }

  usuariosAPI({ method, url, userId, body }) {
    const apiURL = url || `https://serverest.dev/usuarios/${userId ? userId : ''}`

    return cy.request({
      method,
      url: apiURL,
      body,
      failOnStatusCode: false
    })
  }
}

export default Usuario;
