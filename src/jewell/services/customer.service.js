import http from "./http.common";
const role = localStorage.getItem('role');


class CustomerDataService {
  async list(data) {
    return await http.post(`/customer/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/customer/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/customer/create`, data);
  }

  update(data) {
    return http.post(`/customer/update/`, data);
  }

  delete(encrypt_id) {
    return http.get(`/customer/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/customers`);
  }

  findByTitle(login_id) {
    return http.get(`/customers?login_id=${login_id}`);
  }

  // async getState() {
  //   return { ...formStates };
  // }
}

export default new CustomerDataService();
