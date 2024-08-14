import { useEffect, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserContext } from '../context/auth-context';

const Sidebar = () => {
    const { getAllUsers } = useAuth();
    const { allUsers } = useContext(UserContext)

    useEffect(() => {
        getAllUsers();
        // console.log(allUsers)
    }, [])
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <h2 className="text-2xl font-semibold p-4">Users</h2>
            <ul className="flex-1 overflow-y-auto">
                {allUsers?.map((user) => (
                    <li
                        key={user.id}
                        // onClick={() => onUserClick(user.id)}
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                        {user.fullName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

