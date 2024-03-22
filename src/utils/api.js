import axiosReq from "../config/axios";

const getAllUsers = () => {
    return axiosReq.get('users')
}

const searchUsers = (params) => {
    return axiosReq.get('search/users', {
        params
    })
}

export {
    getAllUsers,
    searchUsers
}