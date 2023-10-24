import http from "./http.common";

class CustomerDataService {
  list(data) {
    return http.post(`/customer/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/customer/get/${encrypt_id}`);
  }

  create(data) {
    return http.post("/customer/create", data);
  }

  update(data) {
    return http.post(`/customer/update/`, data);
  }

  delete(id) {
    return http.delete(`/customers/${id}`);
  }

  deleteAll() {
    return http.delete(`/customers`);
  }

  findByTitle(login_id) {
    return http.get(`/customers?login_id=${login_id}`);
  }
}

export default new CustomerDataService();
