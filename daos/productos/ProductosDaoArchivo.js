import FileContainer from "../../container/ContenedorArchivo.js"

class ProductosDaoArchivo extends FileContainer {

    constructor() {
        super('products.json')
    }
}

export default ProductosDaoArchivo
