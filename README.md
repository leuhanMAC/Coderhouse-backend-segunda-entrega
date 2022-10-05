# [Sitio del proyecto](https://coderhouse-14.nclotet.com.ar/)

## [API Productos]

### GET /api/productos
### GET /api/productos/:id
### POST /api/productos
BASIC AUTH requerida (admin:admin)
Parametros necesarios en el body:
- Nombre
- Descripcion
- Codigo
- Foto
- Precio
- Stock

### PUT /api/productos/:id
BASIC AUTH requerida (admin:admin)
Parametros necesarios en el body, al menos uno:
- Nombre
- Descripcion
- Codigo
- Foto
- Precio
- Stock

### DELETE /api/productos/:id
BASIC AUTH requerida (admin:admin)

## [API Carrito]

### POST /api/carrito
### DELETE /api/carrito/:id
### GET /api/carrito/:id/productos
### POST /api/carrito/:id/productos
Parametro necesario en el body:
- id (Id del producto a agregar)

### DELETE /api/carrito/:id/productos/:id_prod