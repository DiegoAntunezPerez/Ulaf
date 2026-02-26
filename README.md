# ÜLAF — Ecommerce Fullstack

> ÜLAF es una aplicación web **fullstack** de moda femenina desarrollada con **React** y **Node.js**, que permite **explorar productos**, **gestionar carrito de compras**, **guardar favoritos** y **administrar el catálogo**.
> El proyecto demuestra el uso de tecnologías modernas como React 18, Zustand, JWT authentication, MongoDB, Cloudinary y arquitectura MVC escalable.

---

## Instalación y Configuración

### Clona el repositorio

```bash
git clone git https://github.com/DiegoAntunezPerez/Ulaf
cd "Proyecto Final"
```

### Frontend

```bash
cd frontfinal
npm install
npm run dev
```

El frontend se ejecutará en **http://localhost:5173**

### Backend

```bash
cd backfinal
npm install
node index.js
```

El backend se ejecutará en **http://localhost:4000**

## Credenciales de Administrador

```
Usuario: admin@test.com
Contraseña: Admin1234
```

> **Ruta de admin:** http://localhost:5173/admin
>
> **Funcionalidades disponibles:**
>
> - Crear nuevos productos y enviarlos a la base de datos
> - Subir imágenes a Cloudinary desde local con la imagen del articulo
> - Gestión completa del catálogo

---

## Funcionalidades Principales

### 🛍️ Usuario

```sh
- 🔍 Búsqueda de productos por nombre
- 📂 Filtrado por categoría (10 categorías disponibles)
- 🛒 Carrito de compras
- ❤️ Sistema de favoritos
- 👤 Registro e inicio de sesión
- 🔐 Autenticación con JWT
- 🌙 Tema claro/oscuro dinámico
- 📱 Diseño 100% responsive
- 📄 Página de detalle de producto
- 💳 Proceso de checkout completo
```

### 👨‍💼 Administrador

```sh
- ➕ Crear productos con upload de imágenes
- 🖼️ Integración con Cloudinary
- 📊 Gestión de stock por tallas (S, M, L, XL)
- ✏️ Edición de productos existentes
- 🗑️ Eliminación de productos
- 🔒 Acceso protegido mediante roles
```

---

## 📄 Páginas de la Aplicación

La aplicación cuenta con **múltiples páginas**, gestionadas con `react-router-dom v6`:

### Públicas

- **Home (`/`)**
  - Banner de video hero
  - Menú de categorías
  - Productos destacados

- **Productos (`/products`)**
  - Listado completo de productos
  - Búsqueda en tiempo real (debounce)
  - Filtros por categoría
  - Paginación

- **Detalle de Producto (`/products/:id`)**
  - Información completa del producto
  - Selector de talla
  - Añadir al carrito
  - Añadir a favoritos

- **Login (`/login`)**
  - Formulario de inicio de sesión
  - Validación con React Hook Form
  - Gestión de errores

- **Registro (`/register`)**
  - Formulario de creación de cuenta
  - Validación de campos
  - Registro en base de datos
- **Articulos (`/category/Abrigos, /Camisas, /Camisetas, /Cazadora, /Conjuntos, / Pantalones, /Punto, /Sudaderas, /Tops, /Vestidos`)**
- **Footers (`/sobre-nosotros, /ayuda, /contacto, etc...`) Total 12**

### Protegidas (requieren autenticación)

- **Carrito (`/cart`)**
  - Listado de productos seleccionados
  - Modificación de cantidades
  - Cálculo de totales
  - Proceso de compra

- **Favoritos (`/favorites`)**
  - Productos guardados por el usuario
  - Añadir/quitar favoritos
  - Acceso rápido al detalle

- **Perfil (`/profile`)**
  - Información del usuario
  - Historial de pedidos
  - Configuración de cuenta

- **Checkout (`/checkout`)**
  - Formulario de dirección de envío
  - Método de pago
  - Confirmación de pedido

### Administración (requiere rol admin)

- **Panel Admin (`/admin`)**
  - Crear nuevos productos
  - Upload de imágenes desde local
  - Preview de imagen en tiempo real
  - Gestión completa de stock

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Framework principal
- **React Router DOM v6** - Routing y navegación
- **Zustand** - Gestión de estado global (auth, cart, favorites)
- **React Hook Form** - Gestión de formularios
- **JavaScript (ES6+)** - Lenguaje principal
- **CSS Modules** - Estilos con variables CSS
- **Vite** - Build tool y dev server

### Backend

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos NoSQL
- **JWT (jsonwebtoken)** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Multer** - Manejo de archivos
- **Cloudinary** - Almacenamiento de imágenes en la nube
- **Express-validator** - Validación de datos
- **CORS** - Configuración de seguridad

### Librerias no vistas:

- Cors, Multer y Zustand

---

## Arquitectura del Proyecto

### Frontend (`frontfinal/`)

```
src/
├── assets/           # Recursos estáticos
├── components/       # Componentes reutilizables
│   ├── CartItem/
│   ├── CategoryMenu/
│   ├── Footer/
│   ├── Header/
│   ├── ProductCard/
│   ├── ProtectedRoute/
│   └── SearchBar/
├── hooks/            # Custom Hooks
│   ├── useDebounce.js       # Retrasa búsqueda en SearchBar (800ms) para evitar llamadas excesivas
│   ├── useFetch.js          # Obtiene estadísticas de productos en About (total, categorías, marcas)
│   └── useLocalStorage.js   # Persiste tema dark/light en Header para mantenerlo entre sesiones
├── pages/            # Vistas principales
│   ├── Admin/
│   ├── Cart/
│   ├── Checkout/
│   ├── Favorites/
│   ├── Home/
│   ├── Login/
│   ├── Products/
│   ├── ProductDetail/
│   ├── Profile/
│   └── Register/
├── services/         # Lógica de API
│   ├── api.js
│   ├── authService.js
│   └── productService.js
├── store/            # Zustand stores
│   ├── authStore.js       # Estado de autenticación
│   ├── cartStore.js       # Estado del carrito
│   └── favoritesStore.js  # Estado de favoritos
└── utils/            # Utilidades
    ├── constants.js
    └── helpers.js
```

### Backend (`backfinal/`)

```
src/
├── api/
│   ├── controllers/      # Lógica de negocio
│   │   ├── articuloController.js
│   │   └── userController.js
│   ├── models/          # Modelos de Mongoose
│   │   ├── Articulo.js
│   │   ├── Cliente.js
│   │   ├── User.js
│   │   └── Venta.js
│   └── routes/          # Definición de rutas
│       ├── articulo.js
│       └── user.js
├── config/              # Configuraciones
│   ├── cloudinary.js    # Setup de Cloudinary
│   └── db.js            # Conexión MongoDB
├── middlewares/         # Middlewares personalizados
│   ├── admin.js         # Verificación de rol admin
│   ├── auth.js          # Verificación de JWT
│   └── validators.js    # Validaciones
└── utils/               # Utilidades
    ├── deleteImg.js     # Borrado de imágenes
    ├── seed.js          # Datos iniciales
    └── token.js         # Generación de tokens
```

---

## 🔐 Sistema de Autenticación

### Flujo de autenticación

1. **Registro**
   - Usuario envía: nombre, email, contraseña
   - Backend: hashea contraseña con bcrypt
   - Se crea usuario en MongoDB
   - Se genera JWT token

2. **Login**
   - Usuario envía: email, contraseña
   - Backend: verifica credenciales
   - Se genera JWT token
   - Frontend: guarda token en localStorage
   - Zustand: actualiza estado global

3. **Rutas protegidas**
   - Middleware `isAuth` verifica token
   - Middleware `isAdmin` verifica rol
   - ProtectedRoute (frontend) redirecciona si no autenticado

4. **Logout**
   - Elimina token de localStorage
   - Limpia estado de Zustand
   - Vacía carrito automáticamente
   - Redirecciona a home

---

## 📡 API Endpoints

### Artículos

```
GET    /api/articulos              # Listar todos
GET    /api/articulos/search       # Buscar y filtrar
GET    /api/articulos/:id          # Detalle de un artículo
POST   /api/articulos              # Crear (admin)
PUT    /api/articulos/:id          # Editar (admin)
DELETE /api/articulos/:id          # Eliminar (admin)
```

### Usuarios

```
POST   /api/users/register         # Registro de usuario
POST   /api/users/login            # Inicio de sesión
GET    /api/users/verify           # Verificar token
GET    /api/users/profile          # Perfil del usuario (auth)
```

---

## 📝 Notas Importantes

- El proyecto utiliza **MongoDB** como base de datos
- Las imágenes se almacenan en **Cloudinary** (no en servidor)
- El **carrito se vacía automáticamente** al hacer logout
- Los **favoritos persisten** entre sesiones
- El **tema se guarda** en localStorage
- El administrador puede **subir imágenes directamente** desde su equipo

---

### Token expirado

- El JWT expira en 24 horas
- Logout y volver a hacer login

### Imágenes Cloudinary

- Verificar credenciales de Cloudinary en .env
- Comprobar que el formato sea JPG/PNG/GIF/WebP
- Máximo 5MB por imagen

---

##

## 👨‍💻 Autor

**Proyecto Fullstack realizado por [Diego Antúnez Pérez]**

---
