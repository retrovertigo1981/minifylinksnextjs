import db from "@/models";
const { User } = db

export default async function handler(req, res) {
    const { method } = req;
    if (method === 'GET') {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    } else if (method === 'POST') {
        const data = req.body

        try {
            const user = await User.create(data)
            return res.status(201).json(user)
        } catch (error) {
            res.status(500).json({ message: 'Error al crear usuario', error: error.message })
        }

    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}