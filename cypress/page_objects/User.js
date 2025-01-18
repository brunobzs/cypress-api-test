import {faker} from '@faker-js/faker';

class User {
  get default() {
    return require('../fixtures/user.json')
  }

  get new() {
    return {
      nome: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    }
  }
}

export default User;
