import ProductModels from "../models/product.models.js";

const getAllProducts = async (req, res) => {
    try {
        const [resultado] = await ProductModels.selectAllProducts(); 

        if (resultado.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }

        res.status(200).json({
            payload: resultado,
            total: resultado.length
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({ message: "Error interno al obtener productos" });
    }
};

const getActiveProducts = async (req,res) => {
    try {
        const [resultado] = await ProductModels.selectActiveProducts();
        if (resultado.length === 0){
            return res.status(404).json({message: "No se encontraron productos"});
        }
        res.status(200).json({
            payload:resultado,
            total: resultado.length
        })
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message:"Error interno al obtener productos"
        });        
    }
}

const getProductById = async (req,res) => {
    try {
        const id = req.id;
        const [resultado] = await ProductModels.selectProductById(id);
        if (resultado.length === 0){
            return res.status(404).json({message: `No se encontró el producto con id ${id}`});
        }
        res.status(200).json({
            payload:resultado,
            total: resultado.length
        })
    } catch (error) {
        console.log("Error obteniendo productos: ", error);
        res.status(500).json({
            message:"Error interno al obtener productos"
        });        
    }
}

const createProduct = async (req,res) => {
    try {
        const { name, author, image,category, price } = req.body;
        const [resultado] = await ProductModels.insertProduct(name, author, image, category, price);
        res.status(201).json({
            message: "Producto creado",
            productId: resultado.insertId
            });
        } catch (error) {
        console.log("Error cargando producto: ", error);
        res.status(500).json({
            message:"Error interno al cargar el  producto"
        });        
    }
}

const modifyProduct =  async (req, res) => {
    try {
        const { id, name, author, image, category, price, active } = req.body;
        const [resultado] = await ProductModels.updateProduct(name, author, image, category, price, active, id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el producto con id ${id}` });
        }
        res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        console.log("Error actualizando producto: ", error);
        res.status(500).json({ message: "Error interno al actualizar el producto" });
    }
}

const removeProduct = async (req, res) => {
    try {
        const id = req.id;
        const [resultado] = await ProductModels.deleteProduct(id);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: `No se encontró el producto con id ${id}` });
        }
        res.status(200).json({ message: `Producto con id ${id} eliminado` });
    } catch (error) {
        console.log("Error eliminando producto: ", error);
        res.status(500).json({ message: "Error interno al eliminar el producto" });
    }
}

export {
    getAllProducts,
    getActiveProducts,
    getProductById,
    createProduct,
    modifyProduct,
    removeProduct,  
};