# Use a imagem do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./
RUN npm install

# Copia o código-fonte para o diretório de trabalho
COPY . .

# Compila o código TypeScript (caso use TS)
RUN npm run build

# Expondo a porta 3333
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "start"]
