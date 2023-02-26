# Alkimiya UI 2.1.1

## Quickstart

### Frontend Dev Server

* `yarn dev` to server on localhost:3000
* `yarn ts:watch` in a visible pane to monitor Typescript errors (the [NextJS dev server does not do this](https://github.com/vercel/next.js/issues/14997))

### Backend Services
TODO

### Format

* `yarn lint` to check
* `yarn format` to autofix as much as possible

### Unit Tests

`yarn test` will watch and automatically rerun tests when files are changed

### E2E Testing

The E2E testing framework is [Playwright](https://playwright.dev).

To run tests you first need to download the [Metamask chrome extension](https://github.com/MetaMask/metamask-extension/releases/download/v10.22.1/metamask-chrome-10.22.1.zip) (or FF if you prefer to test with FF Browser). Add the unzipped file into `./tests/helpers/metamask`. This file cannot be bundled in this repo due to git/ filesize limitations.

Tests have been setup to inject metamask each time into the running browser instance. `e2e/helper/metamaskInternal.ts` file handles most commone setup metasmask operations. `e2e/helper/metamaskAlkimiya.ts` handles common Alkimiya-specific transaction from the Metamask side.

#### Requirement

- Customer interface running on localhost:3000
- Admin interface running on localhost:3001
- Integ repo running with all blockchain data reset (Relayer, subgraph, etc)
- .env file with configs (see below)
- Downloaded Metamask chrome extension to inject into the tests browser

Needed `.env.local` file configs (Use Anvil/Foundry defaults)

```
SILICA_VAULT_ADMIN_BASE_URL=http://localhost:3001
SILICA_BASE_URL=http://localhost:3000
OWNER_PRIVATE_KEY=0x...
OWNER_ACCOUNT_2_ADDRESS=0x....
WALLET_PRIVATE_KEY=0x...
WALLET_MNEMONIC=...
WALLET_PASSWORD=...
CI=0
```

Tests use a fixed version of the Metamask wallet. The current version is `10.22.1`. If Metamask is updated, changes may be required to the setup process in `./tests/helpers/*` and E2E tests might need to be modified accordingly.

#### Notes:

- The tests are created with the assumption of using the local integ repo running a local blockchain with the default Anvil wallet which already owns the Silica Vault and has an ETH, USDT and WBTC balance. Please add this wallet to your development browser/wallet combo when interacting with the project to make devx easier.
- Silica Vault E2E tests generally require both UIs to be running so that the tests can interact with the admin portion
- To be able to advance oracle dates and fully interact with SV admin, it is necessary to interact with the blockchain. Currently we solve this via the `e2e/helpers/oracle` scripts.
- E2E tests will only work in headed browser mode due to Metamask extension injection. No CI/headless integration is possible at the moment.

The default test browser is **[Chromium](https://www.chromium.org)** and is the only one configured to work out of the box.

### Running E2E tests

#### Run tests normally:

```
yarn test:e2e
```

##### Run tests with debug

Need to be started manually in the GUI and provide infinite timeouts and code step-through and test code generator

```
yarn test:e2eDebug
```

### Deploy

* Staging: Vercel bot will comment on every PR with a preview. `main` is also deployed at https://v2-1-1-interface.vercel.app/.
* Prod: `scripts/s3_deploy.sh` will deploy to AWS S3 (we'll run this in CI as soon as we get the deployment reviewers feature). You'll need a section in `~/.aws/credentials`:
```
[alkimiya]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Documentation

TODO

### Bundle analysis
`yarn bundle:analyze` will open 3 browser tabs; the most interesting one will be `client.html` as this will break down what is served to the client. You can drill down into the rectangles to see what node modules the size is coming from. That can help identify opportunities for tree-shaking, code-splitting, lazy loading/importing, removing/replacing libraries.

## How to develop a feature
1. If necessary, create async methods to fetch unstructured data (`models/${RESOURCE}/fetch.ts`) and mutate it (`models/${RESOURCE}/post.ts`)
2. If necessary, create a shape (`models/${RESOURCE}/types.ts`) and shaping method (`models/${RESOURCE}/shape.ts`) and make the fetch methods from step 1 return shaped.
2. If necessary, create methods to extract from the shaped data (`models/${RESOURCE}/math.ts`, `models/${RESOURCE}/formatters.ts`).
3. If necessary, create a hook to track the cache state: (`hooks/use${RESOURCE}`), and update it on mutations
4. If necessary, create shared atoms/molecules/organisms (`components/`) that will comprise the feature, including organisms that .map over shaped data[], through the methods to extract formatted data, into the DOM
5. If necessary, add interactivity which calls the mutation hooks
6. Create the page to call the right hook and pass into the right organisms.

## Roadmap

### Tooling

- [x] [NextJS](https://nextjs.org/)
  - [x] SSG implementation
- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [Eslint](https://eslint.org/)
- [x] [TailwindCSS](tailwindcss.com/)
- [x] [Zustand State Management](https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md)
- [x] [Wagmi - eth blockchain state management and interaction](https://wagmi.sh/)
- [x] library that makes it easy to add wallet connection [rainbowkit](https://github.com/rainbow-me/rainbowkit)
- [x] Dark mode CSS (via `dark:` tailwind modifier)
- [x] Forms validation [React Hook Form](https://react-hook-form.com/get-started)
- [x] Date library [date-fns](https://date-fns.org/docs/Getting-Started#installation)
- [x] [Playwright E2E with test setup](https://playwright.dev/)
- [x] [React-query](https://react-query-v3.tanstack.com/)
- [] Vercel Deploy

### App Roadmap

- [x] Pages / Routes setup
  - [x] Navbar
- [x] icons and image import
- [x] Metamask integration
- [] contract ABIs installed and imported
- [] SV Admin route inside interface
- [] Alkyimia Core Library
- [] Main components
  - [] transaction modals
  - [] table
  - [] navbar
- Refactored main functionality from v2
  - [] portfolio page
  - [] silicavaults page
  - []
- [] E2E setup
