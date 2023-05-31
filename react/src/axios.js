import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
})

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if(error.response && error.response.status === 401){
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('User')
        window.location.reload()
        return error;
    }
    throw error;
})

export default axiosInstance