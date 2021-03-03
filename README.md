# UAL Renderer for ReactJS

This library provides a React renderer around the [Universal Authenticator Library](https://github.com/arisenual/core).

![PeepsLabs](https://img.shields.io/badge/PeepsLabs-5cb3ff.svg)

# About PeepsLabs

PeepsLabs repositories are experimental.  Developers in the community are encouraged to use PeepsLabs repositories as the basis for code and concepts to incorporate into their applications. Community members are also welcome to contribute and further develop these repositories. Since these repositories are not supported by Block.one, we may not provide responses to issue reports, pull requests, updates to functionality, or other requests from the community, and we encourage the community to take responsibility for these.

## Getting Started
#### With ``yarn``
```bash
yarn add @arisenual/reactjs-renderer
```
Then, install the authenticators that you wish to use...
```bash
yarn add @arisenual/peepsid-desktop @arisenual/peepsid-ios
```
#### With ``npm``
```bash
npm i @arisenual/reactjs-renderer
```
Then, install the authenticators that you wish to use...
```bash
npm i @arisenual/peepsid-desktop @arisenual/peepsid-ios
```

## Basic Usage
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { UALProvider, withUAL } from '@arisenual/reactjs-renderer'
import { PeepsAuthDesktop } from '@arisenual/peepsid-desktop'
import { PeepsAuthIOS } from '@arisenual/peepsid-ios'

import { MyApp } from './MyApp'

const myChain = {
  chainId: MY_CHAIN_ID,
  rpcEndpoints: [{
    protocol: MY_CHAIN_PROTOCOL,
    host: MY_CHAIN_HOST,
    port: MY_CHAIN_PORT,
  }]
}

const peepsDesktop = new PeepsAuthDesktop([myChain], { appName: 'My App' })
const peepsIOS = new PeepsAuthIOS([myChain], { appName: 'My App' })

const MyUALConsumer = withUAL(MyApp)

ReactDOM.render(
  <UALProvider chains={[myChain]} authenticators={[peepsDesktop, peepsIOS]} appName={'My App'}>
    <MyUALConsumer />
  </UALProvider>,
  document.getElementById('ual-app')
)
```

## Examples
A small example is provided in the [examples](https://github.com/arisenual/reactjs-renderer/tree/develop/examples) folder.

## Environment Set Up
**A one-time environment setup is required prior to development.**  The following commands provides a quick starting point.  Make sure you are in the ``examples/`` directory.
```bash
cd examples
cp default.env .env
```
Now that you have an ``.env`` file, you can set environment variables for your chain particulars.  Note that this file will not be version-controlled, nor should it be.
The default settings for the file are...
```
CHAIN_ID=cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f
RPC_PROTOCOL=http
RPC_HOST=localhost
RPC_PORT=8888
```
These values are taken from the local chain created by following the [Developer Portal node set up instructions](https:/developers.arisen.network/docs/getting-the-software). _(Note: if this is your first time following the tutorial you will need to install the eosio binaries [here](https:/developers.arisen.network/docs/setting-up-your-environment))_  These can be edited according to the requirements of your project if you have a different chain set up.  They will be used as the chain data in the example app.
*See the [Basic Example App for UAL with ReactJS](https://github.com/arisenual/reactjs-renderer/tree/develop/examples) for more details.*

## Development
After you set up your environment you can begin development.  Make sure you are back in the ``/`` directory of the ``@arisenual/reactjs-renderer`` package.
```bash
yarn
yarn link
yarn build -w
```

In a duplicate terminal tab, enter the following commands:
```bash
cd examples
yarn link @arisenual/reactjs-renderer
yarn
yarn example
```

Open a browser at `localhost:3000` to see a running instance of the example.

*It is recommended to have at least two terminal tabs running so that `yarn build -w` and `yarn example` can run simultaneously creating an environment where changes are immediately reflected in the browser.*

## Contributing

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

## License

[MIT](./LICENSE)

## Important

See [LICENSE](./LICENSE) for copyright and license terms.

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice.
