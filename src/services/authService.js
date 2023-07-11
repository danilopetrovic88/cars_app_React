import api from './apiService'

const endpoints = {
    register: '/register',
    login: '/login',
    me: '/me',
    logout: '/logout'

}

export const registerUser = async (registerData) => {
    const {data} = await api.post(endpoints.register,registerData)
    return data
};
export const loginUser = async (loginData) =>  {
    const  {data}  = await api.post(endpoints.login,loginData)
    
    if(data){
        return localStorage.setItem("user", JSON.stringify(data))
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