import { api, escalateError } from './index';
const userApi ={
  async loginUser(username,password) {

    try {
      return await api.post('/login/',
        {
    nombreUsuario: username,
    contrasena: password
  }
      );
    } catch (err) {
      escalateError(err);
      return err;
    }
  },
  async registerUser(data) {
    try {
    return await api.post('/registroUsuario/',data);
    } catch (err) {
      escalateError(err);
      return err;
    }
  },
  async getInfoUser(username){
    try{
      return await api.get(`/findUser?nombreUsuario=${username}`);
    }catch (err) {
      escalateError(err);
      return err;
    }
  }
};

export default userApi;