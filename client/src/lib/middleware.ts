import validator from 'validator';
import useToast from "../hooks/useToster";

const ValidateRegistration = (payload: {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
}) => {
    let isValid: boolean = true;
    const { toastWarning } = useToast();

    if (!(validator.isEmail(payload.email))) {
        isValid = false;
        toastWarning('Enter valid email!');
        return isValid;
    }
    if (!(payload.password.length >= 8 && payload.password.length <= 25)) {
        isValid = false;
        toastWarning('Password length must be in range 8 to 25!');
        return isValid;
    }
    if (payload.password !== payload.confirmPassword) {
        isValid = false;
        toastWarning('Passwords are not matching');
        return isValid;
    }
    // if (payload.phoneNumber) {
    //     isValid = false;
    //     toastWarning('Passwords are not matching');
    //     return isValid;
    // }

    return isValid;
}
export { ValidateRegistration }