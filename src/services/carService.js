import api from "./apiService";

const endpoints = {
    cars: '/cars',
}

export const getAllCars = async () => {
    const data = await api.get(endpoints.cars);

    return data;
}

export const getSingleCar = async (carId) => {
    const data = await api.get(endpoints.cars + `/${carId}`)

    return data;
}

export const addNewCar = async (carData) => {
    const data = await api.post(endpoints.cars, carData)

    return data;
}