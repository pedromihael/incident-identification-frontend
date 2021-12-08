FROM node:14-alpine

WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH

COPY package.json /app/package.json

COPY . .

RUN yarn install
RUN yarn add react-scripts
RUN npx browserslist@latest --update-db
RUN yarn react-dev-utils@10.0.0

# Inicializa a aplicação
CMD ["yarn", "start"]