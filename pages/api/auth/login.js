import { validatePassword, generateToken } from '@/utils';
import { setCookie } from 'cookies-next'
import db from '@/models';
const { User } = db;

export default async function handler(req, res) {
    const { method, body } = req;

    if (method === 'POST') {
        const { email, password } = body
        try {
            const user = await User.findOne({ where: { email } })

            if (!user) throw new Error('Usuario o contraseña inválidos', { cause: 'INVALID_CREDENTIALS' });

            /**
             * Comparamos contraseña que entrega usuario
             * por formulario  vs contraseña almacenada (encriptada)
             */
            const isValid = await validatePassword(user.password, password)

            if (!isValid) throw new Error('Usuario o contraseña inválidos', { cause: 'INVALID_CREDENTIALS' });

            /**
             * Creamos la firma o JWT (JOSE)
             */
            const signature = generateToken({
                _id: user.id,
                email: user.email,
                // tipo_usuario: usuario.tipo_usuario,

            })


            setCookie('Bearer', signature, { req, res, httpOnly: true, path: '/' });
            return res.json({ message: 'Usuario loggeado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message })
        }
    }
    else {
        res.status(405).json({ message: 'Método no permitido' })
    }

}