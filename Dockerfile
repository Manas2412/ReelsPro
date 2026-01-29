FROM node:22-alpine

WORKDIR /app

# Install dependencies with legacy-peer-deps to ignore version conflicts
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

RUN npm install -g pm2

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]

