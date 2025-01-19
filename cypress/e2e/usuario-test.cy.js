import Usuario from "../page_objects/Usuario";

const user = new Usuario()

describe('User API Test', () => {
  it('Should create a new user and delete it successfully', () => {
    const { usuariosAPI } = user;

    // Step 1: Create a new user
    usuariosAPI({
      method: 'POST',
      body: user.newUser
    }).then(response => {
      // Step 2: Store the user ID
      expect(response.status).to.eq(201);
      const userId = response.body._id;

      // Step 3: Delete the user
      usuariosAPI({
        method: 'DELETE',
        userId
      }).then(deleteResponse => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');

        // Step 4: Verify deletion
        usuariosAPI({
          method: 'GET',
          userId
        }).then(getResponse => {
          expect(getResponse.status).to.eq(400);
          expect(getResponse.body.message).to.eq('Usuário não encontrado');
        });
      });
    });
  });
});
