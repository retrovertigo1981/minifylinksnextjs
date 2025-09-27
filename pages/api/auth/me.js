import { withAuthCheck } from '@/utils/withAuth'

function handler(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado' })
    }

    // Devuelve solo lo necesario del usuario
    const { id, name, lastname, email } = req.user
    return res.status(200).json({ user: { id, name, lastname, email } })
}

export default withAuthCheck(handler)
