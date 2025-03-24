import request from "@/utils/request";

enum API {
    GETSPU_URL = ''
}

export async function getSPU(){
    try {
        const response = await request.get(API.GETSPU_URL)
        return response
    } catch (error) {
        return Promise.reject(error)
    }
}