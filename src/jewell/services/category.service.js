import http from "./http.common";

class CategoryDataService {
  async list(data) {
    return await http.post(`/category/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/category/get/${encrypt_id}`);
  }

  create(data) {
    return http.post("/category/create", data);
  }

  update(data) {
    return http.post(`/category/update/`, data);
  }

  delete(id) {
    return http.delete(`/categorys/${id}`);
  }

  deleteAll() {
    return http.delete(`/categorys`);
  }

  findByTitle(login_id) {
    return http.get(`/categorys?login_id=${login_id}`);
  }
}

export default new CategoryDataService();
