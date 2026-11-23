import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT * FROM products";
    return connection.query(sql);
}

const selectActiveProducts = () =>{
    const sql = "SELECT * FROM products WHERE products.active = ?";
    return connection.query(sql, [1]);
}

const selectProductById = (id) =>{
    const sql = "SELECT * FROM products WHERE products.id = ?";
    return connection.query(sql, [id]);
}

const insertProduct = (name, author, image, category, price) =>{
    const sql = "INSERT INTO products (name, author, image, category, price ) VALUES (?, ?, ?, ?, ?)";
    return connection.query(sql,[name, author, image,category, price])
}

const updateProduct =  (name, author, image, category, price, active, id) =>{
    const sql = "UPDATE products SET name = ?, author = ?, image = ?, category = ?, price = ?, active = ? WHERE id = ?";
    return connection.query(sql,[name, author, image, category, price, active,id ])
}   

const deleteProduct = (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}

export default{
    selectAllProducts,
    selectActiveProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}