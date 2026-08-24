# Stage 1: Збірка проекту
FROM node:22-alpine AS builder

# Оголошуємо ARG (Dokku передасть сюди значення) та запекаємо в ENV для Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Stage 2: Раздача статики через Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
