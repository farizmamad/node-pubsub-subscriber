FROM node:12-slim

# Create app folder
WORKDIR /usr/src/app

# Install app deps. Copy the lock file
COPY package*.json ./
RUN npm install --only=production

# Copy all source code
COPY . .

CMD ["npm", "run", "start"]