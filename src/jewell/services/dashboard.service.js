import http from "./http.common";

class DashboardDataService {
  get(data) {
    return http.post(`/dashboard`, data);
  }

  getNotification(data) {
    return http.post(`/notification`, data);
  }

  getProfile() {
    return http.get(`/user/profile`);
  }
}

export default new DashboardDataService();
