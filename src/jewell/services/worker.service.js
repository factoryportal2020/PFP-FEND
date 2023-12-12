import http from "./http.common";

class WorkerDataService {
  async list(data) {
    return await http.post(`/worker/list`, data);
  }

  get(encrypt_id) {
    return http.get(`/worker/get/${encrypt_id}`);
  }

  create(data) {
    return http.post("/worker/create", data);
  }

  update(data) {
    return http.post(`/worker/update/`, data);
  }

  delete(id) {
    return http.delete(`/workers/${id}`);
  }

  deleteAll() {
    return http.delete(`/workers`);
  }

  findByTitle(login_id) {
    return http.get(`/workers?login_id=${login_id}`);
  }
}

export default new WorkerDataService();
