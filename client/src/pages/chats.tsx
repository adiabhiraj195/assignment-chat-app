import Navbar from '../components/navbar'
import { useContext } from 'react'
import { UserContext } from '../context/auth-context'
import Sidebar from '../components/sidebar';
import EditForm from '../components/edit-form';

export default function ChatPage() {
    const { toggleEdit } = useContext(UserContext);


    const handleUserClick = (userId: number) => {
        console.log(`User with ID ${userId} clicked`);
    };
    return (
        <div>
            {toggleEdit && <EditForm />}
            <Navbar />
            <div className='flex'>
                <Sidebar />

                <div className='flex items-center justify-center bg-gray-200 w-full'>
                    <h1 className='text-4xl'>Chats will appear here</h1>
                </div>
            </div>
        </div>
    )
}
