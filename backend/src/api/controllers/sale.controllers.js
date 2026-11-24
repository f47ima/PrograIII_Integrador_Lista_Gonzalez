import SaleModels from "../models/sale.models.js";
import ProductModels from "../models/product.models.js";

export const createSale = async (req, res) => {
    try {
        const { user_name, total_price, products } = req.body;

        if (!user_name || !total_price || !products || products.length === 0) {
            return res.status(400).json({
                message: "Faltan datos: user_name, total_price y products"
            });
        }
        
        for (const productId of products) {
            const [rows] = await ProductModels.selectProductById(productId);

            if (rows.length === 0 || rows[0].active !== 1) {
                return res.status(400).json({
                    message: `El producto con id ${productId} no existe o no está disponible`
                });
            }
        }

        const [resultado] = await SaleModels.insertSale(user_name, total_price);
        const saleId = resultado.insertId;

        for (const productId of products) {
            await SaleModels.insertProductSale(productId, saleId);
        }

        res.status(201).json({
            message: "Venta registrada",
            saleId: saleId
        });

    } catch (error) {
        console.log("Error registrando la venta: ", error);
        res.status(500).json({ message: "Error interno al registrar la venta" });
    }
};