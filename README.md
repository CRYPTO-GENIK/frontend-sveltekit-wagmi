[![Automated test suite](https://github.com/tradingstrategy-ai/frontend/actions/workflows/javascript.yml/badge.svg)](https://github.com/tradingstrategy-ai/frontend/actions/workflows/javascript.yml)

# Trading Strategy protocol website

A frontend for [Trading Strategy protocol](https://tradingstrategy.ai).

## Install

Node v14+ required.

```sh
npm install
```

## Building the theme

Theme is available as a separate git submodule.
It is based on a MIT licensed [Neumorphism UI by Themesberg](https://github.com/themesberg/neumorphism-ui-bootstrap).
The theme is Bootstrap v4 based.

Pull the submodule

```shell
git submodule update --init --recursive
```

Then

```shell
cd theme
npm install
npx gulp build:dist
```

This will produce files in `theme/dist` folder.

Or as one liner after the installation of the theme packages:

```shell
(cd theme && npx gulp build:dist)
```

## Running in local dev

Set the backend URL. [Read about about magic VITE envs](https://stackoverflow.com/questions/68479217/how-to-load-environment-variables-in-svelte).

```shell
export VITE_PUBLIC_BACKEND_URL=https://tradingstrategy.ai/api
export VITE_PUBLIC_GHOST_API_URL=https://trading-strategy.ghost.io 
export VITE_PUBLIC_GHOST_CONTENT_API_KEY=4f54e499a627473f560945d52  # Will be shared in the web browser as well
```


Then start SvelteKit development server

```shell
npm run dev
```

## Documentation

* [How to develop and integrate the Bootstrap theme](./docs/theme.md)
* [Testing](./docs/tests.md)
* [Running in production](./docs/production.md)
* [Doing page speed tests](./docs/speed.md)

## Notes

### SvelteKit and Svelte component installatin issue

[Any external Svelte components need to be installed as development dependency because of SSR](https://github.com/sveltejs/sapper-template#using-external-components).

