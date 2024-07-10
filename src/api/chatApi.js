import { api, escalateError } from './index';

const chatApi = {
  async showMensages (){
  try {
      return await api.post('/getMessages/');
    } catch (err) {
      escalateError(err);
      return err;
    }
  },
  async sendMensage(data){
    try {
      return await api.post('/createMessage/',data);
    } catch (err) {
      escalateError(err);
      return err;
    }
  },
};

export default chatApi;