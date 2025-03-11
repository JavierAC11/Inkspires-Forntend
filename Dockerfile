# Usar la imagen oficial de Node.js como base
FROM node:18-alpine as build-stage

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias
RUN npm install --force

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación Vue.js para producción
RUN npm run build

# Usar la imagen oficial de Nginx como base para servir la aplicación
FROM nginx:stable-alpine as production-stage

# Copiar los archivos construidos desde la etapa de construcción a la carpeta html de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
