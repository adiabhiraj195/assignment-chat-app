import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/auth-context';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { userName, setToggleEdit, toggleEdit, userId } = useContext(UserContext);
    const { logout, deleteUser } = useAuth();

    const onEdit = ()=>{
        setToggleEdit(!toggleEdit);
    }

    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-semibold">{userName}</div>
                <div className="flex space-x-4">
                    
                    <button
                        onClick={()=> deleteUser(userId as string)}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                        Delete Account
                    </button>
                    <button
                        onClick={onEdit}
                        className="bg-white text-blue-500 px-3 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Edit
                    </button>
                    <button
                        onClick={()=> logout()}
                        className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;