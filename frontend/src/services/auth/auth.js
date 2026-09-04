import { useSnackbar } from "notistack";
import { postAxios } from "../../store/slices/axiosAction";


export const handleRegister = async(data)=>{
   
    const res = await postAxios('/employees/addEmployee', data);

    return res;
    
}
export const handleLogin = async(data)=>{
   
    const res = await postAxios('/employees/login', data);
    
    // if(res.status===200){
    //     const{token, user} = res.data.data
        
    //     localStorage.setItem("token", token.token);
        
    //     localStorage.setItem("user", JSON.stringify(user));
    // }

    return res;
    
}

export const getToken = ()=>{
    return localStorage.getItem("token");
}

export const getUser = ()=>{
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user): null;
}

export const isAuthenticated = ()=>{
    return !!getToken();
}

export const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}