import http from "./http.common";

class ApiDataService {
    getLogo(data = {}) {
        return http.post(`logo`, data);
    }

    getBanner(data = {}) {
        return http.post(`banner`, data);
    }

    getCustomer(data = {}) {
        return http.post(`customer`, data);
    }

    getFeature(data = {}) {
        return http.post(`feature`, data);
    }

    getAbout(data = {}) {
        return http.post(`about`, data);
    }

    getContact(data = {}) {
        return http.post(`contact`, data);
    }

    getCategoryList(data = {}) {
        return http.post(`category`, data);
    }

    getProductList(data) {
        return http.post(`product`, data);
    }

    getProduct(encrypt_id) {
        return http.get(`/product/${encrypt_id}`);
    }

    getProfile(encrypt_id) {
        return http.get(`/profile/get/${encrypt_id}`);
    }

    updateProfile(data) {
        return http.post(`/profile/update/`, data);
    }

    saveEnquiry(data) {
        return http.post(`/enquiry/save/`, data);
    }

    getEnquiryList(data){
        return http.post(`enquiry`, data);
    }
}

export default new ApiDataService();
