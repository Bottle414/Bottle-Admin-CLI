import request from "@/api";
import type { ImageUrl } from "./type"

const IMAGE_BASE = '/image'
enum API {
    GET_IMAGE = '/download'
}
export function getImage(imageUrl: ImageUrl){
    console.log('imageUrl' + imageUrl);
    return request({
        url: imageUrl,
        method: 'GET',
        data: imageUrl
    })
}