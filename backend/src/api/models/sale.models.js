import connection from "../database/db.js";

const insertSale = (user_name, total_price) => {
    const sql = "INSERT INTO sales (user_name, total_price) VALUES (?, ?)";
    return connection.query(sql, [user_name, total_price]);
};

const insertProductSale = (product_id, sale_id) => {
    const sql = "INSERT INTO product_sales (product_id, sale_id) VALUES (?, ?)";
    return connection.query(sql, [product_id, sale_id]);
};

export default { insertSale, insertProductSale };