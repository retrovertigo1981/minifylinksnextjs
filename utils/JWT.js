import { sign, verify } from 'jsonwebtoken';
import { envConfig } from '@/config';
import { getCookie } from 'cookies-next';

const generateToken = (payload) => {
    return sign(payload, envConfig.JWT_SECRET, { expiresIn: "1d" });
};

// Versión para API routes
const verifyToken = async (req) => {
    try {
        let token = getCookie('Bearer', { req });

        // Si es una promesa, espera a que se resuelva
        if (token instanceof Promise) {
            token = await token;
            console.log('Token resuelto de promesa');
        }

        console.log('Token (tipo):', typeof token);
        console.log('Token valor:', token ? (typeof token === 'string' ? token.substring(0, 15) + '...' : String(token).substring(0, 15) + '...') : 'No hay token');

        if (token && typeof token === 'string') {
            try {
                const payload = verify(token, envConfig.JWT_SECRET, { algorithms: ["HS256"] });
                console.log('Payload decodificado:', payload);
                req.user = payload;
                return true;
            } catch (error) {
                console.error('Error al verificar token:', error.message);
                return false;
            }
        } else {
            console.log('No se encontró token o no es una cadena válida');
            return false;
        }
    } catch (error) {
        console.error('Error al obtener token:', error);
        return false;
    }
};



// Versión para middleware de Next.js
const verifyTokenFromString = (token) => {
    if (!token) return null;

    try {
        return verify(token, envConfig.JWT_SECRET, { algorithms: ["HS256"] });
    } catch (error) {
        return null;
    }
};

export { generateToken, verifyToken, verifyTokenFromString };