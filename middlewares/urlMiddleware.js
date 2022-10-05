const urlMiddleware = (req, res, next) => {
    const patternURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp)/;
    const { thumbnail } = req.body;
    if (!thumbnail) {
        next();
        return;
    } else if (!patternURL.test(thumbnail)) {
        res.status(400).json({
            error: "La URL no está en un formato válido (Debe empezar con el protocolo HTTP y terminar en jpg/gif/png/jpeg/webp)",
        });
        res.end();
        return;
    }

    next();
};
module.exports = urlMiddleware;