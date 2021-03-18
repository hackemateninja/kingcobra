# Cobra 1.1

Cobra 1.1 remake.

## Other Projects Dependencies

This project dependes on the serverless apis (kingcobra-api). By default in the local environment is configured to use the `https://uc-dev-kingcobra-api.azurewebsites.net` api url (dev environment). You can override this setting creating a `.env.local` file and including the following setting (local url of the api):

```js
NEXT_PUBLIC_FUNCTIONS_BASE="http://localhost:7071"
```

## How to run

Install dependencies

```sh
yarn
```

Run dev version

```sh
yarn dev
```

Build

```sh
yarn build
```

Run locally the built version

```sh
yarn start
```

**NOTE:** the build process generates all the static routes for s1. It dependes on the api resposes from /api/makes and /api/models/`{make}`

## Azure Configurations

In order to run this in Azure AppServices the following files are required:

* `server.js`
* `web.config`

## Next Configs

There are some custom `NextJS` configurations in `next.config.js`:

* Cache headers
* Security headers. Using the [next-secure-headers](https://www.npmjs.com/package/next-secure-headers) npm package.
* Sitemap Generator. Using the [next-with-sitemap](https://www.npmjs.com/package/next-with-sitemap) npm package.

## Useful Documentation

* [NextJS Documentation](https://nextjs.org/docs)
* [NextJS TypeScript Support](https://nextjs.org/docs/basic-features/typescript)
* [NextJS SSR/SSG](https://nextjs.org/docs/basic-features/data-fetching)
