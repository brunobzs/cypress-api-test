import User from "./User";

const user = new User()

class Login {
  realizarLogin({ isSuccessful } = {}) {
    const { email, password } = isSuccessful ? user.default : user.new // Default user

    // Login with a valid user
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: { email, password },
      failOnStatusCode: !!isSuccessful
    }).then(response => {
      console.log(response)
      expect(response.status).to.eq(isSuccessful ? 200 : 401)
      expect(response.body.message).to.eq(isSuccessful ? 'Login realizado com sucesso' : 'Email e/ou senha inválidos')
    })
  }
}

export default Login;