import * as EmailValidator from 'email-validator';

const validateEmail = (email: string) => {
    return EmailValidator.validate(email);
}

const validateForm = (email: string, password: string, name? : string) => {

}
export default { validateEmail };