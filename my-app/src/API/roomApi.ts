import {deleteAPI, getAPI,postAPI, putAPI} from '../apis';

export const createRoom = async (url:string,data:any) =>{
    return await postAPI(url,data)

}

export const getRoom = async (url:string,params?:any) =>{
    return await getAPI(url,params)

}

export const updateRoom = async (url:string,data:any) =>{
    return await putAPI(url,data)

}

export const deleteRoom = async (url:string,data:any) =>{
    return await deleteAPI(url,data)

}
