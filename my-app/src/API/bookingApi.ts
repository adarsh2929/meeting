import {deleteAPI, getAPI,postAPI, putAPI} from '../apis';

export const createBooking = async (url:string,data:any) =>{
    return await postAPI(url,data)

}

export const getBooking = async (url:string,params?:any) =>{
    return await getAPI(url,params)

}

export const updateBooking = async (url:string,data:any) =>{
    return await putAPI(url,data)

}

export const deleteBooking = async (url:string,data:any) =>{
    return await deleteAPI(url,data)

}
