import axiosReq from "../config/axios";

const getAllUsers = () => {
    return axiosReq.get('users')
}

export {
    getAllUsers
}