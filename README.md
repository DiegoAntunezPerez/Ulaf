# ÜLAF — Ecommerce Fullstack

> ÜLAF es una aplicación web **fullstack** de moda femenina desarrollada con **React** y **Node.js**, que permite **explorar productos**, **gestionar carrito de compras**, **guardar favoritos** y **administrar el catálogo**.
> El proyecto demuestra el uso de tecnologías modernas como React 18, Zustand, JWT authentication, MongoDB, Cloudinary y arquitectura MVC escalable.

---

## 🌐 Deployment en Producción

La aplicación está desplegada y disponible en:

- **Frontend**: https://ulaf.netlify.app
- **Backend API**: https://ulaf-cwvp.onrender.com/api
- **Repositorio GitHub**: https://github.com/DiegoAntunezPerez/Ulaf

---

## Instalación y Configuración Local

### Clona el repositorio

```bash
git clone https://github.com/DiegoAntunezPerez/Ulaf.git
cd "Proyecto Final"
```

### Frontend

```bash
cd frontfinal
npm install
npm run dev
```

### Backend

```bash
cd backfinal
npm install
node index.js
```

> **Nota**: Para desarrollo local, necesitarás configurar las variables de entorno en archivos `.env` tanto en frontend como backend (ver sección de variables de entorno más abajo).

## Credenciales de Administrador

```
Usuario: admin@test.com
Contraseña: Admin1234
```

> **Ruta de admin:** `/admin`
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
- ❤️ Sistema de favoritos con autenticación requerida
- 👤 Registro e inicio de sesión
- 🔐 Autenticación con JWT
- 💾 Recordar email en login
- 📧 Recuperación de contraseña
- ✅ Registro con login automático
- 🌙 Tema claro/oscuro dinámico
- 📱 Diseño 100% responsive
- 📄 Página de detalle de producto
- 💳 Mock de checkout con confirmación de compra
- 🧹 Logout limpia carrito y favoritos automáticamente
- 🔒 Login requerido para añadir favoritos
```

### 👨‍💼 Administrador

```sh
- ➕ Crear productos con upload de imágenes
- 🖼️ Integración con Cloudinary
- 📊 Gestión de stock por tallas (S, M, L, XL)
- ✏️ Edición de productos (precio + stock)
- 🗑️ Eliminación de productos
- 🔒 Acceso protegido mediante roles
- 👥 Gestión de clientes (CRUD completo)
- 💰 Gestión de ventas (CRUD completo)
- 🚫 Prevención de productos duplicados
- 📋 Panel con 4 tabs (Artículos, Clientes, Ventas, Gestionar Productos)
- 🎯 UI diferenciada (sin carrito ni favoritos)
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
  - Opción "Recordar mi email"

- **Registro (`/register`)**
  - Formulario de creación de cuenta
  - Validación de campos
  - Registro en base de datos
  - Login automático tras registro exitoso
  - Scroll automático a mensajes de error/éxito

- **Recuperar Contraseña (`/forgot-password`)**
  - Formulario de recuperación
  - Envío de email (simulado)
  - Validación de email
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
  - **Tab 1: Crear Artículo** - Formulario completo con upload de imágenes
  - **Tab 2: Crear Cliente** - Formulario de registro de clientes
  - **Tab 3: Crear Venta** - Formulario de registro de ventas
  - **Tab 4: Gestionar Productos** - Tabla con edición inline (precio, stock S/M/L/XL) y eliminación
  - Preview de imagen en tiempo real
  - Validación de duplicados

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

- Multer y Zustand

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
│   │   ├── userController.js
│   │   ├── clienteController.js
│   │   └── ventaController.js
│   ├── models/          # Modelos de Mongoose
│   │   ├── Articulo.js
│   │   ├── Cliente.js
│   │   ├── User.js
│   │   └── Venta.js
│   └── routes/          # Definición de rutas
│       ├── articulo.js
│       ├── user.js
│       ├── cliente.js
│       └── venta.js
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
   - Limpia favoritos del localStorage
   - Redirecciona a home

---

## 📡 API Endpoints

### Artículos

| Método | Endpoint                | Descripción                                           | Autenticación |
| ------ | ----------------------- | ----------------------------------------------------- | ------------- |
| GET    | `/api/articulos`        | Listar todos los artículos (con paginación y filtros) | No            |
| GET    | `/api/articulos/search` | Buscar y filtrar artículos                            | No            |
| GET    | `/api/articulos/:id`    | Obtener detalle de un artículo                        | No            |
| POST   | `/api/articulos`        | Crear nuevo artículo                                  | Admin         |
| PUT    | `/api/articulos/:id`    | Editar artículo existente                             | Admin         |
| DELETE | `/api/articulos/:id`    | Eliminar artículo                                     | Admin         |

### Usuarios

| Método | Endpoint              | Descripción                | Autenticación |
| ------ | --------------------- | -------------------------- | ------------- |
| POST   | `/api/users/register` | Registrar nuevo usuario    | No            |
| POST   | `/api/users/login`    | Iniciar sesión             | No            |
| GET    | `/api/users/verify`   | Verificar token JWT        | Token         |
| GET    | `/api/users/profile`  | Obtener perfil del usuario | Token         |

### Clientes

| Método | Endpoint            | Descripción                | Autenticación |
| ------ | ------------------- | -------------------------- | ------------- |
| GET    | `/api/clientes`     | Listar todos los clientes  | Token         |
| GET    | `/api/clientes/:id` | Obtener detalle de cliente | Token         |
| POST   | `/api/clientes`     | Crear nuevo cliente        | Token         |
| PUT    | `/api/clientes/:id` | Editar cliente             | Token         |
| DELETE | `/api/clientes/:id` | Eliminar cliente           | Admin         |

### Ventas

| Método | Endpoint          | Descripción              | Autenticación |
| ------ | ----------------- | ------------------------ | ------------- |
| GET    | `/api/ventas`     | Listar todas las ventas  | Admin         |
| GET    | `/api/ventas/:id` | Obtener detalle de venta | Admin         |
| POST   | `/api/ventas`     | Crear nueva venta        | Token         |
| PUT    | `/api/ventas/:id` | Editar venta             | Admin         |
| DELETE | `/api/ventas/:id` | Eliminar venta           | Admin         |

---

## 📝 Notas Importantes

- El proyecto utiliza **MongoDB** como base de datos
- Las imágenes se almacenan en **Cloudinary** (no en servidor)
- El **carrito se vacía automáticamente** al hacer logout
- Los **favoritos se limpian** al hacer logout (localStorage)
- El **tema se guarda** en localStorage
- El administrador puede **subir imágenes directamente** desde su equipo
- Los **productos no se pueden duplicar** (validación por código y por nombre+marca)
- El **checkout es un mock** (no procesa pagos reales, solo vacía el carrito)
- El **email de login se puede recordar** (guardado en localStorage)
- **Admin no ve carrito ni favoritos** (UI diferenciada por rol)
- Los **usuarios deben estar logueados** para añadir favoritos
- El **límite de productos es 1000** en todas las páginas (no 10)

---

### Token expirado

- El JWT expira en 24 horas
- Logout y volver a hacer login

### Imágenes Cloudinary

- Verificar credenciales de Cloudinary en .env
- Comprobar que el formato sea JPG/PNG/GIF/WebP
- Máximo 5MB por imagen

---

## �‍💻 Autor

**Proyecto Fullstack realizado por [Diego Antúnez Pérez]**

---
