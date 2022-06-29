const fs = require('fs')

class Contenedor {
    constructor() {
        this.productos = [];
    }

    save(producto) {
        producto.id = this.productos.length + 1;
        this.productos.push(producto);
        async function save_producto() {
            try {
                await fs.promises.appendFile('./productos.txt', JSON.stringify([producto], null, '\t'))
                console.log(producto.id)
                return productos
            } catch (err) {
                console.log('error al guardar')
            }
        }
        save_producto()
    }

    getById(id){}

}


const articulo = new Contenedor; productos = [
{
    title: 'Lechuga Hidroponica',
    price: 150,
    thumbnail: 'imgLechuga'
}, {
    title: 'Rucula Hidroponica',
    price: 450,
    thumbnail: 'Rucula Hidroponica'
}, {
    title: 'Tomates Cherry',
    price: 500,
    thumbnail: 'imgTomates'
}];

for (i in productos) {
    articulo.save(productos[i]);
}

articulo.getById(2)