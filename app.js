import express from 'express'

const App = express();

const Port = 8080

import ProductManager from './ProductManager.js'

const manager = new ProductManager()

function randomNumber() {
    const random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    return random
}

let persistirProducto = async () => {
    await manager.addProduct(randomNumber(), 'Audi', 'Auto Rapido', 12000, 5)
    await manager.addProduct(randomNumber(), 'Ferrari', 'Auto Deportivo', 80000, 1)
    await manager.addProduct(randomNumber(), 'Porsche', 'Auto Lujoso', 57000, 10)
    let productos = await manager.getProducts()
    console.log(productos)
}

App.get('/', async (req, res) => {
    const productos = await manager.getProducts();
    res.send(productos);
})

App.get('/:prodId', async (req, res) => {

    let { prodId } = req.params

    const productos = await manager.getProducts()

    const producto = productos.find(prod => prod.code === parseInt(prodId))

    console.log(producto)

    if (producto) {
        res.json({producto})

        return
    }

    res.send({msg: "Usuario no encontrado"})
})

App.listen(Port, () => {
    console.log(`Server running on port: ${Port}`);
})
