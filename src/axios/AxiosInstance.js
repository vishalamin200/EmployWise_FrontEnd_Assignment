import axios from 'axios';
const token = sessionStorage.getItem("authToken")

const axiosInstance = axios.create({
    baseURL: 'https://reqres.in/',
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        'Authorization':token? `Bearer ${token}`:"",

    } 
})


export default axiosInstance