import FirestoreContainer from "../../container/ContenedorFirebase.js";

class ProductosDaoFirebase extends FirestoreContainer {
    constructor() {
        super('productos')
    }

    async save(productos = { productos: [] }) {
        return super.save(productos)
    }
}

export default ProductosDaoFirebase;