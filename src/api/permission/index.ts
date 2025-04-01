import request from "..";
import type { PermissionRecive } from "./type"

const BASE_URL = import.meta.env.VITE_SERVE + '/permission'
enum API {
    GET_ALL = 'getAllPermissions',
    GET_PERMISSION = 'getPermission',
    UPDATE_PERMISSION = 'updatePermission'
}

export function getAllPermissions() : Promise<PermissionRecive>{
    return request({
        url: BASE_URL + API.GET_ALL,
        method: 'GET'
    })
}

export function getPermission() : Promise<PermissionRecive>{
    return request({
        url: BASE_URL + API.GET_PERMISSION,
        method: 'GET'
    })
}