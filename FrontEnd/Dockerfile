# Stage 1: build Vue app
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# ✅ ทดสอบ config ทันทีตอน build เพื่อยืนยันว่า COPY ใช้งานจริง
RUN nginx -t
