import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },

})

api.interceptors.request.use(function (req) {
    const token = localStorage.getItem("token");
    
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return req

  });

  export default api