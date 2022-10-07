import MongoDBContainer from "../../container/ContenedorMongoDB.js";

class CarritosDaoMongoDb extends MongoDBContainer {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}

export default CarritosDaoMongoDb