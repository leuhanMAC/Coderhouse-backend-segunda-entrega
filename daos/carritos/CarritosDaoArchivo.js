import FileContainer from "../../container/ContenedorArchivo.js"

class CarritosDaoArchivo extends FileContainer {

    constructor() {
        super('carts.json')
    }

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

export default CarritosDaoArchivo