FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

RUN cd backend && npm install
RUN cd frontend && npm install

COPY . .

RUN cd backend && npm run build
RUN cd frontend && npm run build

EXPOSE 5000
EXPOSE 3000

CMD ["npm", "start"]
