import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)


export const getAxios = async(url)=>{
    return await api.get(url);
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