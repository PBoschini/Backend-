const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
    }


    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.file, JSON.stringify(data, null, 2)
            )
        }catch(err) {
            console.log(`error: ${err}`);
        }
    }


    getAll = async() => {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(productos);
        }catch(err){
            console.log(`error: ${err}`)
        }
    }


    save = async obj => {
        let productos = await this.getAll();
        try{
            let newId;
            productos.length === 0 ? newId = 1 : newId = productos[productos.length-1].id + 1;
            let newObj = {...obj, id: newId};
            productos.push(newObj);
            await this.writeFile(productos);
            return newObj.id;
        }catch(err){
            console.log(`error: ${err}`)
        }
    }



    getById = async id => {
        let productos = await this.getAll();
        try {
            const obj = productos.find(id => productos.id === id);
            return obj ? obj : null;
        }catch(err){
            console.log(`error: ${err}`)
        }
    }


    deleteById = async id => {
        let productos = await this.getAll();
        try {
            productos = productos.filter(producto => producto.id != id);
            await this.writeFile(productos);
        }catch(err){
            console.log(`error: ${err}`)
        }
    }


    deleteAll = async() => {
        this.writeFile([]);
    }


}


const products = new Contenedor('productos.txt');

const prueba = async () => {
    let save = await products.save({
        title: 'Iphone 13 PRO',
        price: 1200,
        thumbnail: 'https://res.cloudinary.com/ddaxzsv93/image/upload/v1667746960/iphone_13_pro_s05gdo.jpg'
    });

    let getAll = await products.getAll();
    let getById = await products.getById(2);
    let deleteById = await products.deleteById(1);
    let deleteAll = await products.deleteAll();

    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    console.log(deleteAll);    
}

prueba();

module.exports = Contenedor;
