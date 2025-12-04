# For isolation only. Do not deploy this image to production.
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
