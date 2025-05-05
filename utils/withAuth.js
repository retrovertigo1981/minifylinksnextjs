import { verifyToken } from './JWT';

// Middleware que verifica si hay un usuario pero permite acceso de todos modos
export function withAuthCheck(handler) {
    return async (req, res) => {
        await verifyToken(req); // Esto establecerá req.user o no
        return await handler(req, res);
    };
}

// Middleware que solo permite acceso a usuarios autenticados
export function withAuth(handler) {
    return async (req, res) => {
        const isAuthenticated = verifyToken(req);

        if (!isAuthenticated) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        return handler(req, res);
    };
}

// Middleware que verifica roles específicos
export function withRole(handler, allowedRoles = []) {
    return async (req, res) => {
        const isAuthenticated = verifyToken(req);

        if (!isAuthenticated) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        // Si hay roles permitidos y el usuario no tiene uno de ellos
        if (allowedRoles.length > 0 && (!req.user.role || !allowedRoles.includes(req.user.role))) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        return handler(req, res);
    };
}