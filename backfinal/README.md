# ULAF - E-commerce Backend

> Servidor **Backend** desarrollado con **Node.js**, **Express** y **MongoDB (Atlas)**.  
> Incluye autenticación con **JWT**, gestión de **roles (user / admin)**, subida de imágenes a **Cloudinary** (archivo local o URL), **paginación**, **búsqueda avanzada** y **seed automático** con más de 100 productos desde archivos CSV.

## Funcionalidades principales

### Artículos

- CRUD completo: crear, listar, editar y eliminar artículos.
- Subida de imágenes a Cloudinary (archivo local) o mediante URL externa.
- Paginación en listados y búsquedas.
- Filtros por categoría, marca y nombre.
- Gestión automática de stock por tallas (S, M, L, XL).

### Usuarios

- Registro con contraseña encriptada (bcrypt).
- Login con token JWT (duración: 1 día).
- Roles: `user` y `admin`.
- Subida de foto de perfil a Cloudinary.
- CRUD completo protegido con middlewares.

### Seed automático

- Importación masiva desde archivos CSV.
- Más de 100 artículos con precios, stock, categorías y marcas.
- Datos de clientes y ventas incluidos.
- Manejo de formatos europeos (comas en decimales, fechas DD/MM/YYYY).

## Roles y permisos

```sh
                                                   #USERS:
- Registro de usuarios (rol por defecto: "user").
- Login con token JWT.
- Consultar su propio perfil.
- Editar su propia información (excepto rol y email).
- Solo el propio usuario o un admin pueden editar o borrar la cuenta.

                                                  #ADMINS:
- CRUD completo sobre artículos.
- Subida y eliminación de imágenes en Cloudinary.
- Gestión de usuarios (ver todos, editar, eliminar).
- Acceso total a todos los endpoints protegidos.
```

## Endpoints principales

#### USERS

| Método | Endpoint            | Descripción                | Protección      |
| ------ | ------------------- | -------------------------- | --------------- |
| POST   | /api/users/register | Registro de usuario        | Pública         |
| POST   | /api/users/login    | Login y obtención de token | Pública         |
| GET    | /api/users/:id      | Obtener usuario por ID     | isAuth          |
| GET    | /api/users          | Listar todos los usuarios  | isAuth, isAdmin |
| PUT    | /api/users/:id      | Editar usuario             | isAuth          |
| DELETE | /api/users/:id      | Eliminar usuario           | isAuth, isAdmin |

#### ARTÍCULOS

| Método | Endpoint              | Descripción                    | Protección      |
| ------ | --------------------- | ------------------------------ | --------------- |
| GET    | /api/articulos        | Listar artículos (paginación)  | Pública         |
| GET    | /api/articulos/search | Buscar y filtrar artículos     | Pública         |
| GET    | /api/articulos/:id    | Obtener artículo por ID        | Pública         |
| POST   | /api/articulos        | Crear artículo (solo admin)    | isAuth, isAdmin |
| PUT    | /api/articulos/:id    | Editar artículo (solo admin)   | isAuth, isAdmin |
| DELETE | /api/articulos/:id    | Eliminar artículo (solo admin) | isAuth, isAdmin |

**Parámetros de búsqueda:**

- `?page=1&limit=10` - Paginación
- `?query=vestido` - Búsqueda por nombre
- `?categoria=Vestidos` - Filtrar por categoría
- `?marca=Zara` - Filtrar por marca

### Rutas Generales

- `Artículos:` ('/api/articulos', articuloRoutes)
- `Users:` ('/api/users', userRoutes)

## Tecnologías utilizadas

| Tecnología         | Uso                                          |
| ------------------ | -------------------------------------------- |
| Node.js            | Entorno de ejecución para JavaScript         |
| Express            | Framework para el servidor web               |
| MongoDB + Mongoose | Base de datos NoSQL y ODM                    |
| Cloudinary         | Almacenamiento de imágenes en la nube        |
| Multer             | Middleware para manejo de archivos multipart |
| JWT (jsonwebtoken) | Autenticación por token                      |
| Bcrypt             | Encriptado de contraseñas                    |
| Express-validator  | Validación de datos de entrada               |
| Helmet             | Seguridad HTTP headers                       |
| CORS               | Control de acceso entre dominios             |
| csv-parser         | Lectura de archivos CSV para seed            |
| Dotenv             | Gestión de variables de entorno              |
| Nodemon            | Desarrollo en caliente                       |

## Clona el repositorio

```bash
git clone https://github.com/DiegoAntunezPerez/backfinal.git
cd backfinal
```

## Instalación y configuración

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno (.env):**

   ```env
   PORT=4000
   DB_URL=tu_mongodb_atlas_url
   JWT_SECRET=tu_clave_secreta
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

3. **Ejecutar seed (importar datos):**

   ```bash
   npm run seed
   ```

4. **Iniciar servidor:**
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:4000`

## Usuario ADMIN de prueba

```json
{
  "email": "admin@test.com",
  "password": "admin1234"
}
```

_(Cambiar rol a "admin" manualmente en MongoDB Compass después del registro)_

## Estructura del proyecto

```sh
backfinal/
├── src/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   └── articuloController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Articulo.js
│   │   │   ├── Cliente.js
│   │   │   └── Venta.js
│   │   └── routes/
│   │       ├── user.js
│   │       └── articulo.js
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── validators.js
│   └── utils/
│       ├── seed.js
│       ├── token.js
│       ├── deleteImg.js
│       └── data/csv/
│           ├── ULAF - Articulos.csv
│           ├── ULAF - Clientes.csv
│           └── ULAF - Ventas.csv
├── index.js
├── package.json
└── .env
```

## Características destacadas

✅ **Autenticación robusta:** JWT con verificación en base de datos  
✅ **Validaciones completas:** express-validator en todos los endpoints  
✅ **Imágenes flexibles:** Cloudinary (archivo local) o URLs externas  
✅ **Paginación automática:** Listados con límite configurable  
✅ **Búsqueda avanzada:** Filtros múltiples y búsqueda por texto  
✅ **Seed profesional:** csv-parser para importación masiva de datos  
✅ **Seguridad:** Helmet, CORS, bcrypt, roles y middlewares  
✅ **Código limpio:** Arquitectura MVC, manejo global de errores

## Capturas de pantalla

_(Aquí puedes agregar imágenes de tu proyecto)_

##### Arquitectura VSC

![Arquitectura](./public/assets/arquitectura.png)

##### Base de datos MongoDB

![MongoDB](./public/assets/mongodb.png)

##### Cloudinary

![Cloudinary](./public/assets/cloudinary.png)

##### Insomnia - Endpoints

![Insomnia](./public/assets/insomnia.png)

## Autor

**Diego Antúnez Pérez** | Desarrollador Full Stack

---

\_Proyecto final del curso de Desarrollo Full Stack - 2026
