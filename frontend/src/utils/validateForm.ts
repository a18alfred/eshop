const regexPhoneRU = /^\+\d{1,15}$/;
const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegex =
    /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export type ErrorForm = {
    [key: string]: any;
};

const validateForm = (values: ErrorForm) => {
    const error = {} as ErrorForm;

    const { fullName, phone, email, password } = values;

    if (!fullName) {
        error.fullName = 'Полное имя не должно быть пустым.';
    }

    if (!phone) {
        error.phone = 'Номер телефона не должен быть пустым.';
    } else if (!regexPhoneRU.test(phone)) {
        error.phone = 'Неправильный формат номера телефона.';
    }

    if (!email) {
        error.email = 'Email не должен быть пустым.';
    } else if (!regexEmail.test(email)) {
        error.email = 'Неправильный формат email.';
    }

    if (!password) {
        error.password = 'Пароль не должен быть пустым.';
    } else if (!passRegex.test(password)) {
        error.password =
            'Пароль должен содержать от 8 до 32 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и специальный символ.';
    }

    for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
            return error;
        }
    }
};

type ValueEachField = {
    value: string;
    value2?: string;
    name: string;
};

const validateFormEachField = (values: ValueEachField) => {
    const { value, value2, name } = values;

    switch (name) {
        case 'fullName':
            if (!value) {
                return 'Полное имя не должно быть пустым.';
            }
            break;
        case 'phone':
            if (!value) {
                return 'Номер телефона не должен быть пустым.';
            } else if (!regexPhoneRU.test(value)) {
                return 'Неправильный формат номера телефона.';
            }
            break;
        case 'email':
            if (!value) {
                return 'Email не должен быть пустым.';
            } else if (!regexEmail.test(value)) {
                return 'Неправильный формат email.';
            }
            break;
        case 'password':
            if (!value) {
                return 'Пароль не должен быть пустым.';
            } else if (!passRegex.test(value)) {
                return 'Пароль должен содержать от 8 до 32 символов, включать хотя бы одну заглавную латинскую букву, одну строчную, одну цифру и специальный символ.';
            }
            break;
        case 'rePassword':
            if (value !== value2) {
                return 'Подтверждение пароля не совпадает с новым паролем.';
            }
            break;

        default:
            return '';
    }
};

export { validateForm, validateFormEachField };
