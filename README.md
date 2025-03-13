# Inkspires

## Descripción del proyecto
Este proyecto es una página web dedicada a los tatuajes, diseñada para explorar estilos, artistas y tendencias. Los usuarios pueden navegar por galerías de tatuajes y ver los trabajos de artistas. Desarrollado utilizando **Laravel** y **Vue.js**, este sitio ofrece una experiencia interactiva y dinámica.

### Funcionalidades principales
- **Autenticación de usuarios**: Registro e inicio de sesión para acceder a funcionalidades exclusivas.
- **Publicación de posts**: Usuarios autenticados pueden crear publicaciones con imágenes.
- **Sistema de "Me gusta"**: Los usuarios pueden dar "me gusta" a las publicaciones.
- **Galería de tatuajes**: Imágenes categorizadas que se pueden fitrar por estilos y tamaños.
- **Perfil de artistas**: Información detallada sobre tatuadores destacados.

# Guia de instalación
A continuacion esta la guia de instalacion paso a paso tanto el backend como el frontend

## Backend
### **Requisitos mínimos**

Antes de comenzar la instalación, asegúrate de que tu sistema cumpla con los siguientes requisitos:

### **Herramientas**
- **Docker**: Para ejecutar el proyecto en contenedores.
- **Docker Compose**: Para gestionar múltiples servicios (PHP, MySQL, Nginx).


## **Pasos para la instalación del backend**
Sigue los pasos a continuación para configurar el backend de tu proyecto Laravel utilizando Docker.


### **1. Clonar el repositorio**

```bash
git clone https://github.com/IES-Rafael-Alberti/proyecto-dwec-dwes-servidor-api-rest-laravel-JavierAC11
```

- Descarga el código fuente del proyecto desde el repositorio remoto (por ejemplo, GitHub o GitLab).

### **2. Navegar al directorio del proyecto**
```bash
cd proyecto-dwec-dwes-servidor-api-rest-laravel-JavierAC11
```
### **3. Levantar los contenedores Docker**
```bash
docker-compose up -d
```
- Inicia los servicios definidos en el archivo `docker-compose.yml` (como PHP, MySQL y Nginx) en segundo plano.

### **4. Acceder al contenedor PHP**
```bash
docker exec -it laravel_app bash
```
- Accede al contenedor PHP (`laravel_app`) en modo interactivo.

### **5. Instalar dependencias con Composer**
```bash
composer install
```
- Este comando instala las dependencias necesarias para Laravel dentro del contenedor.

### **6. Configurar el archivo `.env`**
Ejemplo básico:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:81TW9ZcPK83IvlblMmPbXuzeGvZD/kBURaBkehB71Fg=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=inkspires
DB_USERNAME=root
DB_PASSWORD=useremail

# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

```
- Edita el archivo `.env` para configurar las credenciales de la base de datos y otros parámetros necesarios.
### **7. Crear carpetas necesarias y ajustar permisos**
Dentro del contenedor PHP:

```bash
mkdir -p storage/framework/{sessions,views,cache}
chmod -R 775 storage bootstrap/cache storage/framework
chown -R www-data:www-data bootstrap/cache storage/framework
```
- Crea las carpetas necesarias para caché, sesiones y vistas.
- Ajusta los permisos para que Laravel pueda escribir en estas carpetas.

### **8. Crear directorio público para imágenes**
```bash
mkdir -p /var/www/public/images
chmod -R 775 /var/www/public/images
chown -R www-data:www-data /var/www/public/images
```
- Crea la carpeta `public/images` para almacenar imágenes subidas por los usuarios.
- Ajusta los permisos para que Laravel pueda escribir en este directorio.


### **9. Limpiar y regenerar cachés**
Dentro del contenedor PHP:

```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```
- Limpia la caché de configuración, vistas y otros datos temporales generados por Laravel.

### **10. Ejecutar migraciones**
Dentro del contenedor PHP:
```bash
php artisan migrate
```
- Este comando crea las tablas necesarias en la base de datos utilizando las migraciones definidas en el proyecto.

## Frontend

### **Requisitos mínimos**

Antes de comenzar la instalación, asegúrate de que tu sistema cumpla con los siguientes requisitos:

### **Herramientas**
- **Node.js**: Versión 16 o superior.
- **npm**: Gestor de paquetes incluido con Node.js.

## **Pasos para la instalación del frontend**

Sigue los pasos a continuación para configurar y ejecutar el frontend de tu proyecto Vue.js.

### **1. Clonar el repositorio**

```bash
git clone https://github.com/IES-Rafael-Alberti/Inkspires-Forntend
```

- Descarga el código fuente del proyecto desde el repositorio remoto (por ejemplo, GitHub o GitLab).

### **2. Navegar al directorio del proyecto**
```bash
cd Inkspires-Forntend
```

### **3. Instalar dependencias**

```bash
npm install --force
```
- Este comando instala las dependencias necesarias para Vue.js, como las librerías definidas en `package.json`.
- La opción `--force` fuerza la instalación incluso si hay advertencias sobre compatibilidad.

### **4. Configurar el archivo `.env`**
Ejemplo básico:

```env
VITE_API_URL="http://localhost:8080/api"
VITE_API_GOOGLE_MAPS_KEY="KeyDeLaApiDeGoogleMaps"
```
- Edita el archivo `.env` para configurar las variables de entorno necesarias para tu aplicación.

### **5. Iniciar el servidor de desarrollo**

```bash
npm run dev
```
- Este comando inicia el servidor de desarrollo Vite.

Una vez hecho todo esto podremos acceder a la url que nos saldra a continuacion que probablemente sera http://localhost:5173/


# Enlace al despliegue

[Inkspires](http://54.37.155.202/)
