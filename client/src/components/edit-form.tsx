import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { UserContext } from '../context/auth-context';
import { AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from '../hooks/useAuth';

interface FormData {
    fullName: string;
    phoneNumber: string;
    role: string;
}

const EditForm = () => {
    const {
        setToggleEdit,
        userName,
        userId,
        phoneNumber,
        role
    } = useContext(UserContext);

    const { updateInfo } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        fullName: userName as string,
        phoneNumber: phoneNumber as string,
        role: role as string,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateInfo({
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                userId: userId as string,
            })
            console.log(formData);
            setToggleEdit(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 absolute top-0  left-0 w-full h-full bg-blend-saturation">
            <div onClick={() => setToggleEdit(false)} className='absolute top-10 right-10 cursor-pointer text-4xl'>
                <AiFillCloseCircle />
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
            >
                <h2 className="text-2xl font-semibold mb-4">Edit Information</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="industry">Industry</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditForm;