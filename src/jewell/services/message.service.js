import http from "./http.common";
const role = localStorage.getItem('role');

class MessageDataService {
  
  async list(data) {
    return await http.post(`/message/list`, data);
  }

  
}

export default new MessageDataService();
