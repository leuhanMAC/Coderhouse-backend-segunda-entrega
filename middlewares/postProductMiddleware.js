const postProductMiddleware = (req, res, next) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
        res.status(400).json({
            error: "Faltan datos",
        });
        res.end();
        return;
    }

    next();
};

module.exports = postProductMiddleware;

