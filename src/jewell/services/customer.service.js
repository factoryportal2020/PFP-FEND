import http from "./http.common";

class CustomerDataService {
  getAll(data) {
    return http.get(`/customers/${data}`);
  }

  get(id) {
    return http.get(`/customers/edit/${id}`);
  }

  create(data) {
    return http.post("/customer/create", data);
  }

  update(id, data) {
    return http.put(`/customers/${id}`, data);
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
