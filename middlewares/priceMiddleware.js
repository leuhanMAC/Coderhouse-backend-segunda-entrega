const priceMiddleware = (req, res, next) => {
    const patternPrice = /^(?=.*[1-9])[0-9]*[.]?[0-9]{1,2}$/;
    if (req.body.price) {
        req.body.price = Number(req.body.price);

        if (!patternPrice.test(req.body.price)) {
            res.status(400).json({
                error: "El precio no está en un formato válido (Debe ser un número con máximo dos decimales)",
            });
            res.end();
            return;
        }
    } else if (!req.body.price) {
        next();
        return;
    }

    next();
};

module.exports = priceMiddleware;