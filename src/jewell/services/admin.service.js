import http from "./http.common";
const role = localStorage.getItem('role');


class AdminDataService {
  async list(data) {
    return await http.post(`/admin/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/admin/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/admin/create`, data);
  }

  update(data) {
    return http.post(`/admin/update/`, data);
  }

  delete(encrypt_id) {
    return http.get(`/admin/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/admins`);
  }

  findByTitle(login_id) {
    return http.get(`/admins?login_id=${login_id}`);
  }

  // async getState() {
  //   return { ...formStates };
  // }
}

export default new AdminDataService();
