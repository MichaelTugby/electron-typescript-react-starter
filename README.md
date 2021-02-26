# Electron + Typescript + React Starter

Since I wasn't particularly happy with existing workflows, I created my own to use for future projects using a custom webpack dev server.

## Scripts

Using Yarn with VSCode or Vim is highly recommended as PnP has been setup for those environments.

```js
npm install yarn -g //If not already installed
yarn install
```

```js
// Run in dev mode
yarn dev

// Run unit tests
yarn test

// Build for prod
yarn build
```

## Technologies

### Renderer Process

[React](https://www.npmjs.com/package/react): Creates the website inside the renderer process.

[Redux](https://www.npmjs.com/package/redux): Handles the state of the react app.

[Emotion](https://www.npmjs.com/package/@emotion/react): Adds CSS in JS support for React.

### Testing

[Jest](https://www.npmjs.com/package/jest): Used for unit and snapshot testing the react application.

[React Testing Library](https://www.npmjs.com/package/@testing-library/react): For simple react dom testing.

[Spectron](https://www.npmjs.com/package/spectron): Used for end to end testing the react application in the electron wrapper.

### Webpack

The dev server works by spawning a webpack dev server instance to watch the renderer process, and spawns another webpack instance to watch the main process.

The renderer process supports hot reloading, and the main process supports live reloading.

[TS Node](https://www.npmjs.com/package/ts-node): Allows running a node server with typescript, without the need to transpile first.

[Electron Connect](https://www.npmjs.com/package/electron-connect): Used to live reload the main electron process.

[React Refresh](https://www.npmjs.com/package/react-refresh): Used to hot reload the renderer electron process.

[Electron Devtools](https://www.npmjs.com/package/electron-devtools-installer): Installs React and Redux devtools for development use in the electron wrapper.

[Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer): Shows what's in the generated main and renderer bundles. Can be found in the dist directory.

[Typescript Checker](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin): Checks the build for Typescript and linting errors in a seperate process.

[Typescript Paths](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin): Syncs webpack aliases with typescript paths and base URL.

[ESLint](https://www.npmjs.com/package/eslint): Checks the typescript for incorrect patterns. Uses [Prettier](https://www.npmjs.com/package/prettier) for formatting, and has additional rules for React and Emotion.

[Babel](https://www.npmjs.com/package/@babel/core): Compiles the typescript to javascript.

[HTML Plugin](https://www.npmjs.com/package/html-webpack-plugin): Appends the javascript to the HTML file. Also minifies the HTML for production.

[Terser](https://www.npmjs.com/package/terser-webpack-plugin): Minifies the javascript for production.

[Electron Packager](https://www.npmjs.com/package/electron-packager): Builds the electron app for a specified environment.