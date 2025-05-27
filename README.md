Luis Velasquez  
Carnet 24011341  
Curso Desarrollo de APIs con NodeJS  
3er semestre - Tarea Login con NodeJS  

# OBJETIVO
Desarrollar un sistema de autenticación utilizando JSON Web Tokens (JWT) en Node.js que incluya funcionalidades de registro y login, con rutas protegidas y conexión a base de datos.  
## Caracteristicas
+ Registro de usuarios (ruta PROTEGIDA, solo accesible con token válido)
+ Login de usuarios (genera token JWT)
+ Endpoint protegido para ver información del usuario logueado  

## Caracteristicas Tecnicas
+ Usar Express y JWT
+ Conexion a base de datos
+ Passwords almacenados de forma segura (hash)
+ Validacion basica de datos
+ Manejo de errores apropiado  

## Formato de entrega:
+ Repositorio Git con el codigo
+ README.md breve explicando como probarlo
+ Incluir coleccion de Postman/Insomnia para pruebas


# Sistema de Autenticación JWT con Node.js y PostgreSQL

## Requisitos
- Node.js 18+
- Docker
- PostgreSQL

## Instalación
1. Clonar repositorio: `git clone [url]`
2. Instalar dependencias: `npm install`
3. Iniciar PostgreSQL: `docker-compose up -d`
4. Ejecutar migraciones: `npx prisma migrate dev --name init`
5. Iniciar servidor: `npm run dev`

## Endpoints
- `POST /api/auth/login`: Login de usuario (genera token JWT)
- `POST /api/users`: Registro de usuario (protegido)
- `GET /api/users/me`: Datos del usuario (protegido)

## Pruebas
Importar la colección de Postman desde `loginNodeJS-DesarrolloAPIs.postman_collection`.

## Verificación de Base de Datos
1. Conéctate a PostgreSQL con DataGrip usando:
   - Host: `localhost`
   - Database: `auth_jwt_db`
   - User: `admin`
   - Password: `password123`

2. Ejecuta:
   ```sql
   SELECT * FROM "User";