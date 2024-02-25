# Backend do Sistema de Cadastro de Itens

Este é o backend do sistema de cadastro de itens, desenvolvido com Spring Boot (Java) e PostgreSQL.

## Funcionalidades

- Cadastro de Itens: Permite adicionar novos itens ao sistema.
- Visualização de Itens: Retorna uma lista de itens cadastrados.
- Edição de Itens: Permite editar informações dos itens existentes.
- Remoção de Itens: Permite remover itens do sistema.

## Tecnologias Utilizadas

- Java: Linguagem de programação utilizada para desenvolver o backend da aplicação.
- Spring Boot: Framework utilizado para criar APIs RESTful de forma rápida e fácil.
- PostgreSQL: Banco de dados relacional utilizado para armazenar os itens cadastrados.

## Configuração

1. Certifique-se de ter o Java e o PostgreSQL instalados em seu sistema.
2. Configure as informações de conexão com o banco de dados PostgreSQL no arquivo `application.properties`.
3. Execute o backend Spring Boot com o comando `./mvnw spring-boot:run`.

## Rotas da API

- `GET /api/itens`: Retorna todos os itens cadastrados.
- `POST /api/itens`: Adiciona um novo item ao sistema.
- `GET /api/itens/{id}`: Retorna os detalhes de um item específico.
- `PUT /api/itens/{id}`: Atualiza as informações de um item existente.
- `DELETE /api/itens/{id}`: Remove um item do sistema.

