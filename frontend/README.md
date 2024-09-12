# React technical test frontend

This is an [`React v18`](https://react.dev/reference/react) project to manage technical test.

## Dependencies

This project runs with node version specified in [`.nvmrc`](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) version.

```bash
nvm use
```

This project uses only [`pnpm`](https://pnpm.io/es/installation) for its dependencies:

## Installation

For the installation of this proyect run:

```bash
pnpm i
```

Copy env file:

```bash
cp .env.example .env
```
and set backend url.

```

To serve de app locally run:

```bash
pnpm run dev
```

## Code standard

This project use eslint:

```bash
pnpm run lint
```

Also this project use prettier to format code

```bash
pnpm run format
```