FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y sqlite3
RUN mkdir -p /app/sqlite_data

EXPOSE 3000
CMD ["node", "server.js"]