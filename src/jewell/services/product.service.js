import http from "./http.common";
const role = localStorage.getItem('role');

class ItemDataService {
  async list(data) {
    return await http.post(`/product/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/product/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/product/create`, data);
  }

  update(data) {
    return http.post(`/product/update/`, data);
  }

  getCategory(selectCondition) {
    return http.get(`/product/category/${selectCondition}`);
  }

  delete(encrypt_id) {
    return http.get(`/product/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByTitle(login_id) {
    return http.get(`/products?login_id=${login_id}`);
  }
}

export default new ItemDataService();
