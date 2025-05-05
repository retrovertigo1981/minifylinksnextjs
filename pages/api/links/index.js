import db from '@/models';
import { generateShortCode } from '@/utils';
import { envConfig } from '@/config';
import { withAuthCheck } from '@/utils'
const { Link } = db;

async function handler(req, res) {
    const { method, body } = req;
    const userId = req.user ? req.user._id : null;

    const { originalLink } = body;
    console.log(userId)

    if (method === 'POST') {
        try {
            if (!originalLink) {
                return res.status(400).json({ message: "El campo originalLink es requerido" });
            }

            // Generación de código único
            let shortCode;
            let isUnique = false;
            while (!isUnique) {
                shortCode = generateShortCode();
                const existingCode = await Link.findOne({ where: { shortLink: shortCode } });
                if (!existingCode) isUnique = true;
            }

            const shortLink = shortCode;
            const shortLinkResponse = `${envConfig.BASE_URL}/${shortLink}`;

            await Link.create({
                userId,
                originalLink,
                shortLink,
                clickCount: 0,
            });

            res.status(201).json({ Link: shortLinkResponse });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el enlace', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }

}

export default withAuthCheck(handler);