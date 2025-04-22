import db from "@/models";
const { User } = db;

export default async function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    if (method === 'GET') {
        try {
            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" })
            }

            return res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario', error: error.message })
        }
    } else if (method === 'PUT') {
        const data = req.body
        try {
            const updated = await User.update(data, { where: { id } });
            if (updated) {
                const updatedUser = await User.findByPk(id);
                return res.status(200).json(updatedUser);
            }
            return res.status(404).json({ message: "Usuario no encontrado" });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario', error: error.message })

        }
    } else if (method === 'DELETE') {
        try {
            const deleted = await User.destroy({ where: { id } })
            if (deleted) {
                return res.status(200).json({ message: "Usuario Eliminado" })
            }
            return res.status(404).json({ message: "Usuario no encontrado" })

        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario', error: error.message })

        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}