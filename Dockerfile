# --- Etapa 1: Build (Construcción) ---
# Usamos una imagen Node.js ligera para la construcción, que incluye npm/yarn y Node.
# Elegimos una versión LTS (Long Term Support) de Node.js.
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias primero (package.json, yarn.lock, etc.)
# Esto permite a Docker usar la caché si las dependencias no cambian.
COPY package.json package-lock.json* ./

# Instala las dependencias de producción y desarrollo
# Si usas Yarn: RUN yarn install --frozen-lockfile
# Si usas NPM:
RUN npm install

# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Compila la aplicación NestJS
# Esto crea la carpeta 'dist' con el código JavaScript compilado
RUN npm run build
# Si usas Yarn: RUN yarn build

# --- Etapa 2: Production (Producción) ---
# Usamos una imagen Node.js aún más ligera para el entorno de producción.
# ¡No incluye herramientas de construcción ni dependencias de desarrollo!
FROM node:20-alpine AS production

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# eliminar esta linea al pasar a produccion
# COPY .env ./.env
 
# Copia solo las dependencias de producción del paso de construcción
# Utiliza --omit=dev para asegurar que no se instalan las devDependencies
COPY package.json package-lock.json* ./
# Si usas Yarn:
RUN npm install --production --frozen-lockfile
# Si usas NPM:
RUN npm install --omit=dev --force # --force puede ser necesario con --omit=dev para evitar errores de peer dependencies

# Copia el código compilado de la etapa 'builder'
COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/dist/storage/local
RUN mkdir -p /app/dist/storage/public/branding
RUN mkdir -p /app/dist/certs


# Si tienes archivos estáticos (ej. 'public') que necesitas servir
# y no están en 'dist', cópialos también:
# COPY --from=builder /app/public ./public

# Expone el puerto en el que tu aplicación NestJS escucha.
# El puerto por defecto para NestJS suele ser 3000.
EXPOSE 3000

CMD ["node", "dist/src/main"]