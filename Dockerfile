# Etapa de construcción
FROM node:20-alpine AS buildstage
WORKDIR /app

# Instalar dependencias necesarias para criptografía
RUN apk add --no-cache libressl-dev

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install
# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Copiar el resto del código
COPY . .

# Compilar la aplicación
RUN npm run build -- --configuration production

# Etapa de producción
FROM nginx:alpine
# Copiar archivos compilados al directorio de Nginx
COPY --from=buildstage /app/dist/front /usr/share/nginx/html
# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto
EXPOSE 8080

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
