import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { UserInterface } from "../lib/users-interface";

interface UserContextInterface {
    email: string | null;
    setEmail: Dispatch<SetStateAction<string | null>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    userId: string | null;
    setUserId: Dispatch<SetStateAction<string | null>>;
    userName: string | null;
    setUserName: Dispatch<SetStateAction<string | null>>;
    toggleEdit: boolean;
    setToggleEdit:Dispatch<SetStateAction<boolean>>;
    phoneNumber: string |null;
    setPhoneNumber: Dispatch<SetStateAction<string | null>>;
    role: string |null;
    setRole:Dispatch<SetStateAction<string | null>>;
    allUsers: Array<UserInterface>;
    setAllUsers: Dispatch<SetStateAction<UserInterface[]>>
}

const defaultValues = {
    email: null,
    setEmail: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    userId: null,
    setUserId: () => { },
    userName: null,
    setUserName: () => { },
    toggleEdit: false,
    setToggleEdit: ()=>{},
    role: null,
    setRole: ()=>{},
    phoneNumber: null,
    setPhoneNumber: ()=>{},
    allUsers: [],
    setAllUsers: ()=>{}
}

export const UserContext = createContext<UserContextInterface>(defaultValues);

interface UserProviderInterface {
    children: JSX.Element;
}

export const UserProvider = ({ children }: UserProviderInterface) => {
    const [email, setEmail] = useState<string | null>(defaultValues.email);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValues.isAuthenticated);
    const [userId, setUserId] = useState<string | null>(defaultValues.userId);
    const [userName, setUserName] = useState<string | null>(defaultValues.userName);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(defaultValues.phoneNumber);
    const [role, setRole] = useState<string | null>(defaultValues.role);
    const [toggleEdit, setToggleEdit] = useState<boolean>(defaultValues.toggleEdit);
    const [allUsers, setAllUsers] = useState<Array<UserInterface>>(defaultValues.allUsers);

    return (
        <UserContext.Provider
            value={{
                email,
                setEmail,
                isAuthenticated,
                setIsAuthenticated,
                userId,
                setUserId,
                userName,
                setUserName,
                toggleEdit,
                setToggleEdit,
                role,
                setRole,
                phoneNumber,
                setPhoneNumber,
                allUsers,
                setAllUsers
            }}
        >
            {children}
        </UserContext.Provider>
    )
}