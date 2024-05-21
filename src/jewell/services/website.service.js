import http from "./http.common";

class WebsiteDataService {
  get() {
    return http.get(`/website/get`);
  }

  create(data) {
    return http.post(`/website/create`, data);
  }

  update(data) {
    return http.post(`/website/update`, data);
  }

  updateLaunchAt(data) {
    return http.post(`/website/update/launchat`, data);
  }
}

export default new WebsiteDataService();
