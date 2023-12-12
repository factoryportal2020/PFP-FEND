import http from "./http.common";

class RegisterDataService {
    create(data) {
        return http.post("/admin/register", data);
    }
}

export default new RegisterDataService();
