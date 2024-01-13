import http from "./http.common";
const role = localStorage.getItem('role');

class ProfileDataService {
  async list(data) {
    return await http.post(`/profile/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/profile/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/profile/create`, data);
  }

  update(data) {
    return http.post(`/profile/update/`, data);
  }

  delete(encrypt_id) {
    return http.get(`/profile/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/profiles`);
  }

  findByTitle(login_id) {
    return http.get(`/profiles?login_id=${login_id}`);
  }

  // async getState() {
  //   return { ...formStates };
  // }
}

export default new ProfileDataService();
