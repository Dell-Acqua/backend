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
                await fs.promises.appendFile('./productos.txt', JSON.stringify([producto], null, 2))
                console.log(producto.id)
                
            } catch (err) {
                console.log('error al guardar',err)
            }
        }
        save_producto()
         }

    getById(id){
        const art = this.productos.map(ids => productos.id == id);
        console.log(art)
    }

    getAll(){
        async function obtener_datos (){
            try {
               const data = await fs.promises.readFile('./productos.txt','utf-8');
               const datos = JSON.parse(data);
               console.log(datos);
            }
            catch (err) {
                console.log("Hubo un error en la importacion del objeto", err)
            }
        }
        obtener_datos()
    }

    deleteAll(){
        async function borrar_datos (){
            try {
                await fs.promises.writeFile('./productos.txt','\n');
                console.log("Se eliminaron todos los datos")
            }
            catch (error){
                console.log ("Hubo un error al intentar borrar todos los datos",error)
            }
        }
        borrar_datos()
    }
}


const articulo = new Contenedor; productos = [
{
    title: 'Lechuga Hidroponica',
    price: 150,
    thumbnail: 'imgLechuga'
}];


for (i in productos) {
    articulo.save(productos[i]);
}

articulo.getById(1);
articulo.getAll();
articulo.deleteAll();
