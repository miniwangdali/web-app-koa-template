# Use the official image as a parent image.
FROM node:12.18.4-alpine as base

FROM base as app
# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 9000

# Copy the rest of your app's source code from your host to your image filesystem.
COPY dist dist

CMD ["node", "./dist/server/index.js"]
