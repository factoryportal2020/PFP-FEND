import http from "./http.common";

class TaskDataService {
  async list(data) {
    return await http.post(`/task/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/task/get/${encrypt_id}`);
  }

  create(data) {
    return http.post("/task/create", data);
  }

  update(data) {
    return http.post(`/task/update/`, data);
  }

  getCategory() {
    return http.get(`/task/category`);
  }

  getCustomer() {
    return http.get(`/task/customer`);
  }

  getWorker() {
    return http.get(`/task/worker`);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(login_id) {
    return http.get(`/tasks?login_id=${login_id}`);
  }
}

export default new TaskDataService();
