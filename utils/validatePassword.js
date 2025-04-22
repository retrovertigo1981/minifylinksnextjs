import { verify } from 'argon2';

const validatePassword = async (storedPassword, providedPassword) => {
    return await verify(storedPassword, providedPassword)
}


export { validatePassword }