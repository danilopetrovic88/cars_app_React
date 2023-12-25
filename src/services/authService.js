import api from './apiService'

const endpoints = {
    register: '/register',
    login: '/login',
    me: '/me',
    logout: '/logout'

}

export const registerUser = async (registerData) => {
    try {
        const {data} = await api.post(endpoints.register,registerData)
        return data
    } catch (error) {
        return localStorage.setItem("registerError", JSON.stringify(error.response.data))
    }
};
export const loginUser = async (loginData) =>  {
    try {
        const  {data}  = await api.post(endpoints.login,loginData)
    
        if(data){
            return localStorage.setItem("user", JSON.stringify(data))
        } 
    } catch (error) {
        return localStorage.setItem("loginError", JSON.stringify(error.response.data))
    }
};

export const getUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        return JSON.parse(userStr);
    } else {
        return null;
    }

}

export const logoutUser = () => {
    localStorage.removeItem("user");
}