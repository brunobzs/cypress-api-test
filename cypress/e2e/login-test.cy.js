import Login from "../page_objects/Login";

const login = new Login()

describe('Login Tests', () => {
  it('Should log in successfully', () => {
    login.realizarLogin({ isSuccessful: true })
  })

  it('Should not log in with invalid credentials', () => {
    login.realizarLogin({ isSuccessful: false })
  })
});

