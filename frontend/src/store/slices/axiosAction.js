import axios from "axios";

let baseURL = 'http://localhost:5000/api/v1';

if(process.env.NODE_ENV==='development'){
    baseURL = 'http://localhost:5000/api/v1';
}if(process.env.NODE_ENV==='production'){
    baseURL = 'https://hrms-fziq.onrender.com';
}

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// api.interceptors.request.use(
//     (config)=>{
//         const token = localStorage.getItem("token");
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error)=>{
//         return Promise.reject(error);
//     }
// )


export const getAxios = async(url, params)=>{
    return await api.get(url, params);
}
export const postAxios = async(url, data)=>{
    return await api.post(url, data);
}
export const putAxios = async(url, data)=>{
    return await api.put(url, data);
}
export const patchAxios = async(url, data)=>{
    return await api.patch(url, data);
}
export const deleteAxios = async(url)=>{
    return await api.delete(url);
}