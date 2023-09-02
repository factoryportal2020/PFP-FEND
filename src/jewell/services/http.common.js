import axios from "axios";

let baseURL = (process.env.REACT_APP_API_URL) 

export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": baseURL,
        // 'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
    }
});

// export default axios.create({
//     baseURL: "http://backend.dpigodownstock.co.in/public/api",
//     headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": "http://backend.dpigodownstock.co.in/public/api",
//         'Authorization': 'Bearer ' + window.localStorage.getItem("token"),
//     }
// });

