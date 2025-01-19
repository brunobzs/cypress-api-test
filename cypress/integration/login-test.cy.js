import Login from "../page_objects/Login";
import Usuario from "../page_objects/Usuario";

const { loginAPI } = new Login()
const user = new Usuario()

describe('Login Tests', () => {
  it('Should log in successfully', () => {
    user.usuariosAPI({
      method: 'GET',
    }).then( usuariosResponse => {
      console.log(usuariosResponse.body.usuarios[0])
      const { email, password } = usuariosResponse.body.usuarios[0]

      // Realizar login
      loginAPI({
        email,
        password
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
    })
  })

  it('Should not log in with invalid credentials', () => {
    const { email, password } = user.newUser // Invalid user

    loginAPI({
      email,
      password
    }).then(response => {
      expect(response.status).to.eq( 401)
      expect(response.body.message).to.eq('Email e/ou senha inválidos')
    })
  })
});

