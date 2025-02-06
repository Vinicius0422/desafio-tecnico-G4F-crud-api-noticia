# Desafio Técnico - G4F - CRUD REST API - Notícia
## Este repositório contém a solução para o desafio técnico G4F de implementar uma api crud rest para entidade "notícia".

## Baixar o Código Fonte
Para baixar o código fonte, é necessário ter o Git instalado em sua máquina.

Acesse o terminal no diretório desejado e execute o seguinte comando:

```
git clone https://github.com/Vinicius0422/desafio-tecnico-G4F-crud-api-noticia.git
```

Isso fará o download do repositório para sua máquina local.

## Executar a Aplicação Localmente

1. Executar os Testes

Para rodar os testes da aplicação, execute o seguinte comando no terminal:

```
npm test
```

Isso executará os testes configurados na aplicação.

2. Iniciar a Aplicação Localmente

Para iniciar a aplicação localmente, execute o comando:

```
npm run start
```

Isso irá iniciar o servidor e você poderá acessar a aplicação em http://localhost:5000/noticias.

## Executar a Aplicação no Docker
Para executar a aplicação dentro de um container Docker, siga os passos abaixo:

1. Gerar a Imagem Docker

Execute o comando a seguir para construir a imagem Docker da aplicação:

```
docker buildx build -t crud-api-noticia:v1.0.2 .
```

Esse comando irá criar a imagem com a tag crud-api-noticia:v1.0.2.

2. Rodar a Imagem Docker

Após a construção da imagem, execute o seguinte comando para rodar a aplicação em um container Docker:

```
docker run -p 5000:5000 -p 5001:5001 crud-api-noticia:v1.0.2
```

Acessar a Aplicação

Acesse a aplicação em http://localhost:5000/noticias no seu navegador.

## Justificativa para a Estrutura de Pastas e Arquivos
A estrutura de diretórios foi organizada com base nos princípios de modularização e camadas. As pastas e arquivos foram distribuídos conforme suas responsabilidades, visando:

- Clareza: Organização de pastas por responsabilidade, tornando o código fácil de entender.
- Manutenibilidade: A organização facilita a atualização e a manutenção do projeto, permitindo que alterações sejam feitas de maneira isolada.
- Escalabilidade: A estrutura facilita o crescimento do projeto, permitindo adicionar novas funcionalidades sem comprometer a organização do código.

Considerações Finais
Certifique-se de ter as dependências corretamente instaladas antes de rodar a aplicação.
Caso utilize Docker, verifique se o Docker está instalado e configurado corretamente em sua máquina.