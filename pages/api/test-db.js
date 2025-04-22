import db from '../../models/index.js';
export default async function handler(req, res) {
    try {
        await db.sequelize.authenticate();
        res.status(200).json({ message: 'Conexión exitosa' });
    } catch (error) {
        res.status(500).json({ message: 'Error de conexión', error: error.message });
    }
}