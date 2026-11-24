import SaleModels from "../models/sale.models.js";

export const createSale = async (req, res) => {
    try {
        const { user_name, total_price, products } = req.body;

        if (!user_name || !total_price || !products || products.length === 0) {
            return res.status(400).json({
                message: "Faltan datos: user_name, total_price y products"
            });
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