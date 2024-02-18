import fs from 'fs'

class ProductManager {
    constructor() {
        this.path = './files'
        this.usersFilePath = this.path + "/Productos.json";
    }

    addProduct = async (code, title, description, price, stock) => {

        const products = await this.getProducts()

        const repeatedProduct = products.find(prod => prod.code === code)

        if (repeatedProduct) {
            console.log(`El siguiente codigo ya es existente: ${code}. El producto no fue agregado`);
        }

        const product = {
            code,
            title: title,
            description: description,
            price: price,
            id: products.length ? products[products.length - 1].id + 1 : 1,
            stock: stock
        }

        products.push(product)

        await fs.promises.writeFile(this.usersFilePath, JSON.stringify(products))

        return product
    }
    
    deleteProduct = (el) => {
        const searchProduct = this.products.find(prod => prod.id === el)

        const indexOf = this.products.indexOf(searchProduct)

        console.log(indexOf)

        if(searchProduct) {
            this.products.splice(indexOf, 1)
        } else {
            console.log(`No se encuentra un producto con el id: ${el}`)
        }
    }

    getProducts = async () => {
        try {
            const data = await fs.promises.readFile(this.usersFilePath, 'utf-8')
            const products = JSON.parse(data)

            return products
        } catch (error) {
            return [];
        }
    }

    getProductById = () => {
        const searchProduct = this.products.find(prod => prod.id === el)

        console.log(searchProduct)
    }
}

const manager = new ProductManager()

export default ProductManager;
