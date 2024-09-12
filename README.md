<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Extrutura de pastas

```plaintext
src/
├── application/              # Contém a lógica de aplicação e orquestração dos casos de uso.
│   ├── dtos/                 # Definições de Data Transfer Objects usados para transferir dados entre camadas.
│   ├── interfaces/           # Interfaces que definem contratos de serviços, casos de uso ou integração com outras camadas.
│   ├── services/             # Serviços que implementam a lógica de negócio da aplicação, mas não são específicos de um caso de uso.
│   └── use-cases/            # Casos de uso específicos que orquestram as operações do sistema.
│
├── domain/                   # Contém a lógica de domínio central, independente da infraestrutura e interfaces externas.
│   ├── entities/             # Entidades de domínio que representam os principais objetos de negócio.
│   ├── exceptions/           # Exceções específicas do domínio, para manipulação de erros de negócio.
│   ├── repositories/         # Interfaces de repositórios que definem contratos de persistência de dados.
│   ├── services/             # Serviços específicos ao domínio que contêm a lógica central do negócio.
│   └── value-objects/        # Objetos de valor que encapsulam conceitos de negócio que não possuem identidade própria.
│
├── infrastructure/           # Contém a implementação dos detalhes de infraestrutura, como banco de dados, HTTP, logs, etc.
│   ├── config/               # Configurações da aplicação, como variáveis de ambiente e configurações específicas.
│   ├── database/             # Tudo relacionado ao banco de dados, como modelos, migrações e repositórios concretos.
│   │   ├── migrations/       # Scripts de migração de banco de dados, que gerenciam as alterações no esquema.
│   │   ├── models/           # Modelos de dados que representam as tabelas do banco de dados.
│   │   └── repositories/     # Implementações concretas dos repositórios que interagem com o banco de dados.
│   ├── http/                 # Componentes relacionados à comunicação HTTP.
│   │   ├── controllers/      # Controladores que lidam com as requisições HTTP e chamam os casos de uso.
│   │   ├── middlewares/      # Middlewares que interceptam as requisições/respostas para adicionar ou modificar comportamentos.
│   │   ├── pipes/            # Pipes que transformam ou validam os dados das requisições.
│   │   ├── interceptors/     # Interceptores que manipulam a execução antes ou depois dos métodos dos controladores.
│   │   └── filters/          # Filtros que capturam exceções e tratam erros das requisições HTTP.
│   ├── logger/               # Implementação de logs da aplicação, para registro de atividades e erros.
│   ├── providers/            # Provedores de serviços externos ou internos, como injeções de dependência.
│   └── security/             # Implementações de segurança, como autenticação e autorização.
│
├── presentation/             # Contém a camada de apresentação, que expõe a aplicação aos clientes via diferentes interfaces.
│   ├── graphql/              # Configurações e resolvers para GraphQL.
│   ├── rest/                 # Configurações e controladores para APIs REST.
│   │   ├── controllers/      # Controladores específicos para APIs REST.
│   │   ├── dtos/             # DTOs específicos para APIs REST.
│   │   └── filters/          # Filtros específicos para manipulação de exceções em APIs REST.
│   ├── websocket/            # Configurações e manipuladores para comunicação via WebSocket.
│   └── views/                # Templates de visualização, se houver uma camada de apresentação visual (e.g., HTML).
│
├── shared/                   # Contém recursos compartilhados entre diferentes camadas da aplicação.
│   ├── constants/            # Constantes globais que são usadas em várias partes da aplicação.
│   ├── decorators/           # Decorators customizados que podem ser aplicados a classes, métodos ou propriedades.
│   ├── enums/                # Enumerações usadas para definir conjuntos de valores fixos.
│   ├── helpers/              # Funções auxiliares reutilizáveis, como funções para manipulação de datas.
│   └── types/                # Definições de tipos globais e interfaces que podem ser usadas em várias partes da aplicação.
│
└── main.ts                   # Arquivo de entrada principal da aplicação NestJS, onde a aplicação é inicializada.
```
