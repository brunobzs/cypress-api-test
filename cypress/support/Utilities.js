import { faker } from '@faker-js/faker';

class Utilities {
  static newUser;
  get newUser() {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true"
    }
  }

  get newProduct() {
    return {
      nome: faker.commerce.product(),
      preco: Math.round(faker.commerce.price()),
      descricao: faker.commerce.productDescription(),
      quantidade: Math.floor(Math.random() * 1000) + 1
    }
  }
}

export default new Utilities();
