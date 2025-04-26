import axios from 'axios';


const endPoint = process.env.REACT_APP_API_ENDPOINT

const apiConfig = () => {
    return {
        headers:{
            'Content-Type': 'application/json',
           
        },
        methods:"GET,POST,PUT,DELETE",
    }
}

export const getAPI = async (url: string,params?:any) => {
    return axios.get(`${endPoint}${url}`, {params,...apiConfig()})
}

export const postAPI = async (url: string, data?: any) => {
    return axios.post(`${endPoint}${url}`, data, apiConfig())
}

export const putAPI = async (url: string, data?: any) => {
    return axios.put(`${endPoint}${url}`, data, apiConfig())
}

export const deleteAPI = async (url: string, data?: any) => {
    return axios.delete(`${endPoint}${url}`, {data, ...apiConfig()})
}

