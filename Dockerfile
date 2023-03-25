# Base image
FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}                                                                                                        

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Not root permission
# USER node

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-    wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Start the server using the production build
CMD ["npm", "run", "start:prod"]

