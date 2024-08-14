import { API } from "./api";

const AuthServices = {
    register: async (payload: {
        fullName: string;
        email: string;
        password: string;
        phoneNumber: string;
        role: string;
    }) => {

        return await API.post("/auth/register", payload);
    },

    login: async (payload: {
        email: string;
        password: string;
    }) => {
        return await API.post("/auth/login", payload);
    },

    update: async (accessToken: string, payload: {
        fullName: string;
        phoneNumber: string;
        role: string;
        userId: string
    }) => {
        return await API.put(`/auth/update/${payload.userId}`, payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })

    },

    deleteUser: async (accessToken: string, userId: string) => {

        return await API.delete(`/auth/${userId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    },

    getAllUsers: async (accessToken: string) => {
        return await API.get("/auth", {
            headers: { Authorization: `Bearer ${accessToken}` },
        })
    }
}

export default AuthServices;