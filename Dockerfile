FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /halong2-web


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


CMD ["npm", "run", "start"]


EXPOSE 3000
