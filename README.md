# Hojas & Viñetas

Autoservicio de libros y cómics. Trabajo Práctico Integrador de **Programación III**, Tecnicatura Universitaria en Programación (UTN).

**Alumnos:** Fatima Gonzalez y Nicolas Lista

---

## Qué es

El proyecto tiene dos partes:

- **Frontend (cliente):** el cliente ingresa su nombre, ve los productos activos separados en Libros y Cómics, arma su carrito, confirma la compra y descarga el ticket en PDF.
- **Backend (administración):** una API REST que usa el frontend y un panel con login para que el administrador consulte, cree, modifique y elimine productos.

## Tecnologías

| Parte | Tecnologías |
| --- | --- |
| Backend | Node.js, Express 5, MySQL (`mysql2`), EJS, `express-session`, `dotenv`, `cors` |
| Frontend | HTML, CSS y JavaScript, `localStorage`, `fetch`, jsPDF |
| Base de datos | MySQL / MariaDB (XAMPP + phpMyAdmin) |

## Estructura

```
├── backend/
│   ├── index.js                 # servidor Express
│   ├── BBDD/hojas_vinetas.sql   # base de datos con productos de prueba
│   ├── .env.example
│   └── src/
│       ├── api/
│       │   ├── config/          # variables de entorno
│       │   ├── database/        # conexión a MySQL (pool)
│       │   ├── middlewares/     # logger, validaciones, protección de rutas
│       │   ├── routes/          # productos, usuarios, ventas, vistas, login
│       │   ├── controllers/
│       │   ├── models/          # consultas SQL
│       │   └── utils/
│       ├── views/               # vistas EJS del panel + partials
│       └── public/              # CSS, JS del panel e imágenes
└── frontend/
    ├── index.html               # bienvenida
    ├── productos.html
    ├── carrito.html
    ├── ticket.html
    ├── css/
    └── js/
```

El backend sigue el patrón **MVC**: rutas → middlewares → controladores → modelos.

## Instalación

### 1. Base de datos

1. Iniciá **MySQL** desde XAMPP.
2. En phpMyAdmin, creá una base llamada `hojas_vinetas`.
3. Importá el archivo `backend/BBDD/hojas_vinetas.sql`.

### 2. Backend

```bash
cd backend
npm install
```

Creá un archivo `.env` copiando `.env.example` y completá tus datos:

```
PORT=3000
DB_HOST=localhost
DB_NAME=hojas_vinetas
DB_USER=root
DB_PASSWORD=
SESSION_SECRET=una_clave_secreta
```

Levantá el servidor:

```bash
npm run dev
```

Queda corriendo en `http://localhost:3000`.

### 3. Usuario administrador

La base no trae usuarios. Creá el admin con un `POST` a la API, por ejemplo desde la consola del navegador:

```js
fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: "Administrador",
        email: "admin@hojasyvinetas.com",
        password: "admin1234"
    })
}).then(res => res.json()).then(console.log);
```

Son las mismas credenciales que completa el botón **Acceso rápido** del login.

### 4. Frontend

Con el backend corriendo, abrí `frontend/index.html` con **Live Server** de VS Code. También se puede levantar con:

```bash
cd frontend
npm start
```

y entrar a `http://127.0.0.1:5500`.

## Uso

**Cliente (frontend)**

1. Ingresá tu nombre en la bienvenida.
2. Elegí productos por categoría y agregalos al carrito.
3. Revisá el carrito y confirmá la compra: la venta se guarda en la base.
4. En el ticket podés descargar el PDF o salir para empezar de nuevo.

Además, el botón **Cambiar tema** alterna entre modo claro y oscuro, y la elección se mantiene al recargar.

**Administrador (backend)**

1. Entrá a `http://localhost:3000/login` e ingresá con el usuario admin.
2. **Principal** muestra todos los productos, activos e inactivos, separados por categoría.
3. Desde el menú podés **Consultar**, **Crear**, **Modificar** y **Eliminar** productos.

## API

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/api/products` | Todos los productos |
| GET | `/api/products/active` | Solo los productos activos |
| GET | `/api/products/:id` | Un producto por id |
| POST | `/api/products` | Crear un producto |
| PUT | `/api/products` | Modificar un producto (el id va en el body) |
| DELETE | `/api/products/:id` | Eliminar un producto |
| POST | `/api/users` | Crear un usuario administrador |
| POST | `/api/sales` | Registrar una venta |

**Ejemplo de body para crear un producto:**

```json
{
    "name": "Rayuela",
    "author": "Julio Cortázar",
    "image": "/img/productos/rayuela.jpg",
    "category": "libro",
    "price": 18500
}
```

`category` acepta `libro` o `comic`.

**Ejemplo de body para registrar una venta** (un id por cada unidad vendida):

```json
{
    "user_name": "Fatima",
    "total_price": 45900,
    "products": [1, 1, 19]
}
```

## Vistas del panel

| Ruta | Pantalla |
| --- | --- |
| `/login` | Login del administrador |
| `/dashboard/principal` | Listado de productos |
| `/dashboard/consultar` | Consultar por id |
| `/dashboard/crear` | Alta de producto |
| `/dashboard/modificar` | Modificación de producto |
| `/dashboard/eliminar` | Baja de producto |

Todas las rutas de `/dashboard` requieren haber iniciado sesión.

## Altas y bajas de productos

- **Eliminar** hace una baja física: borra el producto de la base.
- Para sacar un producto de la venta sin borrarlo, se lo pasa a **Inactivo** desde Modificar. Sigue en la base, el cliente no lo ve y se puede reactivar.
