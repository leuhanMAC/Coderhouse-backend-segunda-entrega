import FirestoreContainer from "../../container/ContenedorFirebase.js";

class CarritosDaoFirebase extends FirestoreContainer {
    constructor() {
        super('carritos')
    }

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

export default CarritosDaoFirebase;