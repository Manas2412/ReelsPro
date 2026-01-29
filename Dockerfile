FROM node:22-alpine

WORKDIR /app

# Install dependencies with legacy-peer-deps to ignore version conflicts
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

