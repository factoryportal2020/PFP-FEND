import http from "./http.common";
const role = localStorage.getItem('role');

class FavouriteDataService {
  async list(data) {
    return await http.post(`/favourite/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/category/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/category/create`, data);
  }

  update(data) {
    return http.post(`/category/update/`, data);
  }

  delete(encrypt_id) {
    return http.get(`/category/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/categorys`);
  }

  findByTitle(login_id) {
    return http.get(`/categorys?login_id=${login_id}`);
  }
}

export default new FavouriteDataService();
