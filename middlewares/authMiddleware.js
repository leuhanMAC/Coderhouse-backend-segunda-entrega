const authMiddleware = (req, res, next) => {
    require('dotenv').config();

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ mensaje: 'Falta el header de autorización' });
    }

    const creds = req.headers.authorization.split(' ')[1];

    if (creds !== process.env.CREDS) {
        return res.status(401).json({ message: 'Credenciales no validas' });
    }

    next();
};

module.exports = authMiddleware;