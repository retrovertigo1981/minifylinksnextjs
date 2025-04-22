import db from '@/models';
const { Link } = db;

export default async function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    if (method === 'GET') {
        try {
            const links = await Link.findAll({ where: { userId: id } });
            return res.status(200).json(links);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener enlaces', error: error.message });
        }

    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
