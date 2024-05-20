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

    getProduct(data) {
        return http.post(`/product/${data.encrypt_id}`, data);
    }

    getProfile(encrypt_id) {
        return http.get(`/profile/get/${encrypt_id}`);
    }

    updateProfile(data) {
        return http.post(`/profile/update`, data);
    }

    saveEnquiry(data) {
        return http.post(`/enquiry/save`, data);
    }

    getEnquiryList(data) {
        return http.post(`enquiry`, data);
    }

    saveFavourite(data) {
        return http.post(`/favourite/save`, data);
    }

    getFavouriteList(data) {
        return http.post(`favourite`, data);
    }

    saveSubscribe(data) {
        return http.post(`/subscribe/save`, data);
    }

    saveMessage(data) {
        return http.post(`/message/save`, data);
    }

}

export default new ApiDataService();
