const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8080


class Contenedor{
    constructor() {
        this.productos = [];
    }

    save(productos){
        const dataGuardada = fs.readFileSync('productos.txt','utf-8');
        if (dataGuardada == []) {
            productos = [productos]
            productos.forEach(producto => {
                producto.id = 1;
                 console.log(producto.id) 
             });
     
             async function save_producto(){
                 try{
                     await fs.promises.writeFile('productos.txt',JSON.stringify(productos,null,2),'utf-8');
                 } catch (error){
                     console.log('Hubo un error al escribir el archivo',error);
                 }
             }
             save_producto()
        } else {
          const dataGuardada2 = JSON.parse(dataGuardada)
          console.log('Ya hay articulos, agregando nuevos..')
          console.log(dataGuardada2.length+2)

          dataGuardada2.push({title: productos.title, price: productos.price, thumbnail:productos.thumbnail, id: dataGuardada2.length+2})

          async function save_producto(){
            try{
                await fs.promises.writeFile('productos.txt',JSON.stringify(dataGuardada2,null,2),'utf-8');
            } catch (error){
                console.log('Hubo un error al escribir el archivo',error);
            }
        }
        save_producto()
        }
    }

    getById(id){
           async function obtener_por_id() {
                try {
                    const dato = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'));
                    const busq = dato.filter(dato => dato.id == id);
                    console.log(busq)  
                }
                catch (error) {
                    console.log("Hubo un error en tener el objeto por id",error)
                } 
            }
            obtener_por_id()
        }

        getAll(){
            async function obtener_datos (){
                try {
                   const datos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'));
                   console.log(datos);
                }
                catch (err) {
                    console.log("Hubo un error en la importacion del objeto", err)
                }
            }
            obtener_datos()
        }

        deleteById(id){
            async function obtener_por_id() {
                try {
                    const datos = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'));
                    const nvoDatos = datos.filter(datos => datos.id !== id);
                    fs.writeFileSync('productos.txt', JSON.stringify(nvoDatos,null,2),'utf-8');
                    console.log(nvoDatos)  
                }
                catch (error) {
                    console.log("Hubo un error en tener el objeto por id",error)
                } 
            }
            obtener_por_id()          
        }

        deleteAll(){
            async function borrar_datos (){
           try {
               await fs.promises.unlink('./productos.txt');
               fs.promises.writeFile('./productos.txt','');
               console.log("Se eliminaron todos los datos")
           }
           catch (error){
               console.log ("Hubo un error al intentar borrar todos los datos",error)
           }
       }
       borrar_datos()
   }
}


// const articulo = new Contenedor(productos = {
//     title: 'Lechuga Hidroponica',
//     price: 150,
//     thumbnail: 'imgLechuga'
// });

const miContenedor = new Contenedor('./productos.txt')

// articulo.save(productos);
// articulo.getById(1);
// articulo.getAll();
// articulo.deleteById(2)
// articulo.deleteAll();

const server = app.listen(PORT, () => {
    console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
  });

  app.get('/', (req, res) => {
    res.send('Verificar productos ingresando a /productos');
  });

  app.get('/productos', async (req, res) => {
    try {
      let productos = await miContenedor.getAll();
      res.send(productos);
    } catch (e) {
      console.log(e);
    }
  });

  app.get('/productoRandom', async (req, res) => {
    try {
      let productos = await miContenedor.getAll();
      const idRandom = Math.floor(Math.random() * productos.length);
      res.send(productos[idRandom]);
    } catch (e) {
      console.log(e);
    }
  });
  
  server.on('error', (error) => console.log(`Error en el servidor: ${error}`));