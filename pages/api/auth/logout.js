import { deleteCookie } from 'cookies-next';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    deleteCookie('Bearer', { req, res });
    return res.status(200).json({ message: 'Sesión cerrada' });
}