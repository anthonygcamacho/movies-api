FROM node:18.15.0-alpine3.17

WORKDIR /app

# Install server dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Install web component dependencies
COPY public/web-components/package*.json public/web-components/
RUN npm install --omit=dev --prefix public/web-components

# Copy all app files
COPY lib/ lib/
COPY public/assets/ public/assets/
COPY public/web-components/ public/web-components/

# Switch to node user
USER node

EXPOSE 8000

# Start server
CMD [ "npm", "start" ]