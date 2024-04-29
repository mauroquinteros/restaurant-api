<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

The main purpose with this skeleton is to start a server application with pnpm, NodeJS and Typescript.

## Project Structure

| Name          | Description                                             |
| ------------- | ------------------------------------------------------- |
| _src/modules_ | Source files                                            |
| _src/config_  | Source code to set up the environment variables         |
| _src/common_  | Reusable modules like the database configuration        |
| _src/shared_  | Reusable utilises and library source code like a logger |
| _tests_       | Test cases will be placed here                          |
| _tests/e2e_   | End to end test cases will be placed here               |
| _tests/unit_  | Unit test cases will be placed here                     |

## Installation

```bash
$ pnpm install
```

```bash
$ pnpm prepare
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Author - [Mauro Quinteros](https://mauroquinteros.vercel.app)
- Twitter - [@mauroquinteroos](https://twitter.com/mauroquinteroos)
