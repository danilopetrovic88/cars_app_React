import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      'Content-Type': 'multipart/form-data',
    },

})

const endpoints = {
    cars: '/cars',
}

export const addNewCarService = async (carData) => {
    const data = await api.post(endpoints.cars, carData)

    return data;
}

export const EditCar = async (carData, carId) => {
    const data = await api.put(endpoints.cars + `/${carId}`, carData)

    return data;
}