import http from "./http.common";

class DashboardDataService {

  get(data) {
    return http.post(`/dashboard`, data);
  }

  getNotification(data) {
    return http.post(`/notification`, data);
  }

}

export default new DashboardDataService();
