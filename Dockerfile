# Imagem base
FROM node:22.13.1-alpine as build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte do projeto
COPY . .

# Construi o projeto React (criação do build otimizado)
RUN npm run build

# Expõe as portas que o servidor principal e o JSON Server usarão
EXPOSE 5000
EXPOSE 5001

# Roda o script dev que roda tanto o servidor principal quanto o JSON Server
CMD ["npm", "run", "start"]