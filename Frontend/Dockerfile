# Etapa de construcción
FROM node:18-alpine AS build
WORKDIR /app

# Instalar Python y make/g++ para node-gyp
RUN apk add --no-cache python3 make g++

# Copiar los archivos necesarios e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir la aplicación
COPY . .
RUN npm run build