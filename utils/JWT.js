import { sign, verify } from 'jsonwebtoken';
import { envConfig } from '@/config'

const generateToken = (payload) => {
    return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" });
}

const verifyToken = (req) => {
    const tokenSignatured = req.cookies;

    if (tokenSignatured.Bearer) {
        try {
            const payload = verify(tokenSignatured.Bearer, envConfig.JWT_SECRET, { algorithms: ["HS256"] });

            req.user = payload;
            return true;
        } catch (error) {

            return false;
        }
    } else {

        return false;
    }
};

export { generateToken, verifyToken }