import { useContext } from "react"
import AuthServices from "../services/auth-services"
import { ValidateRegistration } from "../lib/middleware"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useToast from "./useToster"
import { UserContext } from "../context/auth-context"
import { jwtDecode } from "jwt-decode"
import { UserInterface } from "../lib/users-interface"

const useAuth = () => {
    const navigate = useNavigate()
    const {
        toastSuccess,
        toastError
    } = useToast();

    const {
        setUserId,
        setEmail,
        setIsAuthenticated,
        setUserName,
        setPhoneNumber,
        setRole,
        setAllUsers
    } = useContext(UserContext);

    const registerUser = async (
        payload: {
            fullName: string;
            email: string;
            password: string;
            confirmPassword: string;
            phoneNumber: string;
            role: string;
        }
    ) => {

        if (!ValidateRegistration({
            email: payload.email,
            password: payload.password,
            confirmPassword: payload.confirmPassword,
        })) return;

        try {
            await AuthServices.register({
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phoneNumber,
                role: payload.role,
            })

            navigate("/");

            toastSuccess(`Hi ${payload.fullName}! login here`)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error;
                if (response?.data.error.length > 0) {
                    toastError(response?.data.error);
                } else {
                    toastError('An unknown error has occurred. Please try again');
                }
            } else {
                toastError('An unknown error has occurred. Please try again');
            }
        }
    }

    // login user 
    const login = async (payload: {
        email: string;
        password: string;
    }) => {
        if (payload.email === "" || payload.password === "") return;

        try {
            const response = await AuthServices.login({
                email: payload.email,
                password: payload.password
            });

            // console.log(response + "this is responce");

            localStorage.setItem('Token', response.data.accessToken);

            const userData: any = await jwtDecode(response.data.accessToken);
            // console.log(userData);

            setUserName(userData.user.fullName);
            setEmail(userData.user.email);
            setUserId(userData.user.id);
            setPhoneNumber(userData.user.phoneNumber);
            setRole(userData.user.role);
            setIsAuthenticated(true);


            navigate("/chats");
            toastSuccess(`Successfully logged in!`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error;
                if (response?.data.error.length > 0) {
                    toastError(response?.data.error);
                } else {
                    toastError('Incorrect Username or Password');
                }
            } else {
                toastError('An unknown error has occured. Please try again.');
            }
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem("Token");
            setUserId(null);
            setEmail(null);
            setUserName(null);
            setIsAuthenticated(false);
            navigate('/');
            toastSuccess('Logged out!');
        } catch (error) {
            console.log(error);
        }
    }

    const updateInfo = async (payload: {
        fullName: string
        phoneNumber: string;
        role: string;
        userId: string;

    }) => {
        try {
            await AuthServices.update(
                localStorage.getItem("Token") as string,
                {
                    fullName: payload.fullName,
                    phoneNumber: payload.phoneNumber,
                    role: payload.role,
                    userId: payload.userId,
                })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async(userId: string)=>{
        try{
            await AuthServices.deleteUser(
                localStorage.getItem("Token") as string,
                userId
            )
            navigate("/register");
        }catch(error){
            console.log(error);
        }
    }

    const getAllUsers = async()=>{
        try{
            const response = await AuthServices.getAllUsers(
                localStorage.getItem("Token") as string,
            );

            setAllUsers(response.data as Array<UserInterface>);
        }catch(error){
            console.log(error);
        }
    }


    return {
        registerUser,
        login,
        logout,
        updateInfo,
        deleteUser,
        getAllUsers
    }
}

export { useAuth };