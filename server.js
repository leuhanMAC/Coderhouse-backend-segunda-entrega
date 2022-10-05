const express = require("express");

require('dotenv').config();

const { authMiddleware, postProductMiddleware, priceMiddleware, urlMiddleware, putProductMiddleware } = require('./middlewares');
const Container = require("./container");

const productFiles = new Container("products.json");
const cartFiles = new Container("carts.json");


const PORT = process.env.PORT || 8080;

const app = express();
const products = express.Router();
const cart = express.Router();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Router
app.use("/api/productos", products);
app.use("/api/carrito", cart);

//Products
products.get("/", async (req, res) => {
    const products = await productFiles.getAll();
    res.json(products).end();
});

products.get("/:id", async (req, res) => {
    const product = await productFiles.getById(req.params.id);

    product
        ? res.json(product)
        : res.status(404).json({
            error: 'Producto no encontrado'
        });
    res.end();
});

products.post(
    "/",
    authMiddleware,
    postProductMiddleware,
    urlMiddleware,
    priceMiddleware,
    async (req, res) => {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        await productFiles.save({
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
        });
        res.redirect("/api/productos");
    }
);

products.put("/:id", authMiddleware, putProductMiddleware, urlMiddleware, priceMiddleware, async (req, res) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const { id } = req.params;
    const product = { id };

    if (nombre) product.nombre = nombre;
    if (precio) product.precio = Number(precio);
    if (descripcion) product.descripcion = descripcion;
    if (codigo) product.codigo = codigo;
    if (foto) product.foto = foto;
    if (stock) product.stock = Number(stock);

    const productRes = await productFiles.updateById(product);

    productRes
        ? res.send({
            mensaje: 'Producto editado',
            producto: productRes
        })
        : res.status(404).json({
            error: 'Producto no encontrado'
        });

    res.end();
});

products.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    const product = await productFiles.deleteById(id);

    product
        ? res.json({
            mensaje: 'Producto eliminado',
            product
        })
        : res.status(404).json({
            error: 'Producto no encontrado'
        });

    res.end();

});

// Carts
cart.post("/", async (req, res) => {
    const cart = await cartFiles.save({
        productos: []
    });
    res.json({
        carritoID: cart.id
    }).end();
});

cart.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const cart = await cartFiles.deleteById(id);

    cart
        ? res.json({
            mensaje: 'Carrito Eliminado',
            cart
        })
        : res.status(404).json({
            error: 'Carrito no encontrado'
        });

    res.end();
});

cart.get("/:id/productos", async (req, res) => {
    const { id } = req.params;
    const cart = await cartFiles.getById(id);

    cart ?
        res.json({
            Productos: cart.productos
        })
        : res.status(404).json({ error: 'Carrito no encontrado' });

    res.end();

});

cart.post("/:id/productos", async (req, res) => {
    const idCart = req.params.id;
    const idProduct = req.body.id;

    const cart = await cartFiles.getById(idCart);
    const product = await productFiles.getById(idProduct);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
    }

    cart.productos.push(product);
    await cartFiles.updateById(cart);

    res.json({
        mensaje: 'Producto agregado al carrito',
        Productos: cart.productos
    });

});

cart.delete("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;

    const cart = await cartFiles.getById(id);

    if (!cart) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }

    cart.productos = cart.productos.filter(product =>
        product.id !== id_prod
    );

    await cartFiles.updateById(cart);

    res.json({
        mensaje: 'Producto eliminado del carrito',
        productos: cart.productos
    });

});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});