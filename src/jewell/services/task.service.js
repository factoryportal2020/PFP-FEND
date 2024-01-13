import http from "./http.common";

class TaskDataService {
  async list(data) {
    return await http.post(`/task/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/task/get/${encrypt_id}`);
  }

  create(data) {
    return http.post(`/task/create`, data);
  }

  update(data) {
    return http.post(`/task/update/`, data);
  }

  updateStatus(data) {
    return http.post(`/task/update/status`, data);
  }

  getCategory(selectCondition) {
    return http.get(`/task/category/${selectCondition}`);
  }

  getCustomer(selectCondition) {
    return http.get(`/task/customer/${selectCondition}`);
  }

  getWorker(selectCondition) {
    return http.get(`/task/worker/${selectCondition}`);
  }

  delete(encrypt_id) {
    return http.get(`/task/delete/${encrypt_id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByTitle(login_id) {
    return http.get(`/tasks?login_id=${login_id}`);
  }
}

export default new TaskDataService();
