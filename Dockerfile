# Use the PM2 image with Node.js 16 and Alpine Linux
FROM keymetrics/pm2:16-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production
RUN npm install prisma@5.18.0

# Install additional packages if needed
RUN apk add --no-cache \
    curl \
    bash \
    ca-certificates

# Copy only the necessary directories
COPY dist ./dist
COPY prisma ./prisma
COPY ecosystem.config.json .

RUN npx prisma generate

# Use PM2 to run your application
# CMD ["pm2-runtime", "dist/main.js"]