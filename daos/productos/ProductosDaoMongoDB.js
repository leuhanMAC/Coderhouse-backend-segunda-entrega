import MongoDBContainer from "../../container/ContenedorMongoDB.js"

class ProductosDaoMongoDb extends MongoDBContainer {

    constructor() {
        super('productos', {
            nombre: {
                type: String,
                required: true,
                max: 100
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            precio: {
                type: Number,
                required: true
            },
            descripcion: {
                type: String,
                required: true,
                max: 500
            },
            codigo: {
                type: String,
                required: true,
                max: 6,
                unique: true
            },
            foto: {
                type: String,
                max: 200
            },
            stock: {
                type: Number,
                required: true,
            }
        })
    }
}

export default ProductosDaoMongoDb