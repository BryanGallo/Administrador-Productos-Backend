# 🛍️ Administrador de Productos - Backend

API REST desarrollada con Express y TypeScript para la gestión completa de productos. Incluye operaciones CRUD, validación de datos, documentación interactiva con Swagger y pruebas automatizadas.

## ✨ Características

- ✅ **CRUD completo** de productos (Crear, Leer, Actualizar, Eliminar)
- ✅ **Validación de datos** con express-validator
- ✅ **Documentación interactiva** con Swagger UI
- ✅ **Base de datos** PostgreSQL con Sequelize ORM
- ✅ **TypeScript** para mayor seguridad de tipos
- ✅ **Pruebas automatizadas** con Jest
- ✅ **CORS configurado** para comunicación con frontend
- ✅ **Logging** con Morgan
- ✅ **Gestión de disponibilidad** de productos

## 🛠️ Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Lenguaje de programación
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional

### Herramientas de Desarrollo
- **Swagger** - Documentación de API
- **Jest** - Framework de testing
- **Nodemon** - Reinicio automático en desarrollo
- **Morgan** - Logger HTTP
- **express-validator** - Validación de datos

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (v12 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## 🚀 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/Administrador-Productos-Backend.git
cd Administrador-Productos-Backend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=4000

# URL de la base de datos PostgreSQL (Railway)
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:3000
```

4. **Crea la base de datos**

Asegúrate de tener PostgreSQL ejecutándose y crea una base de datos:

```sql
CREATE DATABASE nombre_base_datos;
```

## 🎯 Uso

### Modo Desarrollo

Ejecuta el servidor en modo desarrollo con reinicio automático:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000` (o el puerto configurado en `.env`).

### Documentación de la API

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:4000/docs
```

## 📡 Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/products` | Obtener todos los productos |
| `GET` | `/api/products/:id` | Obtener un producto por ID |
| `POST` | `/api/products` | Crear un nuevo producto |
| `PUT` | `/api/products/:id` | Actualizar un producto completo |
| `PATCH` | `/api/products/:id` | Actualizar disponibilidad de un producto |
| `DELETE` | `/api/products/:id` | Eliminar un producto |

### Ejemplo de Request (Crear Producto)

```bash
POST http://localhost:4000/api/products
Content-Type: application/json

{
  "name": "Monitor Curvo LG 49 pulgadas",
  "price": 300,
  "description": "Monitor Gaming 120HZ 1ms"
}
```

### Ejemplo de Response

```json
{
  "id": 1,
  "name": "Monitor Curvo LG 49 pulgadas",
  "price": 300,
  "description": "Monitor Gaming 120HZ 1ms",
  "availability": true
}
```

## 🧪 Testing

Ejecuta las pruebas con:

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
Administrador-Productos-Backend/
├── src/
│   ├── config/          # Configuración (DB, Swagger)
│   ├── controllers/     # Controladores de la lógica de negocio
│   ├── models/          # Modelos de Sequelize
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Middlewares personalizados
│   ├── data/            # Datos de prueba
│   ├── __test__/        # Pruebas del servidor
│   ├── index.ts         # Punto de entrada
│   └── server.ts        # Configuración del servidor
├── .env                 # Variables de entorno (no incluido en git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Validaciones

El API incluye validaciones automáticas:

- **Nombre**: No puede estar vacío
- **Precio**: Debe ser numérico y mayor a 0
- **Descripción**: Campo requerido
- **ID**: Debe ser un entero válido para operaciones por ID
- **Disponibilidad**: Debe ser un valor booleano

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo |
| `npm test` | Ejecuta las pruebas |
| `npm run test:coverage` | Ejecuta las pruebas con reporte de cobertura |


## 👤 Autor

**Bryan Gallo - En base al curso de Código con Juan**


